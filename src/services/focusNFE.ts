import { supabase } from "@/integrations/supabase/client";

interface FiscalNote {
  id: string;
  natureza_operacao: string;
  valor_total: number;
  client: {
    cpf_cnpj: string;
    nome: string;
    logradouro: string;
    complemento: string | null;
    bairro: string;
    cep: string;
    cidade: string;
    uf: string;
    telefone: string;
    email: string;
  };
  company: {
    ambiente?: string;
  };
}

interface FocusNFEPayload {
  natureza_operacao: string;
  valor_total: number;
  items: Array<{
    nome: string;
    codigo: string;
    ncm: string;
    quantidade: number;
    unidade: string;
    valor_unitario: number;
    valor_total: number;
  }>;
  cliente: {
    cpf_cnpj: string;
    nome_completo: string;
    endereco: string;
    complemento: string | null;
    bairro: string;
    cep: string;
    cidade: string;
    uf: string;
    telefone: string;
    email: string;
  };
}

const getFiscalNote = async (noteId: string): Promise<FiscalNote> => {
  const { data: note, error } = await supabase
    .from("fiscal_notes")
    .select(`
      *,
      company:companies(*),
      client:clients(*)
    `)
    .eq("id", noteId)
    .single();

  if (error) throw error;
  if (!note) throw new Error("Nota fiscal não encontrada");
  if (!note.company.ambiente) {
    throw new Error("Empresa não configurada para emissão de notas fiscais");
  }

  return note;
};

const buildFocusNFEPayload = (note: FiscalNote): FocusNFEPayload => ({
  natureza_operacao: note.natureza_operacao,
  valor_total: note.valor_total,
  items: [
    {
      nome: "Serviço de exemplo",
      codigo: "001",
      ncm: "00000000",
      quantidade: 1,
      unidade: "UN",
      valor_unitario: note.valor_total,
      valor_total: note.valor_total,
    },
  ],
  cliente: {
    cpf_cnpj: note.client.cpf_cnpj,
    nome_completo: note.client.nome,
    endereco: note.client.logradouro,
    complemento: note.client.complemento,
    bairro: note.client.bairro,
    cep: note.client.cep,
    cidade: note.client.cidade,
    uf: note.client.uf,
    telefone: note.client.telefone,
    email: note.client.email,
  },
});

export const emitFiscalNote = async (noteId: string) => {
  try {
    const note = await getFiscalNote(noteId);
    const payload = buildFocusNFEPayload(note);

    const { data, error } = await supabase.functions.invoke('emit-fiscal-note', {
      body: { noteId, payload }
    });

    if (error) throw error;

    const { error: updateError } = await supabase
      .from("fiscal_notes")
      .update({
        focus_nfe_id: data.id,
        focus_nfe_status: "processing",
      })
      .eq("id", noteId);

    if (updateError) throw updateError;

    return { message: "Nota fiscal enviada com sucesso" };
  } catch (error: any) {
    console.error("Erro ao emitir nota fiscal:", error);
    throw new Error(error.message || "Erro interno do servidor");
  }
};