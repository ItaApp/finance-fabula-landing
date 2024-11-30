import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountsPayableForm } from "@/components/financial/AccountsPayableForm";
import { AccountsReceivableForm } from "@/components/financial/AccountsReceivableForm";
import { AccountsPayableList } from "@/components/financial/AccountsPayableList";
import { AccountsReceivableList } from "@/components/financial/AccountsReceivableList";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/AppSidebar";
import Header from "@/components/Header";

const Financial = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <div className="mx-auto max-w-[1200px] w-full px-4 py-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">Financeiro</h1>
              <p className="text-muted-foreground">
                Gerencie suas contas a pagar e receber
              </p>
            </div>

            <Tabs defaultValue="payable" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                <TabsTrigger value="payable">Contas a Pagar</TabsTrigger>
                <TabsTrigger value="payable-list">Lista de Contas a Pagar</TabsTrigger>
                <TabsTrigger value="receivable">Contas a Receber</TabsTrigger>
                <TabsTrigger value="receivable-list">Lista de Contas a Receber</TabsTrigger>
              </TabsList>

              <TabsContent value="payable">
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h2 className="text-lg font-semibold mb-4">Cadastrar Conta a Pagar</h2>
                    <AccountsPayableForm />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="payable-list">
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h2 className="text-lg font-semibold mb-4">Lista de Contas a Pagar</h2>
                    <AccountsPayableList />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="receivable">
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h2 className="text-lg font-semibold mb-4">Cadastrar Conta a Receber</h2>
                    <AccountsReceivableForm />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="receivable-list">
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h2 className="text-lg font-semibold mb-4">Lista de Contas a Receber</h2>
                    <AccountsReceivableList />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Financial;