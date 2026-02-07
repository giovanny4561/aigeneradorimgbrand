'use client'

import React, { useState } from 'react'
import { Icon } from '@/components/Icon'
import { PostEditorModal } from '@/components/PostEditorModal'
import { useAppStore } from '@/store'
import { exportCalendarCSV, exportCalendarPDF } from '@/lib/export'
import type { Post } from '@/types'

const MOCK_POSTS: Post[] = [
  { id: '1', brandId: 'mock', date: new Date(2024, 5, 10).getTime(), title: 'Oferta Flash de Verano: 20% Dto', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxIzsx3e7UMpU8aQp1XAvNpVpRhfPB08S-SuO9BVY5L_qV804IRldQC0aSUrU9N_Fg1XMEuduXpytJShlFIxDvj-lnj5lGN881d-duor-_C3RqRLWaEaCiandDHIfrh9iQKZsoAf7p3fhY3s6DLJVdojrrafW3ULH_oZiJxG5Pwg3eLj6VCP7KetOmzhZuG0gYNhug3Yns7-6_paRSCCqEudQn13Nfju7h4aF5IKZ2e4L__Tw5AKgRcazscxTHd1tQqb86RB--ovg3', time: '10:00', type: 'Static', platform: 'instagram', status: 'draft' },
  { id: '2', brandId: 'mock', date: new Date(2024, 5, 11).getTime(), title: 'Unboxing de la Nueva Serie X', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB166dAxkBb4HdRZGHv_JIm-PpMuKyif_8eHuLVPltM1IHT9Ovebdnoazbp-ZDDIznhpOYL0N6WR-fpQYhbSDp9N_gKln1cvmYKS4z5gauJ3MCytvct05kDFS1vRltaTX-X4f4w3EAT2y6Aen6LVjV0IvjBYUVOGIfL-NEEw9-YLZWww2Md3eeJOHIrubvnA-fJrlBQdVM9mzeGgzYx9OPxd_11N_1NS9729tdEaJ-cfIT3o93tiA-TYU2aAv9I6yIdZ6dJz0WaRTqD', time: '12:30', type: 'Video', platform: 'tiktok', status: 'draft' },
  { id: '4', brandId: 'mock', date: new Date(2024, 5, 13).getTime(), title: 'Colección Aires Vintage', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsUK4gDuhWSiQN3Fw86wKc5vqXPbwOTh072qokvdFWfEush7XkeVEA_---kiCkafjbmSfByo832BnxSMplAqfi5ztzr4cWPxRhAkq72ji5rP76hM8JGjMrXonswmhq73-NHgGa1PPwOr8ZU2K7y22f6SLKLrLct9Esttc7OFQ2qdpjYZCuulE97ECb-Jx1G6FQuvIKD16Wg_9qXqdX-YLamIWndPqnBjfwJt-U_TieyXVr4bm44__btYtDjfbRaOLYpjFx0V5QJGmy', time: '09:00', type: 'Static', platform: 'instagram', status: 'scheduled' },
  { id: '5', brandId: 'mock', date: new Date(2024, 5, 14).getTime(), title: 'Rutina de Fin de Semana', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA30KSc8pMN84l5BnE6tTYpk0E5GMiPPcRNY0_viszZrQxne3Jk0HMhgKXdzTk7g7KsnqMXYNn45KLhl1nWRIFFczAY-oWAErcurxDZgtVBmAIHiT93-cbJj-p5GaioUDLvLVmgcd6yxOBnrkIlsrmnz3udF8EV8QiIYtrqPiRMN-YK_t5qMBqSOtCkfJEg0zXO7X5e3oVgB51yPw2129MQnHFq5_IT-xc-otMb6eSzpfnI7a9vhJ50Dwgmk1qHefV_3dysiP3vvAYq', time: '17:30', type: 'Carousel', platform: 'instagram', status: 'draft' },
]

export default function CalendarPage() {
  const { posts, setPosts, addPost, updatePost, deletePost, selectedStrategy, brandConfig, user } = useAppStore()
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [prefilledDate, setPrefilledDate] = useState<Date | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [scheduleStatus, setScheduleStatus] = useState<'idle' | 'scheduling' | 'done'>('idle')

  // Seed posts if empty
  React.useEffect(() => {
    if (posts.length === 0) {
      setPosts(MOCK_POSTS)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Generate dynamic week based on today
  const today = new Date()
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - today.getDay() + 1) // Monday

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek)
    date.setDate(startOfWeek.getDate() + i)
    return {
      name: date.toLocaleDateString('es-ES', { weekday: 'short' }).replace('.', ''),
      date: date.getDate(),
      fullDate: date,
    }
  })

  const handleCreatePost = (fullDate: Date) => {
    setEditingPost(null)
    setPrefilledDate(fullDate)
    setIsModalOpen(true)
  }

  const handleEditPost = (post: Post) => {
    setEditingPost(post)
    setPrefilledDate(null)
    setIsModalOpen(true)
  }

  const handleSavePost = (post: Post) => {
    if (editingPost?.id) {
      updatePost(editingPost.id, post)
    } else {
      addPost(post)
    }
    setIsModalOpen(false)
    setEditingPost(null)
    setPrefilledDate(null)
  }

  const handleDeletePost = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    if (confirm('¿Eliminar este post?')) {
      deletePost(id)
    }
  }

  const handleScheduleAll = async () => {
    setScheduleStatus('scheduling')
    await new Promise((r) => setTimeout(r, 1500))
    posts.forEach((post) => {
      if (post.status !== 'scheduled') {
        updatePost(post.id, { status: 'scheduled' })
      }
    })
    setScheduleStatus('done')
    setTimeout(() => setScheduleStatus('idle'), 3000)
  }

  const handleExportCSV = () => {
    exportCalendarCSV(posts)
  }

  const handleExportPDF = () => {
    exportCalendarPDF(posts, brandConfig)
  }

  const getPostsForDate = (fullDate: Date) => {
    return posts.filter(p => {
      const postDate = new Date(p.date)
      return postDate.toDateString() === fullDate.toDateString()
    })
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 relative overflow-hidden">
      {/* Header */}
      <header className="h-20 flex-shrink-0 border-b border-slate-200 bg-white px-6 flex items-center justify-between z-10">
        <div className="flex flex-col">
          <h2 className="text-text-main text-xl font-bold tracking-tight flex items-center gap-2">
            Calendario de Contenido
            <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full border border-purple-200 font-medium">
              {posts.length} posts
            </span>
          </h2>
          <p className="text-text-muted text-sm">Estrategia: {selectedStrategy?.name || 'Sin estrategia'}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-text-main font-medium rounded-lg hover:bg-slate-200 transition-colors text-sm">
              <Icon name="download" />
              <span>Exportar</span>
              <Icon name="arrow_drop_down" />
            </button>
            <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 w-40">
              <button
                onClick={handleExportCSV}
                className="w-full px-4 py-2 text-sm text-left hover:bg-slate-50 flex items-center gap-2"
              >
                <Icon name="table_chart" className="text-sm" />
                CSV
              </button>
              <button
                onClick={handleExportPDF}
                className="w-full px-4 py-2 text-sm text-left hover:bg-slate-50 flex items-center gap-2"
              >
                <Icon name="picture_as_pdf" className="text-sm" />
                PDF
              </button>
            </div>
          </div>
          <button
            onClick={handleScheduleAll}
            disabled={scheduleStatus === 'scheduling'}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-primary-hover transition-colors disabled:opacity-50"
          >
            <Icon name={scheduleStatus === 'done' ? 'check_circle' : 'rocket_launch'} />
            <span>{scheduleStatus === 'scheduling' ? 'Programando...' : scheduleStatus === 'done' ? '¡Programado!' : 'Programar Todo'}</span>
          </button>
        </div>
      </header>

      {/* Calendar Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-7 gap-4 mb-4">
          {days.map((d) => (
            <div key={d.fullDate.toISOString()} className="text-center">
              <div className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-1">{d.name}</div>
              <div className={`text-lg font-bold ${d.fullDate.toDateString() === today.toDateString() ? 'text-primary' : 'text-text-main'}`}>
                {d.date}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-4 min-h-[500px]">
          {days.map((d) => {
            const dayPosts = getPostsForDate(d.fullDate)
            return (
              <div key={d.fullDate.toISOString()} className={`bg-slate-100/50 rounded-xl border-2 p-2 flex flex-col gap-3 min-h-[200px] ${d.fullDate.toDateString() === today.toDateString() ? 'border-primary/30 bg-primary/5' : 'border-slate-200'
                }`}>
                {dayPosts.map((post) => (
                  <div
                    key={post.id}
                    className="group relative bg-white rounded-lg border border-slate-200 hover:border-primary hover:shadow-md transition-all cursor-pointer overflow-hidden shadow-sm"
                    onClick={() => handleEditPost(post)}
                  >
                    <div className="aspect-[4/5] w-full bg-slate-200 relative">
                      {post.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={post.image} alt={post.title} />
                      )}
                      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded-md px-1.5 py-0.5 text-[10px] text-white font-medium flex items-center gap-1">
                        <Icon name={post.type === 'Video' ? 'play_circle' : post.type === 'Carousel' ? 'view_carousel' : 'image'} className="text-[12px]" />
                        {post.type}
                      </div>
                      {post.status === 'scheduled' && (
                        <div className="absolute top-2 left-2 bg-emerald-500 rounded-full p-0.5">
                          <Icon name="check" className="text-[10px] text-white" />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-white text-xs font-medium line-clamp-2">{post.title}</p>
                      </div>
                      {/* Delete button on hover */}
                      <button
                        onClick={(e) => handleDeletePost(e, post.id)}
                        className="absolute top-2 left-2 bg-red-500/80 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Icon name="close" className="text-[12px]" />
                      </button>
                    </div>
                    <div className="p-2 flex items-center justify-between border-t border-slate-100">
                      <span className="text-[10px] font-semibold text-text-muted">{post.time}</span>
                      <Icon name={post.platform === 'instagram' ? 'photo_camera' : post.platform === 'tiktok' ? 'music_note' : 'work'} className="text-sm text-slate-400" />
                    </div>
                  </div>
                ))}
                {dayPosts.length === 0 && (
                  <button
                    onClick={() => handleCreatePost(d.fullDate)}
                    className="bg-white/50 border-2 border-dashed border-purple-200 rounded-lg p-4 flex flex-col items-center justify-center text-purple-600 gap-1 cursor-pointer hover:bg-purple-50 transition-colors h-32"
                  >
                    <Icon name="add" />
                    <span className="text-xs font-bold">Crear</span>
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Post Editor Modal */}
      <PostEditorModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingPost(null)
          setPrefilledDate(null)
        }}
        onSave={handleSavePost}
        post={editingPost || undefined}
        prefilledDate={prefilledDate || undefined}
        brandId={user?.id || 'mock'}
      />
    </div>
  )
}
