import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2 } from 'lucide-react';

const MESSAGES = [
  "Analizando tu patrón dominante...",
  "Calculando índice de consistencia...",
  "Detectando mezclas secundarias...",
  "Construyendo matriz final...",
];

export function ProcessingScreen({ onComplete }: { onComplete: () => void; key?: string }) {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 800);

    const finishTimeout = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearInterval(msgInterval);
      clearTimeout(finishTimeout);
    };
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="relative"
      >
        <Loader2 className="w-16 h-16 text-[#d4af37]" />
        <div className="absolute inset-0 border-t-2 border-[#d4af37]/30 rounded-full animate-ping" />
      </motion.div>

      <div className="h-8 relative overflow-hidden w-full max-w-sm">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={msgIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-slate-400 font-medium absolute inset-0 w-full"
          >
            {MESSAGES[msgIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
