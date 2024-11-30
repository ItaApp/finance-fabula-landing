import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UseFormReturn } from "react-hook-form"
import { AccountsPayableFormValues } from "./types"

interface ClassificationFieldsProps {
  form: UseFormReturn<AccountsPayableFormValues>
}

export function ClassificationFields({ form }: ClassificationFieldsProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Categoria</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="fixed">Despesas Fixas</SelectItem>
                <SelectItem value="variable">Despesas Variáveis</SelectItem>
                <SelectItem value="investment">Investimentos</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="subcategory"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Subcategoria</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Ex: energia elétrica, folha de pagamento" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="costCenter"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Centro de Custo</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Ex: Departamento de Marketing" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="associatedProject"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Projeto Associado</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Nome do projeto (se aplicável)" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="accountingPlan"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Plano de Contas</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Classificação contábil" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="bankReconciliationStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Status de Conciliação Bancária</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="reconciled">Conciliado</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="priority"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Prioridade</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="medium">Média</SelectItem>
                <SelectItem value="low">Baixa</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}