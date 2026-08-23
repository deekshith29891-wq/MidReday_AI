import { MedicalProgram, AcademicYear, ExamType, ConfidenceLevel, PriorityCategory } from './curriculum';
import { AISpecialistRole } from './ai';

export * from './curriculum';
export * from './ai';

export interface StudentProfile {
  id: string;
  name: string;
  program: MedicalProgram;
  year: AcademicYear;
  university: string;
  targetExamType: ExamType;
  selectedSubjectIds: string[];
  examDate: string; // ISO String
  dailyAvailableHours: number;
  initialConfidence: ConfidenceLevel;
  onboarded: boolean;
  apiKey?: string;
  useDemoAI: boolean;
  createdAt: string;
}

export interface TopicConfidenceRecord {
  topicId: string;
  topicName: string;
  subjectId: string;
  confidenceScore: number; // 0 - 100
  theoryScore: number; // 0 - 100
  practicalScore: number; // 0 - 100
  vivaScore: number; // 0 - 100
  recallScore: number; // 0 - 100
  lastPracticed?: string;
  attemptsCount: number;
  priorityCategory: PriorityCategory;
  priorityScore: number; // 0 - 100
  repeatedMistakes: string[];
}

export interface SubjectReadiness {
  subjectId: string;
  subjectName: string;
  overallScore: number; // 0 - 100
  theoryScore: number;
  practicalScore: number;
  vivaScore: number;
  recallScore: number;
  weakTopicsCount: number;
  strongTopicsCount: number;
}

export interface ReadinessOverview {
  overallReadiness: number; // 0 - 100
  theoryReadiness: number;
  practicalReadiness: number;
  vivaReadiness: number;
  recallReadiness: number;
  hoursUntilExam: number;
  minutesUntilExam: number;
  streakDays: number;
  topicsMastered: number;
  questionsPracticed: number;
  readinessDelta: number; // e.g. +14%
  historicalReadiness: {
    day: string;
    score: number;
  }[];
}

export interface ActiveRecallCard {
  id: string;
  topicId: string;
  topicName: string;
  subjectName: string;
  question: string;
  highYieldFact: string;
  mustRememberPoints: string[];
  clinicalContext?: string;
}

export interface VivaQuestionSession {
  id: string;
  topicName: string;
  subjectName: string;
  question: string;
  examinerPersonality: 'Strict Professor' | 'Supportive External' | 'Clinical Chief';
  difficulty: 'Basic' | 'Intermediate' | 'Advanced Clinical';
  expectedPoints: string[];
  studentAnswerText?: string;
  studentAudioRecorded?: boolean;
  evalResult?: any;
  timestamp: string;
}

export interface ExamSimulationState {
  id: string;
  title: string;
  subjectName: string;
  currentStation: 'THEORY' | 'PRACTICAL' | 'VIVA' | 'COMPLETED';
  timeRemainingSeconds: number;
  theoryAnswer?: string;
  theoryEvaluation?: any;
  practicalAnswer?: string;
  practicalStationId?: string;
  practicalEvaluation?: any;
  vivaAnswers?: { questionId: string; answer: string; score: number }[];
  overallResult?: {
    theoryScore: number;
    practicalScore: number;
    vivaScore: number;
    overallReadiness: number;
    weakestArea: string;
    nextAction: string;
  };
  status: 'not_started' | 'in_progress' | 'completed';
}

export interface SmartNoteItem {
  id: string;
  title: string;
  subject: string;
  fileType: 'PDF' | 'IMAGE' | 'TEXT';
  fileName: string;
  extractedText: string;
  summary: string;
  keyTerms: string[];
  flashcardsCount: number;
  vivaQuestionsCount: number;
  uploadedAt: string;
}
