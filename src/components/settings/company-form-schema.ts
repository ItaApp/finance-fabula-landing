import { z } from "zod";

export const formSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  cnpj: z.string().min(1, "CNPJ é obrigatório"),
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  phone: z.string().min(1, "Telefone é obrigatório"),
  logradouro: z.string().min(1, "Logradouro é obrigatório"),
  numero: z.string().min(1, "Número é obrigatório"),
  complemento: z.string().min(1, "Complemento é obrigatório"),
  bairro: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
  zip_code: z.string().min(1, "CEP é obrigatório"),
  inscricao_municipal: z.string().min(1, "Inscrição Municipal é obrigatória"),
  inscricao_estadual: z.string().min(1, "Inscrição Estadual é obrigatória"),
  regime_tributario: z.string().min(1, "Regime Tributário é obrigatório"),
});

export type FormValues = z.infer<typeof formSchema>;