import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { BasicInfoFields } from "./form/BasicInfoFields";
import { ValuesFields } from "./form/ValuesFields";

const fiscalNoteSchema = z.object({
  company_id: z.string().uuid(),
  client_id: z.string().uuid(),
  natureza_operacao: z.string().min(1, "Campo obrigatório"),
  tipo_documento: z.string().min(1, "Campo obrigatório"),
  finalidade_emissao: z.string().min(1, "Campo obrigatório"),
  local_destino: z.string().min(1, "Campo obrigatório"),
  valor_total: z.number().min(0),
  valor_servicos: z.number().min(0),
  base_calculo: z.number().min(0),
  aliquota: z.number().min(0),
  valor_iss: z.number().min(0),
  informacoes_adicionais: z.string().optional(),
});

type FiscalNoteFormValues = z.infer<typeof fiscalNoteSchema>;

interface FiscalNoteFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FiscalNoteForm({ open, onOpenChange }: FiscalNoteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<FiscalNoteFormValues>({
    resolver: zodResolver(fiscalNoteSchema),
    defaultValues: {
      valor_total: 0,
      valor_servicos: 0,
      base_calculo: 0,
      aliquota: 0,
      valor_iss: 0,
    },
  });

  const onSubmit = async (data: FiscalNoteFormValues) => {
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { error } = await supabase.from("fiscal_notes").insert({
        ...data,
        owner_id: user.id,
        status: 'draft'
      });

      if (error) throw error;

      toast({
        title: "Nota fiscal criada com sucesso!",
        description: "A nota fiscal foi salva e está pronta para emissão.",
      });

      queryClient.invalidateQueries({ queryKey: ["fiscal-notes"] });
      onOpenChange(false);
      form.reset();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao criar nota fiscal",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Nova Nota Fiscal</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <BasicInfoFields form={form} />
            <ValuesFields form={form} />

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}