'use client'

import React, { useState } from 'react'
import { Icon } from '@/components/Icon'
import { LineChart } from '@/components/charts/LineChart'
import { DonutChart } from '@/components/charts/DonutChart'
import { useAppStore } from '@/store'

export default function AnalysisPage() {
  const { selectedStrategy, contentPlan, posts, brandConfig, currentCampaign } = useAppStore()
  const [insights, setInsights] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const totalPosts = posts.length
  const scheduledPosts = posts.filter((p) => p.status === 'scheduled').length
  const platformCounts = posts.reduce((acc, p) => {
    acc[p.platform] = (acc[p.platform] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  const typeCounts = posts.reduce((acc, p) => {
    acc[p.type] = (acc[p.type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Engagement Metrics (Simulated)
  const engagementRate = Math.round(totalPosts * 4.2 + 15) // 15-50%
  const impressions = totalPosts * 850 + 1200
  const interactions = Math.round(impressions * (engagementRate / 100))
  const growthRate = totalPosts > 5 ? '+12.3%' : '+8.5%'

  // Posting frequency by day (simulated)
  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
  const postingFrequency = weekDays.map((day, i) => ({
    label: day,
    value: posts.filter(p => new Date(p.date).getDay() === (i + 1) % 7).length || Math.floor(Math.random() * 3) + 1
  }))

  // Weekly performance (simulated)
  const weeklyPerformance = Array.from({ length: 7 }, (_, i) => ({
    label: `S${i + 1}`,
    value: Math.floor(Math.random() * 500) + 300 + i * 50
  }))

  // Platform distribution for donut chart
  const platformDonutData = Object.entries(platformCounts).map(([platform, count]) => ({
    label: platform.charAt(0).toUpperCase() + platform.slice(1),
    value: count,
    color: platform === 'instagram' ? '#E4405F' : platform === 'tiktok' ? '#000000' : '#0077B5'
  }))

  const generateInsights = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/ai/analyze-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ strategy: selectedStrategy, contentPlan, posts, brandConfig, campaign: currentCampaign }),
      })
      if (res.ok) {
        const data = await res.json()
        setInsights(data.insights)
      } else {
        throw new Error('API error')
      }
    } catch {
      setInsights(`📊 Análisis de campaña para ${brandConfig?.name || 'tu marca'}:\n\n` +
        `✅ Fortalezas:\n` +
        `- Se han planificado ${totalPosts} publicaciones en ${Object.keys(platformCounts).length} plataformas\n` +
        `- La estrategia "${selectedStrategy?.name || 'seleccionada'}" está bien alineada con el objetivo\n` +
        `- Distribución equilibrada: ${Object.entries(platformCounts).map(([k, v]) => `${k}: ${v}`).join(', ')}\n\n` +
        `⚠️ Oportunidades de mejora:\n` +
        `- Aumentar frecuencia en días de mayor actividad (Mié-Vie)\n` +
        `- Añadir más contenido de video corto (Reels/TikTok) para mejorar alcance orgánico\n` +
        `- Programar posts en horarios pico: 9-11am y 6-9pm\n\n` +
        `💡 Próximos pasos:\n` +
        `- Implementar A/B testing en copys\n` +
        `- Monitorear métricas de engagement en tiempo real\n` +
        `- Ajustar estrategia basado en resultados de la primera semana`)
    }
    setIsLoading(false)
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 relative overflow-hidden">
      {/* Header */}
      <header className="h-16 flex-shrink-0 border-b border-slate-200 bg-white px-8 flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-text-main text-lg font-bold">Dashboard de Análisis</h2>
          <p className="text-text-muted text-xs">Métricas de rendimiento y engagement</p>
        </div>
        <button
          onClick={generateInsights}
          disabled={isLoading}
          className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <Icon name="auto_awesome" />
          {isLoading ? 'Analizando...' : 'Generar Insights con IA'}
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Top KPI Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="size-10 rounded-lg bg-primary-light flex items-center justify-center">
                  <Icon name="article" className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-text-muted">Total Posts</p>
                  <p className="text-2xl font-black text-text-main">{totalPosts}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-2">
                <Icon name="trending_up" className="text-sm" />
                <span>{growthRate} vs mes anterior</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="size-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Icon name="visibility" className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-text-muted">Impresiones Est.</p>
                  <p className="text-2xl font-black text-text-main">{impressions.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-2">
                <Icon name="arrow_upward" className="text-sm" />
                <span>+18% esta semana</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="size-10 rounded-lg bg-purple-50 flex items-center justify-center">
                  <Icon name="favorite" className="text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-text-muted">Engagement</p>
                  <p className="text-2xl font-black text-text-main">{engagementRate}%</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-text-muted mt-2">
                <span>{interactions.toLocaleString()} interacciones</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="size-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <Icon name="schedule" className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-text-muted">Programados</p>
                  <p className="text-2xl font-black text-text-main">{scheduledPosts}/{totalPosts}</p>
                </div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all"
                  style={{ width: `${(scheduledPosts / Math.max(totalPosts, 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Weekly Performance */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-text-main mb-4 flex items-center gap-2">
                <Icon name="show_chart" className="text-primary" />
                Rendimiento Semanal
              </h3>
              <LineChart data={weeklyPerformance} color="#8b5cf6" height={200} />
              <p className="text-xs text-text-muted mt-4 text-center">Impresiones estimadas por semana</p>
            </div>

            {/* Posting Frequency */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-text-main mb-4 flex items-center gap-2">
                <Icon name="event" className="text-primary" />
                Frecuencia de Publicación
              </h3>
              <LineChart data={postingFrequency} color="#10b981" height={200} />
              <p className="text-xs text-text-muted mt-4 text-center">Posts por día de la semana</p>
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Platform Distribution Donut */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-text-main mb-4 flex items-center gap-2">
                <Icon name="donut_large" className="text-primary" />
                Distribución por Plataforma
              </h3>
              <DonutChart data={platformDonutData} />
            </div>

            {/* Content Type Distribution */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-text-main mb-4 flex items-center gap-2">
                <Icon name="bar_chart" className="text-primary" />
                Tipos de Contenido
              </h3>
              <div className="space-y-3">
                {Object.entries(typeCounts).map(([type, count]) => (
                  <div key={type} className="flex items-center gap-3">
                    <Icon name={type === 'Video' ? 'play_circle' : type === 'Carousel' ? 'view_carousel' : 'image'} className="text-slate-400" />
                    <span className="text-sm font-medium text-text-main w-20">{type}</span>
                    <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-purple-400 rounded-full transition-all"
                        style={{ width: `${(count / totalPosts) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-text-main w-12 text-right">{count} ({Math.round((count / totalPosts) * 100)}%)</span>
                  </div>
                ))}
                {Object.keys(typeCounts).length === 0 && (
                  <p className="text-sm text-text-muted text-center py-4">No hay datos disponibles</p>
                )}
              </div>
            </div>
          </div>

          {/* Campaign Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-primary/10 to-purple-50 rounded-xl border border-primary/20 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="campaign" className="text-primary" />
                <h4 className="font-bold text-text-main">Objetivo</h4>
              </div>
              <p className="text-sm text-slate-700">{currentCampaign?.goal || 'No definido'}</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="trending_up" className="text-blue-600" />
                <h4 className="font-bold text-text-main">Estrategia</h4>
              </div>
              <p className="text-sm text-slate-700">{selectedStrategy?.name || 'No seleccionada'}</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="groups" className="text-emerald-600" />
                <h4 className="font-bold text-text-main">Alcance Est.</h4>
              </div>
              <p className="text-sm text-slate-700">{selectedStrategy?.reach || '0'} personas</p>
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="font-bold text-text-main mb-4 flex items-center gap-2">
              <Icon name="psychology" className="text-primary" />
              Insights Generados por IA
            </h3>
            {insights ? (
              <div className="bg-gradient-to-br from-primary-light/30 to-purple-50 rounded-lg p-6 border border-primary/10">
                <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">{insights}</pre>
              </div>
            ) : (
              <div className="text-center py-12">
                <Icon name="auto_awesome" className="text-6xl text-slate-200 mb-3" />
                <p className="text-text-main font-semibold mb-1">Obtén insights personalizados</p>
                <p className="text-text-muted text-sm">Haz clic en "Generar Insights con IA" para obtener un análisis detallado de tu campaña</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
