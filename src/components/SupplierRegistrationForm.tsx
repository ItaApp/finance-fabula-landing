import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { useUser } from "@supabase/auth-helpers-react"

import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { supabase } from "@/integrations/supabase/client"
import { GeneralFields } from "./supplier/GeneralFields"
import { ContactFields } from "./supplier/ContactFields"
import { AddressFields } from "./supplier/AddressFields"
import { CorrespondenceAddressFields } from "./supplier/CorrespondenceAddressFields"
import { BankFields } from "./supplier/BankFields"
import { CommercialFields } from "./supplier/CommercialFields"
import { supplierFormSchema, type SupplierFormValues } from "./supplier/types"
import { Building2, Contact, MapPin, Landmark, BarChart3 } from "lucide-react"

export function SupplierRegistrationForm() {
  const user = useUser()
  const navigate = useNavigate()

  const form = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierFormSchema),
    defaultValues: {
      tipoPessoa: "PF",
      pais: "Brasil",
      isentoIE: false,
    },
  })

  async function onSubmit(data: SupplierFormValues) {
    if (!user) {
      toast.error("Você precisa estar logado para cadastrar um fornecedor")
      return
    }

    try {
      const { error } = await supabase.from("suppliers").insert({
        tipo_pessoa: data.tipoPessoa,
        nome: data.nome,
        nome_fantasia: data.nomeFantasia,
        email: data.email,
        email_financeiro: data.emailFinanceiro,
        website: data.website,
        cpf_cnpj: data.cpfCnpj,
        inscricao_municipal: data.inscricaoMunicipal,
        inscricao_estadual: data.inscricaoEstadual,
        isento_ie: data.isentoIE,
        telefone: data.telefone,
        telefone_fixo: data.telefoneFixo,
        whatsapp: data.whatsapp,
        responsavel_nome: data.responsavelNome,
        responsavel_funcao: data.responsavelFuncao,
        
        // Endereço principal
        pais: data.pais,
        uf: data.uf,
        cidade: data.cidade,
        cidade_ibge_id: data.cidade_ibge_id,
        logradouro: data.logradouro,
        numero: data.numero,
        complemento: data.complemento,
        bairro: data.bairro,
        cep: data.cep,

        // Endereço de correspondência
        endereco_correspondencia_logradouro: data.enderecoCorrespondenciaLogradouro,
        endereco_correspondencia_numero: data.enderecoCorrespondenciaNumero,
        endereco_correspondencia_complemento: data.enderecoCorrespondenciaComplemento,
        endereco_correspondencia_bairro: data.enderecoCorrespondenciaBairro,
        endereco_correspondencia_cidade: data.enderecoCorrespondenciaCidade,
        endereco_correspondencia_uf: data.enderecoCorrespondenciaUf,
        endereco_correspondencia_cep: data.enderecoCorrespondenciaCep,
        endereco_correspondencia_pais: data.enderecoCorrespondenciaPais,

        // Dados bancários
        banco: data.banco,
        agencia: data.agencia,
        conta: data.conta,
        tipo_conta: data.tipoConta,
        titular_conta: data.titularConta,
        chave_pix: data.chavePix,

        // Dados comerciais
        ramo_atividade: data.ramoAtividade,
        categoria: data.categoria,
        produtos_servicos: data.produtosServicos,
        condicoes_pagamento: data.condicoesPagamento,
        prazo_entrega: data.prazoEntrega,
        limite_credito: data.limiteCredito,
        contrato_url: data.contratoUrl,

        owner_id: user.id,
      })

      if (error) throw error

      toast.success("Fornecedor cadastrado com sucesso!")
      navigate("/dashboard")
    } catch (error) {
      toast.error("Erro ao cadastrar fornecedor")
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-4">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden md:inline">Informações Gerais</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Contact className="h-4 w-4" />
              <span className="hidden md:inline">Contato</span>
            </TabsTrigger>
            <TabsTrigger value="address" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden md:inline">Endereços</span>
            </TabsTrigger>
            <TabsTrigger value="bank" className="flex items-center gap-2">
              <Landmark className="h-4 w-4" />
              <span className="hidden md:inline">Dados Bancários</span>
            </TabsTrigger>
            <TabsTrigger value="commercial" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden md:inline">Dados Comerciais</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="general" className="space-y-4">
              <GeneralFields form={form} />
            </TabsContent>

            <TabsContent value="contact" className="space-y-4">
              <ContactFields form={form} />
            </TabsContent>

            <TabsContent value="address" className="space-y-4">
              <AddressFields form={form} />
              <CorrespondenceAddressFields form={form} />
            </TabsContent>

            <TabsContent value="bank" className="space-y-4">
              <BankFields form={form} />
            </TabsContent>

            <TabsContent value="commercial" className="space-y-4">
              <CommercialFields form={form} />
            </TabsContent>
          </div>
        </Tabs>

        <Button type="submit" className="w-full">
          Cadastrar Fornecedor
        </Button>
      </form>
    </Form>
  )
}