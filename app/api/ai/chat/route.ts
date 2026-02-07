import { NextRequest, NextResponse } from 'next/server'
import { getOpenAIClient } from '@/lib/openrouter'

export async function POST(request: NextRequest) {
  try {
    const { message, history, brandConfig, products } = await request.json()

    const openai = getOpenAIClient()

    const productList = products?.map((p: { name: string; description: string; price: number }) =>
      `- ${p.name} ($${p.price}): ${p.description}`
    ).join('\n') || 'No hay productos'

    const chatHistory = history?.map((m: { role: string; content: string }) =>
      `${m.role === 'ai' ? 'Asistente' : 'Usuario'}: ${m.content}`
    ).join('\n') || ''

    const systemPrompt = `Eres un estratega de marketing digital experto y amable. Responde en español.

CONTEXTO DE LA MARCA:
- Nombre: ${brandConfig?.name || 'Sin definir'}
- Sitio web: ${brandConfig?.website || 'No proporcionado'}
- Redes: Instagram ${brandConfig?.socialMedia?.instagram || 'N/A'}, TikTok ${brandConfig?.socialMedia?.tiktok || 'N/A'}

PRODUCTOS:
${productList}

HISTORIAL DE CONVERSACIÓN:
${chatHistory}

Responde de forma concisa y útil. Si el usuario pregunta sobre estrategia, sugiere tácticas concretas. Máximo 3 párrafos.`

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ]
    })

    const response = completion.choices[0].message.content

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    )
  }
}
