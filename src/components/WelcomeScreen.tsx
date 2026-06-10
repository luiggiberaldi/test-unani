import { motion } from 'motion/react';
import { ArrowRight, Activity } from 'lucide-react';

interface WelcomeScreenProps {
  onNext: () => void;
  hasSavedProgress: boolean;
  onRestore: () => void;
  key?: string;
}

export function WelcomeScreen({ onNext, hasSavedProgress, onRestore }: WelcomeScreenProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto text-center space-y-8 pt-12 lg:pt-24 px-4"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 gold-gradient rounded-full mb-4 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
        <Activity className="w-8 h-8 text-black" />
      </div>
      
      <h1 className="text-4xl md:text-6xl font-light tracking-tight text-white">
        Descubre tu <span className="gold-text font-bold">Biotipo</span>
      </h1>
      
      <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto leading-relaxed">
        Un análisis profundo de tus patrones físicos, energéticos, emocionales y sociales.
      </p>

      <div className="pt-8 space-y-4 max-w-sm mx-auto">
        <button onClick={onNext} className="btn-primary w-full text-lg">
          Comenzar Test 
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>

        {hasSavedProgress && (
          <button onClick={onRestore} className="btn-secondary w-full text-sm">
            Continuar sesión guardada
          </button>
        )}
      </div>

      <div className="pt-12 text-sm text-gray-500 max-w-md mx-auto space-y-4">
        <div className="flex items-center justify-center gap-4 text-[10px] font-bold tracking-widest uppercase">
          <span>~12-15 Minutos</span>
          <span className="w-1 h-1 rounded-full bg-gray-600" />
          <span>80 Preguntas</span>
        </div>
        <p className="opacity-70 text-[10px] tracking-widest uppercase mt-4 text-center">
          Esta herramienta es interpretativa y educativa.<br/>No sustituye una evaluación profesional.
        </p>
      </div>
    </motion.div>
  );
}
