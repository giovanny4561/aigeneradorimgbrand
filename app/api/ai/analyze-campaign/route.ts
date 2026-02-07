import { NextRequest, NextResponse } from 'next/server'
import { getOpenAIClient } from '@/lib/openrouter'

export async function POST(request: NextRequest) {
  try {
    const { strategy, contentPlan, posts, brandConfig, campaign } = await request.json()

    // Use OpenRouter client
    const openai = getOpenAIClient()

    const prompt = `Eres un analista de marketing digital. Genera un informe de análisis de campaña.
    
    MARCA: ${brandConfig?.name || 'Sin nombre'}
    OBJETIVO DE CAMPAÑA: ${campaign?.goal || 'No definido'}
    DURACIÓN: ${campaign?.duration || 'No definida'}
    ESTRATEGIA: ${strategy?.name || 'N/A'} (${strategy?.type || 'N/A'})
    ALCANCE ESTIMADO: ${strategy?.reach || 'N/A'}
    PROBABILIDAD DE ÉXITO: ${strategy?.probability || 'N/A'}%
    
    PLAN DE CONTENIDO: ${contentPlan?.length || 0} items planificados
    POSTS GENERADOS: ${posts?.length || 0}
    POSTS PROGRAMADOS: ${posts?.filter((p: any) => p.status === 'scheduled').length || 0}
    
    PLATAFORMAS USADAS: ${[...new Set(posts?.map((p: any) => p.platform) || [])].join(', ') || 'Ninguna'}
    TIPOS DE CONTENIDO: ${[...new Set(posts?.map((p: any) => p.type) || [])].join(', ') || 'Ninguno'}
    
    Genera un análisis detallado en español que incluya:
    1. Resumen ejecutivo de la campaña
    2. Fortalezas identificadas
    3. Áreas de mejora
    4. Recomendaciones concretas (3-5 puntos)
    5. Próximos pasos sugeridos
    
    Formato: texto plano con bullet points, sin JSON ni markdown.`

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [{ role: 'user', content: prompt }],
    })

    const insights = completion.choices[0]?.message?.content || 'No se pudo generar el análisis.'

    return NextResponse.json({ insights })
  } catch (error) {
    console.error('Campaign analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze campaign' },
      { status: 500 }
    )
  }
}
