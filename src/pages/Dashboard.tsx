import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, DollarSign } from "lucide-react";

const data = [
  { month: "Jan", value: 2400 },
  { month: "Feb", value: 1398 },
  { month: "Mar", value: 9800 },
  { month: "Apr", value: 3908 },
  { month: "May", value: 4800 },
  { month: "Jun", value: 3800 },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Financial Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your financial overview</p>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Balance</p>
              <h3 className="text-2xl font-bold">$12,560</h3>
              <p className="text-sm text-green-500 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12.5%
              </p>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <Wallet className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Income</p>
              <h3 className="text-2xl font-bold">$4,890</h3>
              <p className="text-sm text-green-500 flex items-center mt-1">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                +8.2%
              </p>
            </div>
            <div className="bg-green-500/10 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-secondary" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Expenses</p>
              <h3 className="text-2xl font-bold">$2,640</h3>
              <p className="text-sm text-red-500 flex items-center mt-1">
                <ArrowDownRight className="w-4 h-4 mr-1" />
                -3.1%
              </p>
            </div>
            <div className="bg-red-500/10 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-red-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Investments</p>
              <h3 className="text-2xl font-bold">$6,240</h3>
              <p className="text-sm text-green-500 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +5.4%
              </p>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>
      </div>

      {/* Chart Section */}
      <Card className="p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Financial Overview</h3>
        <div className="h-[300px]">
          <ChartContainer
            config={{
              value: {
                theme: {
                  light: "#0EA5E9",
                  dark: "#0EA5E9",
                },
              },
            }}
          >
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#0EA5E9"
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <ScrollArea className="h-[300px] w-full">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-4 border-b last:border-0"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${i % 2 === 0 ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                  {i % 2 === 0 ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium">
                    {i % 2 === 0 ? 'Income' : 'Expense'} Transaction
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className={`font-medium ${i % 2 === 0 ? 'text-green-500' : 'text-red-500'}`}>
                {i % 2 === 0 ? '+' : '-'}${(Math.random() * 1000).toFixed(2)}
              </p>
            </div>
          ))}
        </ScrollArea>
      </Card>
    </div>
  );
};

export default Dashboard;