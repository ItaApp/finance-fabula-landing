import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export const TransactionsList = () => {
  return (
    <Card className="p-6">
      <ScrollArea className="h-[300px] w-full">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-4 border-b last:border-0"
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-2 rounded-full ${
                  i % 2 === 0 ? "bg-green-500/10" : "bg-red-500/10"
                }`}
              >
                {i % 2 === 0 ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500" />
                )}
              </div>
              <div>
                <p className="font-medium">
                  {i % 2 === 0 ? "Income" : "Expense"} Transaction
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
            <p
              className={`font-medium ${
                i % 2 === 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {i % 2 === 0 ? "+" : "-"}${(Math.random() * 1000).toFixed(2)}
            </p>
          </div>
        ))}
      </ScrollArea>
    </Card>
  );
};