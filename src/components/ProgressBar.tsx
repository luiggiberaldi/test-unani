import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface ProgressBarProps {
  currentModule: number;
  totalModules: number;
  className?: string;
}

export function ProgressBar({ currentModule, totalModules, className }: ProgressBarProps) {
  const progress = Math.min(100, Math.max(0, (currentModule / totalModules) * 100));

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 px-1">
        <span>PROGRESO</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="bar-bg">
        <motion.div
           className="gold-gradient h-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
