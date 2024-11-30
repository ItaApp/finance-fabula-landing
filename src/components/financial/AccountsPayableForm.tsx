import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { useUser } from "@supabase/auth-helpers-react"
import { FileText, User, DollarSign, Database, CheckSquare, UploadCloud } from "lucide-react"

import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { supabase } from "@/integrations/supabase/client"
import { DocumentFields } from "./accounts-payable/DocumentFields"
import { PaymentFields } from "./accounts-payable/PaymentFields"
import { ClassificationFields } from "./accounts-payable/ClassificationFields"
import { accountsPayableSchema, type AccountsPayableFormValues } from "./accounts-payable/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"

export function AccountsPayableForm() {
  const user = useUser()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<AccountsPayableFormValues>({
    resolver: zodResolver(accountsPayableSchema),
  })

  const { data: suppliers } = useQuery({
    queryKey: ["suppliers"],
    queryFn: async () => {
      const { data } = await supabase
        .from("suppliers")
        .select("id, nome")
        .order("nome")
      return data || []
    },
  })

  async function onSubmit(data: AccountsPayableFormValues) {
    if (!user) {
      toast.error("Você precisa estar logado para cadastrar uma conta")
      return
    }

    try {
      setIsLoading(true)
      const { error } = await supabase.from("accounts_payable").insert({
        description: data.description,
        amount: parseFloat(data.amount),
        due_date: data.dueDate.toISOString().split('T')[0],
        supplier_id: data.supplierId,
        document_number: data.documentNumber,
        document_type: data.documentType,
        issue_date: data.issueDate ? data.issueDate.toISOString().split('T')[0] : null,
        original_due_date: data.originalDueDate ? data.originalDueDate.toISOString().split('T')[0] : null,
        adjusted_due_date: data.adjustedDueDate ? data.adjustedDueDate.toISOString().split('T')[0] : null,
        occurrence: data.occurrence,
        reference_period: data.referencePeriod,
        original_amount: data.originalAmount ? parseFloat(data.originalAmount) : null,
        interest_amount: data.interestAmount ? parseFloat(data.interestAmount) : null,
        discount_amount: data.discountAmount ? parseFloat(data.discountAmount) : null,
        remaining_balance: data.remainingBalance ? parseFloat(data.remainingBalance) : null,
        payment_method: data.paymentMethod,
        bank_account: data.bankAccount,
        barcode: data.barcode,
        category: data.category,
        subcategory: data.subcategory,
        cost_center: data.costCenter,
        associated_project: data.associatedProject,
        accounting_plan: data.accountingPlan,
        bank_reconciliation_status: data.bankReconciliationStatus,
        priority: data.priority,
        notes: data.notes,
        internal_notes: data.internalNotes,
        owner_id: user.id,
      })

      if (error) throw error

      toast.success("Conta a pagar cadastrada com sucesso!")
      form.reset()
    } catch (error) {
      toast.error("Erro ao cadastrar conta a pagar")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            <div className="rounded-lg border p-4 bg-white shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Identificação do Documento</h3>
              </div>
              <DocumentFields form={form} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border p-4 bg-white shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Dados do Fornecedor</h3>
              </div>
              <FormField
                control={form.control}
                name="supplierId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fornecedor</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Selecione um fornecedor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {suppliers?.map((supplier) => (
                          <SelectItem key={supplier.id} value={supplier.id}>
                            {supplier.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="rounded-lg border p-4 bg-white shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Database className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Classificação Financeira</h3>
              </div>
              <ClassificationFields form={form} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border p-4 bg-white shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Informações de Pagamento</h3>
              </div>
              <PaymentFields form={form} />
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Cadastrando..." : "Cadastrar Conta"}
        </Button>
      </form>
    </Form>
  )
}