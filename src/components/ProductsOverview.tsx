import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Users,
  RefreshCcw,
  Percent,
  Star,
} from 'lucide-react';

const mockStats = {
  totalProducts: 267,
  totalSales: 1293847.15,
  revenue: 970853.45,
  growthRate: 12.7,
  returnRate: 25.0,
  totalCustomers: 4312,
  avgOrderValue: 1026.14,
  topProduct: 'Silk Kurti',
};

const ProductsOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {/* Total Products */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          <Package className="h-4 w-4 text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockStats.totalProducts}</div>
          <p className="text-xs text-slate-500 mt-1">
            +9% from last month
          </p>
        </CardContent>
      </Card>

      {/* Total Sales */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          <ShoppingCart className="h-4 w-4 text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{mockStats.totalSales.toLocaleString()}</div>
          <p className="text-xs text-slate-500 mt-1">
            +5% from last month
          </p>
        </CardContent>
      </Card>

      {/* Revenue */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{mockStats.revenue.toLocaleString()}</div>
          <p className="text-xs text-slate-500 mt-1">
            +8% from last month
          </p>
        </CardContent>
      </Card>

      {/* Growth Rate */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockStats.growthRate}%</div>
          <p className="text-xs text-slate-500 mt-1">
            +1.2% from last month
          </p>
        </CardContent>
      </Card>

      {/* Total Customers */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          <Users className="h-4 w-4 text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockStats.totalCustomers.toLocaleString()}</div>
          <p className="text-xs text-slate-500 mt-1">
            +6% from last month
          </p>
        </CardContent>
      </Card>

      {/* Return Rate */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Return Rate</CardTitle>
          <RefreshCcw className="h-4 w-4 text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockStats.returnRate}%</div>
          <p className="text-xs text-slate-500 mt-1">
            -0.4% from last month
          </p>
        </CardContent>
      </Card>

      {/* Avg Order Value */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
          <Percent className="h-4 w-4 text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{mockStats.avgOrderValue.toFixed(2)}</div>
          <p className="text-xs text-slate-500 mt-1">
            +3.3% from last month
          </p>
        </CardContent>
      </Card>

      {/* Top Product */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Product</CardTitle>
          <Star className="h-4 w-4 text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-semibold">{mockStats.topProduct}</div>
          <p className="text-xs text-slate-500 mt-1">
            Based on last month’s sales
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsOverview;
