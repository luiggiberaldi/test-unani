import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Question, Answer } from '../types';
import { QUESTIONS } from '../data/questions';
import { MODULES } from '../data/biotypes';
import { ProgressBar } from './ProgressBar';
import { cn } from '../lib/utils';

interface QuestionWizardProps {
  initialAnswers: Answer[];
  isDeepMode: boolean;
  onComplete: (answers: Answer[]) => void;
  onSave: (answers: Answer[]) => void;
  key?: string;
}

export function QuestionWizard({ initialAnswers, isDeepMode, onComplete, onSave }: QuestionWizardProps) {
  const [answers, setAnswers] = useState<Answer[]>(initialAnswers);
  const [currentIndex, setCurrentIndex] = useState(
    initialAnswers.length < QUESTIONS.length ? initialAnswers.length : 0
  );
  const [direction, setDirection] = useState(1);

  const question = QUESTIONS[currentIndex];
  // Determine current module
  const moduleIndex = MODULES.findIndex(m => m.id === question.moduleId);
  const currentModule = MODULES[moduleIndex];

  const currentAnswer = answers.find(a => a.questionId === question.id)?.selectedOptionIndices || [];

  const handleOptionClick = (optIndex: number) => {
    let newIndices = [...currentAnswer];
    
    if (question.type === 'checklist') {
      if (newIndices.includes(optIndex)) {
        newIndices = newIndices.filter(i => i !== optIndex);
      } else if (newIndices.length < 3) {
        newIndices.push(optIndex);
      } else {
        return; // Max 3 selected
      }
    } else {
      newIndices = [optIndex];
    }

    const newAnswer: Answer = {
      questionId: question.id,
      moduleId: question.moduleId,
      selectedOptionIndices: newIndices,
    };

    const newAnswers = [...answers];
    const existingIndex = newAnswers.findIndex(a => a.questionId === question.id);
    
    if (existingIndex >= 0) {
      newAnswers[existingIndex] = newAnswer;
    } else {
      newAnswers.push(newAnswer);
    }
    
    setAnswers(newAnswers);
    onSave(newAnswers);

    // Auto-advance if not checklist and selected
    if (question.type !== 'checklist') {
      setTimeout(() => handleNext(newAnswers), 300);
    }
  };

  const handleNext = (currentAnswersState = answers) => {
    if (currentAnswer.length === 0 && question.type !== 'checklist' && currentAnswersState.find(a => a.questionId === question.id)?.selectedOptionIndices.length !== 1) {
       return; // Require answer
    }
    
    if (currentIndex < QUESTIONS.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete(currentAnswersState);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const microcopy = useMemo(() => {
    if (currentIndex === 17) return "¡Módulo físico completado! Pasamos a la energía corporizada.";
    if (currentIndex === 30) return "Vas muy bien. Estás descubriendo tu dinámica con el entorno.";
    if (currentIndex === 44) return "Excelente. Entramos al mundo de tus emociones profundas.";
    if (currentIndex === 60) return "Casi terminas. Última etapa: máscaras y adaptación social.";
    return null;
  }, [currentIndex]);

  return (
    <div className="max-w-3xl mx-auto w-full pt-4 md:pt-12 px-4 flex flex-col min-h-[80vh]">
      <div className="mb-8">
        <ProgressBar currentModule={currentIndex + 1} totalModules={QUESTIONS.length} />
        
        <div className="mt-8 mb-2 flex items-center justify-between">
          <span className="text-amber-500 font-medium text-sm tracking-widest uppercase">
            Módulo {moduleIndex + 1} / {MODULES.length}
          </span>
          <span className="text-slate-500 text-sm">
            {QUESTIONS.length - currentIndex} restantes
          </span>
        </div>
        <h2 className="text-2xl font-display font-bold text-white mb-1">{currentModule.name}</h2>
        <p className="text-slate-400 text-sm">{currentModule.description}</p>
      </div>

      <div className="flex-1 relative">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={(d) => ({ opacity: 0, x: d * 50 })}
            animate={{ opacity: 1, x: 0 }}
            exit={(d) => ({ opacity: 0, x: d * -50 })}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-full"
          >
            <div className="glass-card p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-medium mb-6 leading-snug">
                {question.text}
              </h3>
              
              {isDeepMode && question.deepModeText && (
                <p className="text-slate-400 text-sm mb-6 italic border-l-2 border-slate-700 pl-4 py-1">
                  {question.deepModeText}
                </p>
              )}

              {question.type === 'checklist' && (
                <span className="inline-block mb-4 text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-1 rounded">
                  Selecciona hasta 3 opciones
                </span>
              )}

              <div className="space-y-3">
                {question.options.map((opt, i) => {
                  const isSelected = currentAnswer.includes(i);
                  return (
                    <button
                      key={i}
                      onClick={() => handleOptionClick(i)}
                      className={cn(
                        "w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group",
                        isSelected 
                          ? "glow-border bg-white/5 text-white" 
                          : "border-white/5 hover:border-white/10 bg-white/5 hover:bg-white/10 text-gray-300"
                      )}
                    >
                      <span className="pr-4">{opt.text}</span>
                      <div className={cn(
                        "w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors",
                        isSelected ? "border-[#d4af37] bg-white/10 text-[#d4af37]" : "border-white/10 group-hover:border-white/20"
                      )}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {microcopy && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-center text-emerald-400 font-medium pb-4"
              >
                {microcopy}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-between mt-auto pt-8 pb-8">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="btn-secondary px-4 disabled:opacity-30"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {question.type === 'checklist' && currentAnswer.length > 0 && (
           <button onClick={() => handleNext()} className="btn-primary">
            Siguiente <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
}
