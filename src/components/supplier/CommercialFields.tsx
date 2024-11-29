import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { UseFormReturn } from "react-hook-form"
import { SupplierFormValues } from "./types"

interface CommercialFieldsProps {
  form: UseFormReturn<SupplierFormValues>
}

export function CommercialFields({ form }: CommercialFieldsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Dados Comerciais</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="ramoAtividade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ramo de Atividade</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoria"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="produtosServicos"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Produtos/Serviços Ofertados</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="condicoesPagamento"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Condições de Pagamento</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="prazoEntrega"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prazo de Entrega</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="limiteCredito"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Limite de Crédito</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contratoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL do Contrato</FormLabel>
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