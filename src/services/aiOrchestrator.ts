import { AISpecialistRole, OrchestrationRoutingResult } from '../types';
import { CURRICULUM_SUBJECTS, MEDICAL_TOPICS } from '../data/curriculumData';

export class AIOrchestratorService {
  /**
   * Intelligently routes natural student queries to the optimal specialist AI
   */
  static routeStudentQuery(query: string): OrchestrationRoutingResult {
    const qLower = query.toLowerCase().trim();

    // 1. Check for Emergency / Night before / 10-min Rescue
    if (qLower.includes('tomorrow') || qLower.includes('night before') || qLower.includes('emergency') || qLower.includes('6 hour')) {
      return {
        primarySpecialist: 'EMERGENCY_PLANNER',
        confidence: 0.98,
        recommendedView: 'emergency',
        suggestedActionText: 'Switching to 6-Hour Emergency Night-Before Mode.'
      };
    }
    if (qLower.includes('10 min') || qLower.includes('10-minute') || qLower.includes('rescue') || qLower.includes('quick revision') || qLower.includes('rapid')) {
      return {
        primarySpecialist: 'EMERGENCY_PLANNER',
        confidence: 0.95,
        recommendedView: 'rescue',
        suggestedActionText: 'Switching to 10-Minute High-Yield Rescue Mode.'
      };
    }

    // 2. Viva Voce simulator
    if (qLower.includes('viva') || qLower.includes('oral') || qLower.includes('examiner') || qLower.includes('quiz me') || qLower.includes('ask me') || qLower.includes('speak')) {
      return {
        primarySpecialist: 'VIVA_EXAMINER',
        confidence: 0.92,
        recommendedView: 'viva',
        suggestedActionText: 'Launching Interactive Viva Voce Station with AI Examiner.'
      };
    }

    // 3. Practical / Spotters
    if (qLower.includes('practical') || qLower.includes('spotter') || qLower.includes('specimen') || qLower.includes('slide') || qLower.includes('cadaver') || qLower.includes('microscopy')) {
      return {
        primarySpecialist: 'PRACTICAL_SPECIALIST',
        confidence: 0.94,
        recommendedView: 'practical',
        suggestedActionText: 'Opening Practical & Clinical Spotter Station.'
      };
    }

    // 4. PYQ / Previous Year
    if (qLower.includes('pyq') || qLower.includes('previous') || qLower.includes('past paper') || qLower.includes('question paper') || qLower.includes('frequency') || qLower.includes('repeats')) {
      return {
        primarySpecialist: 'PYQ_ANALYZER',
        confidence: 0.91,
        recommendedView: 'pyqs',
        suggestedActionText: 'Opening Previous-Year Question Frequency Analyzer.'
      };
    }

    // 5. Mock Exam
    if (qLower.includes('mock') || qLower.includes('exam simulation') || qLower.includes('simulate') || qLower.includes('test me')) {
      return {
        primarySpecialist: 'EXAM_EVALUATOR',
        confidence: 0.90,
        recommendedView: 'exam',
        suggestedActionText: 'Starting Full Timed Exam Simulation (Theory + Practical + Viva).'
      };
    }

    // 6. Active Recall / Flashcards
    if (qLower.includes('flashcard') || qLower.includes('active recall') || qLower.includes('recall') || qLower.includes('spaced')) {
      return {
        primarySpecialist: 'THEORY_SPECIALIST',
        confidence: 0.88,
        recommendedView: 'recall',
        suggestedActionText: 'Opening Active Recall & Spaced Repetition Decks.'
      };
    }

    // 7. Study Planner
    if (qLower.includes('plan') || qLower.includes('schedule') || qLower.includes('timetable') || qLower.includes('hours') || qLower.includes('what should i study')) {
      return {
        primarySpecialist: 'STUDY_PLANNER',
        confidence: 0.93,
        recommendedView: 'planner',
        suggestedActionText: 'Generating Personalized AI High-Yield Study Roadmap.'
      };
    }

    // 8. Theory default
    // Check if a topic was mentioned
    const topicMatch = MEDICAL_TOPICS.find(t => qLower.includes(t.name.toLowerCase()) || t.name.toLowerCase().includes(qLower));
    
    return {
      primarySpecialist: 'THEORY_SPECIALIST',
      confidence: 0.85,
      topicIdentified: topicMatch?.name,
      subjectIdentified: topicMatch ? CURRICULUM_SUBJECTS.find(s => s.id === topicMatch.subjectId)?.name : undefined,
      recommendedView: 'theory',
      suggestedActionText: topicMatch 
        ? `Opening Theory Specialist for ${topicMatch.name}.` 
        : 'Opening Theory Specialist with structured 5M/10M notes and active recall.'
    };
  }
}
