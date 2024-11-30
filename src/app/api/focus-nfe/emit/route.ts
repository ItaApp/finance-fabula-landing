import { NextRequest, NextResponse } from "next/server";
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

const handleFocusNFEResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Erro ao emitir nota fiscal");
  }
  return data;
};

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

const focusNfeApiKey = 'edeane3fvShDuQwbYrRditABSB2buvrU';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { noteId } = body;

    if (!noteId) {
      return NextResponse.json(
        { message: "ID da nota fiscal não fornecido" },
        { status: 400 }
      );
    }

    const note = await getFiscalNote(noteId);
    const payload = buildFocusNFEPayload(note);

    const focusResponse = await fetch(
      `https://homologacao.focusnfe.com.br/v2/nfse?ref=${noteId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${Buffer.from(focusNfeApiKey + ':').toString('base64')}`,
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

    return NextResponse.json(
      { message: "Nota fiscal enviada com sucesso" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erro ao emitir nota fiscal:", error);
    return NextResponse.json(
      { message: error.message || "Erro interno do servidor" },
      { status: 500 }
    );
  }
}