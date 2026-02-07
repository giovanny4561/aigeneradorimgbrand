import React, { useState, useEffect } from 'react';
import { Icon } from './Icon';

interface Props {
  onComplete: () => void;
}

export const ViewGeneration: React.FC<Props> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [imagesReady, setImagesReady] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setImagesReady(true);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const GENERATED_IMAGES = [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDxIzsx3e7UMpU8aQp1XAvNpVpRhfPB08S-SuO9BVY5L_qV804IRldQC0aSUrU9N_Fg1XMEuduXpytJShlFIxDvj-lnj5lGN881d-duor-_C3RqRLWaEaCiandDHIfrh9iQKZsoAf7p3fhY3s6DLJVdojrrafW3ULH_oZiJxG5Pwg3eLj6VCP7KetOmzhZuG0gYNhug3Yns7-6_paRSCCqEudQn13Nfju7h4aF5IKZ2e4L__Tw5AKgRcazscxTHd1tQqb86RB--ovg3',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAsUK4gDuhWSiQN3Fw86wKc5vqXPbwOTh072qokvdFWfEush7XkeVEA_---kiCkafjbmSfByo832BnxSMplAqfi5ztzr4cWPxRhAkq72ji5rP76hM8JGjMrXonswmhq73-NHgGa1PPwOr8ZU2K7y22f6SLKLrLct9Esttc7OFQ2qdpjYZCuulE97ECb-Jx1G6FQuvIKD16Wg_9qXqdX-YLamIWndPqnBjfwJt-U_TieyXVr4bm44__btYtDjfbRaOLYpjFx0V5QJGmy',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA30KSc8pMN84l5BnE6tTYpk0E5GMiPPcRNY0_viszZrQxne3Jk0HMhgKXdzTk7g7KsnqMXYNn45KLhl1nWRIFFczAY-oWAErcurxDZgtVBmAIHiT93-cbJj-p5GaioUDLvLVmgcd6yxOBnrkIlsrmnz3udF8EV8QiIYtrqPiRMN-YK_t5qMBqSOtCkfJEg0zXO7X5e3oVgB51yPw2129MQnHFq5_IT-xc-otMb6eSzpfnI7a9vhJ50Dwgmk1qHefV_3dysiP3vvAYq'
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full bg-slate-50 relative p-8">
        
        {!imagesReady ? (
            <div className="w-full max-w-md text-center space-y-8 animate-fade-in">
                <div className="relative mx-auto size-32">
                     <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
                     <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                     <div className="absolute inset-0 flex items-center justify-center text-primary font-bold text-xl">{progress}%</div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-text-main mb-2">Generando Activos</h2>
                    <p className="text-text-muted">Creando imágenes basadas en tus referencias y branding...</p>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-100 ease-out" style={{width: `${progress}%`}}></div>
                </div>
            </div>
        ) : (
            <div className="w-full max-w-6xl h-full flex flex-col animate-slide-up">
                <div className="flex items-center justify-between mb-8">
                     <div>
                        <h2 className="text-3xl font-bold text-text-main">Generación Completa</h2>
                        <p className="text-text-muted">Hemos creado estos activos para tu campaña.</p>
                    </div>
                    <button onClick={onComplete} className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover shadow-lg flex items-center gap-2">
                        <span>Ir al Calendario</span>
                        <Icon name="calendar_month" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {GENERATED_IMAGES.map((img, idx) => (
                        <div key={idx} className="group relative rounded-2xl overflow-hidden shadow-md bg-white border border-slate-200 aspect-[4/5]">
                            <img src={img} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-white text-sm font-medium">Generado con Imagen 3</p>
                                <div className="flex gap-2 mt-2">
                                    <button className="flex-1 py-1.5 bg-white/20 backdrop-blur-sm rounded text-xs text-white hover:bg-white/30">Regenerar</button>
                                    <button className="flex-1 py-1.5 bg-primary text-white rounded text-xs hover:bg-primary-hover">Aceptar</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
  );
};