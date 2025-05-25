import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, RefreshCw, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AIInsights = () => {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const { toast } = useToast();

  const askQuestion = async () => {
    if (!question.trim()) {
      toast({
        variant: "destructive",
        title: "Empty question",
        description: "Please enter a question to analyze.",
      });
      return;
    }

    setIsLoading(true);
    setResponse(''); 

    try {
      const response = await fetch('http://localhost:5000/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });
      const data = await response.json();
      setResponse(data.answer);

      setIsLoading(false); 

    } catch (error) {
      console.error('Error getting AI response:', error);
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "AI analysis failed",
        description: "Could not get a response from the AI model. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-start">
        <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-slate-700 dark:text-slate-300 ml-2">
          Ask questions about product data, and the system will use the Llama 3.2 model via Ollama to generate insights.
        </p>
      </div>
      
      <div className="flex flex-col space-y-2">
        <Textarea
          placeholder="Ask a question about product data (e.g., 'Which product category has the highest profit margin?')"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="min-h-[100px] resize-none"
        />
        <Button onClick={askQuestion} disabled={isLoading} className="self-end">
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <MessageSquare className="h-4 w-4 mr-2" />
              Get AI Insights
            </>
          )}
        </Button>
      </div>
      
      {response && (
        <Card className="mt-4 bg-slate-50 dark:bg-slate-800/50 border border-blue-100 dark:border-blue-900/50">
          <CardContent className="pt-6">
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xs">AI</span>
              </div>
              <div className="ml-4">
                <p className="text-slate-700 dark:text-slate-300">{response}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-6">
        <h3 className="text-sm font-medium mb-2">Example questions:</h3>
        <ul className="space-y-1">
          <li>
            <Button 
              variant="link" 
              className="p-0 h-auto text-blue-500 dark:text-blue-400 text-sm"
              onClick={() => setQuestion("What customer segments are generating the highest lifetime value, and how can I target them more effectively?")}
            >
              What customer segments are generating the highest lifetime value, and how can I target them more effectively?
            </Button>
          </li>
          <li>
            <Button 
              variant="link" 
              className="p-0 h-auto text-blue-500 dark:text-blue-400 text-sm"
              onClick={() => setQuestion("Are there emerging trends in customer preferences that I should align my product offerings with?")}
            >
              Are there emerging trends in customer preferences that I should align my product offerings with?
            </Button>
          </li>
          <li>
            <Button 
              variant="link" 
              className="p-0 h-auto text-blue-500 dark:text-blue-400 text-sm"
              onClick={() => setQuestion("How can I use return rate data to improve product descriptions and reduce losses?")}
            >
              How can I use return rate data to improve product descriptions and reduce losses?
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AIInsights;
