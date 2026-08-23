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
    if (confidenceScore < 60) {
      return 'MUST_STUDY'; // 🔴
    }
    if (confidenceScore < 80) {
      return 'HIGH_PRIORITY'; // 🟠
    }
    return confidenceScore >= 90 ? 'LOW_PRIORITY' : 'MAINTAIN'; // 🟢 or ⚪
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
        overallScore: 0,
        theoryScore: 0,
        practicalScore: 0,
        vivaScore: 0,
        recallScore: 0,
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

    const weakCount = relevantTopics.filter(t => t.confidenceScore < 60).length;
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

    // Update today's score in historical array
    const updatedHistory = [...baseOverview.historicalReadiness];
    if (updatedHistory.length > 0) {
      updatedHistory[updatedHistory.length - 1] = {
        ...updatedHistory[updatedHistory.length - 1],
        score: avgOverall
      };
    }

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
      streakDays: Math.max(1, baseOverview.streakDays),
      readinessDelta: avgOverall - (baseOverview.historicalReadiness[0]?.score || 0),
      historicalReadiness: updatedHistory,
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
    const updated = { ...record };
    updated.attemptsCount += 1;
    updated.lastPracticed = new Date().toISOString();

    const calculateNewComponentScore = (currentScore: number): number => {
      if (typeof resultGrade === 'number') {
        const target = Math.round(Math.min(100, Math.max(10, resultGrade * 10)));
        if (currentScore === 0) return target;
        return Math.round((currentScore * 0.35) + (target * 0.65));
      } else {
        if (resultGrade === 'YES') {
          return currentScore === 0 ? 75 : Math.min(100, currentScore + 15);
        } else if (resultGrade === 'PARTIAL') {
          return currentScore === 0 ? 45 : Math.min(100, currentScore + 8);
        } else {
          return currentScore === 0 ? 20 : Math.max(0, currentScore - 6);
        }
      }
    };

    if (mode === 'Theory') {
      updated.theoryScore = calculateNewComponentScore(updated.theoryScore);
    } else if (mode === 'Practical') {
      updated.practicalScore = calculateNewComponentScore(updated.practicalScore);
    } else if (mode === 'Viva') {
      updated.vivaScore = calculateNewComponentScore(updated.vivaScore);
    } else if (mode === 'Recall') {
      updated.recallScore = calculateNewComponentScore(updated.recallScore);
    }

    // Weighted confidence score
    // If some components are still 0, we score based on practiced components or full weights
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

