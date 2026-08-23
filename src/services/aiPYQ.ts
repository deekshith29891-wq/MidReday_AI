import { PYQAnalysisItem } from '../types';
import { MOCK_PYQ_DATABASE } from '../data/mockMedicalDB';

export class AIPYQService {
  /**
   * Retrieves all analyzed previous-year questions with frequency trends
   */
  static getPYQAnalysis(subjectFilter?: string): PYQAnalysisItem[] {
    if (!subjectFilter || subjectFilter === 'ALL') {
      return MOCK_PYQ_DATABASE;
    }
    return MOCK_PYQ_DATABASE.filter(p => p.subject.toLowerCase().includes(subjectFilter.toLowerCase()));
  }

  /**
   * Simulates extracting PYQ information from an uploaded document / paper text
   */
  static analyzeUploadedPaper(rawText: string, paperTitle: string): PYQAnalysisItem[] {
    const textLower = rawText.toLowerCase();
    const extracted: PYQAnalysisItem[] = [];

    if (textLower.includes('brachial') || textLower.includes('plexus') || textLower.includes('erb')) {
      extracted.push(MOCK_PYQ_DATABASE[0]);
    }
    if (textLower.includes('cardiac') || textLower.includes('wiggers') || textLower.includes('heart sound')) {
      extracted.push(MOCK_PYQ_DATABASE[1]);
    }
    if (textLower.includes('cranial') || textLower.includes('facial') || textLower.includes('trigeminal')) {
      extracted.push(MOCK_PYQ_DATABASE[2]);
    }
    if (textLower.includes('tca') || textLower.includes('gluconeogenesis') || textLower.includes('krebs')) {
      extracted.push(MOCK_PYQ_DATABASE[3]);
    }
    if (textLower.includes('tuberculosis') || textLower.includes('tb') || textLower.includes('granuloma') || textLower.includes('afb')) {
      extracted.push(MOCK_PYQ_DATABASE[6]);
    }

    if (extracted.length === 0) {
      // Create a dynamic extracted item
      extracted.push({
        topic: paperTitle.replace(/\.[^/.]+$/, "") || 'Extracted Medical Examination Paper Topic',
        subject: 'General MBBS Medicine',
        frequency: 4,
        years: [2024, 2022, 2021],
        questionTypes: ['Essay 10M', 'Short Essay 5M', 'Viva'],
        samplePastQuestions: [
          `Discuss the core clinical pathophysiology and management of topics extracted from ${paperTitle}. (10 Marks)`
        ],
        importanceScore: 82,
        trend: 'stable'
      });
    }

    return extracted;
  }
}
