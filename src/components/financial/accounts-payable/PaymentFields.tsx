import { UseFormReturn } from "react-hook-form"
import { AccountsPayableFormValues } from "./types"
import { DateFields } from "./payment/DateFields"
import { AmountFields } from "./payment/AmountFields"
import { PaymentMethodFields } from "./payment/PaymentMethodFields"
import { OccurrenceFields } from "./payment/OccurrenceFields"

interface PaymentFieldsProps {
  form: UseFormReturn<AccountsPayableFormValues>
}

export function PaymentFields({ form }: PaymentFieldsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-4">Datas</h3>
        <DateFields form={form} />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-4">Valores</h3>
        <AmountFields form={form} />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-4">Forma de Pagamento</h3>
        <PaymentMethodFields form={form} />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-4">Ocorrência</h3>
        <OccurrenceFields form={form} />
      </div>
    </div>
  )
}