import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { UseFormReturn } from "react-hook-form"
import { SupplierFormValues } from "./types"

interface GeneralFieldsProps {
  form: UseFormReturn<SupplierFormValues>
}

export function GeneralFields({ form }: GeneralFieldsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Informações Gerais</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="tipoPessoa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Pessoa</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de pessoa" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PF">Pessoa Física</SelectItem>
                  <SelectItem value="PJ">Pessoa Jurídica</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Razão Social</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nomeFantasia"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Fantasia</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cpfCnpj"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPF/CNPJ</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isentoIE"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Isento de Inscrição Estadual
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="inscricaoEstadual"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Inscrição Estadual</FormLabel>
              <FormControl>
                <Input {...field} disabled={form.watch("isentoIE")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="inscricaoMunicipal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Inscrição Municipal</FormLabel>
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