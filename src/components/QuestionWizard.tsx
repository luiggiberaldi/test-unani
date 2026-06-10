import { useState, useMemo, useEffect } from 'react';
import { track } from '../lib/analytics';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Question, Answer } from '../types';
import { QUESTIONS, getFilteredQuestions } from '../data/questions';
import { MODULES } from '../data/biotypes';
import { ProgressBar } from './ProgressBar';
import { AdsterraBanner } from './AdsterraBanner';
import { cn } from '../lib/utils';

interface QuestionWizardProps {
  initialAnswers: Answer[];
  isDeepMode: boolean;
  onComplete: (answers: Answer[]) => void;
  onSave: (answers: Answer[]) => void;
  key?: string;
}

export function QuestionWizard({ initialAnswers, isDeepMode, onComplete, onSave }: QuestionWizardProps) {
  const activeQuestions = useMemo(() => {
    return getFilteredQuestions(isDeepMode);
  }, [isDeepMode]);

  const [answers, setAnswers] = useState<Answer[]>(() => {
    // Filter initial answers to make sure we only keep those belonging to the active mode
    return initialAnswers.filter(ans => 
      activeQuestions.some(aq => aq.id === ans.questionId)
    );
  });

  const [currentIndex, setCurrentIndex] = useState(() => {
    const activeAnsweredCount = initialAnswers.filter(ans => 
      activeQuestions.some(aq => aq.id === ans.questionId)
    ).length;
    return activeAnsweredCount < activeQuestions.length ? activeAnsweredCount : 0;
  });

  const [direction, setDirection] = useState(1);

  const safeIndex = Math.max(0, Math.min(currentIndex, activeQuestions.length - 1));
  const question = activeQuestions[safeIndex] || activeQuestions[0] || QUESTIONS[0];
  
  useEffect(() => {
    if (question?.moduleId) {
      track('module_reached', { 
        module: question.moduleId,
        questionIndex: currentIndex
      });
    }
  }, [question?.moduleId]);

  // Determine current module
  const moduleIndex = question ? MODULES.findIndex(m => m.id === question.moduleId) : 0;
  const currentModule = MODULES[moduleIndex >= 0 ? moduleIndex : 0];

  const currentAnswer = question ? (answers.find(a => a.questionId === question.id)?.selectedOptionIndices || []) : [];

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
    
    if (currentIndex < activeQuestions.length - 1) {
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
    const prevQuestion = currentIndex > 0 ? activeQuestions[currentIndex - 1] : null;
    const currQuestion = activeQuestions[currentIndex];
    
    if (!prevQuestion || !currQuestion) return null;
    
    // Show microcopy only when transitioning between modules
    if (prevQuestion.moduleId !== currQuestion.moduleId) {
      const messages: Record<string, string> = {
        'm2': '¡Módulo físico completado! Ahora exploramos tu relación con el entorno.',
        'm3': 'Bien hecho. Pasamos a tu motor interno y cómo actúas.',
        'm4': 'Excelente. Entramos al territorio de tus emociones profundas.',
        'm5': 'Muy bien. Ahora exploramos cómo te vinculas con los demás.',
        'm6': 'Casi terminas. Última etapa: tu máscara y tu adaptación real.',
      };
      return messages[currQuestion.moduleId] || null;
    }
    return null;
  }, [currentIndex, activeQuestions]);

  return (
    <div className="max-w-3xl mx-auto w-full pt-4 md:pt-12 px-4 flex flex-col min-h-[80vh]">
      <div className="mb-8">
        <ProgressBar currentModule={safeIndex + 1} totalModules={activeQuestions.length} />
        
        <div className="mt-8 mb-2 flex items-center justify-between">
          <span className="text-amber-500 font-medium text-sm tracking-widest uppercase">
            Módulo {moduleIndex + 1} / {MODULES.length}
          </span>
          <span className="text-slate-500 text-sm">
            {activeQuestions.length - safeIndex} restantes
          </span>
        </div>
        <h2 className="text-2xl font-display font-bold text-white mb-1">{currentModule.name}</h2>
        <p className="text-slate-400 text-sm">{currentModule.description}</p>
      </div>

      <div className="flex-1 relative">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={safeIndex}
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

      {/* ADSTERRA WIZARD BANNER */}
      <AdsterraBanner 
        id="99d480ff1ca26d0294cbba85085cfab0" 
        format="468x60" 
        className="w-full max-w-md mx-auto mt-6"
      />

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
