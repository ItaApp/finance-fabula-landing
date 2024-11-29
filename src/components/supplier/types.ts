import { z } from "zod"

export const supplierFormSchema = z.object({
  tipoPessoa: z.enum(["PF", "PJ"], {
    required_error: "Selecione o tipo de pessoa",
  }),
  nome: z.string().min(1, "Razão Social é obrigatória"),
  nomeFantasia: z.string().optional(),
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  emailFinanceiro: z.string().email("Email inválido").optional(),
  website: z.string().optional(),
  cpfCnpj: z.string().min(1, "CPF/CNPJ é obrigatório"),
  inscricaoMunicipal: z.string().optional(),
  inscricaoEstadual: z.string().optional(),
  isentoIE: z.boolean().default(false),
  telefone: z.string().min(1, "Telefone é obrigatório"),
  telefoneFixo: z.string().optional(),
  whatsapp: z.string().optional(),
  responsavelNome: z.string().optional(),
  responsavelFuncao: z.string().optional(),
  
  // Endereço principal
  pais: z.string().min(1, "País é obrigatório"),
  uf: z.string().min(1, "UF é obrigatório"),
  cidade: z.string().min(1, "Cidade é obrigatório"),
  cidade_ibge_id: z.number(),
  logradouro: z.string().min(1, "Logradouro é obrigatório"),
  numero: z.string().min(1, "Número é obrigatório"),
  complemento: z.string().optional(),
  bairro: z.string().min(1, "Bairro é obrigatório"),
  cep: z.string().min(8, "CEP inválido").max(8, "CEP inválido"),

  // Endereço de correspondência
  enderecoCorrespondenciaLogradouro: z.string().optional(),
  enderecoCorrespondenciaNumero: z.string().optional(),
  enderecoCorrespondenciaComplemento: z.string().optional(),
  enderecoCorrespondenciaBairro: z.string().optional(),
  enderecoCorrespondenciaCidade: z.string().optional(),
  enderecoCorrespondenciaUf: z.string().optional(),
  enderecoCorrespondenciaCep: z.string().optional(),
  enderecoCorrespondenciaPais: z.string().optional(),

  // Dados bancários
  banco: z.string().optional(),
  agencia: z.string().optional(),
  conta: z.string().optional(),
  tipoConta: z.string().optional(),
  titularConta: z.string().optional(),
  chavePix: z.string().optional(),

  // Dados comerciais
  ramoAtividade: z.string().optional(),
  categoria: z.string().optional(),
  produtosServicos: z.string().optional(),
  condicoesPagamento: z.string().optional(),
  prazoEntrega: z.string().optional(),
  limiteCredito: z.number().optional(),
  contratoUrl: z.string().optional(),
})

export type SupplierFormValues = z.infer<typeof supplierFormSchema>