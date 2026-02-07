'use client'

import React, { Component, ReactNode } from 'react'
import { Icon } from './Icon'

interface Props {
    children: ReactNode
    fallback?: ReactNode
}

interface State {
    hasError: boolean
    error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback
            }

            return (
                <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
                    <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-xl p-8 text-center">
                        <div className="size-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                            <Icon name="error_outline" className="text-red-600 text-3xl" />
                        </div>
                        <h2 className="text-xl font-bold text-text-main mb-2">
                            Algo salió mal
                        </h2>
                        <p className="text-sm text-text-muted mb-6">
                            Ha ocurrido un error inesperado. Por favor, recarga la página.
                        </p>
                        {this.state.error && (
                            <details className="text-left bg-slate-50 rounded-lg p-4 mb-6">
                                <summary className="text-xs font-medium text-text-muted cursor-pointer">
                                    Detalles técnicos
                                </summary>
                                <pre className="text-xs text-red-600 mt-2 overflow-auto">
                                    {this.state.error.toString()}
                                </pre>
                            </details>
                        )}
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-colors"
                        >
                            Recargar Página
                        </button>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}
