'use client'

import React from 'react'
import { Icon } from './Icon'

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg'
    message?: string
    fullScreen?: boolean
}

export function LoadingSpinner({ size = 'md', message, fullScreen = false }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'size-8',
        md: 'size-12',
        lg: 'size-16',
    }

    const spinner = (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className={`${sizeClasses[size]} relative`}>
                <div className="absolute inset-0 rounded-full border-4 border-primary-light"></div>
                <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
            {message && (
                <p className="text-sm text-text-muted font-medium">{message}</p>
            )}
        </div>
    )

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
                {spinner}
            </div>
        )
    }

    return spinner
}
