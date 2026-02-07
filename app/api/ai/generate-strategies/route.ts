import { NextRequest, NextResponse } from 'next/server'
import { getOpenAIClient } from '@/lib/openrouter'

export async function POST(request: NextRequest) {
  try {
    const { brandConfig, products, goal, duration } = await request.json()

    const openai = getOpenAIClient()

    const productList = products?.map((p: { name: string; description: string; price: number }) =>
      `- ${p.name}: ${p.description} ($${p.price})`
    ).join('\n') || 'No hay productos definidos'

    const userPrompt = `MARCA: ${brandConfig?.name || 'Sin nombre'}
OBJETIVO: ${goal}
DURACIÓN: ${duration}
PRODUCTOS:
${productList}

Genera exactamente 3 estrategias con estos tipos: growth, engagement, sales.

Responde SOLO en JSON con este formato exacto (sin markdown, sin backticks):
{
  "strategies": [
    {
      "id": "1",
      "name": "Crecimiento",
      "type": "growth",
      "reach": "2.5M",
      "probability": 75,
      "tags": ["tag1", "tag2"],
      "description": "Descripción de la estrategia en español"
    },
    {
      "id": "2",
      "name": "Interacción",
      "type": "engagement",
      "reach": "1.8M",
      "probability": 88,
      "tags": ["tag1", "tag2"],
      "description": "Descripción de la estrategia en español"
    },
    {
      "id": "3",
      "name": "Ventas",
      "type": "sales",
      "reach": "900k",
      "probability": 62,
      "tags": ["tag1", "tag2"],
      "description": "Descripción de la estrategia en español"
    }
  ]
}

Las descripciones deben ser específicas para la marca y productos indicados. Los tags deben ser canales o tácticas concretas.`

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        { role: 'system', content: 'Eres un estratega senior de marketing digital. Genera 3 estrategias de campaña diferenciadas.' },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: 'json_object' }
    })

    const text = completion.choices[0].message.content

    if (text) {
      const data = JSON.parse(text)
      return NextResponse.json(data)
    }

    return NextResponse.json({ strategies: [] }, { status: 500 })
  } catch (error) {
    console.error('Strategy generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate strategies' },
      { status: 500 }
    )
  }
}
