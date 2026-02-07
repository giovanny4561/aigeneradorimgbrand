'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Icon } from '@/components/Icon'
import { useAppStore } from '@/store'
import type { ContentPlanItem, PlatformCopy } from '@/types'

const PLATFORMS = [
  { key: 'whatsapp' as const, label: 'WhatsApp', icon: 'chat' },
  { key: 'meta' as const, label: 'Meta Ads', icon: 'ads_click' },
  { key: 'linkedin' as const, label: 'LinkedIn', icon: 'work' },
  { key: 'instagram' as const, label: 'Instagram', icon: 'photo_camera' },
]

export default function RefinementPage() {
  const router = useRouter()
  const { contentPlan, updateContentPlanItem, brandConfig } = useAppStore()
  const [selectedItemId, setSelectedItemId] = useState<string>(contentPlan[0]?.id || '')
  const [activePlatform, setActivePlatform] = useState<keyof PlatformCopy>('instagram')
  const [refinementInput, setRefinementInput] = useState('')
  const [refinementHistory, setRefinementHistory] = useState<{ role: 'user' | 'ai'; content: string }[]>([])
  const [isRefining, setIsRefining] = useState(false)
  const [isGeneratingAll, setIsGeneratingAll] = useState(false)

  const selectedItem = contentPlan.find((item) => item.id === selectedItemId)

  const handleRefineCopy = async () => {
    if (!refinementInput.trim() || !selectedItem) return
    const instruction = refinementInput
    setRefinementInput('')
    setRefinementHistory((prev) => [...prev, { role: 'user', content: instruction }])
    setIsRefining(true)

    try {
      const res = await fetch('/api/ai/refine-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentPlanItem: selectedItem,
          platform: activePlatform,
          instruction,
          brandConfig,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        const newCopies = { ...(selectedItem.copies || { whatsapp: '', meta: '', linkedin: '', instagram: '' }) }
        newCopies[activePlatform] = data.refinedCopy
        updateContentPlanItem(selectedItem.id, { copies: newCopies })
        setRefinementHistory((prev) => [...prev, { role: 'ai', content: `Copy actualizado para ${activePlatform}: "${data.refinedCopy.substring(0, 100)}..."` }])
      } else {
        throw new Error('API error')
      }
    } catch {
      // Mock refinement
      const mockCopy = `[${activePlatform.toUpperCase()}] ${selectedItem.copyPreview} (refinado: ${instruction})`
      const newCopies = { ...(selectedItem.copies || { whatsapp: '', meta: '', linkedin: '', instagram: '' }) }
      newCopies[activePlatform] = mockCopy
      updateContentPlanItem(selectedItem.id, { copies: newCopies })
      setRefinementHistory((prev) => [...prev, { role: 'ai', content: `Copy actualizado para ${activePlatform}.` }])
    }

    setIsRefining(false)
  }

  const handleGenerateAll = async () => {
    setIsGeneratingAll(true)

    for (const item of contentPlan) {
      try {
        const res = await fetch('/api/ai/refine-copy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contentPlanItem: item,
            platform: 'all',
            instruction: 'Genera copy adaptado para cada plataforma',
            brandConfig,
          }),
        })

        if (res.ok) {
          const data = await res.json()
          updateContentPlanItem(item.id, { copies: data.copies })
        } else {
          throw new Error('API error')
        }
      } catch {
        // Mock: generate copies from preview
        const copies: PlatformCopy = {
          whatsapp: `${item.copyPreview} - Escríbenos para más info`,
          meta: `${item.copyPreview} | Descubre más ➡️`,
          linkedin: `${item.copyPreview} - Una estrategia de ${brandConfig?.name || 'nuestra marca'} para profesionales.`,
          instagram: `${item.copyPreview} ✨ #${brandConfig?.name?.replace(/\s/g, '') || 'marca'} #marketing`,
        }
        updateContentPlanItem(item.id, { copies })
      }
    }

    setIsGeneratingAll(false)
  }

  const getCopyForPlatform = (item: ContentPlanItem, platform: keyof PlatformCopy): string => {
    return item.copies?.[platform] || item.copyPreview || ''
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 relative overflow-hidden">
      {/* Header */}
      <header className="h-16 flex-shrink-0 border-b border-slate-200 bg-white px-8 flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-text-main text-lg font-bold flex items-center gap-2">
            Refinamiento de Contenido
            <span className="px-2 py-0.5 rounded text-xs bg-purple-100 text-purple-700 border border-purple-200 font-medium">IA</span>
          </h2>
          <p className="text-text-muted text-xs">Adapta el copy para cada plataforma</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleGenerateAll}
            disabled={isGeneratingAll}
            className="px-4 py-2 rounded-lg bg-slate-100 text-sm font-medium text-text-main hover:bg-slate-200 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <Icon name="auto_awesome" className="text-primary" />
            {isGeneratingAll ? 'Generando...' : 'Generar para Todas'}
          </button>
          <button onClick={() => router.push('/generation')} className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors flex items-center gap-2">
            <span>Generar Imágenes</span>
            <Icon name="arrow_forward" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Drip List */}
        <div className="w-72 border-r border-slate-200 bg-white overflow-y-auto flex-shrink-0">
          <div className="p-4">
            <h3 className="text-xs font-bold text-text-muted uppercase mb-3">Plan de Contenido</h3>
            <div className="space-y-2">
              {contentPlan.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setSelectedItemId(item.id); setRefinementHistory([]) }}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedItemId === item.id
                      ? 'bg-primary-light border border-primary/20 ring-1 ring-primary/10'
                      : 'hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-primary">Día {item.day}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded capitalize">{item.platform}</span>
                  </div>
                  <p className="text-xs text-text-muted line-clamp-2">{item.copyPreview}</p>
                  {item.copies && (
                    <div className="flex gap-1 mt-2">
                      {PLATFORMS.map((p) => (
                        <span key={p.key} className={`size-4 rounded-full flex items-center justify-center ${item.copies?.[p.key] ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                          <Icon name={item.copies?.[p.key] ? 'check' : 'remove'} className="text-[8px]" />
                        </span>
                      ))}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center Panel - Platform Tabs + Copy */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedItem ? (
            <>
              {/* Platform Tabs */}
              <div className="flex border-b border-slate-200 bg-white px-6">
                {PLATFORMS.map((p) => (
                  <button
                    key={p.key}
                    onClick={() => setActivePlatform(p.key)}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                      activePlatform === p.key
                        ? 'border-primary text-primary'
                        : 'border-transparent text-text-muted hover:text-text-main'
                    }`}
                  >
                    <Icon name={p.icon} className="text-base" />
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Copy Editor */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-text-main">
                        Día {selectedItem.day} - {selectedItem.platform} ({selectedItem.format})
                      </h3>
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">{selectedItem.intention}</span>
                    </div>

                    <label className="block mb-4">
                      <span className="text-xs font-bold text-text-muted uppercase mb-2 block">
                        Copy para {PLATFORMS.find((p) => p.key === activePlatform)?.label}
                      </span>
                      <textarea
                        className="w-full p-4 border border-slate-200 rounded-lg text-sm resize-none h-40 outline-none focus:border-primary transition-colors"
                        value={getCopyForPlatform(selectedItem, activePlatform)}
                        onChange={(e) => {
                          const newCopies = { ...(selectedItem.copies || { whatsapp: '', meta: '', linkedin: '', instagram: '' }) }
                          newCopies[activePlatform] = e.target.value
                          updateContentPlanItem(selectedItem.id, { copies: newCopies })
                        }}
                        placeholder={`Escribe o genera el copy para ${activePlatform}...`}
                      />
                    </label>

                    {/* Platform Preview */}
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                      <span className="text-[10px] font-bold text-text-muted uppercase mb-2 block">Vista Previa</span>
                      {activePlatform === 'whatsapp' && (
                        <div className="bg-emerald-50 rounded-xl p-4 max-w-xs">
                          <p className="text-sm text-slate-800">{getCopyForPlatform(selectedItem, 'whatsapp') || 'Sin copy aún...'}</p>
                        </div>
                      )}
                      {activePlatform === 'meta' && (
                        <div className="bg-white rounded-lg border border-slate-200 p-4 max-w-sm">
                          <p className="text-sm font-bold text-slate-800 mb-2">Anuncio</p>
                          <p className="text-sm text-slate-600">{getCopyForPlatform(selectedItem, 'meta') || 'Sin copy aún...'}</p>
                          <button className="mt-3 px-4 py-1.5 bg-blue-600 text-white text-xs rounded font-bold">Más Información</button>
                        </div>
                      )}
                      {activePlatform === 'linkedin' && (
                        <div className="bg-white rounded-lg border border-slate-200 p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="size-8 rounded-full bg-slate-200"></div>
                            <div>
                              <p className="text-xs font-bold text-slate-800">{brandConfig?.name || 'Mi Marca'}</p>
                              <p className="text-[10px] text-slate-400">Publicación</p>
                            </div>
                          </div>
                          <p className="text-sm text-slate-700">{getCopyForPlatform(selectedItem, 'linkedin') || 'Sin copy aún...'}</p>
                        </div>
                      )}
                      {activePlatform === 'instagram' && (
                        <div className="bg-white rounded-lg border border-slate-200 p-4 max-w-xs">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="size-6 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600"></div>
                            <span className="text-xs font-bold text-slate-800">{brandConfig?.socialMedia?.instagram || '@marca'}</span>
                          </div>
                          <div className="aspect-square bg-slate-100 rounded mb-2 flex items-center justify-center text-slate-300">
                            <Icon name="image" className="text-4xl" />
                          </div>
                          <p className="text-xs text-slate-700">{getCopyForPlatform(selectedItem, 'instagram') || 'Sin copy aún...'}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-text-muted">
              Selecciona un item del plan para editar
            </div>
          )}
        </div>

        {/* Right Panel - Refinement Chat */}
        <div className="w-80 border-l border-slate-200 bg-white flex flex-col flex-shrink-0">
          <div className="p-4 border-b border-slate-200">
            <h3 className="text-sm font-bold text-text-main flex items-center gap-2">
              <Icon name="auto_awesome" className="text-primary" />
              Chat de Refinamiento
            </h3>
            <p className="text-xs text-text-muted mt-1">Pide cambios al copy con lenguaje natural</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {refinementHistory.length === 0 && (
              <div className="text-center py-8">
                <Icon name="chat_bubble_outline" className="text-4xl text-slate-200 mb-2" />
                <p className="text-xs text-text-muted">Escribe instrucciones como:</p>
                <div className="mt-3 space-y-2">
                  {['Hazlo más profesional', 'Añade emojis', 'Más corto y directo', 'Incluye un CTA'].map((s) => (
                    <button key={s} onClick={() => setRefinementInput(s)} className="block w-full text-left px-3 py-2 bg-slate-50 rounded-lg text-xs text-slate-600 hover:bg-primary-light hover:text-primary transition-colors">
                      &ldquo;{s}&rdquo;
                    </button>
                  ))}
                </div>
              </div>
            )}
            {refinementHistory.map((msg, idx) => (
              <div key={idx} className={`text-xs p-3 rounded-lg ${msg.role === 'user' ? 'bg-primary text-white ml-4' : 'bg-slate-50 text-slate-700 mr-4'}`}>
                {msg.content}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-slate-200">
            <div className="flex gap-2">
              <input
                value={refinementInput}
                onChange={(e) => setRefinementInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRefineCopy()}
                className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-primary"
                placeholder="Ej: Hazlo más casual..."
                disabled={isRefining}
              />
              <button onClick={handleRefineCopy} disabled={isRefining} className="p-2 bg-primary text-white rounded-lg hover:bg-primary-hover disabled:opacity-50">
                <Icon name="send" className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
