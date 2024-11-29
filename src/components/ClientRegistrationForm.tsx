import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { useUser } from "@supabase/auth-helpers-react"

import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { supabase } from "@/integrations/supabase/client"
import { PersonalFields } from "./client/PersonalFields"
import { AddressFields } from "./client/AddressFields"
import { clientFormSchema, type ClientFormValues } from "./client/types"

export function ClientRegistrationForm() {
  const user = useUser()
  const navigate = useNavigate()

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      tipoPessoa: "PF",
      pais: "Brasil",
    },
  })

  const { data: addressData, isLoading: isLoadingAddress } = useQuery({
    queryKey: ["cep", form.watch("cep")],
    queryFn: async () => {
      const cep = form.watch("cep")
      if (cep?.length === 8) {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        return response.json()
      }
      return null
    },
    enabled: form.watch("cep")?.length === 8,
  })

  useEffect(() => {
    if (addressData && !addressData.erro) {
      form.setValue("logradouro", addressData.logradouro)
      form.setValue("bairro", addressData.bairro)
      form.setValue("cidade", addressData.localidade)
      form.setValue("uf", addressData.uf)
    }
  }, [addressData, form])

  async function onSubmit(data: ClientFormValues) {
    if (!user) {
      toast.error("Você precisa estar logado para cadastrar um cliente")
      return
    }

    try {
      const { error } = await supabase.from("clients").insert({
        tipo_pessoa: data.tipoPessoa,
        nome: data.nome,
        email: data.email,
        cpf_cnpj: data.cpfCnpj,
        inscricao_municipal: data.inscricaoMunicipal,
        inscricao_estadual: data.inscricaoEstadual,
        telefone: data.telefone,
        pais: data.pais,
        uf: data.uf,
        cidade: data.cidade,
        cidade_ibge_id: data.cidade_ibge_id,
        logradouro: data.logradouro,
        numero: data.numero,
        complemento: data.complemento,
        bairro: data.bairro,
        cep: data.cep,
        owner_id: user.id,
      })

      if (error) throw error

      toast.success("Cliente cadastrado com sucesso!")
      navigate("/dashboard")
    } catch (error) {
      toast.error("Erro ao cadastrar cliente")
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PersonalFields form={form} />
          <AddressFields form={form} />
        </div>

        <Button type="submit" className="w-full">
          Cadastrar Cliente
        </Button>
      </form>
    </Form>
  )
}