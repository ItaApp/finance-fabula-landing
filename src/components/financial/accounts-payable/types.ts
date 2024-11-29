import { z } from "zod"

export const accountsPayableSchema = z.object({
  description: z.string().min(1, "Descrição é obrigatória"),
  amount: z.string().min(1, "Valor é obrigatório"),
  dueDate: z.string().min(1, "Data de vencimento é obrigatória"),
  supplierId: z.string().optional(),
  documentNumber: z.string().optional(),
  documentType: z.string().optional(),
  issueDate: z.string().optional(),
  originalDueDate: z.string().optional(),
  adjustedDueDate: z.string().optional(),
  occurrence: z.string().optional(),
  referencePeriod: z.string().optional(),
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