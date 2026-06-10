import { motion } from 'motion/react';
import { ShieldCheck, ArrowRight, BrainCircuit, ActivitySquare, Users2 } from 'lucide-react';

interface InstructionsScreenProps {
  onNext: () => void;
  onSetDeepMode: (isDeep: boolean) => void;
  isDeepMode: boolean;
  key?: string;
}

export function InstructionsScreen({ onNext, onSetDeepMode, isDeepMode }: InstructionsScreenProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl mx-auto space-y-8 pt-8 px-4"
    >
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl font-display font-bold">Antes de empezar</h2>
        <p className="text-slate-400">Lee esto para asegurar la precisión de tu resultado.</p>
      </div>

      <div className="grid gap-4">
        <div className="glass-card p-6 flex gap-4 items-start">
          <ActivitySquare className="w-6 h-6 text-[#d4af37] shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-lg mb-1">Tu tendencia natural</h3>
            <p className="text-gray-400 text-sm">Responde pensando en tu estado base a lo largo de tu vida, no en cómo te sientes hoy o este último mes por una situación particular.</p>
          </div>
        </div>

        <div className="glass-card p-6 flex gap-4 items-start">
          <BrainCircuit className="w-6 h-6 text-[#d4af37] shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-lg mb-1">Sin juicios de valor</h3>
            <p className="text-gray-400 text-sm">No existen respuestas "buenas" ni "malas". Cada biotipo tiene su propio genio y sombra. Contesta con brutal honestidad.</p>
          </div>
        </div>

        <div className="glass-card p-6 flex gap-4 items-start">
          <Users2 className="w-6 h-6 text-[#d4af37] shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-lg mb-1">Perfiles Mixtos</h3>
            <p className="text-gray-400 text-sm">Es normal que te identifiques con más de una opción o que el resultado sea una mezcla. Todos somos combinaciones únicas de estas fuerzas base.</p>
          </div>
        </div>
      </div>

      <div className="pt-8">
        <div className="mb-6 p-4 rounded-xl border border-white/10 bg-[#0c0c0c] flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div>
            <div className="font-medium">Modo de Respuesta</div>
            <div className="text-xs text-gray-500">¿Cómo prefieres afrontar el test?</div>
          </div>
          <div className="flex gap-2 bg-[#1f1f1f] p-1 rounded-lg">
            <button 
              onClick={() => onSetDeepMode(false)}
              className={`px-4 py-2 rounded-md text-sm transition-colors ${!isDeepMode ? 'bg-[#333] text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Rápida
            </button>
            <button 
              onClick={() => onSetDeepMode(true)}
              className={`px-4 py-2 rounded-md text-sm transition-colors ${isDeepMode ? 'bg-[#333] text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Profunda
            </button>
          </div>
        </div>

        <button onClick={onNext} className="btn-primary w-full text-lg">
          Entendido, empezar 
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </motion.div>
  );
}
