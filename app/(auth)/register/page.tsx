'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Icon } from '@/components/Icon'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      })

      if (authError) {
        setError(authError.message)
      } else {
        setSuccess(true)
      }
    } catch {
      setError('Error al crear cuenta')
    }

    setIsLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-md text-center">
          <div className="size-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <Icon name="check" className="text-emerald-600 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-text-main mb-2">Cuenta Creada</h2>
          <p className="text-text-muted mb-6">Revisa tu email para confirmar tu cuenta.</p>
          <a href="/login" className="text-primary font-medium hover:underline">Ir a Iniciar Sesión</a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="size-12 rounded-xl bg-gradient-to-tr from-primary to-primary-dark flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Icon name="auto_awesome" className="text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-main">LilaMKT</h1>
            <p className="text-text-muted text-xs">AI Marketing Platform</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
          <h2 className="text-xl font-bold text-text-main mb-2">Crear Cuenta</h2>
          <p className="text-text-muted text-sm mb-6">Empieza a crear campañas con IA</p>

          <form onSubmit={handleRegister} className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-text-main mb-1.5 block">Nombre</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-text-main placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="Tu nombre"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-text-main mb-1.5 block">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-text-main placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="tu@email.com"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-text-main mb-1.5 block">Contraseña</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-slate-50 border border-slate-200 text-text-main placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="Mínimo 6 caracteres"
                minLength={6}
                required
              />
            </label>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20 disabled:opacity-50"
            >
              {isLoading ? 'Creando...' : 'Crear Cuenta'}
            </button>
          </form>

          <p className="text-center text-sm text-text-muted mt-6">
            ¿Ya tienes cuenta?{' '}
            <a href="/login" className="text-primary font-medium hover:underline">Inicia Sesión</a>
          </p>
        </div>
      </div>
    </div>
  )
}
