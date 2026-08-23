import { StudentProfile, TopicConfidenceRecord, ReadinessOverview, SmartNoteItem } from '../types';
import { DEFAULT_STUDENT_PROFILE, INITIAL_TOPIC_CONFIDENCE, INITIAL_READINESS_OVERVIEW } from '../data/defaultStudent';

const STORAGE_KEYS = {
  PROFILE: 'medready_student_profile',
  CONFIDENCE: 'medready_topic_confidence',
  READINESS: 'medready_readiness_overview',
  NOTES: 'medready_smart_notes',
  RECENT_VIVA: 'medready_recent_viva_sessions',
};

export class StorageService {
  static getProfile(): StudentProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return data ? JSON.parse(data) : DEFAULT_STUDENT_PROFILE;
    } catch {
      return DEFAULT_STUDENT_PROFILE;
    }
  }

  static saveProfile(profile: StudentProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile', e);
    }
  }

  static getTopicConfidence(): Record<string, TopicConfidenceRecord> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CONFIDENCE);
      return data ? JSON.parse(data) : INITIAL_TOPIC_CONFIDENCE;
    } catch {
      return INITIAL_TOPIC_CONFIDENCE;
    }
  }

  static saveTopicConfidence(records: Record<string, TopicConfidenceRecord>): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIDENCE, JSON.stringify(records));
    } catch (e) {
      console.error('Failed to save confidence', e);
    }
  }

  static getReadinessOverview(): ReadinessOverview {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.READINESS);
      return data ? JSON.parse(data) : INITIAL_READINESS_OVERVIEW;
    } catch {
      return INITIAL_READINESS_OVERVIEW;
    }
  }

  static saveReadinessOverview(overview: ReadinessOverview): void {
    try {
      localStorage.setItem(STORAGE_KEYS.READINESS, JSON.stringify(overview));
    } catch (e) {
      console.error('Failed to save readiness overview', e);
    }
  }

  static getSmartNotes(): SmartNoteItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NOTES);
      if (data) return JSON.parse(data);
    } catch {}

    // Return default initial seeded notes
    return [
      {
        id: 'note-1',
        title: 'NMC CBME High-Yield Anatomy Notes — Brachial Plexus & Upper Limb',
        subject: 'Human Anatomy',
        fileType: 'PDF',
        fileName: 'Anatomy_HighYield_NMC.pdf',
        extractedText: 'Brachial plexus roots C5-T1. Branches of cords. Erb-Duchenne paralysis Policeman tip. Klumpke paralysis claw hand Horner syndrome.',
        summary: 'High-yield breakdown of upper limb nerve trunks, Erb’s point landmark, and clinical palsies with 10-mark examination diagrams.',
        keyTerms: ['Roots C5-T1', 'Erb-Duchenne', 'Klumpke claw hand', 'Axillary artery relation'],
        flashcardsCount: 6,
        vivaQuestionsCount: 4,
        uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'note-2',
        title: 'Wiggers Diagram & Cardiac Hemodynamics Review',
        subject: 'Physiology',
        fileType: 'TEXT',
        fileName: 'Cardiac_Cycle_Summary.txt',
        extractedText: 'Isovolumetric contraction all 4 valves closed. S1 heart sound. Aortic pressure dicrotic notch. Ejection fraction formula SV/EDV.',
        summary: 'Step-by-step phases of the cardiac cycle, pressure-volume loops, and auscultatory landmarks for 1st year professional exams.',
        keyTerms: ['Isovolumetric Contraction', 'S1 & S2 sounds', 'Dicrotic notch', 'Ejection fraction'],
        flashcardsCount: 5,
        vivaQuestionsCount: 3,
        uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
  }

  static saveSmartNotes(notes: SmartNoteItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
    } catch (e) {
      console.error('Failed to save notes', e);
    }
  }

  static resetToDefault(): void {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Failed to clear storage', e);
    }
  }
}
