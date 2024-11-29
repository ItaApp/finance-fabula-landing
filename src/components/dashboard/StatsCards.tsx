import { Card } from "@/components/ui/card";
import {
  Wallet,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
} from "lucide-react";

export const StatsCards = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Saldo Total</p>
            <h3 className="text-2xl font-bold">R$ 12.560</h3>
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
  );
};