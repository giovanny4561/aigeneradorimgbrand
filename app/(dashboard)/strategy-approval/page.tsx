'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Icon } from '@/components/Icon'
import { useAppStore } from '@/store'
import type { ContentPlanItem } from '@/types'

export default function StrategyApprovalPage() {
  const router = useRouter()
  const { selectedStrategy, contentPlan, setContentPlan, updateContentPlanItem, brandConfig, products } = useAppStore()
  const [isLoading, setIsLoading] = useState(false)
  const [editingItem, setEditingItem] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<ContentPlanItem>>({})

  // Redirect if no strategy selected
  useEffect(() => {
    if (!selectedStrategy) {
      router.push('/strategy')
    }
  }, [selectedStrategy, router])

  // Generate content plan if empty
  useEffect(() => {
    if (selectedStrategy && contentPlan.length === 0) {
      generateContentPlan()
    }
  }, [selectedStrategy]) // eslint-disable-line react-hooks/exhaustive-deps

  const generateContentPlan = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/ai/generate-content-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ strategy: selectedStrategy, brandConfig, products }),
      })
      if (res.ok) {
        const data = await res.json()
        setContentPlan(data.plan)
      } else {
        throw new Error('API not available')
      }
    } catch {
      // Fallback mock data
      setContentPlan([
        { id: '1', day: 1, platform: 'instagram', format: 'Reel', intention: 'Viralidad', visualDescription: 'Close-up dinámico de producto en cámara lenta, salpicaduras neón.', copyPreview: 'Rompe barreras. #NuevoLanzamiento' },
        { id: '2', day: 2, platform: 'tiktok', format: 'Post', intention: 'Social Proof', visualDescription: 'Foto lifestyle de un influencer usando el producto, luz natural.', copyPreview: 'Tu nuevo esencial diario.' },
        { id: '3', day: 3, platform: 'instagram', format: 'Story', intention: 'Venta Directa', visualDescription: 'Fondo minimalista con el producto flotando y texto grande "20% OFF".', copyPreview: 'Solo por hoy. Link en bio.' },
      ])
    }
    setIsLoading(false)
  }

  const handleEdit = (item: ContentPlanItem) => {
    setEditingItem(item.id)
    setEditForm(item)
  }

  const handleSaveEdit = () => {
    if (editingItem) {
      updateContentPlanItem(editingItem, editForm)
      setEditingItem(null)
    }
  }

  const handleApprove = () => {
    router.push('/refinement')
  }

  const handleBack = () => {
    router.push('/strategy')
  }

  if (!selectedStrategy) return null

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 relative overflow-hidden">
      {/* Header */}
      <header className="h-16 flex-shrink-0 border-b border-slate-200 bg-white px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={handleBack} className="p-2 rounded-full hover:bg-slate-100 text-slate-500">
            <Icon name="arrow_back" />
          </button>
          <div className="flex flex-col">
            <h2 className="text-text-main text-lg font-bold">Aprobación de Estrategia</h2>
            <p className="text-text-muted text-xs">Revisa los detalles antes de generar</p>
          </div>
        </div>
        <div className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-bold border border-purple-200 uppercase tracking-wide">
          {selectedStrategy.name}
        </div>
      </header>

      {/* Content Plan List */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-text-main mb-2">Resumen Estratégico</h3>
            <p className="text-text-muted leading-relaxed">{selectedStrategy.description}</p>
            <div className="flex gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1 rounded-lg">
                <Icon name="groups" className="text-primary" />
                Alcance: {selectedStrategy.reach}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1 rounded-lg">
                <Icon name="trending_up" className="text-primary" />
                Probabilidad: {selectedStrategy.probability}%
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-text-main mb-6">Plan de Contenidos (Drips)</h3>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative size-16 mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
                <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
              </div>
              <p className="text-text-muted">Generando plan de contenidos con IA...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {contentPlan.map((item) => (
                <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-6 flex gap-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col items-center justify-center w-16 shrink-0 border-r border-slate-100 pr-6">
                    <span className="text-xs font-bold text-text-muted uppercase mb-1">Día</span>
                    <span className="text-2xl font-black text-text-main">{item.day}</span>
                  </div>

                  {editingItem === item.id ? (
                    <div className="flex-1 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <select value={editForm.platform} onChange={(e) => setEditForm({ ...editForm, platform: e.target.value as ContentPlanItem['platform'] })} className="p-2 border border-slate-200 rounded-lg text-sm">
                          <option value="instagram">Instagram</option>
                          <option value="tiktok">TikTok</option>
                          <option value="linkedin">LinkedIn</option>
                        </select>
                        <select value={editForm.format} onChange={(e) => setEditForm({ ...editForm, format: e.target.value as ContentPlanItem['format'] })} className="p-2 border border-slate-200 rounded-lg text-sm">
                          <option value="Post">Post</option>
                          <option value="Story">Story</option>
                          <option value="Reel">Reel</option>
                        </select>
                      </div>
                      <input value={editForm.intention} onChange={(e) => setEditForm({ ...editForm, intention: e.target.value })} className="w-full p-2 border border-slate-200 rounded-lg text-sm" placeholder="Intención" />
                      <textarea value={editForm.copyPreview} onChange={(e) => setEditForm({ ...editForm, copyPreview: e.target.value })} className="w-full p-2 border border-slate-200 rounded-lg text-sm h-16 resize-none" placeholder="Copy preview" />
                      <textarea value={editForm.visualDescription} onChange={(e) => setEditForm({ ...editForm, visualDescription: e.target.value })} className="w-full p-2 border border-slate-200 rounded-lg text-sm h-16 resize-none" placeholder="Prompt de imagen" />
                      <div className="flex gap-2">
                        <button onClick={handleSaveEdit} className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-lg">Guardar</button>
                        <button onClick={() => setEditingItem(null)} className="px-3 py-1.5 text-slate-500 text-xs font-bold hover:bg-slate-100 rounded-lg">Cancelar</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Icon name={item.platform === 'instagram' ? 'photo_camera' : item.platform === 'linkedin' ? 'work' : 'movie'} className="text-slate-400 text-sm" />
                          <span className="text-sm font-bold text-text-main capitalize">{item.platform} &bull; {item.format}</span>
                          <span className="ml-auto text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">{item.intention}</span>
                        </div>
                        <p className="text-sm text-slate-600 italic">&ldquo;{item.copyPreview}&rdquo;</p>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 relative group">
                        <span className="text-[10px] font-bold text-primary uppercase mb-1 block">Prompt de Imagen (IA)</span>
                        <p className="text-sm text-slate-700 leading-snug">{item.visualDescription}</p>
                        <button onClick={() => handleEdit(item)} className="absolute top-2 right-2 p-1 text-slate-400 hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          <Icon name="edit" className="text-sm" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="bg-white border-t border-slate-200 p-6 flex justify-end gap-4 z-10">
        <button onClick={handleBack} className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors">
          Modificar Estrategia
        </button>
        <button onClick={handleApprove} className="px-8 py-3 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary-hover hover:-translate-y-0.5 transition-all flex items-center gap-2">
          <Icon name="auto_awesome" />
          <span>Aprobar y Refinar Contenido</span>
        </button>
      </div>
    </div>
  )
}
