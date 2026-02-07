import { NextRequest, NextResponse } from 'next/server'
import { getOpenAIClient } from '@/lib/openrouter'
import FirecrawlApp from '@mendable/firecrawl-js' // SDK Import

export async function POST(request: NextRequest) {
  try {
    const { brandName, website, logoUrl, manualUrl } = await request.json()
    const firecrawlKey = process.env.FIRECRAWL_API_KEY

    // 1. Try Firecrawl SDK if website & key are available
    let scrapedContent = ''

    if (firecrawlKey && website) {
      try {
        console.log('Attempting Firecrawl SDK scrape for:', website)
        const app = new FirecrawlApp({ apiKey: firecrawlKey })

        const fcData = await app.scrape(website, {
          formats: ['branding', 'markdown'], // Request markdown too
        })

        if (fcData.branding) {
          // Check if we have high-quality signals (e.g. at least one non-default font or color)
          // If branding seems very empty, we might prefer the LLM analysis of the markdown
          // But usually Firecrawl branding is reliable if present.

          console.log('Firecrawl SDK branding found:', fcData.branding)
          return NextResponse.json({
            primaryColor: fcData.branding.colors?.primary || fcData.branding.colors?.[0] || '#8b5cf6',
            secondaryColor: fcData.branding.colors?.secondary || fcData.branding.colors?.[1] || '#0f172a',
            fontHeading: fcData.branding.fonts?.[0]?.family || 'Inter',
            fontBody: fcData.branding.fonts?.[1]?.family || fcData.branding.fonts?.[0]?.family || 'Inter',
            toneOfVoice: 'Profesional y moderno (basado en sitio web)',
            logo: fcData.branding.logo || undefined
          })
        }

        // Save markdown for fallback
        if (fcData.markdown) {
          scrapedContent = fcData.markdown.slice(0, 4000) // Limit context
        }

      } catch (fcError) {
        console.error('Firecrawl SDK error:', fcError)
        // Fallback to Gemini but proceed
      }
    }

    // 2. Fallback to OpenRouter (Gemini via OpenRouter)
    console.log('Using OpenRouter for analysis (Fallback)')
    const openai = getOpenAIClient()

    const prompt = `Analiza la siguiente marca y extrae su identidad visual y verbal.
    
    MARCA: ${brandName}
    WEBSITE: ${website || 'No especificado'}
    CONTEXTO WEB (Markdown): ${scrapedContent || 'No disponible (Analiza basándote en el nombre y sector)'}
    MANUAL: ${manualUrl || 'No especificado'}
    LOGO: ${logoUrl || 'No especificado'}
    
    Responde SOLO en JSON con este formato exacto (sin markdown):
    {
      "primaryColor": "#hex",
      "secondaryColor": "#hex",
      "fontHeading": "Nombre Fuente",
      "fontBody": "Nombre Fuente",
      "toneOfVoice": "Descripción del tono (ej: Profesional, Amigable, Lujoso)",
      "logo": "URL del logo si se detecta o la misma que se envió"
    }
    
    Si tienes el contexto web, vallasate fuertemente en él para el tono de voz y estilo. 
    Si no tienes información visual real, infiere los colores y fuentes más adecuados para el tipo de industria.`

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' }
    })

    const text = completion.choices[0].message.content

    if (text) {
      const data = JSON.parse(text)
      return NextResponse.json(data)
    }

    return NextResponse.json({ error: 'Failed to analyze' }, { status: 500 })

  } catch (error) {
    console.error('Brand analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze brand' },
      { status: 500 }
    )
  }
}

