import React, { useState } from 'react';
import { useAppStore } from './hooks/useAppStore';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { BottomNav } from './components/common/BottomNav';
import { FocusModal } from './components/common/FocusModal';
import { SearchModal } from './components/common/SearchModal';

import { OnboardingView } from './components/onboarding/OnboardingView';
import { DashboardView } from './components/dashboard/DashboardView';
import { TheoryView } from './components/theory/TheoryView';
import { PracticalView } from './components/practical/PracticalView';
import { VivaView } from './components/viva/VivaView';
import { PYQView } from './components/pyq/PYQView';
import { EvaluatorView } from './components/evaluator/EvaluatorView';
import { EmergencyView } from './components/emergency/EmergencyView';
import { RescueView } from './components/emergency/RescueView';
import { RecallView } from './components/recall/RecallView';
import { ExamSimulatorView } from './components/exam/ExamSimulatorView';
import { SmartNotesView } from './components/notes/SmartNotesView';
import { ProgressView } from './components/progress/ProgressView';
import { SettingsView } from './components/settings/SettingsView';

export function App() {
  const {
    profile,
    setProfile,
    topicRecords,
    readiness,
    smartNotes,
    setSmartNotes,
    currentView,
    setCurrentView,
    selectedTopicId,
    setSelectedTopicId,
    activePlan,
    toasts,
    isFocusTimerActive,
    setIsFocusTimerActive,
    recordPracticeAssessment,
    completeOnboarding,
    getSubjectReadinessList,
    resetAllData,
  } = useAppStore();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [evaluatorInitialTopic, setEvaluatorInitialTopic] = useState('Brachial Plexus');

  // Navigate helper
  const handleNavigate = (view: any, topicNameOrId?: string) => {
    if (topicNameOrId) {
      // Find matching topic ID if passed name
      setSelectedTopicId(topicNameOrId);
      setEvaluatorInitialTopic(topicNameOrId);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToEvaluator = (topic: string) => {
    setEvaluatorInitialTopic(topic);
    setCurrentView('evaluator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If student is not onboarded, show Onboarding view
  if (!profile.onboarded || currentView === 'onboarding') {
    return (
      <OnboardingView
        initialProfile={profile}
        onComplete={completeOnboarding}
      />
    );
  }

  const currentTopicRecord = topicRecords[selectedTopicId];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Application Header */}
      <Header
        profile={profile}
        readiness={readiness}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenFocusTimer={() => setIsFocusTimerActive(true)}
        onNavigate={handleNavigate}
        currentView={currentView}
      />

      {/* Main Body Area */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar */}
        <Sidebar
          currentView={currentView}
          onNavigate={handleNavigate}
          profile={profile}
          readiness={readiness}
        />

        {/* Content View Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {currentView === 'dashboard' && (
            <DashboardView
              profile={profile}
              readiness={readiness}
              topicRecords={topicRecords}
              subjectReadinessList={getSubjectReadinessList()}
              activePlan={activePlan}
              onNavigate={handleNavigate}
              onSelectTopic={setSelectedTopicId}
              onOpenFocusTimer={() => setIsFocusTimerActive(true)}
            />
          )}

          {currentView === 'theory' && (
            <TheoryView
              selectedTopicId={selectedTopicId}
              onSelectTopic={setSelectedTopicId}
              onRecordAssessment={(topicId, mode, grade) => recordPracticeAssessment(topicId, mode, grade)}
              onNavigateToEvaluator={handleNavigateToEvaluator}
            />
          )}

          {currentView === 'practical' && (
            <PracticalView
              onRecordAssessment={(topicId, mode, score) => recordPracticeAssessment(topicId, mode, score)}
            />
          )}

          {currentView === 'viva' && (
            <VivaView
              onRecordAssessment={(topicId, mode, score) => recordPracticeAssessment(topicId, mode, score)}
            />
          )}

          {currentView === 'pyqs' && (
            <PYQView
              onNavigateToTheory={(topic) => handleNavigate('theory', topic)}
            />
          )}

          {currentView === 'evaluator' && (
            <EvaluatorView
              initialTopicName={evaluatorInitialTopic}
              onRecordAssessment={(topicId, mode, score) => recordPracticeAssessment(topicId, mode, score)}
            />
          )}

          {currentView === 'emergency' && (
            <EmergencyView
              onNavigate={handleNavigate}
              onOpenFocusTimer={() => setIsFocusTimerActive(true)}
            />
          )}

          {currentView === 'rescue' && (
            <RescueView />
          )}

          {currentView === 'recall' && (
            <RecallView
              onRecordAssessment={(topicId, mode, grade) => recordPracticeAssessment(topicId, mode, grade)}
            />
          )}

          {currentView === 'exam' && (
            <ExamSimulatorView
              onRecordAssessment={(topicId, mode, score) => recordPracticeAssessment(topicId, mode, score)}
              onFinishExam={() => setCurrentView('dashboard')}
            />
          )}

          {currentView === 'notes' && (
            <SmartNotesView
              notes={smartNotes}
              onSaveNotes={setSmartNotes}
              onNavigate={handleNavigate}
            />
          )}

          {currentView === 'progress' && (
            <ProgressView
              readiness={readiness}
              topicRecords={topicRecords}
            />
          )}

          {currentView === 'settings' && (
            <SettingsView
              profile={profile}
              onUpdateProfile={(updated) => setProfile(prev => ({ ...prev, ...updated }))}
              onResetData={resetAllData}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      {/* Focus Timer Modal */}
      <FocusModal
        isOpen={isFocusTimerActive}
        onClose={() => setIsFocusTimerActive(false)}
        currentTopic={currentTopicRecord?.topicName || 'Brachial Plexus'}
        onRecordResult={(grade) => recordPracticeAssessment(selectedTopicId, 'Theory', grade)}
      />

      {/* Search & AI Router Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Toast Notification Container */}
      <div className="fixed bottom-16 md:bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-2xl shadow-xl border text-xs font-bold pointer-events-auto animate-in slide-in-from-bottom-5 duration-200 flex items-center gap-2 ${
              toast.type === 'success'
                ? 'bg-emerald-900 text-white border-emerald-700'
                : toast.type === 'error'
                ? 'bg-rose-900 text-white border-rose-700'
                : 'bg-slate-900 text-white border-slate-700'
            }`}
          >
            <span>{toast.type === 'success' ? '✓' : 'ℹ'}</span>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
