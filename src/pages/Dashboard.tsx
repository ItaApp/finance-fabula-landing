import Header from "@/components/Header";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { FinancialChart } from "@/components/dashboard/FinancialChart";
import { TransactionsList } from "@/components/dashboard/TransactionsList";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/AppSidebar";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <div className="mx-auto max-w-[1200px] w-full px-4 py-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">
                Painel Financeiro
              </h1>
              <p className="text-muted-foreground">
                Bem-vindo! Aqui está sua visão geral financeira
              </p>
            </div>

            <StatsCards />
            <FinancialChart />
            <TransactionsList />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;