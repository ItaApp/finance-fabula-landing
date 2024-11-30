import { z } from "zod"

export const accountsPayableSchema = z.object({
  description: z.string().min(1, "Descrição é obrigatória"),
  documentNumber: z.string().optional(),
  documentType: z.string().optional(),
  supplierId: z.string().optional(),
  issueDate: z.date().optional(),
  originalDueDate: z.date().optional(),
  adjustedDueDate: z.date().optional(),
  dueDate: z.date({
    required_error: "Data de vencimento é obrigatória",
  }),
  occurrence: z.enum(["single", "installment", "recurring"]).optional(),
  referencePeriod: z.string().optional(),
  amount: z.string().min(1, "Valor é obrigatório"),
  originalAmount: z.string().optional(),
  interestAmount: z.string().optional(),
  discountAmount: z.string().optional(),
  remainingBalance: z.string().optional(),
  paymentMethod: z.string().optional(),
  bankAccount: z.string().optional(),
  barcode: z.string().optional(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  costCenter: z.string().optional(),
  associatedProject: z.string().optional(),
  accountingPlan: z.string().optional(),
  bankReconciliationStatus: z.string().optional(),
  priority: z.string().optional(),
  notes: z.string().optional(),
  internalNotes: z.string().optional(),
})

export type AccountsPayableFormValues = z.infer<typeof accountsPayableSchema>