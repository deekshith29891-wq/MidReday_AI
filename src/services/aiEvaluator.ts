import { WrittenEvaluationResult } from '../types';

export class AIEvaluatorService {
  /**
   * Evaluates student's written examination answer
   */
  static evaluateWrittenAnswer(topicName: string, answerText: string, marksTarget: 5 | 10 = 10): WrittenEvaluationResult {
    const textLower = answerText.toLowerCase().trim();
    const wordCount = textLower.split(/\s+/).filter(Boolean).length;

    if (wordCount < 10) {
      return {
        score: 1.5,
        maxScore: marksTarget,
        readinessPercentage: 15,
        criteriaScores: {
          definitionAndCore: 0.5,
          structuralOrganization: 0.5,
          keyPathologyOrAnatomy: 0.5,
          clinicalCorrelation: 0.0
        },
        positivePoints: ['Attempt initiated'],
        missingKeyPoints: ['Standard clinical definition', 'Systematic headings', 'Specific anatomical/pathological structures', 'Clinical correlation section'],
        majorMisconceptions: ['Answer is too brief to evaluate university level comprehension.'],
        suggestedImprovement: 'Expand answer using structured medical headings: Definition → Classification → Details → Diagrams → Clinical Significance.',
        modelAnswerSnippet: `Definition: Standard comprehensive medical definition with precise terminology. \nKey Components: Organized in bullet points.\nClinical Correlation: Associated syndrome, surgical significance, or diagnostic gold standard.`
      };
    }

    // Heuristic medical evaluation
    const hasDefinition = /defin|termed|refers to|composed of|is a|formed by|characterized by/i.test(answerText);
    const hasClinical = /clinic|syndrome|palsy|disease|treatment|diagnosis|patient|infarct|hernia|lesion|sign|deformity/i.test(answerText);
    const hasAnatomyOrPath = /nerve|artery|vein|muscle|cord|trunk|root|ventricle|valve|enzyme|cell|stain|gross/i.test(answerText);
    const hasStructure = /•|\-|\d\.|1\.|first|second|heading|classification/i.test(answerText) || answerText.includes('\n') || answerText.split('.').length >= 3;

    let defScore = hasDefinition ? (marksTarget === 10 ? 2.5 : 1.25) : (marksTarget === 10 ? 1.0 : 0.5);
    let structScore = hasStructure ? (marksTarget === 10 ? 2.5 : 1.25) : (marksTarget === 10 ? 1.2 : 0.6);
    let keyScore = hasAnatomyOrPath ? (marksTarget === 10 ? 3.0 : 1.5) : (marksTarget === 10 ? 1.5 : 0.8);
    let clinScore = hasClinical ? (marksTarget === 10 ? 2.0 : 1.0) : (marksTarget === 10 ? 0.5 : 0.2);

    // Length factor
    const targetWords = marksTarget === 10 ? 80 : 40;
    const lengthMultiplier = Math.min(1.0, Math.max(0.75, wordCount / targetWords));

    const totalRaw = (defScore + structScore + keyScore + clinScore) * lengthMultiplier;
    const finalScore = Number(Math.min(marksTarget, Math.max(1, totalRaw)).toFixed(1));
    const readinessPct = Math.round((finalScore / marksTarget) * 100);

    const positivePoints: string[] = [];
    const missingPoints: string[] = [];

    if (hasDefinition) positivePoints.push('Clear introductory definition and scope provided.');
    else missingPoints.push('Missing explicit textbook definition in the opening section.');

    if (hasAnatomyOrPath) positivePoints.push('Accurate anatomical / physiological terminology utilized.');
    else missingPoints.push('Lacks specific anatomical landmarks or biochemical pathways.');

    if (hasClinical) positivePoints.push('Included relevant clinical correlations and applied pathology.');
    else missingPoints.push('Missing clinical significance / applied anatomy correlation box.');

    if (hasStructure) positivePoints.push('Well-structured layout with distinguishable sections.');
    else missingPoints.push('Answer appears as unformatted block text; convert to bulleted subheadings.');

    return {
      score: finalScore,
      maxScore: marksTarget,
      readinessPercentage: readinessPct,
      criteriaScores: {
        definitionAndCore: Number(defScore.toFixed(1)),
        structuralOrganization: Number(structScore.toFixed(1)),
        keyPathologyOrAnatomy: Number(keyScore.toFixed(1)),
        clinicalCorrelation: Number(clinScore.toFixed(1))
      },
      positivePoints,
      missingKeyPoints: missingPoints,
      majorMisconceptions: [
        'Ensure proper labeling of all branches and avoid colloquial terminology in professional examinations.'
      ],
      suggestedImprovement: 'Add a dedicated "Clinical Correlation" subsection with boxed borders at the end of the answer to secure high honors marks from university evaluators.',
      modelAnswerSnippet: `Structure Recommended: \n1. Definition & Origin\n2. Schematic Architectural Diagram\n3. Detailed Sections / Branches\n4. Clinical Anatomy / Applied Pearls`
    };
  }
}
