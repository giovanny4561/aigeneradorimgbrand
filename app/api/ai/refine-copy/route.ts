import { NextRequest, NextResponse } from 'next/server'
import { getOpenAIClient } from '@/lib/openrouter'

export async function POST(request: NextRequest) {
  try {
    const { contentPlanItem, platform, instruction, brandConfig } = await request.json()

    const openai = getOpenAIClient()

    if (platform === 'all') {
      const userPrompt = `MARCA: ${brandConfig?.name || 'Sin nombre'}
COPY ORIGINAL: ${contentPlanItem?.copyPreview || ''}
INTENCIÓN: ${contentPlanItem?.intention || 'General'}
FORMATO: ${contentPlanItem?.format || 'Post'}

Genera copy adaptado para 4 plataformas. Responde SOLO en JSON (sin markdown, sin backticks):
{
  "copies": {
    "whatsapp": "Copy para WhatsApp (informal, emojis, directo, máx 160 chars)",
    "meta": "Copy para Meta/Facebook Ads (headline + body + CTA, profesional)",
    "linkedin": "Copy para LinkedIn (profesional, con insights de industria)",
    "instagram": "Copy para Instagram (caption con hashtags, engaging)"
  }
}

Todo en español.`

      const completion = await openai.chat.completions.create({
        model: 'google/gemini-2.0-flash-001',
        messages: [
          { role: 'system', content: 'Eres un copywriter experto en marketing digital. Adapta el copy para cada plataforma.' },
          { role: 'user', content: userPrompt }
        ],
        response_format: { type: 'json_object' }
      })

      const text = completion.choices[0].message.content

      if (text) {
        const data = JSON.parse(text)
        return NextResponse.json(data)
      }
    } else {
      const platformNames: Record<string, string> = {
        whatsapp: 'WhatsApp (informal, emojis, directo)',
        meta: 'Meta/Facebook Ads (headline + body + CTA)',
        linkedin: 'LinkedIn (profesional, con datos)',
        instagram: 'Instagram (caption con hashtags)',
      }

      const userPrompt = `MARCA: ${brandConfig?.name || 'Sin nombre'}
COPY ACTUAL: ${contentPlanItem?.copies?.[platform] || contentPlanItem?.copyPreview || ''}
INSTRUCCIÓN DEL USUARIO: ${instruction}

Responde SOLO con el texto del copy refinado, sin JSON ni formato adicional. En español.`

      const completion = await openai.chat.completions.create({
        model: 'google/gemini-2.0-flash-001',
        messages: [
          { role: 'system', content: `Eres un copywriter experto. Refina el copy para ${platformNames[platform] || platform}.` },
          { role: 'user', content: userPrompt }
        ]
      })

      const refinedCopy = completion.choices[0].message.content?.trim()

      return NextResponse.json({ refinedCopy })
    }

    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  } catch (error) {
    console.error('Copy refinement error:', error)
    return NextResponse.json(
      { error: 'Failed to refine copy' },
      { status: 500 }
    )
  }
}
