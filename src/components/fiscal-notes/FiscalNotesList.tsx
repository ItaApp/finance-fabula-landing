import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface FiscalNote {
  id: string;
  numero_nota: string;
  data_emissao: string;
  status: string;
  valor_total: number;
  client: {
    nome: string;
  };
  company: {
    nome: string;
  };
}

interface FiscalNotesListProps {
  notes: FiscalNote[];
}

export function FiscalNotesList({ notes }: FiscalNotesListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "secondary";
      case "processing":
        return "default";
      case "approved":
        return "outline";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const formatStatus = (status: string) => {
    switch (status) {
      case "draft":
        return "Rascunho";
      case "processing":
        return "Processando";
      case "approved":
        return "Aprovada";
      case "rejected":
        return "Rejeitada";
      default:
        return status;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Número</TableHead>
          <TableHead>Empresa Emissora</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Data de Emissão</TableHead>
          <TableHead>Valor Total</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {notes.map((note) => (
          <TableRow key={note.id}>
            <TableCell>{note.numero_nota || "N/A"}</TableCell>
            <TableCell>{note.company.nome}</TableCell>
            <TableCell>{note.client.nome}</TableCell>
            <TableCell>
              {note.data_emissao
                ? format(new Date(note.data_emissao), "PPP", { locale: ptBR })
                : "N/A"}
            </TableCell>
            <TableCell>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(note.valor_total || 0)}
            </TableCell>
            <TableCell>
              <Badge variant={getStatusColor(note.status)}>
                {formatStatus(note.status)}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}