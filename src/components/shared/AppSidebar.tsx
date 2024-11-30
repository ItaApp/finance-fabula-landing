import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Home, User, Truck, DollarSign, FileText, Settings } from "lucide-react";

export function AppSidebar() {
  const navigate = useNavigate();

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border/5">
        <div className="flex h-[60px] items-center px-6">
          <SidebarTrigger />
          <span className="ml-2 text-lg font-semibold">Sistema de Gestão</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Início" onClick={() => navigate("/dashboard")}>
              <Home className="h-4 w-4" />
              <span>Início</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Cliente" onClick={() => navigate("/client")}>
              <User className="h-4 w-4" />
              <span>Cliente</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Fornecedor" onClick={() => navigate("/supplier")}>
              <Truck className="h-4 w-4" />
              <span>Fornecedor</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Financeiro" onClick={() => navigate("/financial")}>
              <DollarSign className="h-4 w-4" />
              <span>Financeiro</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Nota Fiscal" onClick={() => navigate("/fiscal-notes")}>
              <FileText className="h-4 w-4" />
              <span>Nota Fiscal</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Configurações" onClick={() => navigate("/settings")}>
              <Settings className="h-4 w-4" />
              <span>Configurações</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}