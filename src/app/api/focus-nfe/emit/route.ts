import { supabase } from "@/integrations/supabase/client";

export async function POST(request: Request) {
  try {
    const { noteId } = await request.json();

    // Busca os dados da nota fiscal
    const { data: note, error: noteError } = await supabase
      .from("fiscal_notes")
      .select(`
        *,
        company:companies(*),
        client:clients(*)
      `)
      .eq("id", noteId)
      .single();

    if (noteError) throw noteError;
    if (!note) throw new Error("Nota fiscal não encontrada");

    // Verifica se a empresa está configurada para emissão
    if (!note.company.ambiente) {
      throw new Error("Empresa não configurada para emissão de notas fiscais");
    }

    // Monta o payload para a API do Focus NFE
    const payload = {
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
    };

    // Envia para a API do Focus NFE
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

    if (!focusResponse.ok) {
      const error = await focusResponse.json();
      throw new Error(error.message || "Erro ao emitir nota fiscal");
    }

    const focusData = await focusResponse.json();

    // Atualiza a nota fiscal com o ID da nota no Focus
    const { error: updateError } = await supabase
      .from("fiscal_notes")
      .update({
        focus_nfe_id: focusData.id,
        focus_nfe_status: "processing",
      })
      .eq("id", noteId);

    if (updateError) throw updateError;

    return new Response(
      JSON.stringify({ message: "Nota fiscal enviada com sucesso" }),
      { 
        headers: { "Content-Type": "application/json" },
        status: 200 
      }
    );
  } catch (error: any) {
    console.error("Erro ao emitir nota fiscal:", error);
    return new Response(
      JSON.stringify({ message: error.message || "Erro interno do servidor" }),
      { 
        headers: { "Content-Type": "application/json" },
        status: 500 
      }
    );
  }
}