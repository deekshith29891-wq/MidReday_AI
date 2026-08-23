import { TopicConfidenceRecord, SubjectReadiness, ReadinessOverview, PriorityCategory } from '../types';
import { MEDICAL_TOPICS } from '../data/curriculumData';

export class ConfidenceEngine {
  /**
   * Calculates dynamic priority score based on student confidence and topic importance
   * Score from 0 to 100
   */
  static calculatePriorityScore(confidenceScore: number, importance: 'high' | 'medium' | 'low', pyqFrequency: number): number {
    const weaknessFactor = 100 - confidenceScore;
    const importanceBonus = importance === 'high' ? 32 : importance === 'medium' ? 20 : 10;
    const pyqBonus = Math.min(16, pyqFrequency * 2);

    const rawScore = (weaknessFactor * 0.55) + importanceBonus + pyqBonus;
    return Math.round(Math.min(100, Math.max(5, rawScore)));
  }

  /**
   * Categorizes topic priority based on confidence score and exam relevance
   */
  static getPriorityCategory(confidenceScore: number, importance: 'high' | 'medium' | 'low'): PriorityCategory {
    if (confidenceScore < 60 && (importance === 'high' || importance === 'medium')) {
      return 'MUST_STUDY'; // 🔴
    }
    if (confidenceScore < 75 && importance === 'high') {
      return 'HIGH_PRIORITY'; // 🟠
    }
    if (confidenceScore >= 80) {
      return confidenceScore >= 90 ? 'LOW_PRIORITY' : 'MAINTAIN'; // 🟢 or ⚪
    }
    return 'HIGH_PRIORITY';
  }

  /**
   * Recalculates subject-level readiness from topic confidence records
   */
  static calculateSubjectReadiness(
    subjectId: string,
    subjectName: string,
    topicRecords: Record<string, TopicConfidenceRecord>
  ): SubjectReadiness {
    const relevantTopics = Object.values(topicRecords).filter(t => t.subjectId === subjectId);
    
    if (relevantTopics.length === 0) {
      return {
        subjectId,
        subjectName,
        overallScore: 70,
        theoryScore: 72,
        practicalScore: 68,
        vivaScore: 65,
        recallScore: 75,
        weakTopicsCount: 0,
        strongTopicsCount: 0,
      };
    }

    const totalTopics = relevantTopics.length;
    const sumOverall = relevantTopics.reduce((acc, t) => acc + t.confidenceScore, 0);
    const sumTheory = relevantTopics.reduce((acc, t) => acc + t.theoryScore, 0);
    const sumPractical = relevantTopics.reduce((acc, t) => acc + t.practicalScore, 0);
    const sumViva = relevantTopics.reduce((acc, t) => acc + t.vivaScore, 0);
    const sumRecall = relevantTopics.reduce((acc, t) => acc + t.recallScore, 0);

    const weakCount = relevantTopics.filter(t => t.confidenceScore < 65).length;
    const strongCount = relevantTopics.filter(t => t.confidenceScore >= 80).length;

    return {
      subjectId,
      subjectName,
      overallScore: Math.round(sumOverall / totalTopics),
      theoryScore: Math.round(sumTheory / totalTopics),
      practicalScore: Math.round(sumPractical / totalTopics),
      vivaScore: Math.round(sumViva / totalTopics),
      recallScore: Math.round(sumRecall / totalTopics),
      weakTopicsCount: weakCount,
      strongTopicsCount: strongCount,
    };
  }

  /**
   * Recalculates overall student exam readiness
   */
  static calculateOverallReadiness(
    topicRecords: Record<string, TopicConfidenceRecord>,
    baseOverview: ReadinessOverview,
    examTargetDate: string
  ): ReadinessOverview {
    const topics = Object.values(topicRecords);
    if (topics.length === 0) return baseOverview;

    const avgOverall = Math.round(topics.reduce((a, b) => a + b.confidenceScore, 0) / topics.length);
    const avgTheory = Math.round(topics.reduce((a, b) => a + b.theoryScore, 0) / topics.length);
    const avgPractical = Math.round(topics.reduce((a, b) => a + b.practicalScore, 0) / topics.length);
    const avgViva = Math.round(topics.reduce((a, b) => a + b.vivaScore, 0) / topics.length);
    const avgRecall = Math.round(topics.reduce((a, b) => a + b.recallScore, 0) / topics.length);

    // Calculate remaining hours and minutes until exam
    const now = Date.now();
    const examTime = new Date(examTargetDate).getTime();
    const diffMs = Math.max(0, examTime - now);
    const hoursUntilExam = Math.floor(diffMs / (1000 * 60 * 60));
    const minutesUntilExam = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    const topicsMastered = topics.filter(t => t.confidenceScore >= 80).length;

    return {
      ...baseOverview,
      overallReadiness: avgOverall,
      theoryReadiness: avgTheory,
      practicalReadiness: avgPractical,
      vivaReadiness: avgViva,
      recallReadiness: avgRecall,
      hoursUntilExam,
      minutesUntilExam,
      topicsMastered,
    };
  }

  /**
   * Updates a single topic confidence score after a study/practice interaction
   */
  static recordTopicPracticeResult(
    record: TopicConfidenceRecord,
    mode: 'Theory' | 'Practical' | 'Viva' | 'Recall',
    resultGrade: 'YES' | 'PARTIAL' | 'NO' | number // 'YES' / 'PARTIAL' / 'NO' or score 0-10
  ): TopicConfidenceRecord {
    let delta = 0;
    if (typeof resultGrade === 'number') {
      // Score out of 10 -> map to delta
      delta = Math.round((resultGrade - 5) * 2.5);
    } else {
      if (resultGrade === 'YES') delta = +8;
      else if (resultGrade === 'PARTIAL') delta = +2;
      else if (resultGrade === 'NO') delta = -6;
    }

    const updated = { ...record };
    updated.attemptsCount += 1;
    updated.lastPracticed = new Date().toISOString();

    if (mode === 'Theory') {
      updated.theoryScore = Math.min(100, Math.max(10, updated.theoryScore + delta));
    } else if (mode === 'Practical') {
      updated.practicalScore = Math.min(100, Math.max(10, updated.practicalScore + delta));
    } else if (mode === 'Viva') {
      updated.vivaScore = Math.min(100, Math.max(10, updated.vivaScore + delta));
    } else if (mode === 'Recall') {
      updated.recallScore = Math.min(100, Math.max(10, updated.recallScore + delta));
    }

    // Weighted new confidence score
    updated.confidenceScore = Math.round(
      (updated.theoryScore * 0.35) +
      (updated.practicalScore * 0.25) +
      (updated.vivaScore * 0.25) +
      (updated.recallScore * 0.15)
    );

    const topicDef = MEDICAL_TOPICS.find(t => t.id === record.topicId);
    const importance = topicDef?.importance || 'medium';
    const pyqFreq = topicDef?.pyqFrequency || 3;

    updated.priorityScore = this.calculatePriorityScore(updated.confidenceScore, importance, pyqFreq);
    updated.priorityCategory = this.getPriorityCategory(updated.confidenceScore, importance);

    return updated;
  }

  /**
   * Detects "Don't Study This Now" topics (topics that student is already strong at)
   */
  static getMasteredTopicsToAvoid(topicRecords: Record<string, TopicConfidenceRecord>): TopicConfidenceRecord[] {
    return Object.values(topicRecords)
      .filter(t => t.confidenceScore >= 85)
      .sort((a, b) => b.confidenceScore - a.confidenceScore);
  }
}
