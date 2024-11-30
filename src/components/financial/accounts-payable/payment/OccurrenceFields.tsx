import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UseFormReturn } from "react-hook-form"
import { AccountsPayableFormValues } from "../types"
import { Repeat, Calendar } from "lucide-react"

interface OccurrenceFieldsProps {
  form: UseFormReturn<AccountsPayableFormValues>
}

export function OccurrenceFields({ form }: OccurrenceFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="occurrence"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Repeat className="h-4 w-4" />
              Ocorrência
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="single">Única</SelectItem>
                <SelectItem value="installment">Parcelada</SelectItem>
                <SelectItem value="recurring">Recorrente</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="referencePeriod"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Período de Referência
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="Ex: Janeiro/2024" className="h-9" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}