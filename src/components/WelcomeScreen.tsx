import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

interface WelcomeScreenProps {
  onNext: () => void;
  hasSavedProgress: boolean;
  onRestore: () => void;
  key?: string;
}

export function WelcomeScreen({ onNext, hasSavedProgress, onRestore }: WelcomeScreenProps) {
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
