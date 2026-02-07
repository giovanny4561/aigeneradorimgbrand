'use client'

import React, { useState, useRef } from 'react'
import { Icon } from './Icon'

interface FileUploadProps {
    accept: string
    maxSize?: number // in bytes
    onUpload: (url: string) => void
    preview?: boolean
    className?: string
}

export function FileUpload({
    accept,
    maxSize = 25 * 1024 * 1024, // 25MB default
    onUpload,
    preview = true,
    className = '',
}: FileUploadProps) {
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const handleFileSelect = async (selectedFile: File) => {
        setError('')

        // Validate size
        if (selectedFile.size > maxSize) {
            setError(`File too large. Max ${Math.round(maxSize / 1024 / 1024)}MB`)
            return
        }

        setFile(selectedFile)
        setUploading(true)
        setProgress(0)

        try {
            const formData = new FormData()
            formData.append('file', selectedFile)

            // Simulate progress
            const progressInterval = setInterval(() => {
                setProgress(prev => Math.min(prev + 10, 90))
            }, 200)

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            clearInterval(progressInterval)

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || 'Upload failed')
            }

            const { url } = await response.json()
            setProgress(100)
            onUpload(url)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Upload failed')
        } finally {
            setUploading(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        const droppedFile = e.dataTransfer.files[0]
        if (droppedFile) {
            handleFileSelect(droppedFile)
        }
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            handleFileSelect(selectedFile)
        }
    }

    const isImage = file?.type.startsWith('image/')

    return (
        <div className={className}>
            <div
                onClick={() => inputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="relative border-2 border-dashed border-slate-300 rounded-xl p-6 hover:border-primary hover:bg-primary-light/5 transition-all cursor-pointer group"
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    onChange={handleInputChange}
                    className="hidden"
                />

                {uploading ? (
                    <div className="flex flex-col items-center gap-3">
                        <div className="relative size-16">
                            <svg className="size-16 -rotate-90">
                                <circle
                                    cx="32"
                                    cy="32"
                                    r="28"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                    className="text-slate-200"
                                />
                                <circle
                                    cx="32"
                                    cy="32"
                                    r="28"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                    strokeDasharray={`${2 * Math.PI * 28}`}
                                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                                    className="text-primary transition-all duration-300"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xs font-bold text-primary">{progress}%</span>
                            </div>
                        </div>
                        <p className="text-sm text-text-muted">Uploading...</p>
                    </div>
                ) : file && preview && isImage ? (
                    <div className="flex flex-col items-center gap-3">
                        <img
                            src={URL.createObjectURL(file)}
                            alt="Preview"
                            className="max-h-32 rounded-lg object-contain"
                        />
                        <p className="text-xs text-text-muted">{file.name}</p>
                    </div>
                ) : file ? (
                    <div className="flex items-center gap-3">
                        <Icon name="description" className="text-primary text-3xl" />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-text-main truncate">{file.name}</p>
                            <p className="text-xs text-text-muted">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-3 text-center">
                        <div className="size-12 rounded-full bg-primary-light flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Icon name="cloud_upload" className="text-primary text-2xl" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-text-main group-hover:text-primary transition-colors">
                                Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-text-muted mt-1">
                                {accept.split(',').map(t => t.split('/')[1].toUpperCase()).join(', ')}
                                {' · '}Max {Math.round(maxSize / 1024 / 1024)}MB
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {error && (
                <p className="text-sm text-red-600 mt-2">{error}</p>
            )}
        </div>
    )
}
