'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Icon } from '@/components/Icon'
import { useAppStore } from '@/store'
import type { Strategy, ChatMessage } from '@/types'

const SUGGESTIONS = {
  goals: [
    { icon: 'campaign', label: 'Lanzamiento de Producto', desc: 'Introducir producto estrella' },
    { icon: 'visibility', label: 'Notoriedad de Marca', desc: 'Aumentar alcance un 20%' },
    { icon: 'shopping_cart', label: 'Impulsar Ventas', desc: 'Promoción de temporada' },
  ],
  durations: [
    { label: 'Sprint (14 días)', desc: 'Rápido impacto' },
    { label: 'Mes Completo', desc: 'Estrategia sólida' },
    { label: 'Trimestral', desc: 'Construcción a largo plazo' },
  ],
}

export default function StrategyPage() {
  const router = useRouter()
  const {
    brandConfig,
    products,
    selectStrategy,
    setStrategies,
    strategies,
    setCampaign,
    chatMessages,
    setChatMessages,
    addChatMessage,
  } = useAppStore()

  const [step, setStep] = useState<'init' | 'config_goal' | 'config_duration' | 'selection'>('init')
  const [config, setConfig] = useState({ goal: '', duration: '' })
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const brandName = brandConfig?.name || 'tu marca'
  const productNames = products.map((p) => p.name).join(', ') || 'tus productos'

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Initialize chat
  useEffect(() => {
    if (chatMessages.length === 0) {
      setChatMessages([
        { role: 'ai', content: `¡Hola! He analizado la identidad visual de ${brandName} y tu inventario (${productNames}). Estoy listo para diseñar una estrategia ganadora.` },
      ])
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(scrollToBottom, [chatMessages, step])

  useEffect(() => {
    if (step === 'init' && chatMessages.length === 1) {
      const timer = setTimeout(() => {
        addChatMessage({
          role: 'ai',
          content: `Basado en tus productos (${productNames}), te sugiero estos objetivos de campaña:`,
        })
        setStep('config_goal')
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [step, chatMessages.length]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSuggestionClick = async (type: 'goal' | 'duration', value: string, text: string) => {
    addChatMessage({ role: 'user', content: text })

    if (type === 'goal') {
      setConfig((prev) => ({ ...prev, goal: value }))
      setTimeout(() => {
        addChatMessage({
          role: 'ai',
          content: `Entendido, nos enfocaremos en ${value}. ¿Cuál sería la duración ideal para esta campaña?`,
        })
        setStep('config_duration')
      }, 800)
    } else if (type === 'duration') {
      setConfig((prev) => ({ ...prev, duration: value }))

      // Save campaign
      setCampaign({
        id: Date.now().toString(),
        goal: config.goal,
        duration: value,
        status: 'draft',
      })

      addChatMessage({
        role: 'ai',
        content: 'Perfecto. Analizando datos históricos y tendencias actuales para generar tus opciones estratégicas...',
      })

      setIsLoading(true)

      // Try real AI generation
      try {
        const res = await fetch('/api/ai/generate-strategies', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            brandConfig,
            products,
            goal: config.goal,
            duration: value,
          }),
        })

        if (res.ok) {
          const data = await res.json()
          setStrategies(data.strategies)
        } else {
          throw new Error('API not available')
        }
      } catch {
        // Fallback to mock strategies
        setStrategies([
          { id: '1', name: 'Crecimiento', type: 'growth', reach: '2.8M', probability: 78, tags: ['Anuncios', 'Influencers'], description: 'Enfoque agresivo en captación de nueva audiencia.' },
          { id: '2', name: 'Interacción', type: 'engagement', reach: '1.2M', probability: 92, tags: ['Comunidad', 'Email'], description: 'Construcción de lealtad y retención.' },
          { id: '3', name: 'Ventas', type: 'sales', reach: '750k', probability: 65, tags: ['PPC', 'Promociones'], description: 'Conversión directa y ROI inmediato.' },
        ])
      }

      setIsLoading(false)
      setStep('selection')

      setTimeout(() => {
        addChatMessage({
          role: 'ai',
          content: `He diseñado 3 caminos estratégicos adaptados a ${brandName}:`,
        })
      }, 500)
    }
  }

  const handleSend = async () => {
    if (!inputText.trim()) return
    const text = inputText
    setInputText('')
    addChatMessage({ role: 'user', content: text })

    setIsLoading(true)
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: chatMessages,
          brandConfig,
          products,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        addChatMessage({ role: 'ai', content: data.response })
      } else {
        throw new Error('API not available')
      }
    } catch {
      addChatMessage({
        role: 'ai',
        content: 'Entendido. Por favor, selecciona una de las opciones disponibles o describe con más detalle lo que necesitas.',
      })
    }
    setIsLoading(false)
  }

  const handleSelectStrategy = (s: Strategy) => {
    selectStrategy(s)
    router.push('/strategy-approval')
  }

  const displayStrategies = strategies.length > 0 ? strategies : []

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 relative">
      {/* Header */}
      <header className="px-8 py-4 border-b border-slate-200 bg-white z-10 flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-text-main flex items-center gap-2">
            Sesión de Estrategia
            <span className="px-2 py-0.5 rounded text-xs bg-purple-100 text-purple-700 border border-purple-200 font-medium">IA Activa</span>
          </h2>
          <p className="text-text-muted text-xs">Perfil Activo: {brandName}</p>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        <div className="max-w-4xl mx-auto space-y-6 pb-20">
          {chatMessages.map((msg, idx) => (
            <div key={idx} className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-fade-in-up`}>
              <div className={`size-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'ai' ? 'bg-primary text-white' : 'bg-slate-200 text-slate-600'}`}>
                <Icon name={msg.role === 'ai' ? 'smart_toy' : 'person'} />
              </div>
              <div className={`p-5 rounded-2xl max-w-[80%] shadow-sm text-sm leading-relaxed ${
                msg.role === 'ai'
                  ? 'bg-white border border-slate-200 text-slate-700 rounded-tl-none'
                  : 'bg-primary text-white rounded-tr-none'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-4 animate-fade-in-up">
              <div className="size-10 rounded-full flex items-center justify-center shrink-0 shadow-sm bg-primary text-white">
                <Icon name="smart_toy" />
              </div>
              <div className="p-5 rounded-2xl shadow-sm text-sm bg-white border border-slate-200 rounded-tl-none">
                <div className="flex gap-1">
                  <span className="size-2 bg-slate-400 rounded-full animate-pulse"></span>
                  <span className="size-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                  <span className="size-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            </div>
          )}

          {/* Goal Suggestions */}
          {step === 'config_goal' && (
            <div className="pl-14 grid grid-cols-1 md:grid-cols-3 gap-3 animate-fade-in">
              {SUGGESTIONS.goals.map((item, i) => (
                <button key={i} onClick={() => handleSuggestionClick('goal', item.label, `Quiero enfocarme en: ${item.label}`)}
                  className="text-left bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-primary hover:bg-primary-light/10 hover:shadow-md transition-all group">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name={item.icon} className="text-primary group-hover:scale-110 transition-transform" />
                    <span className="font-bold text-text-main text-sm">{item.label}</span>
                  </div>
                  <p className="text-xs text-text-muted">{item.desc}</p>
                </button>
              ))}
            </div>
          )}

          {/* Duration Suggestions */}
          {step === 'config_duration' && (
            <div className="pl-14 flex flex-wrap gap-3 animate-fade-in">
              {SUGGESTIONS.durations.map((item, i) => (
                <button key={i} onClick={() => handleSuggestionClick('duration', item.label, `Duración: ${item.label}`)}
                  className="px-4 py-2 bg-white rounded-full border border-slate-200 text-sm font-medium text-text-main shadow-sm hover:border-primary hover:text-primary transition-all">
                  {item.label} <span className="text-slate-400 font-normal">| {item.desc}</span>
                </button>
              ))}
            </div>
          )}

          {/* Strategy Cards */}
          {step === 'selection' && displayStrategies.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in-up mt-4">
              {displayStrategies.map((strategy) => (
                <div key={strategy.id}
                  className={`group relative flex flex-col rounded-xl border p-6 transition-all hover:shadow-lg cursor-pointer bg-white ${strategy.type === 'engagement' ? 'border-primary ring-1 ring-primary/20' : 'border-slate-200 hover:border-primary/50'}`}
                  onClick={() => handleSelectStrategy(strategy)}
                >
                  {strategy.type === 'engagement' && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide shadow-md">
                      Recomendado por IA
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-text-main">{strategy.name}</h3>
                    <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold ${strategy.type === 'growth' ? 'bg-blue-100 text-blue-700' : strategy.type === 'engagement' ? 'bg-emerald-100 text-emerald-700' : 'bg-purple-100 text-purple-700'}`}>
                      {strategy.probability}%
                    </div>
                  </div>
                  <p className="text-text-muted text-xs mb-4">{strategy.description}</p>
                  <div className="flex gap-2 mb-4">
                    {strategy.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-slate-100 text-[10px] rounded text-slate-600 font-medium">{tag}</span>
                    ))}
                  </div>
                  <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-2xl font-black text-text-main">{strategy.reach}</span>
                    <span className="text-xs font-medium text-text-muted">Alcance est.</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-6 pt-2 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto relative group">
          <div className="bg-slate-50 border border-slate-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 rounded-xl flex items-center p-2 transition-all">
            <input
              className="flex-1 bg-transparent border-0 focus:ring-0 text-text-main placeholder-slate-400 p-2 outline-none"
              placeholder="Escribe tu respuesta..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
            />
            <button onClick={handleSend} disabled={isLoading} className="bg-primary hover:bg-primary-hover text-white p-2 rounded-lg transition-colors shadow-sm disabled:opacity-50">
              <Icon name="send" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
