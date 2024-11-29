import Header from "@/components/Header";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { FinancialChart } from "@/components/dashboard/FinancialChart";
import { TransactionsList } from "@/components/dashboard/TransactionsList";
import {
  Home,
  User,
  Truck,
  DollarSign,
  FileText,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b border-border/5">
            <div className="flex h-[60px] items-center px-6">
              <SidebarTrigger />
              <span className="ml-2 text-lg font-semibold">
                Sistema de Gestão
              </span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Início"
                  onClick={() => navigate("/")}
                >
                  <Home className="h-4 w-4" />
                  <span>Início</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Cliente"
                  onClick={() => navigate("/client")}
                >
                  <User className="h-4 w-4" />
                  <span>Cliente</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Fornecedor"
                  onClick={() => navigate("/supplier")}
                >
                  <Truck className="h-4 w-4" />
                  <span>Fornecedor</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Financeiro">
                  <DollarSign className="h-4 w-4" />
                  <span>Financeiro</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Nota NFS-e">
                  <FileText className="h-4 w-4" />
                  <span>Nota NFS-e</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Configurações">
                  <Settings className="h-4 w-4" />
                  <span>Configurações</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1">
          <Header />
          <div className="mx-auto max-w-[1200px] w-full px-4 py-6">
            {/* Header */}
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