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

    // Properly encode the API key for Basic Auth
    const authString = btoa(focusNfeApiKey + ':')
    const apiUrl = `https://homologacao.focusnfe.com.br/v2/nfse?ref=${noteId}`

    console.log('Calling Focus NFE API:', apiUrl)

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${authString}`
      },
      body: JSON.stringify(payload)
    })

    const responseText = await response.text()
    console.log('Focus NFE API raw response:', responseText)

    // Try to parse the response as JSON
    let data
    try {
      data = JSON.parse(responseText)
    } catch (e) {
      console.error('Failed to parse Focus NFE API response:', e)
      throw new Error(`Failed to parse Focus NFE API response: ${responseText}`)
    }

    // Check if the response indicates an error
    if (!response.ok) {
      console.error('Focus NFE API error response:', data)
      throw new Error(data.message || "Error from Focus NFE API")
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
    
    // Return a more detailed error response
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      },
    )
  }
})