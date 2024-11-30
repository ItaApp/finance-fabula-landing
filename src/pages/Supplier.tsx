import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/AppSidebar";
import { UserPlus, Users } from "lucide-react";
import { SupplierRegistrationForm } from "@/components/SupplierRegistrationForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SupplierList } from "@/components/SupplierList";

const Supplier = () => {
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
                {view === 'register' ? 'Cadastro de Fornecedor' : 'Fornecedores'}
              </h1>
              <p className="text-muted-foreground">
                {view === 'register' ? 'Preencha os dados do fornecedor' : 'Visualize e gerencie seus fornecedores'}
              </p>
            </div>

            <div className="flex gap-4 mb-6">
              <Button
                onClick={() => setView('register')}
                variant={view === 'register' ? 'default' : 'outline'}
              >
                <UserPlus className="w-4 h-4" />
                Cadastrar Fornecedor
              </Button>
              <Button
                onClick={() => setView('list')}
                variant={view === 'list' ? 'default' : 'outline'}
              >
                <Users className="w-4 h-4" />
                Lista de Fornecedores
              </Button>
            </div>

            <Card className="p-6">
              {view === 'register' ? <SupplierRegistrationForm /> : <SupplierList />}
            </Card>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Supplier;