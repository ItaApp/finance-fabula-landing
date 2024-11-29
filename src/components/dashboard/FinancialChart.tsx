import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis } from "recharts";

const data = [
  { month: "Jan", value: 2400 },
  { month: "Feb", value: 1398 },
  { month: "Mar", value: 9800 },
  { month: "Apr", value: 3908 },
  { month: "May", value: 4800 },
  { month: "Jun", value: 3800 },
];

export const FinancialChart = () => {
  return (
    <Card className="p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4">Visão Geral Financeira</h3>
      <div className="h-[400px]">
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
  );
};