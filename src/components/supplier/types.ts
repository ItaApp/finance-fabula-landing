import { z } from "zod"

export const supplierFormSchema = z.object({
  tipoPessoa: z.enum(["PF", "PJ"], {
    required_error: "Selecione o tipo de pessoa",
  }),
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  cpfCnpj: z.string().min(1, "CPF/CNPJ é obrigatório"),
  inscricaoMunicipal: z.string().optional(),
  inscricaoEstadual: z.string().optional(),
  telefone: z.string().min(1, "Telefone é obrigatório"),
  pais: z.string().min(1, "País é obrigatório"),
  uf: z.string().min(1, "UF é obrigatório"),
  cidade: z.string().min(1, "Cidade é obrigatório"),
  cidade_ibge_id: z.number(),
  logradouro: z.string().min(1, "Logradouro é obrigatório"),
  numero: z.string().min(1, "Número é obrigatório"),
  complemento: z.string().optional(),
  bairro: z.string().min(1, "Bairro é obrigatório"),
  cep: z.string().min(8, "CEP inválido").max(8, "CEP inválido"),
})

export type SupplierFormValues = z.infer<typeof supplierFormSchema>