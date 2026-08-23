export type AISpecialistRole =
  | 'STUDY_PLANNER'
  | 'THEORY_SPECIALIST'
  | 'PYQ_ANALYZER'
  | 'PRACTICAL_SPECIALIST'
  | 'VIVA_EXAMINER'
  | 'EXAM_EVALUATOR'
  | 'EMERGENCY_PLANNER'
  | 'ORCHESTRATOR';

export interface AIPlanItem {
  id: string;
  timeSlot: string;
  durationMinutes: number;
  subject: string;
  topic: string;
  mode: 'Theory' | 'Practical' | 'Viva' | 'PYQ' | 'Break' | 'Rapid Recall';
  priority: 'MUST_STUDY' | 'HIGH_PRIORITY' | 'MAINTAIN' | 'LOW_PRIORITY';
  description: string;
  highYieldTips: string[];
  completed?: boolean;
}

export interface AIStudyPlan {
  id: string;
  title: string;
  totalDurationMinutes: number;
  createdAt: string;
  targetExam: string;
  summary: string;
  rationale: string;
  items: AIPlanItem[];
}

export interface TheoryAnswerResponse {
  topic: string;
  marksCategory: '5-Mark' | '10-Mark' | 'Rapid-Revision';
  definition: string;
  keySections: {
    heading: string;
    points: string[];
    subheadings?: { title: string; bullets: string[] }[];
  }[];
  clinicalSignificance: string[];
  diagramGuide: {
    title: string;
    mustLabel: string[];
    drawingTips: string;
    asciiDiagram?: string;
  };
  highYieldPoints: string[];
  commonMisconceptions: string[];
  sampleMCQs: {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  activeRecallPrompts: {
    prompt: string;
    answer: string;
  }[];
}

export interface PracticalSpotterStation {
  id: string;
  subject: 'Anatomy' | 'Pathology' | 'Pharmacology' | 'Microbiology';
  title: string;
  subCategory: string;
  specimenType: 'Gross Specimen' | 'Histology Slide' | 'Bones / Cadaveric' | 'Drug Formulation' | 'Culture Media / Gram Stain';
  imageUrl?: string;
  svgGraphicType: string;
  spotterPrompt: string;
  rubric: {
    identification: string;
    keyFeatures: string[];
    bloodOrNerveSupply?: string;
    mechanismOrDiagnosis?: string;
    clinicalSignificance: string;
  };
  sampleAnswer: string;
  commonErrors: string[];
  vivaQuestions: {
    question: string;
    expectedAnswer: string;
  }[];
}

export interface VivaRubricEvaluation {
  score: number; // e.g. 8.5/10
  maxScore: number;
  rubricScores: {
    knowledge: number; // out of 10
    accuracy: number;  // out of 10
    completeness: number; // out of 10
    communication: number; // out of 10
  };
  coveredPoints: string[];
  missingPoints: string[];
  feedbackSummary: string;
  followUpQuestion?: string;
  examinerNotes: string;
}

export interface WrittenEvaluationResult {
  score: number; // out of 10
  maxScore: number;
  readinessPercentage: number;
  criteriaScores: {
    definitionAndCore: number;
    structuralOrganization: number;
    keyPathologyOrAnatomy: number;
    clinicalCorrelation: number;
  };
  positivePoints: string[];
  missingKeyPoints: string[];
  majorMisconceptions: string[];
  suggestedImprovement: string;
  modelAnswerSnippet: string;
}

export interface PYQAnalysisItem {
  topic: string;
  subject: string;
  frequency: number;
  years: number[];
  questionTypes: ('Essay 10M' | 'Short Essay 5M' | 'Short Note 3M' | 'Viva' | 'Spotter')[];
  samplePastQuestions: string[];
  importanceScore: number; // 0-100
  trend: 'increasing' | 'stable' | 'frequent_repeater';
}

export interface OrchestrationRoutingResult {
  primarySpecialist: AISpecialistRole;
  confidence: number;
  topicIdentified?: string;
  subjectIdentified?: string;
  recommendedView: string;
  suggestedActionText: string;
  compositeContributions?: {
    specialist: AISpecialistRole;
    snippet: string;
  }[];
}
