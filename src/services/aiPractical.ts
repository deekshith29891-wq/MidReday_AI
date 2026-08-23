import { PracticalSpotterStation } from '../types';
import { MOCK_PRACTICAL_STATIONS } from '../data/mockMedicalDB';

export class AIPracticalService {
  /**
   * Retrieves all available practical spotter stations
   */
  static getSpotterStations(subjectFilter?: string): PracticalSpotterStation[] {
    if (!subjectFilter || subjectFilter === 'ALL') {
      return MOCK_PRACTICAL_STATIONS;
    }
    return MOCK_PRACTICAL_STATIONS.filter(s => s.subject.toLowerCase() === subjectFilter.toLowerCase());
  }

  /**
   * Evaluates student's practical spotter identification submission
   */
  static evaluatePracticalAnswer(stationId: string, studentSubmission: string): {
    score: number;
    maxScore: number;
    identificationMatch: boolean;
    pointsAwarded: string[];
    missingElements: string[];
    examinerFeedback: string;
    modelAnswer: string;
  } {
    const station = MOCK_PRACTICAL_STATIONS.find(s => s.id === stationId) || MOCK_PRACTICAL_STATIONS[0];
    const subLower = studentSubmission.toLowerCase();

    // Check identification
    const idKeywords = station.rubric.identification.toLowerCase().split(' ').filter(w => w.length > 3);
    const idMatched = idKeywords.some(kw => subLower.includes(kw));

    const pointsAwarded: string[] = [];
    const missingElements: string[] = [];

    // Check key features
    station.rubric.keyFeatures.forEach(kf => {
      const kfWords = kf.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ').filter(w => w.length > 3);
      if (kfWords.some(w => subLower.includes(w))) {
        pointsAwarded.push(kf);
      } else {
        missingElements.push(kf);
      }
    });

    // Check clinical
    const clinWords = station.rubric.clinicalSignificance.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(' ').filter(w => w.length > 4);
    const clinMatched = clinWords.some(w => subLower.includes(w));
    if (clinMatched) {
      pointsAwarded.push('Clinical importance identified');
    } else {
      missingElements.push('Clinical correlation / surgical importance');
    }

    let score = 0;
    if (idMatched) score += 4;
    score += Math.min(4, pointsAwarded.length * 1.5);
    if (clinMatched) score += 2;
    score = Math.min(10, Math.round(score * 10) / 10);

    return {
      score,
      maxScore: 10,
      identificationMatch: idMatched,
      pointsAwarded,
      missingElements,
      examinerFeedback: idMatched 
        ? `Accurate spotter identification! You secured the cardinal identity. Review the missing diagnostic notes.` 
        : `Spotter identification was imprecise or incorrect. Cardinal structure is: ${station.rubric.identification}.`,
      modelAnswer: station.sampleAnswer
    };
  }
}
