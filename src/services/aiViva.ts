import { VivaRubricEvaluation, VivaQuestionSession } from '../types';

export const DEFAULT_VIVA_QUESTIONS: VivaQuestionSession[] = [
  {
    id: 'viva-q1',
    topicName: 'Brachial Plexus & Axillary Region',
    subjectName: 'Human Anatomy',
    question: 'Candidate, what are the branches of the External Carotid Artery in chronological order?',
    examinerPersonality: 'Clinical Chief',
    difficulty: 'Basic',
    expectedPoints: [
      'Superior thyroid artery',
      'Ascending pharyngeal artery',
      'Lingual artery',
      'Facial artery',
      'Occipital artery',
      'Posterior auricular artery',
      'Maxillary artery (terminal)',
      'Superficial temporal artery (terminal)'
    ],
    timestamp: new Date().toISOString()
  },
  {
    id: 'viva-q2',
    topicName: 'Brachial Plexus',
    subjectName: 'Human Anatomy',
    question: 'Explain what happens when Erb’s point is injured. Which nerve roots are involved, and what is the characteristic deformity?',
    examinerPersonality: 'Strict Professor',
    difficulty: 'Intermediate',
    expectedPoints: [
      'Union of C5 and C6 roots (upper trunk)',
      'Policeman’s tip / Waiter’s tip deformity',
      'Arm adducted and medially rotated',
      'Forearm extended and pronated',
      'Loss of abduction (Deltoid, Supraspinatus) and lateral rotation'
    ],
    timestamp: new Date().toISOString()
  },
  {
    id: 'viva-q3',
    topicName: 'Cardiac Cycle & Auscultation',
    subjectName: 'Physiology',
    question: 'Why do all four cardiac valves close during Isovolumetric Contraction, and what causes the First Heart Sound (S1)?',
    examinerPersonality: 'Supportive External',
    difficulty: 'Intermediate',
    expectedPoints: [
      'Ventricular pressure exceeds atrial pressure, closing AV valves (Mitral + Tricuspid) creating S1',
      'Ventricular pressure is still lower than aortic/pulmonic diastolic pressure (80 mmHg), so semilunar valves remain shut',
      'Chamber is closed to allow rapid isometric tension buildup'
    ],
    timestamp: new Date().toISOString()
  },
  {
    id: 'viva-q4',
    topicName: 'Facial Nerve & Neurology',
    subjectName: 'Human Anatomy',
    question: 'How do you clinically differentiate an Upper Motor Neuron facial palsy from a Lower Motor Neuron facial palsy?',
    examinerPersonality: 'Clinical Chief',
    difficulty: 'Advanced Clinical',
    expectedPoints: [
      'UMN lesion spares the forehead (bilateral cortical innervation to upper face)',
      'LMN (Bell palsy) paralyzes the entire half of the face including the forehead and orbicularis oculi',
      'UMN is contralateral to lesion; LMN is ipsilateral to lesion',
      'Inability to close the eye tightly (Bell phenomenon) in LMN'
    ],
    timestamp: new Date().toISOString()
  }
];

export class AIVivaService {
  /**
   * Evaluates student's spoken/written answer against the expected medical rubric
   */
  static evaluateVivaAnswer(
    question: VivaQuestionSession,
    studentAnswer: string
  ): VivaRubricEvaluation {
    const textLower = studentAnswer.toLowerCase().trim();
    if (!textLower) {
      return {
        score: 0,
        maxScore: 10,
        rubricScores: {
          knowledge: 0,
          accuracy: 0,
          completeness: 0,
          communication: 0
        },
        coveredPoints: [],
        missingPoints: question.expectedPoints,
        feedbackSummary: 'No verbal answer was detected. In viva examinations, silence drops the examiner score rapidly.',
        examinerNotes: 'Candidate hesitated and did not provide an answer. Prompt candidate with a simpler lead.'
      };
    }

    const coveredPoints: string[] = [];
    const missingPoints: string[] = [];

    // Analyze expected points
    question.expectedPoints.forEach(point => {
      const keywords = point.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ').filter(w => w.length > 3);
      const matched = keywords.filter(kw => textLower.includes(kw));
      if (matched.length >= Math.min(2, Math.max(1, Math.floor(keywords.length * 0.4)))) {
        coveredPoints.push(point);
      } else {
        missingPoints.push(point);
      }
    });

    const matchRatio = coveredPoints.length / Math.max(1, question.expectedPoints.length);
    
    // Knowledge & accuracy
    const knowledgeScore = Math.min(10, Math.round(matchRatio * 9 + (textLower.length > 40 ? 1 : 0)));
    const accuracyScore = Math.min(10, Math.max(2, Math.round(matchRatio * 8.5 + (coveredPoints.length > 0 ? 1.5 : 0))));
    const completenessScore = Math.min(10, Math.round(matchRatio * 10));
    const communicationScore = Math.min(10, Math.round((textLower.split(' ').length > 15 ? 8.5 : 6.5) + (coveredPoints.length > 2 ? 1.5 : 0)));

    const overallScore = Number(((knowledgeScore * 0.35) + (accuracyScore * 0.3) + (completenessScore * 0.2) + (communicationScore * 0.15)).toFixed(1));

    // Follow up generation
    let followUp = '';
    if (question.id === 'viva-q1') {
      followUp = 'Very well. Which of these branches enters the cranial cavity through the foramen spinosum, and what is its surgical significance?';
    } else if (question.id === 'viva-q2') {
      followUp = 'Good. Now contrast this with Klumpke’s paralysis: what is the root value, which specific muscle groups are paralyzed, and why might you observe Horner syndrome?';
    } else if (question.id === 'viva-q3') {
      followUp = 'And in which condition would you hear a third heart sound (S3) immediately after the rapid filling phase?';
    } else {
      followUp = 'Excellent. What is the anatomical course of the chorda tympani nerve, and what symptoms arise if it is damaged during middle ear surgery?';
    }

    let feedbackSummary = '';
    if (overallScore >= 8) {
      feedbackSummary = `Excellent response! You demonstrated strong anatomical recall and answered with clarity.`;
    } else if (overallScore >= 6) {
      feedbackSummary = `Good attempt. You captured the core concepts, but missed ${missingPoints.length} specific key terms.`;
    } else {
      feedbackSummary = `Fair attempt. Your answer lacked completeness. Make sure to recall standard anatomical classifications.`;
    }

    return {
      score: overallScore,
      maxScore: 10,
      rubricScores: {
        knowledge: knowledgeScore,
        accuracy: accuracyScore,
        completeness: completenessScore,
        communication: communicationScore
      },
      coveredPoints,
      missingPoints,
      feedbackSummary,
      followUpQuestion: followUp,
      examinerNotes: missingPoints.length > 0 
        ? `Candidate missed: ${missingPoints.slice(0, 2).join('; ')}. Ready for follow-up inquiry.` 
        : 'Candidate showed flawless mastery. Elevate difficulty to advanced clinical questions.'
    };
  }
}
