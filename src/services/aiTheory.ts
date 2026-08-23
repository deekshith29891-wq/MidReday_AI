import { TheoryAnswerResponse } from '../types';
import { MOCK_THEORY_ANSWERS } from '../data/mockMedicalDB';
import { MEDICAL_TOPICS } from '../data/curriculumData';

export class AITheoryService {
  /**
   * Generates or retrieves an exam-oriented structured theory response
   */
  static getStructuredTheoryAnswer(topicIdOrName: string, category: '5-Mark' | '10-Mark' | 'Rapid-Revision' = '10-Mark'): TheoryAnswerResponse {
    // Check if direct mock exists
    if (MOCK_THEORY_ANSWERS[topicIdOrName]) {
      const base = MOCK_THEORY_ANSWERS[topicIdOrName];
      return { ...base, marksCategory: category };
    }

    // Try finding matching topic by name or keyword
    const matchedTopic = MEDICAL_TOPICS.find(t => 
      t.id === topicIdOrName || 
      t.name.toLowerCase().includes(topicIdOrName.toLowerCase()) ||
      topicIdOrName.toLowerCase().includes(t.name.toLowerCase())
    ) || MEDICAL_TOPICS[0];

    // Check if there is an exact mock for the matched topic
    if (MOCK_THEORY_ANSWERS[matchedTopic.id]) {
      const base = MOCK_THEORY_ANSWERS[matchedTopic.id];
      return { ...base, marksCategory: category };
    }

    // Generate high quality template response for other topics
    return {
      topic: matchedTopic.name,
      marksCategory: category,
      definition: `${matchedTopic.name} is a fundamental medical topic within ${matchedTopic.system}, playing a crucial role in clinical practice and university examinations.`,
      keySections: [
        {
          heading: '1. Anatomical / Physiological Foundation & Classification',
          points: [
            `• Structural organization and primary functional units involved in ${matchedTopic.name}.`,
            '• Standard classification and hierarchical anatomical / biochemical pathways.',
            `• Key molecular or neural regulatory mechanisms governing ${matchedTopic.name}.`
          ]
        },
        {
          heading: '2. Detailed Mechanism & Pathway / Relations',
          points: [
            '• Sequential stages, innervation, blood supply, or metabolic flux.',
            '• Crucial rate-limiting steps and physiological feedback loops.',
            '• Interactions with adjacent organ systems and functional integration.'
          ]
        },
        {
          heading: '3. Clinical Correlations & Applied Medicine',
          points: [
            `• Pathophysiological disruptions and classic clinical presentation in lesions of ${matchedTopic.name}.`,
            '• Diagnostic investigations (Imaging, Blood biomarkers, Special stains, Electrophysiology).',
            '• Therapeutic principles and clinical significance for hospital examinations.'
          ]
        }
      ],
      clinicalSignificance: [
        `Clinical manifestation of acute vs chronic pathology in ${matchedTopic.name}.`,
        'High-yield exam points frequently probed in external examiner viva voce.',
        'Applied surgical landmarks or pharmacological targets.'
      ],
      diagramGuide: {
        title: `Standard Examination Diagram for ${matchedTopic.name}`,
        mustLabel: matchedTopic.keyTerms.slice(0, 4),
        drawingTips: 'Keep proportions accurate, use neat arrow pointers, and always draw a clear border box around the diagram with an underlined title.'
      },
      highYieldPoints: [
        `Key term: ${matchedTopic.keyTerms[0] || 'Core definition'}`,
        `Frequently tested in past university papers (${matchedTopic.pyqFrequency} times historically).`,
        matchedTopic.commonMistakes?.[0] || 'Review key differences carefully.'
      ],
      commonMisconceptions: matchedTopic.commonMistakes || ['Do not overlook the clinical correlation in the 10-mark essay answer.'],
      sampleMCQs: [
        {
          id: `mcq-gen-${matchedTopic.id}`,
          question: `Which of the following statements is most accurate regarding ${matchedTopic.name}?`,
          options: [
            `It is primarily governed by ${matchedTopic.keyTerms[0] || 'cardinal structures'}.`,
            'It is completely independent of autonomic regulation.',
            'It has no documented clinical significance in emergency medicine.',
            'It is exclusively active during embryonic stages and degenerates at birth.'
          ],
          correctIndex: 0,
          explanation: `In standard medical textbooks, ${matchedTopic.name} is characterized by ${matchedTopic.keyTerms.join(', ')}.`
        }
      ],
      activeRecallPrompts: [
        {
          prompt: `What is the clinical hallmark associated with ${matchedTopic.name}?`,
          answer: matchedTopic.keyTerms.slice(0, 3).join(', ')
        }
      ]
    };
  }
}
