import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formSchema, type FormValues } from "./company-form-schema";
import { CompanyFormFields } from "./CompanyFormFields";

interface CompanyFormProps {
  initialData?: FormValues | null;
}

export const CompanyForm = ({ initialData }: CompanyFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      nome: "",
      cnpj: "",
      email: "",
      phone: "",
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      city: "",
      state: "",
      zip_code: "",
      inscricao_municipal: "",
      inscricao_estadual: "",
      regime_tributario: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Não autorizado");

      // Integra com FocusNFE primeiro para obter o ID
      const focusResponse = await fetch('/api/focus-nfe/company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ 
          nome: values.nome,
          cnpj: values.cnpj,
          inscricao_municipal: values.inscricao_municipal,
          inscricao_estadual: values.inscricao_estadual,
          regime_tributario: values.regime_tributario,
          endereco: {
            logradouro: values.logradouro,
            numero: values.numero,
            complemento: values.complemento,
            bairro: values.bairro,
            cidade: values.city,
            estado: values.state,
            cep: values.zip_code,
          }
        }),
      });

      if (!focusResponse.ok) {
        const error = await focusResponse.json();
        throw new Error(`Erro ao integrar com FocusNFE: ${error.message}`);
      }

      const focusData = await focusResponse.json();

      // Salva no Supabase com o ID retornado do Focus
      const { data: companyData, error } = await supabase
        .from("companies")
        .upsert({
          nome: values.nome,
          cnpj: values.cnpj,
          email: values.email,
          phone: values.phone,
          logradouro: values.logradouro,
          numero: values.numero,
          complemento: values.complemento,
          bairro: values.bairro,
          city: values.city,
          state: values.state,
          zip_code: values.zip_code,
          inscricao_municipal: values.inscricao_municipal,
          inscricao_estadual: values.inscricao_estadual,
          regime_tributario: values.regime_tributario,
          owner_id: session.user.id,
          integranotas_id: focusData.id, // Salva o ID retornado do Focus
        })
        .select()
        .single();

      if (error) throw error;

      return companyData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company"] });
      toast({
        title: "Sucesso",
        description: "Dados da empresa atualizados com sucesso e integrados com FocusNFE",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: error.message || "Erro ao atualizar dados da empresa",
        variant: "destructive",
      });
      console.error(error);
    },
  });

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CompanyFormFields form={form} />
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Salvando..." : "Salvar"}
        </Button>
      </form>
    </Form>
  );
};