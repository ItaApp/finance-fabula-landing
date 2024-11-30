import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompanyForm } from "@/components/settings/CompanyForm";
import { UserForm } from "@/components/settings/UserForm";
import { supabase } from "@/integrations/supabase/client";
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
import { Home, User, Truck, DollarSign, FileText, Settings as SettingsIcon, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Settings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"company" | "user">("company");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate]);

  const { data: company, isLoading } = useQuery({
    queryKey: ["company"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;

      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .eq("owner_id", session.user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center">
              <span className="text-muted-foreground">Carregando...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                  <SettingsIcon className="h-4 w-4" />
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
              <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
              <p className="text-muted-foreground">
                Gerencie as configurações da sua empresa
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Button 
                variant="outline" 
                size="lg" 
                className="h-24"
                onClick={() => setActiveTab("user")}
              >
                <User className="mr-2 h-5 w-5" />
                Minhas informações
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="h-24"
                onClick={() => setActiveTab("company")}
              >
                <Building2 className="mr-2 h-5 w-5" />
                Minha empresa
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Configurações</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={(value: "company" | "user") => setActiveTab(value)}>
                  <TabsList>
                    <TabsTrigger value="company">Empresa</TabsTrigger>
                    <TabsTrigger value="user">Usuário</TabsTrigger>
                  </TabsList>
                  <TabsContent value="company">
                    <CompanyForm initialData={company} />
                  </TabsContent>
                  <TabsContent value="user">
                    <UserForm />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Settings;
