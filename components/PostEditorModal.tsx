'use client'

import React, { useState } from 'react'
import { Icon } from './Icon'
import type { Post } from '@/types'
import { v4 as uuidv4 } from 'uuid'

interface PostEditorModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (post: Post) => void
    post?: Post
    prefilledDate?: Date
    brandId: string
}

const PLATFORMS = [
    { id: 'instagram', name: 'Instagram', icon: 'photo_camera' },
    { id: 'facebook', name: 'Facebook', icon: 'thumb_up' },
    { id: 'linkedin', name: 'LinkedIn', icon: 'work' },
    { id: 'twitter', name: 'Twitter', icon: 'chat' },
    { id: 'tiktok', name: 'TikTok', icon: 'music_note' },
]

const CONTENT_TYPES = [
    { id: 'photo', name: 'Foto', icon: 'image' },
    { id: 'video', name: 'Video', icon: 'videocam' },
    { id: 'carousel', name: 'Carrusel', icon: 'view_carousel' },
    { id: 'story', name: 'Historia', icon: 'auto_stories' },
    { id: 'reel', name: 'Reel', icon: 'movie' },
]

export function PostEditorModal({ isOpen, onClose, onSave, post, prefilledDate, brandId }: PostEditorModalProps) {
    const [formData, setFormData] = useState({
        title: post?.title || '',
        image: post?.image || '',
        date: post?.date ? new Date(post.date) : prefilledDate || new Date(),
        time: post?.time || '09:00',
        platform: post?.platform || 'instagram',
        type: post?.type || 'photo',
        status: post?.status || 'draft',
    })

    if (!isOpen) return null

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const newPost: Post = {
            id: post?.id || uuidv4(),
            brandId,
            contentPlanItemId: post?.contentPlanItemId,
            title: formData.title,
            image: formData.image,
            date: formData.date.getTime(),
            time: formData.time,
            platform: formData.platform as Post['platform'],
            type: formData.type as Post['type'],
            status: formData.status as Post['status'],
        }

        onSave(newPost)
        onClose()
    }

    const handleDateChange = (value: string) => {
        const newDate = new Date(value)
        setFormData({ ...formData, date: newDate })
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white">
                    <div>
                        <h2 className="text-xl font-bold text-text-main">
                            {post ? 'Editar Post' : 'Crear Nuevo Post'}
                        </h2>
                        <p className="text-sm text-text-muted mt-1" suppressHydrationWarning>
                            {formData.date.toLocaleDateString('es-ES', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="size-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors"
                    >
                        <Icon name="close" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Title */}
                    <label className="block">
                        <span className="text-sm font-medium text-text-main mb-2 block">
                            Título / Caption
                        </span>
                        <textarea
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full p-3 border border-slate-200 rounded-xl resize-none h-24 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
                            placeholder="Escribe el título o caption del post..."
                            required
                        />
                    </label>

                    {/* Platform & Type */}
                    <div className="grid grid-cols-2 gap-4">
                        <label className="block">
                            <span className="text-sm font-medium text-text-main mb-2 block">
                                Plataforma
                            </span>
                            <div className="grid grid-cols-2 gap-2">
                                {PLATFORMS.map(platform => (
                                    <button
                                        key={platform.id}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, platform: platform.id as Post['platform'] })}
                                        className={`p-3 rounded-lg border-2 transition-all flex items-center gap-2 text-sm ${formData.platform === platform.id
                                            ? 'border-primary bg-primary-light text-primary font-medium'
                                            : 'border-slate-200 hover:border-primary-light'
                                            }`}
                                    >
                                        <Icon name={platform.icon} />
                                        <span className="truncate">{platform.name}</span>
                                    </button>
                                ))}
                            </div>
                        </label>

                        <label className="block">
                            <span className="text-sm font-medium text-text-main mb-2 block">
                                Tipo de Contenido
                            </span>
                            <div className="grid grid-cols-2 gap-2">
                                {CONTENT_TYPES.map(type => (
                                    <button
                                        key={type.id}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type: type.id as Post['type'] })}
                                        className={`p-3 rounded-lg border-2 transition-all flex items-center gap-2 text-sm ${formData.type === type.id
                                            ? 'border-primary bg-primary-light text-primary font-medium'
                                            : 'border-slate-200 hover:border-primary-light'
                                            }`}
                                    >
                                        <Icon name={type.icon} />
                                        <span className="truncate">{type.name}</span>
                                    </button>
                                ))}
                            </div>
                        </label>
                    </div>

                    {/* Date & Time */}
                    <div className="grid grid-cols-2 gap-4">
                        <label className="block">
                            <span className="text-sm font-medium text-text-main mb-2 block">
                                Fecha
                            </span>
                            <input
                                type="date"
                                value={formData.date.toISOString().split('T')[0]}
                                onChange={(e) => handleDateChange(e.target.value)}
                                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
                                required
                            />
                        </label>

                        <label className="block">
                            <span className="text-sm font-medium text-text-main mb-2 block">
                                Hora
                            </span>
                            <input
                                type="time"
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
                                required
                            />
                        </label>
                    </div>

                    {/* Image URL */}
                    <label className="block">
                        <span className="text-sm font-medium text-text-main mb-2 block">
                            URL de Imagen (opcional)
                        </span>
                        <input
                            type="url"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
                            placeholder="https://ejemplo.com/imagen.jpg"
                        />
                        {formData.image && (
                            <div className="mt-3 rounded-lg overflow-hidden border border-slate-200">
                                <img src={formData.image} alt="Preview" className="w-full max-h-48 object-cover" />
                            </div>
                        )}
                    </label>

                    {/* Status */}
                    <label className="block">
                        <span className="text-sm font-medium text-text-main mb-2 block">
                            Estado
                        </span>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value as Post['status'] })}
                            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
                        >
                            <option value="draft">Borrador</option>
                            <option value="scheduled">Programado</option>
                            <option value="published">Publicado</option>
                        </select>
                    </label>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border border-slate-200 rounded-xl text-text-main font-medium hover:bg-slate-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20"
                        >
                            {post ? 'Guardar Cambios' : 'Crear Post'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
