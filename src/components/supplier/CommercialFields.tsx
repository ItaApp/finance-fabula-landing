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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <FormField
          control={form.control}
          name="ramoAtividade"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Ramo de Atividade</FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-xs" />
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
              <FormLabel className="text-xs">Categoria</FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-xs" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="produtosServicos"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel className="text-xs">Produtos/Serviços Ofertados</FormLabel>
              <FormControl>
                <Textarea {...field} className="text-xs resize-none h-20" />
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
              <FormLabel className="text-xs">Condições de Pagamento</FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-xs" />
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
              <FormLabel className="text-xs">Prazo de Entrega</FormLabel>
              <FormControl>
                <Input {...field} className="h-8 text-xs" />
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
              <FormLabel className="text-xs">Limite de Crédito</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  {...field} 
                  className="h-8 text-xs"
                  onChange={(e) => field.onChange(parseFloat(e.target.value))} 
                />
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
              <FormLabel className="text-xs">URL do Contrato</FormLabel>
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