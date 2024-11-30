import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus } from "lucide-react";
import { FiscalNoteForm } from "@/components/fiscal-notes/FiscalNoteForm";
import { FiscalNotesList } from "@/components/fiscal-notes/FiscalNotesList";

export default function FiscalNotes() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  const { data: fiscalNotes, isLoading } = useQuery({
    queryKey: ["fiscal-notes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("fiscal_notes")
        .select("*, client:clients(*), company:companies(*)")
        .order("created_at", { ascending: false });

      if (error) {
        toast({
          variant: "destructive",
          title: "Erro ao carregar notas fiscais",
          description: error.message,
        });
        throw error;
      }

      return data;
    },
  });

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Notas Fiscais</h1>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2" />
          Nova Nota Fiscal
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notas Fiscais Emitidas</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>Carregando...</div>
          ) : (
            <FiscalNotesList notes={fiscalNotes || []} />
          )}
        </CardContent>
      </Card>

      <FiscalNoteForm open={isFormOpen} onOpenChange={setIsFormOpen} />
    </div>
  );
}