import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Answer, TestResult } from './types';
import { WelcomeScreen } from './components/WelcomeScreen';
import { InstructionsScreen } from './components/InstructionsScreen';
import { QuestionWizard } from './components/QuestionWizard';
import { ProcessingScreen } from './components/ProcessingScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { calculateResults } from './lib/scoring';

type Screen = 'welcome' | 'instructions' | 'wizard' | 'processing' | 'results';

export default function App() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [isDeepMode, setIsDeepMode] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<TestResult | null>(null);

  // Load saved session on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('biotype_answers');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAnswers(parsed);
        }
      }
      const savedDeep = localStorage.getItem('biotype_is_deep_mode');
      if (savedDeep !== null) {
        setIsDeepMode(savedDeep === 'true');
      }
    } catch (e) {
      console.error('Failed to parse saved answers', e);
    }
  }, []);

  const handleSaveAnswers = (newAnswers: Answer[]) => {
    setAnswers(newAnswers);
    localStorage.setItem('biotype_answers', JSON.stringify(newAnswers));
  };

  const handleStartFresh = () => {
    localStorage.removeItem('biotype_answers');
    localStorage.removeItem('biotype_is_deep_mode');
    setAnswers([]);
    setResult(null);
    setIsDeepMode(false);
  };

  const clearSession = () => {
    localStorage.removeItem('biotype_answers');
    localStorage.removeItem('biotype_is_deep_mode');
    setAnswers([]);
    setResult(null);
    setIsDeepMode(false);
    setScreen('welcome');
  };

  const handleCompleteTest = (finalAnswers: Answer[]) => {
    setAnswers(finalAnswers);
    localStorage.setItem('biotype_answers', JSON.stringify(finalAnswers));
    setScreen('processing');
  };

  const handleProcessingComplete = () => {
    const finalResult = calculateResults(answers);
    setResult(finalResult);
    setScreen('results');
  };

  return (
    <div className="min-h-screen bg-app-bg text-[#e5e7eb] font-sans">
      <main className="relative z-10 w-full min-h-screen">
        <AnimatePresence mode="wait">
          {screen === 'welcome' && (
            <WelcomeScreen 
              key="welcome"
              hasSavedProgress={answers.length > 0} 
              onNext={() => {
                if (answers.length > 0) {
                  // If they hit primary button but had saved progress, ask if they want to clear or continue.
                  // We'll just start fresh if they don't click the secondary Restore button.
                  handleStartFresh();
                }
                setScreen('instructions');
              }} 
              onRestore={() => setScreen('wizard')}
            />
          )}

          {screen === 'instructions' && (
            <InstructionsScreen 
              key="instructions"
              isDeepMode={isDeepMode}
              onSetDeepMode={(isDeep) => {
                setIsDeepMode(isDeep);
                localStorage.setItem('biotype_is_deep_mode', isDeep ? 'true' : 'false');
              }}
              onNext={() => setScreen('wizard')} 
            />
          )}

          {screen === 'wizard' && (
            <QuestionWizard 
              key="wizard"
              isDeepMode={isDeepMode}
              initialAnswers={answers}
              onSave={handleSaveAnswers}
              onComplete={handleCompleteTest}
            />
          )}

          {screen === 'processing' && (
            <ProcessingScreen 
              key="processing"
              onComplete={handleProcessingComplete} 
            />
          )}

          {screen === 'results' && result && (
            <ResultsScreen 
              key="results"
              result={result} 
              onRestart={clearSession} 
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
