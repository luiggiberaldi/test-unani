import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { TestResult } from '../types';
import { BIOTYPES } from '../data/biotypes';

interface WelcomeScreenProps {
  onNext: () => void;
  hasSavedProgress: boolean;
  onRestore: () => void;
  savedResult: TestResult | null;
  onViewSaved: () => void;
  key?: string;
}

export function WelcomeScreen({ onNext, hasSavedProgress, onRestore, savedResult, onViewSaved }: WelcomeScreenProps) {
  const domProfile = savedResult ? BIOTYPES[savedResult.dominant] : null;
  const savedDate = localStorage.getItem('biotype_last_result_date');
  const formattedDate = savedDate 
    ? new Intl.DateTimeFormat('es', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(savedDate))
    : '';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="max-w-xl mx-auto text-center space-y-8 pt-16 lg:pt-28 px-4"
    >
      <div className="inline-flex items-center justify-center mb-6 drop-shadow-[0_0_35px_rgba(212,175,55,0.25)]">
        <Logo className="w-24 h-24" />
      </div>
      
      <div className="space-y-3">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white uppercase font-display">
          Descubre tu <span className="gold-text font-bold">Biotipo</span>
        </h1>
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto" />
      </div>
      
      <p className="text-base md:text-lg text-gray-400 max-w-lg mx-auto leading-relaxed font-light">
        Un análisis profundo de tus patrones físicos, energéticos, emocionales y de interrelación social basados en la integración de biocuántica, termodinámica biológica y temperamentos clásicos.
      </p>

      {savedResult && domProfile && (
        <div className="bg-[#0f0e0a] border border-[#d4af37]/35 rounded-2xl p-5 text-left max-w-sm mx-auto relative overflow-hidden shadow-xl shadow-black/40">
          <div className="absolute right-3 -bottom-4 text-7xl opacity-5 select-none pointer-events-none">
            {domProfile.symbol}
          </div>
          <span className="text-[10px] tracking-[0.2em] font-extrabold text-[#d4af37] uppercase block mb-1">
            Tienes un resultado guardado
          </span>
          <h3 className="text-sm font-semibold text-white/90">
            Tu biotipo dominante era <span className="text-amber-400 capitalize">{domProfile.symbol} {domProfile.id}</span>
          </h3>
          {formattedDate && (
            <p className="text-[11px] text-gray-500 mt-0.5">
              Evaluado el {formattedDate}
            </p>
          )}
          <div className="flex flex-col gap-2 mt-4">
            <button 
              onClick={onViewSaved} 
              className="w-full px-4 py-2.5 bg-gradient-to-r from-amber-500/10 to-amber-600/25 hover:from-amber-500/20 hover:to-amber-600/35 border border-[#d4af37]/40 rounded-xl text-xs font-bold text-amber-200 transition-all duration-200 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Ver resultado anterior
            </button>
            <button 
              onClick={onNext} 
              className="w-full px-4 py-2 border border-white/10 hover:bg-white/5 rounded-xl text-xs text-gray-400 transition-all cursor-pointer"
            >
              Hacer el test de nuevo
            </button>
          </div>
        </div>
      )}

      {/* Default action area if no saved results or as fallback */}
      {!savedResult && (
        <div className="pt-6 space-y-4 max-w-xs mx-auto">
          <button onClick={onNext} className="btn-primary w-full text-base py-3.5 shadow-xl hover:shadow-[#d4af37]/10 transition-all duration-300">
            Comenzar Test 
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>

          {hasSavedProgress && (
            <button onClick={onRestore} className="btn-secondary w-full text-xs py-2.5">
              Continuar sesión guardada
            </button>
          )}
        </div>
      )}

      <div className="pt-10 text-gray-500 max-w-sm mx-auto">
        <div className="flex items-center justify-center gap-4 text-[9px] font-bold tracking-[0.2em] uppercase">
          <span>~12-15 Minutos</span>
          <span className="w-1 h-1 rounded-full bg-gray-700" />
          <span>80 Preguntas</span>
        </div>
      </div>
    </motion.div>
  );
}
