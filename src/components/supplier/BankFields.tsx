import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UseFormReturn } from "react-hook-form"
import { SupplierFormValues } from "./types"

interface BankFieldsProps {
  form: UseFormReturn<SupplierFormValues>
}

export function BankFields({ form }: BankFieldsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Dados Bancários</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="banco"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Banco</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="agencia"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agência</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="conta"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conta</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tipoConta"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Conta</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de conta" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="corrente">Conta Corrente</SelectItem>
                  <SelectItem value="poupanca">Conta Poupança</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="titularConta"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titular da Conta</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="chavePix"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chave PIX</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}