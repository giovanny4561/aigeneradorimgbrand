'use client'

import React, { useEffect, useState } from 'react';
import { Icon } from './Icon';
import { createClient } from '@/lib/supabase/client';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '@/store';

export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [showNewCycleModal, setShowNewCycleModal] = useState(false);
  const { resetCampaign } = useAppStore();

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  };

  const handleNewCycle = () => {
    setShowNewCycleModal(true);
  };

  const confirmNewCycle = () => {
    resetCampaign();
    setShowNewCycleModal(false);
    router.push('/branding');
  };

  const isActive = (path: string) => pathname?.startsWith(path);

  const navItemClass = (active: boolean) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer group ${active
      ? 'bg-primary-light text-primary-dark font-medium ring-1 ring-primary/20'
      : 'text-text-muted hover:bg-slate-100 hover:text-text-main'
    }`;

  const navItems = [
    { name: 'Identidad de Marca', path: '/branding', icon: 'style' },
    { name: 'Catálogo', path: '/catalog', icon: 'inventory_2' },
    { name: 'Estrategia', path: '/strategy', icon: 'psychology' },
    { name: 'Plan de Contenido', path: '/refinement', icon: 'edit_note' },
    { name: 'Generación', path: '/generation', icon: 'image_search' },
    { name: 'Calendario', path: '/calendar', icon: 'calendar_month' },
    { name: 'Análisis', path: '/analysis', icon: 'analytics' },
  ]

  return (
    <>
      <div className="flex flex-col w-full h-full bg-white">
        <div className="p-6 flex flex-col gap-6 h-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-gradient-to-tr from-primary to-primary-dark flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Icon name="auto_awesome" className="text-xl" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-base font-bold leading-tight text-text-main">LilaMKT</h1>
              <p className="text-text-muted text-xs">Plan Pro</p>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleNewCycle}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl h-12 px-4 bg-primary hover:bg-primary-hover transition-colors text-white text-sm font-bold shadow-md shadow-primary/20 active:scale-95 transform duration-200"
          >
            <Icon name="add" />
            <span>Nuevo Ciclo</span>
          </button>

          {/* Nav */}
          <nav className="flex flex-col gap-1 flex-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <div className={navItemClass(isActive(item.path))}>
                  <Icon name={item.icon} className={isActive(item.path) ? '' : 'group-hover:text-primary'} />
                  <span className="text-sm">{item.name}</span>
                </div>
              </Link>
            ))}
          </nav>

          {/* Profile */}
          <div className="border-t border-slate-100 pt-4 mt-auto">
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group relative">
              <div className="size-9 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-600 font-bold border-2 border-white shadow-sm">
                {user?.email?.[0].toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-text-main truncate">{user?.user_metadata?.name || 'Usuario'}</p>
                <p className="text-xs text-text-muted truncate">{user?.email}</p>
              </div>
              <div className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={handleLogout} className="p-1.5 text-slate-400 hover:text-red-500 bg-white rounded-lg shadow-sm border border-slate-100">
                  <Icon name="logout" className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Cycle Modal */}
      {showNewCycleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 animate-scale-in">
            <div className="size-12 rounded-full bg-primary-light flex items-center justify-center mb-4 mx-auto text-primary">
              <Icon name="restart_alt" className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-center text-text-main mb-2">¿Iniciar Nuevo Ciclo?</h3>
            <p className="text-center text-text-muted text-sm mb-6">
              Esto reiniciará la campaña actual, manteniendo tu marca y productos. Se archivarán los datos actuales.
              Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowNewCycleModal(false)}
                className="flex-1 py-3 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmNewCycle}
                className="flex-1 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold shadow-lg shadow-primary/20 transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};