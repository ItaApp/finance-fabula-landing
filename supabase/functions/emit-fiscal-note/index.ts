import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { noteId, payload } = await req.json()
    console.log('Received request for note:', noteId)
    console.log('Payload:', JSON.stringify(payload, null, 2))

    const focusNfeApiKey = Deno.env.get('NFE_API_KEY')
    if (!focusNfeApiKey) {
      console.error('NFE_API_KEY not found in environment variables')
      throw new Error('NFE_API_KEY environment variable is not set')
    }

    // Validate required fields
    if (!payload.natureza_operacao) {
      throw new Error('natureza_operacao é obrigatório')
    }
    if (!payload.cliente?.cpf_cnpj) {
      throw new Error('CPF/CNPJ do cliente é obrigatório')
    }

    console.log('Preparing to call Focus NFE API')

    // Create Basic Auth token
    const encoder = new TextEncoder()
    const authString = `${focusNfeApiKey}:`
    const encoded = encoder.encode(authString)
    const basicAuthToken = btoa(String.fromCharCode.apply(null, encoded))

    const apiUrl = `https://homologacao.focusnfe.com.br/v2/nfse?ref=${noteId}`
    console.log('Calling Focus NFE API:', apiUrl)

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${basicAuthToken}`
      },
      body: JSON.stringify(payload)
    })

    const responseText = await response.text()
    console.log('Focus NFE API raw response:', responseText)

    let data
    try {
      data = responseText ? JSON.parse(responseText) : {}
    } catch (e) {
      console.error('Failed to parse Focus NFE API response:', e)
      throw new Error(`Invalid API response format: ${responseText}`)
    }

    if (!response.ok) {
      console.error('Focus NFE API error response:', data)
      throw new Error(data?.mensagem || data?.message || responseText || 'Erro desconhecido da API')
    }

    return new Response(
      JSON.stringify(data),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      },
    )
  } catch (error) {
    console.error('Error in emit-fiscal-note:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Erro interno do servidor',
        details: error.stack || '',
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      },
    )
  }
})