import { z } from "zod";

export const formSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  cnpj: z.string().min(1, "CNPJ é obrigatório"),
  email: z.string().email("Email inválido").optional().nullable(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  zip_code: z.string().optional().nullable(),
  inscricao_municipal: z.string().optional().nullable(),
  inscricao_estadual: z.string().optional().nullable(),
  regime_tributario: z.string().optional().nullable(),
});

export type FormValues = z.infer<typeof formSchema>;