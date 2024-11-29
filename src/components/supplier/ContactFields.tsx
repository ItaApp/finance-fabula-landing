import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UseFormReturn } from "react-hook-form"
import { SupplierFormValues } from "./types"

interface ContactFieldsProps {
  form: UseFormReturn<SupplierFormValues>
}

export function ContactFields({ form }: ContactFieldsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Contato</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <FormField
          control={form.control}
          name="telefoneFixo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Telefone Fixo</FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-xs" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Celular/WhatsApp</FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-xs" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Email Principal</FormLabel>
              <FormControl>
                <Input type="email" {...field} className="h-8 text-xs" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emailFinanceiro"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Email Financeiro</FormLabel>
              <FormControl>
                <Input type="email" {...field} className="h-8 text-xs" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Website</FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-xs" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="responsavelNome"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Nome do Responsável</FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-xs" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="responsavelFuncao"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Função do Responsável</FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-xs" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}