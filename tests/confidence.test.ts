import { describe, it, expect } from 'vitest';
import { ConfidenceEngine } from '../src/services/confidenceEngine';
import { AIPlannerService } from '../src/services/aiPlanner';
import { AIOrchestratorService } from '../src/services/aiOrchestrator';
import { AIEvaluatorService } from '../src/services/aiEvaluator';
import { INITIAL_TOPIC_CONFIDENCE, INITIAL_READINESS_OVERVIEW } from '../src/data/defaultStudent';

describe('MedReady AI - Core Medical Engines Test Suite', () => {
  it('calculates dynamic topic priority correctly', () => {
    // High importance + low confidence (40%) should yield very high priority score > 80%
    const score = ConfidenceEngine.calculatePriorityScore(40, 'high', 8);
    expect(score).toBeGreaterThan(80);

    // High confidence (95%) should yield low priority score
    const scoreMastered = ConfidenceEngine.calculatePriorityScore(95, 'low', 1);
    expect(scoreMastered).toBeLessThan(40);
  });

  it('assigns correct priority categories', () => {
    expect(ConfidenceEngine.getPriorityCategory(45, 'high')).toBe('MUST_STUDY');
    expect(ConfidenceEngine.getPriorityCategory(70, 'high')).toBe('HIGH_PRIORITY');
    expect(ConfidenceEngine.getPriorityCategory(85, 'high')).toBe('MAINTAIN');
    expect(ConfidenceEngine.getPriorityCategory(92, 'medium')).toBe('LOW_PRIORITY');
  });

  it('updates topic confidence after assessment', () => {
    const sampleRecord = { ...INITIAL_TOPIC_CONFIDENCE['top-brachial-plexus'] };
    const originalScore = sampleRecord.confidenceScore;

    const updated = ConfidenceEngine.recordTopicPracticeResult(sampleRecord, 'Theory', 'YES');
    expect(updated.confidenceScore).toBeGreaterThan(originalScore);
    expect(updated.attemptsCount).toBe(sampleRecord.attemptsCount + 1);
  });

  it('detects mastered topics for "Don\'t Study This Now" intervention', () => {
    const mastered = ConfidenceEngine.getMasteredTopicsToAvoid(INITIAL_TOPIC_CONFIDENCE);
    expect(mastered.length).toBeGreaterThan(0);
    expect(mastered[0].confidenceScore).toBeGreaterThanOrEqual(85);
  });

  it('generates dynamic study plans allocating time smartly', () => {
    const plan = AIPlannerService.generateStudyPlan(6, INITIAL_TOPIC_CONFIDENCE, 'University Professional');
    expect(plan.totalDurationMinutes).toBe(360);
    expect(plan.items.length).toBeGreaterThanOrEqual(4);
    expect(plan.items[0].priority).toBe('MUST_STUDY');
  });

  it('generates 6-hour emergency night-before plan and 10-minute rescue plan', () => {
    const emergencyPlan = AIPlannerService.generateNightBeforeEmergencyPlan();
    expect(emergencyPlan.totalDurationMinutes).toBe(360);
    expect(emergencyPlan.items.some(i => i.mode === 'Theory')).toBe(true);
    expect(emergencyPlan.items.some(i => i.mode === 'Practical')).toBe(true);
    expect(emergencyPlan.items.some(i => i.mode === 'Viva')).toBe(true);

    const rescuePlan = AIPlannerService.generate10MinuteRescuePlan();
    expect(rescuePlan.totalMinutes).toBe(10);
    expect(rescuePlan.sprints.length).toBe(5);
  });

  it('orchestrator routes natural queries to proper AI specialists', () => {
    const vivaRoute = AIOrchestratorService.routeStudentQuery('Quiz me in oral viva');
    expect(vivaRoute.primarySpecialist).toBe('VIVA_EXAMINER');

    const emergencyRoute = AIOrchestratorService.routeStudentQuery('I have an exam tomorrow');
    expect(emergencyRoute.primarySpecialist).toBe('EMERGENCY_PLANNER');

    const spotterRoute = AIOrchestratorService.routeStudentQuery('Show practical specimen for heart');
    expect(spotterRoute.primarySpecialist).toBe('PRACTICAL_SPECIALIST');
  });

  it('evaluates written answers against clinical criteria', () => {
    const result = AIEvaluatorService.evaluateWrittenAnswer(
      'Brachial Plexus',
      'The brachial plexus is formed by C5-T1 roots. It gives upper, middle, and lower trunks. Cords are lateral, medial, and posterior. Posterior cord branches are ULTRA. Erb palsy causes waiter tip deformity with C5-C6 root injury.',
      10
    );
    expect(result.score).toBeGreaterThan(6);
    expect(result.criteriaScores.definitionAndCore).toBeGreaterThan(0);
    expect(result.positivePoints.length).toBeGreaterThan(0);
  });
});
