import { useState, useEffect, useCallback } from 'react';
import { 
  StudentProfile, 
  TopicConfidenceRecord, 
  ReadinessOverview, 
  AIStudyPlan, 
  SubjectReadiness, 
  SmartNoteItem 
} from '../types';
import { StorageService } from '../services/storageService';
import { ConfidenceEngine } from '../services/confidenceEngine';
import { AIPlannerService } from '../services/aiPlanner';
import { CURRICULUM_SUBJECTS, MEDICAL_TOPICS } from '../data/curriculumData';

export type AppView = 
  | 'dashboard' 
  | 'onboarding'
  | 'theory' 
  | 'practical' 
  | 'viva' 
  | 'pyqs' 
  | 'emergency' 
  | 'rescue' 
  | 'recall' 
  | 'exam' 
  | 'evaluator'
  | 'notes' 
  | 'progress' 
  | 'settings';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

export function useAppStore() {
  const [profile, setProfile] = useState<StudentProfile>(StorageService.getProfile);
  const [topicRecords, setTopicRecords] = useState<Record<string, TopicConfidenceRecord>>(StorageService.getTopicConfidence);
  const [readiness, setReadiness] = useState<ReadinessOverview>(StorageService.getReadinessOverview);
  const [smartNotes, setSmartNotes] = useState<SmartNoteItem[]>(StorageService.getSmartNotes);
  const [currentView, setCurrentView] = useState<AppView>(() => {
    const p = StorageService.getProfile();
    return p.onboarded ? 'dashboard' : 'onboarding';
  });
  const [selectedTopicId, setSelectedTopicId] = useState<string>('top-brachial-plexus');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('sub-anatomy');
  const [activePlan, setActivePlan] = useState<AIStudyPlan | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocusTimerActive, setIsFocusTimerActive] = useState(false);

  // Auto-generate plan if none
  useEffect(() => {
    if (!activePlan && profile.onboarded) {
      const plan = AIPlannerService.generateStudyPlan(
        profile.dailyAvailableHours || 6,
        topicRecords,
        profile.targetExamType
      );
      setActivePlan(plan);
    }
  }, [profile, topicRecords, activePlan]);

  // Persist state changes
  useEffect(() => {
    StorageService.saveProfile(profile);
  }, [profile]);

  useEffect(() => {
    StorageService.saveTopicConfidence(topicRecords);
  }, [topicRecords]);

  useEffect(() => {
    StorageService.saveReadinessOverview(readiness);
  }, [readiness]);

  useEffect(() => {
    StorageService.saveSmartNotes(smartNotes);
  }, [smartNotes]);

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  // Update a topic confidence after an assessment
  const recordPracticeAssessment = useCallback((
    topicId: string,
    mode: 'Theory' | 'Practical' | 'Viva' | 'Recall',
    resultGrade: 'YES' | 'PARTIAL' | 'NO' | number
  ) => {
    setTopicRecords((prev) => {
      const existing = prev[topicId] || {
        topicId,
        topicName: MEDICAL_TOPICS.find(t => t.id === topicId)?.name || 'Medical Topic',
        subjectId: MEDICAL_TOPICS.find(t => t.id === topicId)?.subjectId || 'sub-anatomy',
        confidenceScore: 50,
        theoryScore: 50,
        practicalScore: 50,
        vivaScore: 50,
        recallScore: 50,
        attemptsCount: 0,
        priorityCategory: 'MUST_STUDY',
        priorityScore: 85,
        repeatedMistakes: [],
      };

      const updated = ConfidenceEngine.recordTopicPracticeResult(existing, mode, resultGrade);
      const newMap = { ...prev, [topicId]: updated };

      // Recalculate overall readiness
      const newReadiness = ConfidenceEngine.calculateOverallReadiness(newMap, readiness, profile.examDate);
      newReadiness.questionsPracticed += 1;
      setReadiness(newReadiness);

      return newMap;
    });

    showToast(`Topic confidence updated for ${mode}!`, 'success');
  }, [readiness, profile.examDate, showToast]);

  // Complete onboarding
  const completeOnboarding = useCallback((updatedProfile: Partial<StudentProfile>) => {
    const newProfile = {
      ...profile,
      ...updatedProfile,
      onboarded: true,
    };
    setProfile(newProfile);
    setCurrentView('dashboard');
    showToast('Preparation Plan Generated Successfully!', 'success');
  }, [profile, showToast]);

  // Dynamic Subject readiness list
  const getSubjectReadinessList = useCallback((): SubjectReadiness[] => {
    return CURRICULUM_SUBJECTS.map((subj) => {
      return ConfidenceEngine.calculateSubjectReadiness(subj.id, subj.name, topicRecords);
    });
  }, [topicRecords]);

  // Reset to default
  const resetAllData = useCallback(() => {
    StorageService.resetToDefault();
    setProfile(StorageService.getProfile());
    setTopicRecords(StorageService.getTopicConfidence());
    setReadiness(StorageService.getReadinessOverview());
    setSmartNotes(StorageService.getSmartNotes());
    setCurrentView('dashboard');
    showToast('Platform reset to original medical state', 'info');
  }, [showToast]);

  return {
    profile,
    setProfile,
    topicRecords,
    setTopicRecords,
    readiness,
    setReadiness,
    smartNotes,
    setSmartNotes,
    currentView,
    setCurrentView,
    selectedTopicId,
    setSelectedTopicId,
    selectedSubjectId,
    setSelectedSubjectId,
    activePlan,
    setActivePlan,
    toasts,
    showToast,
    searchQuery,
    setSearchQuery,
    isFocusTimerActive,
    setIsFocusTimerActive,
    recordPracticeAssessment,
    completeOnboarding,
    getSubjectReadinessList,
    resetAllData,
  };
}
