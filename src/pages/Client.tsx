import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/AppSidebar";
import { UserPlus, Users } from "lucide-react";
import { ClientRegistrationForm } from "@/components/ClientRegistrationForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ClientList } from "@/components/ClientList";

const Client = () => {
  const [view, setView] = useState<'list' | 'register'>('list');

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
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