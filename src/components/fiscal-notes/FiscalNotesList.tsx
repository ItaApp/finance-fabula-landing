import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

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
  const { toast } = useToast();
  const queryClient = useQueryClient();

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

  const handleEmitNote = async (noteId: string) => {
    try {
      // Atualiza o status da nota para processing
      const { error: updateError } = await supabase
        .from("fiscal_notes")
        .update({ status: "processing" })
        .eq("id", noteId);

      if (updateError) throw updateError;

      // Chama a API de emissão
      const response = await fetch("/api/focus-nfe/emit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ noteId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      // Atualiza a lista de notas
      queryClient.invalidateQueries({ queryKey: ["fiscal-notes"] });

      toast({
        title: "Nota fiscal enviada para processamento",
        description: "Você será notificado quando o processo for concluído.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao emitir nota fiscal",
        description: error.message,
      });
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
          <TableHead>Ações</TableHead>
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
            <TableCell>
              {note.status === "draft" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEmitNote(note.id)}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Emitir
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}