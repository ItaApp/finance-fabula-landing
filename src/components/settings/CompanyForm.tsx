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

      const { data, error } = await supabase
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
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company"] });
      toast({
        title: "Sucesso",
        description: "Dados da empresa atualizados com sucesso",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Erro ao atualizar dados da empresa",
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