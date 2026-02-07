import React from 'react';
import { Icon } from './Icon';
import { Post } from '../types';

const POSTS: Post[] = [
    { id: '1', date: 10, title: 'Oferta Flash de Verano: 20% Dto', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxIzsx3e7UMpU8aQp1XAvNpVpRhfPB08S-SuO9BVY5L_qV804IRldQC0aSUrU9N_Fg1XMEuduXpytJShlFIxDvj-lnj5lGN881d-duor-_C3RqRLWaEaCiandDHIfrh9iQKZsoAf7p3fhY3s6DLJVdojrrafW3ULH_oZiJxG5Pwg3eLj6VCP7KetOmzhZuG0gYNhug3Yns7-6_paRSCCqEudQn13Nfju7h4aF5IKZ2e4L__Tw5AKgRcazscxTHd1tQqb86RB--ovg3', time: '10:00 AM', type: 'Static', platform: 'instagram' },
    { id: '2', date: 11, title: 'Unboxing de la Nueva Serie X', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB166dAxkBb4HdRZGHv_JIm-PpMuKyif_8eHuLVPltM1IHT9Ovebdnoazbp-ZDDIznhpOYL0N6WR-fpQYhbSDp9N_gKln1cvmYKS4z5gauJ3MCytvct05kDFS1vRltaTX-X4f4w3EAT2y6Aen6LVjV0IvjBYUVOGIfL-NEEw9-YLZWww2Md3eeJOHIrubvnA-fJrlBQdVM9mzeGgzYx9OPxd_11N_1NS9729tdEaJ-cfIT3o93tiA-TYU2aAv9I6yIdZ6dJz0WaRTqD', time: '12:30 PM', type: 'Video', platform: 'tiktok' },
    { id: '4', date: 13, title: 'Colección Aires Vintage', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsUK4gDuhWSiQN3Fw86wKc5vqXPbwOTh072qokvdFWfEush7XkeVEA_---kiCkafjbmSfByo832BnxSMplAqfi5ztzr4cWPxRhAkq72ji5rP76hM8JGjMrXonswmhq73-NHgGa1PPwOr8ZU2K7y22f6SLKLrLct9Esttc7OFQ2qdpjYZCuulE97ECb-Jx1G6FQuvIKD16Wg_9qXqdX-YLamIWndPqnBjfwJt-U_TieyXVr4bm44__btYtDjfbRaOLYpjFx0V5QJGmy', time: '09:00 AM', type: 'Static', platform: 'instagram' },
    { id: '5', date: 14, title: 'Rutina de Fin de Semana', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA30KSc8pMN84l5BnE6tTYpk0E5GMiPPcRNY0_viszZrQxne3Jk0HMhgKXdzTk7g7KsnqMXYNn45KLhl1nWRIFFczAY-oWAErcurxDZgtVBmAIHiT93-cbJj-p5GaioUDLvLVmgcd6yxOBnrkIlsrmnz3udF8EV8QiIYtrqPiRMN-YK_t5qMBqSOtCkfJEg0zXO7X5e3oVgB51yPw2129MQnHFq5_IT-xc-otMb6eSzpfnI7a9vhJ50Dwgmk1qHefV_3dysiP3vvAYq', time: '05:30 PM', type: 'Carousel', platform: 'instagram' },
];

export const ViewCalendar: React.FC = () => {
    const days = [
        { name: 'Lun', date: 10 }, { name: 'Mar', date: 11 }, { name: 'Mié', date: 12 },
        { name: 'Jue', date: 13 }, { name: 'Vie', date: 14 }, { name: 'Sáb', date: 15 }, { name: 'Dom', date: 16 }
    ];

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 relative overflow-hidden">
        {/* Header */}
        <header className="h-20 flex-shrink-0 border-b border-slate-200 bg-white px-6 flex items-center justify-between z-10">
            <div className="flex flex-col">
                <h2 className="text-text-main text-xl font-bold tracking-tight flex items-center gap-2">
                    Parrilla de Contenido Final
                    <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full border border-purple-200 font-medium">Beta</span>
                </h2>
                <p className="text-text-muted text-sm">Estrategia: Interacción (Julio 2023)</p>
            </div>
            <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-primary-hover transition-colors">
                    <Icon name="rocket_launch" />
                    <span>Programar Todo</span>
                </button>
            </div>
        </header>

        {/* Calendar Grid */}
        <div className="flex-1 overflow-y-auto p-6">
            {/* Days Header */}
            <div className="grid grid-cols-7 gap-4 mb-4">
                {days.map(d => (
                    <div key={d.date} className="text-center">
                        <div className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-1">{d.name}</div>
                        <div className="text-text-main text-lg font-bold">{d.date}</div>
                    </div>
                ))}
            </div>

            {/* Posts Columns */}
            <div className="grid grid-cols-7 gap-4 min-h-[500px]">
                {days.map(d => {
                    const dayPosts = POSTS.filter(p => p.date === d.date);
                    return (
                        <div key={d.date} className="bg-slate-100/50 rounded-xl border border-slate-200 p-2 flex flex-col gap-3 min-h-[200px]">
                            {dayPosts.map(post => (
                                <div key={post.id} className="group relative bg-white rounded-lg border border-slate-200 hover:border-primary hover:shadow-md transition-all cursor-pointer overflow-hidden shadow-sm">
                                    <div className="aspect-[4/5] w-full bg-slate-200 relative">
                                        <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={post.image} alt={post.title} />
                                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded-md px-1.5 py-0.5 text-[10px] text-white font-medium flex items-center gap-1">
                                            <Icon name={post.type === 'Video' ? 'play_circle' : post.type === 'Carousel' ? 'view_carousel' : 'image'} className="text-[12px]" />
                                            {post.type}
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                                            <p className="text-white text-xs font-medium line-clamp-2">{post.title}</p>
                                        </div>
                                    </div>
                                    <div className="p-2 flex items-center justify-between border-t border-slate-100">
                                        <span className="text-[10px] font-semibold text-text-muted">{post.time}</span>
                                        <Icon name="star" className="text-sm text-pink-500" />
                                    </div>
                                </div>
                            ))}
                            {dayPosts.length === 0 && d.date === 12 && (
                                <div className="bg-white/50 border-2 border-dashed border-purple-200 rounded-lg p-4 flex flex-col items-center justify-center text-purple-600 gap-1 cursor-pointer hover:bg-purple-50 transition-colors h-32">
                                    <Icon name="add" />
                                    <span className="text-xs font-bold">Crear</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
  );
};