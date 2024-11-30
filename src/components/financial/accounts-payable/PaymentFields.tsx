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
      <DateFields form={form} />
      <AmountFields form={form} />
      <PaymentMethodFields form={form} />
      <OccurrenceFields form={form} />
    </div>
  )
}