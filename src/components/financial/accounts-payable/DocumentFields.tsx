import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { UseFormReturn } from "react-hook-form"
import { AccountsPayableFormValues } from "./types"

interface DocumentFieldsProps {
  form: UseFormReturn<AccountsPayableFormValues>
}

export function DocumentFields({ form }: DocumentFieldsProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="documentNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Número do Documento</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Ex: NF-e 123456" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="documentType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipo de Documento</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="nfe">NF-e</SelectItem>
                <SelectItem value="boleto">Boleto</SelectItem>
                <SelectItem value="contrato">Contrato</SelectItem>
                <SelectItem value="recibo">Recibo</SelectItem>
                <SelectItem value="outros">Outros</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descrição/Observação</FormLabel>
            <FormControl>
              <Textarea {...field} placeholder="Detalhes do pagamento" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}