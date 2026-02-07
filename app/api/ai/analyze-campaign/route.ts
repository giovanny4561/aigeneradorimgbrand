import { NextRequest, NextResponse } from 'next/server'
import { getModel } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const { strategy, contentPlan, posts, brandConfig, campaign } = await request.json()

    const model = getModel()

    const prompt = `Eres un analista de marketing digital. Genera un informe de análisis de campaña.

MARCA: ${brandConfig?.name || 'Sin nombre'}
OBJETIVO DE CAMPAÑA: ${campaign?.goal || 'No definido'}
DURACIÓN: ${campaign?.duration || 'No definida'}
ESTRATEGIA: ${strategy?.name || 'N/A'} (${strategy?.type || 'N/A'})
ALCANCE ESTIMADO: ${strategy?.reach || 'N/A'}
PROBABILIDAD DE ÉXITO: ${strategy?.probability || 'N/A'}%

PLAN DE CONTENIDO: ${contentPlan?.length || 0} items planificados
POSTS GENERADOS: ${posts?.length || 0}
POSTS PROGRAMADOS: ${posts?.filter((p: { status: string }) => p.status === 'scheduled').length || 0}

PLATAFORMAS USADAS: ${[...new Set(posts?.map((p: { platform: string }) => p.platform) || [])].join(', ') || 'Ninguna'}
TIPOS DE CONTENIDO: ${[...new Set(posts?.map((p: { type: string }) => p.type) || [])].join(', ') || 'Ninguno'}

Genera un análisis detallado en español que incluya:
1. Resumen ejecutivo de la campaña
2. Fortalezas identificadas
3. Áreas de mejora
4. Recomendaciones concretas (3-5 puntos)
5. Próximos pasos sugeridos

Formato: texto plano con bullet points, sin JSON ni markdown.`

    const result = await model.generateContent(prompt)
    const insights = result.response.text()

    return NextResponse.json({ insights })
  } catch (error) {
    console.error('Campaign analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze campaign' },
      { status: 500 }
    )
  }
}
