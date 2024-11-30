import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const focusNfeApiKey = process.env.NFE_API_KEY;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: Request) {
  try {
    const supabase = createClient(supabaseUrl!, supabaseServiceKey!);
    
    // Verify authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return new Response('Unauthorized', { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await request.json();

    // Make request to Focus NFE API
    const response = await fetch('https://homologacao.focusnfe.com.br/v2/empresas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': focusNfeApiKey!
      },
      body: JSON.stringify({
        cnpj: body.cnpj,
        razao_social: body.nome,
        inscricao_municipal: body.inscricao_municipal,
        inscricao_estadual: body.inscricao_estadual,
        regime_tributario: body.regime_tributario,
        endereco: body.endereco
      })
    });

    if (!response.ok) {
      const error = await response.json();
      return new Response(JSON.stringify({ message: error.message }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}