import { useQuery } from "@tanstack/react-query"
import { useUser } from "@supabase/auth-helpers-react"
import { format } from "date-fns"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { supabase } from "@/integrations/supabase/client"

export function AccountsPayableList() {
  const user = useUser()

  const { data: accounts, isLoading } = useQuery({
    queryKey: ["accounts-payable"],
    queryFn: async () => {
      const { data } = await supabase
        .from("accounts_payable")
        .select(`
          *,
          suppliers (
            nome
          )
        `)
        .order("due_date")
      return data || []
    },
    enabled: !!user,
  })

  if (isLoading) {
    return <div>Carregando...</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Descrição</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Vencimento</TableHead>
            <TableHead>Fornecedor</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts?.map((account) => (
            <TableRow key={account.id}>
              <TableCell>{account.description}</TableCell>
              <TableCell>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(account.amount)}
              </TableCell>
              <TableCell>
                {format(new Date(account.due_date), "dd/MM/yyyy")}
              </TableCell>
              <TableCell>{account.suppliers?.nome || "-"}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    account.status === "paid"
                      ? "bg-green-50 text-green-700"
                      : account.status === "pending"
                      ? "bg-yellow-50 text-yellow-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {account.status === "paid"
                    ? "Pago"
                    : account.status === "pending"
                    ? "Pendente"
                    : "Cancelado"}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}