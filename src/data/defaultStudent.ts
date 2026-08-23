import { StudentProfile, TopicConfidenceRecord, ReadinessOverview } from '../types';

export const DEFAULT_STUDENT_PROFILE: StudentProfile = {
  id: 'student-demo-001',
  name: 'Deekshith',
  program: 'MBBS',
  year: '1st Year',
  university: 'NMC CBME Standard Medical Curriculum',
  targetExamType: 'University Professional',
  selectedSubjectIds: ['sub-anatomy', 'sub-physiology', 'sub-biochemistry'],
  examDate: new Date(Date.now() + 18.7 * 60 * 60 * 1000).toISOString(), // ~18 hours 42 mins from now
  dailyAvailableHours: 6,
  initialConfidence: 'Medium',
  onboarded: true,
  useDemoAI: true,
  createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
};

export const INITIAL_TOPIC_CONFIDENCE: Record<string, TopicConfidenceRecord> = {
  'top-brachial-plexus': {
    topicId: 'top-brachial-plexus',
    topicName: 'Brachial Plexus',
    subjectId: 'sub-anatomy',
    confidenceScore: 42,
    theoryScore: 48,
    practicalScore: 40,
    vivaScore: 38,
    recallScore: 44,
    attemptsCount: 3,
    priorityCategory: 'MUST_STUDY',
    priorityScore: 96,
    repeatedMistakes: [
      'Forgetting branches of posterior cord (ULTRA mnemonic)',
      'Mixing Erb’s palsy roots C5-C6 with Klumpke’s C8-T1'
    ],
    lastPracticed: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
  },
  'top-cranial-nerves': {
    topicId: 'top-cranial-nerves',
    topicName: 'Cranial Nerves (Facial & Trigeminal)',
    subjectId: 'sub-anatomy',
    confidenceScore: 61,
    theoryScore: 68,
    practicalScore: 58,
    vivaScore: 54,
    recallScore: 64,
    attemptsCount: 4,
    priorityCategory: 'HIGH_PRIORITY',
    priorityScore: 84,
    repeatedMistakes: [
      'Missing forehead sparing mechanism in UMN vs LMN lesions'
    ],
    lastPracticed: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString()
  },
  'top-coronary-circulation': {
    topicId: 'top-coronary-circulation',
    topicName: 'Coronary Circulation & Heart Anatomy',
    subjectId: 'sub-anatomy',
    confidenceScore: 78,
    theoryScore: 84,
    practicalScore: 80,
    vivaScore: 72,
    recallScore: 76,
    attemptsCount: 6,
    priorityCategory: 'MAINTAIN',
    priorityScore: 45,
    repeatedMistakes: [],
    lastPracticed: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString()
  },
  'top-femoral-triangle': {
    topicId: 'top-femoral-triangle',
    topicName: 'Femoral Triangle & Femoral Hernia',
    subjectId: 'sub-anatomy',
    confidenceScore: 72,
    theoryScore: 75,
    practicalScore: 70,
    vivaScore: 68,
    recallScore: 75,
    attemptsCount: 5,
    priorityCategory: 'MAINTAIN',
    priorityScore: 50,
    repeatedMistakes: [
      'Stating femoral nerve is inside femoral sheath'
    ],
    lastPracticed: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString()
  },
  'top-histology-epithelium': {
    topicId: 'top-histology-epithelium',
    topicName: 'Histology: Epithelium & Glands',
    subjectId: 'sub-anatomy',
    confidenceScore: 91,
    theoryScore: 94,
    practicalScore: 92,
    vivaScore: 88,
    recallScore: 90,
    attemptsCount: 8,
    priorityCategory: 'LOW_PRIORITY',
    priorityScore: 31,
    repeatedMistakes: [],
    lastPracticed: new Date(Date.now() - 32 * 60 * 60 * 1000).toISOString()
  },
  'top-cardiac-cycle': {
    topicId: 'top-cardiac-cycle',
    topicName: 'Cardiac Cycle & Wiggers Diagram',
    subjectId: 'sub-physiology',
    confidenceScore: 52,
    theoryScore: 60,
    practicalScore: 50,
    vivaScore: 44,
    recallScore: 54,
    attemptsCount: 4,
    priorityCategory: 'MUST_STUDY',
    priorityScore: 92,
    repeatedMistakes: [
      'Misaligning S1 and S2 heart sounds on the pressure curve'
    ],
    lastPracticed: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
  },
  'top-action-potential': {
    topicId: 'top-action-potential',
    topicName: 'Action Potential & Synaptic Transmission',
    subjectId: 'sub-physiology',
    confidenceScore: 84,
    theoryScore: 88,
    practicalScore: 82,
    vivaScore: 82,
    recallScore: 84,
    attemptsCount: 7,
    priorityCategory: 'MAINTAIN',
    priorityScore: 38,
    repeatedMistakes: [],
    lastPracticed: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString()
  },
  'top-gfr-regulation': {
    topicId: 'top-gfr-regulation',
    topicName: 'Glomerular Filtration Rate & Juxtaglomerular Apparatus',
    subjectId: 'sub-physiology',
    confidenceScore: 76,
    theoryScore: 80,
    practicalScore: 72,
    vivaScore: 74,
    recallScore: 78,
    attemptsCount: 5,
    priorityCategory: 'MAINTAIN',
    priorityScore: 48,
    repeatedMistakes: [],
    lastPracticed: new Date(Date.now() - 40 * 60 * 60 * 1000).toISOString()
  },
  'top-gluconeogenesis-tca': {
    topicId: 'top-gluconeogenesis-tca',
    topicName: 'TCA Cycle & Gluconeogenesis',
    subjectId: 'sub-biochemistry',
    confidenceScore: 46,
    theoryScore: 52,
    practicalScore: 45,
    vivaScore: 40,
    recallScore: 48,
    attemptsCount: 3,
    priorityCategory: 'MUST_STUDY',
    priorityScore: 94,
    repeatedMistakes: [
      'Missing 4 bypass enzymes in gluconeogenesis'
    ],
    lastPracticed: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString()
  },
  'top-hemoglobin-synthesis': {
    topicId: 'top-hemoglobin-synthesis',
    topicName: 'Heme Synthesis & Porphyrias',
    subjectId: 'sub-biochemistry',
    confidenceScore: 68,
    theoryScore: 72,
    practicalScore: 66,
    vivaScore: 64,
    recallScore: 70,
    attemptsCount: 4,
    priorityCategory: 'HIGH_PRIORITY',
    priorityScore: 72,
    repeatedMistakes: [
      'Confusing mitochondrial vs cytosolic steps'
    ],
    lastPracticed: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString()
  }
};

export const INITIAL_READINESS_OVERVIEW: ReadinessOverview = {
  overallReadiness: 76,
  theoryReadiness: 82,
  practicalReadiness: 71,
  vivaReadiness: 64,
  recallReadiness: 78,
  hoursUntilExam: 18,
  minutesUntilExam: 42,
  streakDays: 5,
  topicsMastered: 12,
  questionsPracticed: 84,
  readinessDelta: 14,
  historicalReadiness: [
    { day: 'Mon', score: 52 },
    { day: 'Tue', score: 58 },
    { day: 'Wed', score: 63 },
    { day: 'Thu', score: 67 },
    { day: 'Fri', score: 71 },
    { day: 'Sat', score: 76 },
    { day: 'Sun', score: 81 }
  ]
};
