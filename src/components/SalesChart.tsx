import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';

const SalesChart = () => {
  const [data, setData] = useState<{ name: string; sales: number; returns: number }[]>([]);
  const [timeRange, setTimeRange] = useState('12m');

  const monthMap = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  // Fetch and aggregate sales data
  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/data/Sal')
      .then((res) => res.json())
      .then((json) => {
        if (json.data) {
          const aggregated: Record<string, { name: string; sales: number; returns: number }> = {};

          json.data.forEach((item) => {
            const date = new Date(item.Order_Date);
            const month = date.toLocaleString('default', { month: 'short' });
            const year = date.getFullYear();
            const key = `${month} ${year}`;

            if (!aggregated[key]) {
              aggregated[key] = { name: key, sales: 0, returns: 0 };
            }

            aggregated[key].sales += item.Total_Amount || 0;
            if (item.Order_Status === 'Cancelled') {
              aggregated[key].returns += item.Total_Amount || 0;
            }
          });

          const sortedData = Object.values(aggregated).sort((a, b) => {
            const [aMonth, aYear] = a.name.split(' ');
            const [bMonth, bYear] = b.name.split(' ');

            const aDate = new Date(Number(aYear), monthMap[aMonth] || 0);
            const bDate = new Date(Number(bYear), monthMap[bMonth] || 0);

            return aDate.getTime() - bDate.getTime();
          });

          setData(sortedData);
        }
      })
      .catch((err) => console.error('Error fetching sales data:', err));
  }, []);

  // Filter data by time range
  const getFilteredData = () => {
    switch (timeRange) {
      case '3m':
        return data.slice(-3);
      case '6m':
        return data.slice(-6);
      case '12m':
      default:
        return data;
    }
  };

  const filteredData = getFilteredData();
  const totalSales = filteredData.reduce((sum, item) => sum + item.sales, 0);
  const totalReturns = filteredData.reduce((sum, item) => sum + item.returns, 0);
  const returnRate = totalSales > 0 ? (totalReturns / totalSales) * 100 : 0;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3m">Last 3 months</SelectItem>
            <SelectItem value="6m">Last 6 months</SelectItem>
            <SelectItem value="12m">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" name="Sales" fill="#3b82f6" />
            <Bar dataKey="returns" name="Returns" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <p className="text-sm text-blue-500 dark:text-blue-400 font-medium">Total Sales</p>
          <p className="text-2xl font-bold">{totalSales.toLocaleString()}</p>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
          <p className="text-sm text-red-500 dark:text-red-400 font-medium">Total Returns</p>
          <p className="text-2xl font-bold">{totalReturns.toLocaleString()}</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <p className="text-sm text-green-500 dark:text-green-400 font-medium">Return Rate</p>
          <p className="text-2xl font-bold">{returnRate.toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
