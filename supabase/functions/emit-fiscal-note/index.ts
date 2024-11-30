import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { noteId, payload } = await req.json()
    const focusNfeApiKey = Deno.env.get('NFE_API_KEY')

    if (!focusNfeApiKey) {
      throw new Error('NFE_API_KEY environment variable is not set')
    }

    console.log('Emitting fiscal note:', { noteId, payload })

    const response = await fetch(
      `https://homologacao.focusnfe.com.br/v2/nfse?ref=${noteId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${btoa(focusNfeApiKey + ':')}`
        },
        body: JSON.stringify(payload)
      }
    )

    const data = await response.json()
    
    if (!response.ok) {
      console.error('Focus NFE API error:', data)
      throw new Error(data.message || "Erro ao emitir nota fiscal")
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
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      },
    )
  }
})