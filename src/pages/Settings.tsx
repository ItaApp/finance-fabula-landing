import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const companyFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  cnpj: z.string().min(14, "CNPJ deve ter 14 dígitos"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  inscricao_municipal: z.string().optional(),
  inscricao_estadual: z.string().optional(),
  regime_tributario: z.string().optional(),
});

const Settings = () => {
  const navigate = useNavigate();
  const { session } = useSessionContext();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!session) {
      navigate("/");
    }
  }, [session, navigate]);

  // Fetch existing company data
  const { data: company, isLoading } = useQuery({
    queryKey: ["company"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .eq("owner_id", session?.user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const form = useForm<z.infer<typeof companyFormSchema>>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: company?.name || "",
      cnpj: company?.cnpj || "",
      email: company?.email || "",
      phone: company?.phone || "",
      inscricao_municipal: company?.inscricao_municipal || "",
      inscricao_estadual: company?.inscricao_estadual || "",
      regime_tributario: company?.regime_tributario || "",
    },
  });

  // Update form when company data is loaded
  useEffect(() => {
    if (company) {
      form.reset({
        name: company.name,
        cnpj: company.cnpj,
        email: company.email,
        phone: company.phone || "",
        inscricao_municipal: company.inscricao_municipal || "",
        inscricao_estadual: company.inscricao_estadual || "",
        regime_tributario: company.regime_tributario || "",
      });
    }
  }, [company, form]);

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof companyFormSchema>) => {
      const { data, error } = await supabase
        .from("companies")
        .upsert({
          ...values,
          owner_id: session?.user.id,
          ambiente: "homologacao",
          integranotas_id: "edeane3fvShDuQwbYrRditABSB2buvrU",
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Empresa atualizada com sucesso");
      queryClient.invalidateQueries({ queryKey: ["company"] });
    },
    onError: (error) => {
      toast.error("Erro ao atualizar empresa");
      console.error("Error updating company:", error);
    },
  });

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logout realizado com sucesso");
      navigate("/");
    } catch (error) {
      toast.error("Erro ao realizar logout");
    }
  };

  const onSubmit = (values: z.infer<typeof companyFormSchema>) => {
    mutation.mutate(values);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6 animate-fade-up">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Configurações</h1>
            <p className="text-sm text-muted-foreground">
              Gerencie suas configurações e preferências.
            </p>
          </div>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h2 className="text-lg font-medium mb-2">Conta</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Email: {session?.user.email}
              </p>
              <Button variant="destructive" onClick={handleSignOut}>
                Sair da conta
              </Button>
            </div>

            <div className="border rounded-lg p-4">
              <h2 className="text-lg font-medium mb-4">Dados da Empresa</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome da Empresa</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cnpj"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CNPJ</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="inscricao_municipal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Inscrição Municipal</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="inscricao_estadual"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Inscrição Estadual</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="regime_tributario"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Regime Tributário</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? "Salvando..." : "Salvar"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;