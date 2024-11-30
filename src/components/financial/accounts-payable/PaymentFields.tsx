import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UseFormReturn } from "react-hook-form"
import { AccountsPayableFormValues } from "./types"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface PaymentFieldsProps {
  form: UseFormReturn<AccountsPayableFormValues>
}

export function PaymentFields({ form }: PaymentFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Datas</h3>
        <FormField
          control={form.control}
          name="issueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data de Emissão</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: ptBR })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="originalDueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data de Vencimento Original</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: ptBR })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="adjustedDueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data de Vencimento Ajustada</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: ptBR })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Valores</h3>
        <FormField
          control={form.control}
          name="originalAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor Original</FormLabel>
              <FormControl>
                <Input {...field} type="number" step="0.01" placeholder="0,00" />
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
              <FormLabel>Juros/Multas</FormLabel>
              <FormControl>
                <Input {...field} type="number" step="0.01" placeholder="0,00" />
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
              <FormLabel>Descontos</FormLabel>
              <FormControl>
                <Input {...field} type="number" step="0.01" placeholder="0,00" />
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
              <FormLabel>Valor Total</FormLabel>
              <FormControl>
                <Input {...field} type="number" step="0.01" placeholder="0,00" />
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
              <FormLabel>Saldo Restante</FormLabel>
              <FormControl>
                <Input {...field} type="number" step="0.01" placeholder="0,00" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Forma de Pagamento</h3>
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Forma de Pagamento</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a forma de pagamento" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="boleto">Boleto</SelectItem>
                  <SelectItem value="pix">PIX</SelectItem>
                  <SelectItem value="transferencia">Transferência Bancária</SelectItem>
                  <SelectItem value="cartao">Cartão</SelectItem>
                  <SelectItem value="dinheiro">Dinheiro</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bankAccount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conta Bancária de Origem</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ex: Banco XYZ - Ag 1234 CC 56789-0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="barcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código de Barras/Linha Digitável</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Digite o código de barras" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="occurrence"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ocorrência</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
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
            <FormLabel>Período de Referência</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Ex: Janeiro/2024" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}