export type Biotype = 'colerico' | 'flematico' | 'sanguineo' | 'melancolico';

export type QuestionType = 'opcion_unica' | 'escala' | 'comparativa' | 'checklist';

export interface Option {
  text: string;
  biotype: Biotype;
}

export interface Question {
  id: string;
  moduleId: string;
  type: QuestionType;
  weight: number;
  text: string;
  deepModeText?: string;
  options: Option[];
}

export interface ModuleData {
  id: string;
  key: string;
  name: string;
  description: string;
  weight: number;
}

export interface BiotypeProfile {
  id: Biotype;
  name: string;
  color: string;
  symbol: string;
  element: string;
  temperature: string;
  description: string;
  physical: string;
  energy: string;
  emotional: string;
  relational: string;
  gifts: string;
  shadows: string;
  needs: string;
  imbalance: string;
  complementary: Biotype;
}

export interface Answer {
  questionId: string;
  moduleId: string;
  selectedOptionIndices: number[]; // Array for checklist support, single item for others
}

export interface TestResult {
  dominant: Biotype;
  secondary: Biotype | null;
  moduleScores: Record<string, Record<Biotype, number>>;
  totalScores: Record<Biotype, number>;
  confidence: number;
  isMixed: boolean;
  mixedIndex: number;
  
  // RGP V2.0 Extended Fields
  physicalBiotype: Biotype;
  behavioralBiotype: Biotype;
  consistencyScore: number;
  maskName: string;
  maskDescription: string;
  isAligned: boolean;
  keyResponses: {
    questionText: string;
    optionSelected: string;
    biotype: Biotype;
  }[];
}
