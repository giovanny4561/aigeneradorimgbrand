import { NextRequest, NextResponse } from 'next/server'
import { getOpenAIClient } from '@/lib/openrouter'

export async function POST(request: NextRequest) {
  try {
    const { strategy, brandConfig, products } = await request.json()

    const openai = getOpenAIClient()

    const productList = products?.map((p: { name: string; description: string }) =>
      `- ${p.name}: ${p.description}`
    ).join('\n') || 'Productos no especificados'

    const userPrompt = `MARCA: ${brandConfig?.name || 'Sin nombre'}
ESTRATEGIA: ${strategy?.name || 'General'} - ${strategy?.description || ''}
TIPO: ${strategy?.type || 'engagement'}
PRODUCTOS:
${productList}

Genera exactamente 5 items de contenido (uno por día).

Responde SOLO en JSON con este formato exacto (sin markdown, sin backticks):
{
  "plan": [
    {
      "id": "1",
      "day": 1,
      "platform": "instagram",
      "format": "Reel",
      "intention": "Viralidad",
      "visualDescription": "Descripción detallada para generar la imagen con IA",
      "copyPreview": "Texto corto del post"
    }
  ]
}

Plataformas válidas: instagram, tiktok, linkedin
Formatos válidos: Post, Story, Reel
Las descripciones visuales deben ser prompts detallados para generación de imágenes.
Todo en español.`

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        { role: 'system', content: 'Eres un content strategist experto. Genera un plan de contenido de 5 días para una campaña de marketing.' },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: 'json_object' }
    })

    const text = completion.choices[0].message.content

    if (text) {
      const data = JSON.parse(text)
      return NextResponse.json(data)
    }

    return NextResponse.json({ plan: [] }, { status: 500 })
  } catch (error) {
    console.error('Content plan generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate content plan' },
      { status: 500 }
    )
  }
}
