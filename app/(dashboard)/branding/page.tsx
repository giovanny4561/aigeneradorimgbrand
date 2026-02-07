'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Icon } from '@/components/Icon'
import { useAppStore } from '@/store'
import type { BrandConfig } from '@/types'

export default function BrandingPage() {
  const router = useRouter()
  const { brandConfig, setBrandConfig } = useAppStore()

  const [step, setStep] = useState<'upload' | 'analyzing' | 'editor'>(
    brandConfig ? 'editor' : 'upload'
  )
  const [brandData, setBrandData] = useState<BrandConfig>(
    brandConfig || {
      name: '',
      website: '',
      primaryColor: '#8b5cf6',
      secondaryColor: '#0f172a',
      fontHeading: 'Inter',
      fontBody: 'Inter',
      logo: '',
      socialMedia: {
        instagram: '',
        tiktok: '',
        linkedin: '',
        twitter: '',
      },
    }
  )
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [manualFile, setManualFile] = useState<File | null>(null)

  const handleAnalyze = async () => {
    // 1. Save current manual inputs immediately
    setBrandConfig(brandData)
    setStep('analyzing')

    // TODO: Replace with real AI call in Phase 4
    // For now simulate analysis
    try {
      const res = await fetch('/api/ai/analyze-brand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName: brandData.name,
          website: brandData.website,
          logoUrl: brandData.logo,
          manualUrl: brandData.manualUrl,
        }),
      })

      if (res.ok) {
        const data = await res.json()

        // 2. Update local state AND Global Store with analysis results
        const newConfig = {
          ...brandData,
          primaryColor: data.primaryColor || brandData.primaryColor,
          secondaryColor: data.secondaryColor || brandData.secondaryColor,
          fontHeading: data.fontHeading || brandData.fontHeading,
          fontBody: data.fontBody || brandData.fontBody,
          toneOfVoice: data.toneOfVoice || brandData.toneOfVoice,
          logo: data.logo || brandData.logo
        }

        setBrandData(newConfig)
        setBrandConfig(newConfig)
      }
    } catch {
      // Fallback to mock analysis if API not ready
      await new Promise((r) => setTimeout(r, 2000))
      const fallbackConfig = {
        ...brandData,
        primaryColor: '#8b5cf6',
        secondaryColor: '#334155',
        fontHeading: 'Inter',
      }
      setBrandData(fallbackConfig)
      setBrandConfig(fallbackConfig)
    }

    setStep('editor')
  }

  const handleConfirm = () => {
    setBrandConfig(brandData)
    router.push('/catalog')
  }

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setLogoFile(file)

    // Upload to API
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      if (res.ok) {
        const { url } = await res.json()
        setBrandData((prev) => ({ ...prev, logo: url }))
      }
    } catch {
      // Fallback: use local preview
      const url = URL.createObjectURL(file)
      setBrandData((prev) => ({ ...prev, logo: url }))
    }
  }

  const handleManualUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setManualFile(file)

    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      if (res.ok) {
        const { url } = await res.json()
        setBrandData((prev) => ({ ...prev, manualUrl: url }))
      }
    } catch {
      // File selected but upload not available yet
    }
  }

  if (step === 'analyzing') {
    return (
      <div className="flex-1 h-full flex flex-col items-center justify-center bg-slate-50">
        <div className="relative size-24 mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon name="auto_awesome" className="text-primary text-3xl animate-pulse" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-text-main mb-2">Analizando Identidad</h2>
        <p className="text-text-muted">Extrayendo paleta de colores, tipografía y logos...</p>
      </div>
    )
  }

  if (step === 'editor') {
    return (
      <div className="flex-1 h-full overflow-y-auto bg-slate-50 p-6">
        <div className="max-w-6xl mx-auto h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-text-main">Editor Visual de Marca</h2>
              <p className="text-text-muted">Refina los elementos extraídos por la IA</p>
            </div>
            <button
              onClick={handleConfirm}
              className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all"
            >
              <span>Confirmar Identidad</span>
              <Icon name="check" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
            {/* Controls */}
            <div className="lg:col-span-4 space-y-6 overflow-y-auto pr-2 pb-12">
              {/* Colors */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-semibold text-text-main mb-4 flex items-center gap-2">
                  <Icon name="palette" className="text-primary" /> Colores
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-text-muted mb-1.5 block">Color Primario</label>
                    <div className="flex items-center gap-3">
                      <div className="relative size-10 rounded-full overflow-hidden shadow-inner ring-1 ring-black/5">
                        <input type="color" value={brandData.primaryColor} onChange={(e) => setBrandData({ ...brandData, primaryColor: e.target.value })} className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] cursor-pointer p-0 border-0" />
                      </div>
                      <input type="text" value={brandData.primaryColor} onChange={(e) => setBrandData({ ...brandData, primaryColor: e.target.value })} className="flex-1 h-10 px-3 rounded-lg border border-slate-200 text-sm font-mono uppercase text-slate-600" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-text-muted mb-1.5 block">Color Secundario</label>
                    <div className="flex items-center gap-3">
                      <div className="relative size-10 rounded-full overflow-hidden shadow-inner ring-1 ring-black/5">
                        <input type="color" value={brandData.secondaryColor} onChange={(e) => setBrandData({ ...brandData, secondaryColor: e.target.value })} className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] cursor-pointer p-0 border-0" />
                      </div>
                      <input type="text" value={brandData.secondaryColor} onChange={(e) => setBrandData({ ...brandData, secondaryColor: e.target.value })} className="flex-1 h-10 px-3 rounded-lg border border-slate-200 text-sm font-mono uppercase text-slate-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Typography */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-semibold text-text-main mb-4 flex items-center gap-2">
                  <Icon name="text_fields" className="text-primary" /> Tipografía
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-text-muted mb-1.5 block">Títulos (Heading)</label>
                    <select value={brandData.fontHeading} onChange={(e) => setBrandData({ ...brandData, fontHeading: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm bg-slate-50 outline-none focus:border-primary">
                      <option value="Inter">Inter</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Playfair Display">Playfair Display</option>
                      <option value="Montserrat">Montserrat</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-text-muted mb-1.5 block">Cuerpo (Body)</label>
                    <select value={brandData.fontBody} onChange={(e) => setBrandData({ ...brandData, fontBody: e.target.value })} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm bg-slate-50 outline-none focus:border-primary">
                      <option value="Inter">Inter</option>
                      <option value="Open Sans">Open Sans</option>
                      <option value="Lato">Lato</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Logo */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-semibold text-text-main mb-4 flex items-center gap-2">
                  <Icon name="star" className="text-primary" /> Logo Activo
                </h3>
                <div className="flex items-center gap-4">
                  <div className="size-16 rounded-lg border border-slate-200 p-2 flex items-center justify-center bg-slate-50">
                    {brandData.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={brandData.logo} alt="Logo" className="max-w-full max-h-full object-contain" />
                    ) : (
                      <Icon name="image" className="text-slate-300" />
                    )}
                  </div>
                  <label className="text-sm text-primary font-medium hover:underline cursor-pointer">
                    Cambiar archivo
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-semibold text-text-main mb-4 flex items-center gap-2">
                  <Icon name="share" className="text-primary" /> Redes Sociales
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-text-muted mb-1 block">Instagram</label>
                    <input type="text" value={brandData.socialMedia.instagram} onChange={(e) => setBrandData({ ...brandData, socialMedia: { ...brandData.socialMedia, instagram: e.target.value } })} className="w-full h-9 px-3 rounded-lg border border-slate-200 text-sm bg-slate-50 outline-none focus:border-primary" placeholder="@usuario" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-text-muted mb-1 block">TikTok</label>
                    <input type="text" value={brandData.socialMedia.tiktok} onChange={(e) => setBrandData({ ...brandData, socialMedia: { ...brandData.socialMedia, tiktok: e.target.value } })} className="w-full h-9 px-3 rounded-lg border border-slate-200 text-sm bg-slate-50 outline-none focus:border-primary" placeholder="@usuario" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-text-muted mb-1 block">LinkedIn</label>
                    <input type="text" value={brandData.socialMedia.linkedin} onChange={(e) => setBrandData({ ...brandData, socialMedia: { ...brandData.socialMedia, linkedin: e.target.value } })} className="w-full h-9 px-3 rounded-lg border border-slate-200 text-sm bg-slate-50 outline-none focus:border-primary" placeholder="url de empresa" />
                  </div>
                </div>
              </div>
            </div>

            {/* Live Preview */}
            <div className="lg:col-span-8">
              <div className="sticky top-6 rounded-2xl border border-slate-200 bg-slate-100 p-8 h-[600px] flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 opacity-50 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>

                {/* Mock Post Preview */}
                <div className="relative w-[380px] bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300">
                  <div className="h-48 relative flex items-center justify-center" style={{ backgroundColor: brandData.secondaryColor }}>
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px' }}></div>
                    <h2 className="text-4xl font-bold text-white relative z-10" style={{ fontFamily: brandData.fontHeading }}>NUEVO</h2>
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-bold uppercase tracking-wider mb-2 block" style={{ color: brandData.primaryColor, fontFamily: brandData.fontBody }}>Lanzamiento</span>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3" style={{ fontFamily: brandData.fontHeading }}>Redefine tu Estilo</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6" style={{ fontFamily: brandData.fontBody }}>
                      Descubre la nueva colección inspirada en la esencia minimalista de {brandData.name || 'tu marca'}. Calidad premium, diseño atemporal.
                    </p>
                    <button className="w-full py-3 rounded-lg text-white font-bold text-sm shadow-md transition-transform active:scale-95" style={{ backgroundColor: brandData.primaryColor, fontFamily: brandData.fontBody }}>
                      Ver Colección
                    </button>
                  </div>
                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {brandData.logo && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={brandData.logo} alt="" className="h-6 w-auto" />
                      )}
                      <span className="text-xs font-semibold text-slate-700">{brandData.name || 'Mi Marca'}</span>
                    </div>
                    <div className="flex gap-2">
                      {brandData.socialMedia.instagram && <Icon name="photo_camera" className="text-slate-400 text-xs" />}
                      {brandData.socialMedia.tiktok && <Icon name="movie" className="text-slate-400 text-xs" />}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center text-xs text-text-muted mt-4">Previsualización en tiempo real generada con tus activos.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Upload step (default)
  return (
    <div className="flex-1 h-full overflow-y-auto bg-slate-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <span className="text-primary-dark font-medium">Configuración</span>
          <span className="text-slate-300">/</span>
          <span className="text-text-main font-medium">Paso 1: Identidad Visual</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-text-main mb-3 tracking-tight">Configuración de Identidad</h2>
          <p className="text-text-muted text-lg max-w-2xl">
            Deja que LilaMKT aprenda tu estilo. Sube tus activos a continuación para calibrar el modelo de IA.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-text-main">Nombre de la Marca</span>
                <input
                  value={brandData.name}
                  onChange={(e) => setBrandData({ ...brandData, name: e.target.value })}
                  className="h-14 px-4 rounded-xl bg-white border border-slate-200 text-text-main placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-sm"
                  placeholder="ej. Acme Corp"
                  type="text"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-text-main">URL del Sitio Web</span>
                <div className="relative">
                  <input
                    value={brandData.website}
                    onChange={(e) => setBrandData({ ...brandData, website: e.target.value })}
                    className="w-full h-14 px-4 pr-10 rounded-xl bg-white border border-slate-200 text-text-main placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-sm"
                    placeholder="https://..."
                    type="url"
                  />
                  <Icon name="link" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </label>
            </div>

            {/* Logo Upload */}
            <div>
              <span className="text-sm font-semibold text-text-main mb-3 block">Icono del Logo</span>
              <div className="flex items-center gap-6 p-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
                <label className="relative group cursor-pointer shrink-0">
                  <div className="size-32 rounded-full border-2 border-dashed border-primary/40 bg-primary-light/30 flex flex-col items-center justify-center hover:bg-primary-light hover:border-primary transition-all duration-300 overflow-hidden">
                    {logoFile ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={URL.createObjectURL(logoFile)} alt="Logo preview" className="w-full h-full object-contain p-2" />
                    ) : (
                      <>
                        <Icon name="cloud_upload" className="text-primary-dark text-3xl mb-1 group-hover:scale-110 transition-transform" />
                        <span className="text-xs text-primary-dark font-medium">Subir</span>
                      </>
                    )}
                  </div>
                  <input type="file" accept="image/png,image/svg+xml,image/jpeg" onChange={handleLogoUpload} className="hidden" />
                </label>
                <div className="flex flex-col gap-1">
                  <h4 className="text-text-main font-medium">Marca / Icono</h4>
                  <p className="text-sm text-text-muted">
                    Sube un PNG o SVG de alta resolución. <br />Tamaño recomendado: 512x512px.
                  </p>
                  {logoFile && <p className="text-xs text-primary font-medium">{logoFile.name}</p>}
                </div>
              </div>
            </div>

            {/* PDF Upload */}
            <div>
              <span className="text-sm font-semibold text-text-main mb-3 block">Manual de Marca (PDF)</span>
              <label className="flex flex-col items-center justify-center w-full h-48 rounded-2xl border-2 border-dashed border-slate-300 bg-white hover:bg-primary-light/10 hover:border-primary transition-all cursor-pointer group relative overflow-hidden shadow-sm">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 z-10">
                  <div className="p-4 rounded-full bg-slate-50 mb-4 group-hover:scale-110 group-hover:bg-primary-light transition-all duration-300">
                    <Icon name="description" className="text-slate-400 text-4xl group-hover:text-primary-dark transition-colors" />
                  </div>
                  {manualFile ? (
                    <p className="text-lg text-primary-dark font-medium">{manualFile.name}</p>
                  ) : (
                    <p className="mb-2 text-lg text-text-main font-medium group-hover:text-primary-dark transition-colors">Haz clic para subir o arrastra y suelta</p>
                  )}
                  <p className="text-sm text-slate-400">PDF, PPTX (máx. 25MB)</p>
                </div>
                <input type="file" accept=".pdf,.pptx" onChange={handleManualUpload} className="hidden" />
              </label>
            </div>

            <div className="pt-4">
              <button
                onClick={handleAnalyze}
                className="w-full md:w-auto px-8 py-4 bg-primary text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 ring-4 ring-primary-light hover:bg-primary-hover"
              >
                <span>Guardar y Analizar</span>
                <Icon name="arrow_forward" />
              </button>
            </div>
          </div>

          {/* Analysis Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xl overflow-hidden relative group">
                <div className="absolute -top-20 -right-20 size-64 bg-primary-light blur-[80px] rounded-full pointer-events-none group-hover:bg-purple-100 transition-all duration-1000"></div>
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="flex items-center justify-center size-10 rounded-lg bg-primary-light text-primary-dark animate-pulse">
                    <Icon name="auto_awesome" />
                  </div>
                  <h3 className="text-lg font-bold text-text-main">Extracción por IA</h3>
                </div>
                <div className="space-y-6 relative z-10">
                  <p className="text-sm text-text-muted leading-relaxed">
                    Nuestro sistema analizará los activos subidos y tu sitio web para extraer automáticamente:
                  </p>
                  <ul className="space-y-4">
                    {[
                      { icon: 'palette', title: 'Paleta de Colores', subtitle: 'Códigos primarios, secundarios' },
                      { icon: 'text_fields', title: 'Tipografía', subtitle: 'Familias de fuentes y jerarquía' },
                      { icon: 'record_voice_over', title: 'Tono de Voz', subtitle: 'Estilo de escritura y personalidad' },
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Icon name={item.icon} className="text-primary text-sm mt-0.5" />
                        <div>
                          <span className="text-sm font-medium text-text-main block">{item.title}</span>
                          <span className="text-xs text-text-muted">{item.subtitle}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
