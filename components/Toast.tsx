'use client'

import React, { useEffect, useState } from 'react'
import { Icon } from './Icon'

interface ToastProps {
    message: string
    type?: 'success' | 'error' | 'info' | 'warning'
    duration?: number
    onClose: () => void
}

export function Toast({ message, type = 'info', duration = 3000, onClose }: ToastProps) {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false)
            setTimeout(onClose, 300) // Wait for fade out animation
        }, duration)

        return () => clearTimeout(timer)
    }, [duration, onClose])

    const config = {
        success: {
            icon: 'check_circle',
            bgColor: 'bg-emerald-50',
            borderColor: 'border-emerald-200',
            textColor: 'text-emerald-800',
            iconColor: 'text-emerald-600',
        },
        error: {
            icon: 'error',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200',
            textColor: 'text-red-800',
            iconColor: 'text-red-600',
        },
        warning: {
            icon: 'warning',
            bgColor: 'bg-amber-50',
            borderColor: 'border-amber-200',
            textColor: 'text-amber-800',
            iconColor: 'text-amber-600',
        },
        info: {
            icon: 'info',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
            textColor: 'text-blue-800',
            iconColor: 'text-blue-600',
        },
    }

    const { icon, bgColor, borderColor, textColor, iconColor } = config[type]

    return (
        <div
            className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
        >
            <div className={`${bgColor} ${borderColor} border rounded-xl shadow-lg p-4 flex items-center gap-3 min-w-[300px] max-w-md`}>
                <Icon name={icon} className={`${iconColor} text-xl`} />
                <p className={`${textColor} text-sm font-medium flex-1`}>{message}</p>
                <button
                    onClick={() => {
                        setIsVisible(false)
                        setTimeout(onClose, 300)
                    }}
                    className={`${textColor} hover:opacity-70 transition-opacity`}
                >
                    <Icon name="close" className="text-sm" />
                </button>
            </div>
        </div>
    )
}

// Toast Manager Component
export function ToastContainer({ toasts, removeToast }: {
    toasts: Array<{ id: string; message: string; type?: 'success' | 'error' | 'info' | 'warning' }>
    removeToast: (id: string) => void
}) {
    return (
        <>
            {toasts.map((toast, index) => (
                <div
                    key={toast.id}
                    style={{ bottom: `${24 + index * 80}px` }}
                    className="fixed right-6 z-50"
                >
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => removeToast(toast.id)}
                    />
                </div>
            ))}
        </>
    )
}
