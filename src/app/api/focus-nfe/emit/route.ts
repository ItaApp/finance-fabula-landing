import { supabase } from "@/integrations/supabase/client";

const handleFocusNFEResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Erro ao emitir nota fiscal");
  }
  return data;
};

const getFiscalNote = async (noteId: string) => {
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

const buildFocusNFEPayload = (note: any) => ({
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

export async function POST(request: Request) {
  try {
    const { noteId } = await request.json();
    const note = await getFiscalNote(noteId);
    const payload = buildFocusNFEPayload(note);

    const focusResponse = await fetch(
      `https://homologacao.focusnfe.com.br/v2/nfse?ref=${note.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NFE_API_KEY}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const focusData = await handleFocusNFEResponse(focusResponse);

    const { error: updateError } = await supabase
      .from("fiscal_notes")
      .update({
        focus_nfe_id: focusData.id,
        focus_nfe_status: "processing",
      })
      .eq("id", noteId);

    if (updateError) throw updateError;

    return Response.json(
      { message: "Nota fiscal enviada com sucesso" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erro ao emitir nota fiscal:", error);
    return Response.json(
      { message: error.message || "Erro interno do servidor" },
      { status: 500 }
    );
  }
}