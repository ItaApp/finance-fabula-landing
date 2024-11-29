import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export function SupplierList() {
  const { data: suppliers, isLoading } = useQuery({
    queryKey: ["suppliers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("suppliers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="relative">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>CPF/CNPJ</TableHead>
            <TableHead>Cidade</TableHead>
            <TableHead>UF</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers?.map((supplier) => (
            <TableRow key={supplier.id}>
              <TableCell>{supplier.nome}</TableCell>
              <TableCell>{supplier.email}</TableCell>
              <TableCell>{supplier.telefone}</TableCell>
              <TableCell>{supplier.cpf_cnpj}</TableCell>
              <TableCell>{supplier.cidade}</TableCell>
              <TableCell>{supplier.uf}</TableCell>
            </TableRow>
          ))}
          {suppliers?.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                Nenhum fornecedor cadastrado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}