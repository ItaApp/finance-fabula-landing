import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccountsPayableForm } from "@/components/financial/AccountsPayableForm"
import { AccountsReceivableForm } from "@/components/financial/AccountsReceivableForm"
import { AccountsPayableList } from "@/components/financial/AccountsPayableList"
import { AccountsReceivableList } from "@/components/financial/AccountsReceivableList"
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from "@/components/ui/sidebar"
import { Home, User, Truck, DollarSign, FileText, Settings } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Header from "@/components/Header"

const Financial = () => {
  const navigate = useNavigate()

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
                <SidebarMenuButton tooltip="Início" onClick={() => navigate("/")}>
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
  )
}

export default Financial