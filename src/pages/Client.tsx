import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
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
import { Home, User, Truck, DollarSign, FileText, Settings, UserPlus, Users } from "lucide-react";
import { ClientRegistrationForm } from "@/components/ClientRegistrationForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ClientList } from "@/components/ClientList";

const Client = () => {
  const [view, setView] = useState<'list' | 'register'>('list');

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
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
                <SidebarMenuButton tooltip="Início">
                  <Home className="h-4 w-4" />
                  <span>Início</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Cliente">
                  <User className="h-4 w-4" />
                  <span>Cliente</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Fornecedor">
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
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">
                {view === 'register' ? 'Cadastro de Cliente' : 'Clientes'}
              </h1>
              <p className="text-muted-foreground">
                {view === 'register' ? 'Preencha os dados do cliente' : 'Visualize e gerencie seus clientes'}
              </p>
            </div>

            <div className="flex gap-4 mb-6">
              <Button
                onClick={() => setView('register')}
                variant={view === 'register' ? 'default' : 'outline'}
              >
                <UserPlus className="w-4 h-4" />
                Cadastrar Cliente
              </Button>
              <Button
                onClick={() => setView('list')}
                variant={view === 'list' ? 'default' : 'outline'}
              >
                <Users className="w-4 h-4" />
                Lista de Clientes
              </Button>
            </div>

            <Card className="p-6">
              {view === 'register' ? <ClientRegistrationForm /> : <ClientList />}
            </Card>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Client;