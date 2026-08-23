export type MedicalProgram = 'MBBS' | 'BDS' | 'Nursing' | 'Pharmacy' | 'Allied Health';

export type AcademicYear = '1st Year' | '2nd Year' | '3rd Year (Part 1)' | 'Final Year (Part 2)';

export type ExamType = 'University Professional' | 'Internal Assessment' | 'Practical & Spotters' | 'Viva Voce';

export type ConfidenceLevel = 'Low' | 'Medium' | 'High';

export type PriorityCategory = 'MUST_STUDY' | 'HIGH_PRIORITY' | 'MAINTAIN' | 'LOW_PRIORITY';

export interface CurriculumSubject {
  id: string;
  name: string;
  code: string;
  year: AcademicYear;
  program: MedicalProgram;
  icon: string;
  description: string;
  topicsCount: number;
}

export interface MedicalTopic {
  id: string;
  subjectId: string;
  name: string;
  system: string;
  importance: 'high' | 'medium' | 'low';
  highYieldTag?: string;
  theoryWeightage: number; // 0-100
  practicalApplicability: boolean;
  vivaRelevance: 'high' | 'medium' | 'low';
  pyqFrequency: number; // Historical times asked
  pyqYears: number[];
  commonMistakes?: string[];
  keyTerms: string[];
}
