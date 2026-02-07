import React, { useState } from 'react';
import { Icon } from './Icon';
import { Strategy, ContentPlanItem } from '../types';

interface Props {
  strategy: Strategy;
  onApprove: () => void;
  onBack: () => void;
}

const MOCK_PLAN: ContentPlanItem[] = [
    { id: '1', day: 1, platform: 'instagram', format: 'Reel', intention: 'Viralidad', visualDescription: 'Close-up dinámico de Velocity Runner pisando un charco en cámara lenta, salpicaduras neón.', copyPreview: 'Rompe barreras. #VelocityRunner' },
    { id: '2', day: 2, platform: 'tiktok', format: 'Post', intention: 'Social Proof', visualDescription: 'Foto lifestyle de un influencer urbano usando las zapatillas en un café, luz natural.', copyPreview: 'Tu nuevo esencial diario.' },
    { id: '3', day: 3, platform: 'instagram', format: 'Story', intention: 'Venta Directa', visualDescription: 'Fondo minimalista color esmeralda con el producto flotando y texto grande "20% OFF".', copyPreview: 'Solo por hoy. Link en bio.' },
];

export const ViewStrategyApproval: React.FC<Props> = ({ strategy, onApprove, onBack }) => {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 relative overflow-hidden">
        {/* Header */}
        <header className="h-16 flex-shrink-0 border-b border-slate-200 bg-white px-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-100 text-slate-500">
                    <Icon name="arrow_back" />
                </button>
                <div className="flex flex-col">
                    <h2 className="text-text-main text-lg font-bold">Aprobación de Estrategia</h2>
                    <p className="text-text-muted text-xs">Revisa los detalles antes de generar</p>
                </div>
            </div>
            <div className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-bold border border-purple-200 uppercase tracking-wide">
                {strategy.name}
            </div>
        </header>

        {/* Content Plan List */}
        <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-text-main mb-2">Resumen Estratégico</h3>
                    <p className="text-text-muted leading-relaxed">{strategy.description}</p>
                    <div className="flex gap-4 mt-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1 rounded-lg">
                            <Icon name="groups" className="text-primary" />
                            Alcance: {strategy.reach}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1 rounded-lg">
                            <Icon name="trending_up" className="text-primary" />
                            Probabilidad: {strategy.probability}%
                        </div>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-text-main mb-6">Plan de Contenidos (Drips)</h3>
                
                <div className="space-y-4">
                    {MOCK_PLAN.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-6 flex gap-6 hover:shadow-md transition-shadow">
                            <div className="flex flex-col items-center justify-center w-16 shrink-0 border-r border-slate-100 pr-6">
                                <span className="text-xs font-bold text-text-muted uppercase mb-1">Día</span>
                                <span className="text-2xl font-black text-text-main">{item.day}</span>
                            </div>
                            
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Icon name={item.platform === 'instagram' ? 'photo_camera' : 'movie'} className="text-slate-400 text-sm" />
                                        <span className="text-sm font-bold text-text-main capitalize">{item.platform} • {item.format}</span>
                                        <span className="ml-auto text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">{item.intention}</span>
                                    </div>
                                    <p className="text-sm text-slate-600 italic">"{item.copyPreview}"</p>
                                </div>
                                
                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 relative group">
                                    <span className="text-[10px] font-bold text-primary uppercase mb-1 block">Prompt de Imagen (IA)</span>
                                    <p className="text-sm text-slate-700 leading-snug">{item.visualDescription}</p>
                                    <button className="absolute top-2 right-2 p-1 text-slate-400 hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Icon name="edit" className="text-sm" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-white border-t border-slate-200 p-6 flex justify-end gap-4 z-10">
            <button onClick={onBack} className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                Modificar Estrategia
            </button>
            <button onClick={onApprove} className="px-8 py-3 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary-hover hover:-translate-y-0.5 transition-all flex items-center gap-2">
                <Icon name="auto_awesome" />
                <span>Aprobar y Generar Imágenes</span>
            </button>
        </div>
    </div>
  );
};