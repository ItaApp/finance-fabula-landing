import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UseFormReturn } from "react-hook-form"
import { AccountsPayableFormValues } from "../types"
import { DollarSign } from "lucide-react"

interface AmountFieldsProps {
  form: UseFormReturn<AccountsPayableFormValues>
}

export function AmountFields({ form }: AmountFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <FormField
        control={form.control}
        name="originalAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Valor Original
            </FormLabel>
            <FormControl>
              <Input {...field} type="number" step="0.01" placeholder="0,00" className="h-9" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="interestAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Juros/Multas
            </FormLabel>
            <FormControl>
              <Input {...field} type="number" step="0.01" placeholder="0,00" className="h-9" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="discountAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Descontos
            </FormLabel>
            <FormControl>
              <Input {...field} type="number" step="0.01" placeholder="0,00" className="h-9" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="amount"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Valor Total
            </FormLabel>
            <FormControl>
              <Input {...field} type="number" step="0.01" placeholder="0,00" className="h-9" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="remainingBalance"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Saldo Restante
            </FormLabel>
            <FormControl>
              <Input {...field} type="number" step="0.01" placeholder="0,00" className="h-9" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}