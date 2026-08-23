import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  BookOpen, 
  Microscope, 
  Mic, 
  Layers, 
  Zap, 
  Flame, 
  ChevronRight, 
  ShieldAlert, 
  Play,
  ArrowUpRight
} from 'lucide-react';
import { 
  StudentProfile, 
  ReadinessOverview, 
  TopicConfidenceRecord, 
  AIStudyPlan, 
  SubjectReadiness 
} from '../../types';
import { AppView } from '../../hooks/useAppStore';
import { ConfidenceEngine } from '../../services/confidenceEngine';

interface DashboardViewProps {
  profile: StudentProfile;
  readiness: ReadinessOverview;
  topicRecords: Record<string, TopicConfidenceRecord>;
  subjectReadinessList: SubjectReadiness[];
  activePlan: AIStudyPlan | null;
  onNavigate: (view: AppView, topicId?: string) => void;
  onSelectTopic: (topicId: string) => void;
  onOpenFocusTimer: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  readiness,
  topicRecords,
  subjectReadinessList,
  activePlan,
  onNavigate,
  onSelectTopic,
  onOpenFocusTimer,
}) => {
  const sortedTopics = Object.values(topicRecords).sort((a, b) => b.priorityScore - a.priorityScore);
  const weakestTopic = sortedTopics[0];
  const masteredTopics = ConfidenceEngine.getMasteredTopicsToAvoid(topicRecords);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleImproveWeakest = () => {
    if (weakestTopic) {
      onSelectTopic(weakestTopic.topicId);
      onNavigate('theory', weakestTopic.topicId);
    } else {
      onNavigate('theory');
    }
  };

  const handleSubjectClick = (subjectId: string) => {
    const firstTopic = Object.values(topicRecords).find(t => t.subjectId === subjectId);
    if (firstTopic) {
      onSelectTopic(firstTopic.topicId);
    }
    onNavigate('theory');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner / Greeting & Countdown */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-sky-900 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Subtle decorative mesh */}
        <div className="absolute right-0 top-0 w-96 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-400/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2 text-sky-300 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{profile.program} • {profile.year} • {profile.university.split(' ')[0]}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {getGreeting()}, {profile.name} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-medium">
            Your university examination countdown is ticking. Stay focused on high-yield gaps.
          </p>
        </div>

        {/* Big Exam Timer Badge */}
        <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:px-6 flex items-center gap-4 shrink-0 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase text-slate-300 tracking-wider block">Your Exam Is In</span>
            <span className="text-2xl sm:text-3xl font-mono font-black text-amber-300">
              {readiness.hoursUntilExam}h {readiness.minutesUntilExam}m
            </span>
          </div>
        </div>
      </div>

      {/* Main Readiness Gauge Card & Theory/Prac/Viva Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Overall Readiness Gauge */}
        <div className="lg:col-span-7 med-card p-6 sm:p-8 bg-gradient-to-b from-white to-sky-50/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">YOUR EXAM READINESS</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                +{readiness.readinessDelta}% this week
              </span>
            </div>

            <div className="flex items-baseline gap-4 mb-3">
              <span className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight">
                {readiness.overallReadiness}%
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Target Benchmark: <span className="font-bold text-slate-800">80%+ (First Class Honors)</span>
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-3.5 mb-6 overflow-hidden p-0.5 border border-slate-200">
              <div 
                className="bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-500 h-full rounded-full transition-all duration-700 shadow-sm"
                style={{ width: `${readiness.overallReadiness}%` }}
              />
            </div>

            {/* Split Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div 
                onClick={() => onNavigate('theory')}
                className="p-3.5 bg-sky-50/70 hover:bg-sky-100/80 rounded-2xl border border-sky-100 cursor-pointer transition text-center group"
              >
                <div className="flex items-center justify-center gap-1.5 text-xs text-sky-700 font-semibold mb-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Theory</span>
                </div>
                <div className="text-2xl font-black text-sky-950">{readiness.theoryReadiness}%</div>
                <span className="text-[10px] text-sky-600 font-bold group-hover:underline">Practice Essays →</span>
              </div>

              <div 
                onClick={() => onNavigate('practical')}
                className="p-3.5 bg-teal-50/70 hover:bg-teal-100/80 rounded-2xl border border-teal-100 cursor-pointer transition text-center group"
              >
                <div className="flex items-center justify-center gap-1.5 text-xs text-teal-700 font-semibold mb-1">
                  <Microscope className="w-3.5 h-3.5" />
                  <span>Practical</span>
                </div>
                <div className="text-2xl font-black text-teal-950">{readiness.practicalReadiness}%</div>
                <span className="text-[10px] text-teal-600 font-bold group-hover:underline">Spotters →</span>
              </div>

              <div 
                onClick={() => onNavigate('viva')}
                className="p-3.5 bg-indigo-50/70 hover:bg-indigo-100/80 rounded-2xl border border-indigo-100 cursor-pointer transition text-center group"
              >
                <div className="flex items-center justify-center gap-1.5 text-xs text-indigo-700 font-semibold mb-1">
                  <Mic className="w-3.5 h-3.5" />
                  <span>Viva</span>
                </div>
                <div className="text-2xl font-black text-indigo-950">{readiness.vivaReadiness}%</div>
                <span className="text-[10px] text-indigo-600 font-bold group-hover:underline">Voice Simulator →</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={handleImproveWeakest}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white rounded-xl font-bold text-xs shadow-md shadow-sky-600/20 flex items-center justify-center gap-2 transition group"
            >
              <Sparkles className="w-4 h-4" />
              <span>Improve My Weakest Area ({weakestTopic?.topicName || 'Brachial Plexus'})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>
            <span className="text-[11px] text-slate-400">Targeting +8% recall gain</span>
          </div>
        </div>

        {/* Right: Gamified Professional Study Momentum */}
        <div className="lg:col-span-5 med-card p-6 bg-white flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-4">PREPARATION MOMENTUM</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-lg">
                    🔥
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{readiness.streakDays}-Day Study Streak</h4>
                    <p className="text-[11px] text-slate-400">Consistent daily medical recall</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-600">Active</span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{readiness.topicsMastered} Topics Mastered</h4>
                    <p className="text-[11px] text-slate-400">&gt;80% confidence score achieved</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-sky-600">Mastery</span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center font-bold">
                    <Layers className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{readiness.questionsPracticed} Questions Practiced</h4>
                    <p className="text-[11px] text-slate-400">Across Theory, Spotters & Viva</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-teal-600">Drills</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => onNavigate('exam')}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-700 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5"
            >
              <span>Take Full Exam Simulation (3 Stations)</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Subject Readiness Bars (Clickable) */}
      <div className="med-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">YOUR SUBJECTS</h3>
            <p className="text-xs text-slate-400">Click any subject to open high-yield theory notes and active recall</p>
          </div>
          <span className="text-xs font-bold text-sky-700">Year 1 Curriculum</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {subjectReadinessList.slice(0, 3).map((subj) => (
            <div
              key={subj.subjectId}
              onClick={() => handleSubjectClick(subj.subjectId)}
              className="p-4 bg-slate-50 hover:bg-sky-50/60 border border-slate-200/80 hover:border-sky-300 rounded-2xl cursor-pointer transition group space-y-3"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold text-slate-800 group-hover:text-sky-700 transition">
                  {subj.subjectName}
                </h4>
                <span className="text-xs font-mono font-bold text-slate-700 group-hover:text-sky-600">
                  {subj.overallScore}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    subj.overallScore >= 80 ? 'bg-emerald-500' : subj.overallScore >= 65 ? 'bg-sky-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${subj.overallScore}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Theory {subj.theoryScore}% • Viva {subj.vivaScore}%</span>
                <span className="font-bold text-sky-600 group-hover:translate-x-0.5 transition inline-flex items-center">
                  Review &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 3: AI Priority Engine & "Don't Study This Now" */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: AI Priority Engine (🔴 MUST STUDY, 🟠 HIGH PRIORITY, 🟢 MAINTAIN, ⚪ LOW PRIORITY) */}
        <div className="lg:col-span-7 med-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">AI STUDY PRIORITY ENGINE</h3>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Priority based on your performance and available study material.
              </p>
            </div>
            <button
              onClick={() => onNavigate('theory')}
              className="text-xs font-bold text-sky-600 hover:text-sky-800"
            >
              View All Topics
            </button>
          </div>

          <div className="space-y-3">
            {sortedTopics.slice(0, 4).map((topic) => {
              const badgeClass = 
                topic.priorityCategory === 'MUST_STUDY' ? 'badge-must-study' :
                topic.priorityCategory === 'HIGH_PRIORITY' ? 'badge-high-priority' :
                topic.priorityCategory === 'MAINTAIN' ? 'badge-maintain' : 'badge-low-priority';

              const iconDot = 
                topic.priorityCategory === 'MUST_STUDY' ? '🔴' :
                topic.priorityCategory === 'HIGH_PRIORITY' ? '🟠' :
                topic.priorityCategory === 'MAINTAIN' ? '🟢' : '⚪';

              return (
                <div
                  key={topic.topicId}
                  onClick={() => {
                    onSelectTopic(topic.topicId);
                    onNavigate('theory', topic.topicId);
                  }}
                  className="p-4 bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-slate-300 rounded-2xl cursor-pointer transition shadow-none hover:shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span>{iconDot}</span>
                      <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-sky-700 transition">
                        {topic.topicName}
                      </h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${badgeClass}`}>
                        {topic.priorityCategory.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                      <span>Confidence: <strong className="text-slate-800">{topic.confidenceScore}%</strong></span>
                      <span>•</span>
                      <span>Exam Relevance: <strong className="text-slate-800">High</strong></span>
                      <span>•</span>
                      <span>AI Priority: <strong className="text-rose-600">{topic.priorityScore}%</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      className="px-3 py-1.5 bg-white group-hover:bg-sky-600 group-hover:text-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition shadow-sm"
                    >
                      Revise Now &rarr;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: 🚫 "DON'T STUDY THIS NOW" Callout & Today's AI Plan */}
        <div className="lg:col-span-5 space-y-6">
          {/* Don't Study This Now Intervention */}
          {masteredTopics.length > 0 && (
            <div className="med-card p-5 bg-gradient-to-br from-amber-50/90 to-orange-50/50 border-amber-200">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-bold">
                  🚫
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-amber-950 uppercase tracking-wider">
                    DON'T STUDY THIS NOW
                  </h4>
                  <p className="text-xs text-amber-900 font-semibold">
                    You are already strong here: <span className="font-extrabold underline">{masteredTopics[0].topicName} ({masteredTopics[0].confidenceScore}%)</span>
                  </p>
                  <p className="text-[11px] text-amber-800/80 leading-relaxed pt-1">
                    Don't spend your next hour rereading mastered material. AI recommends shifting focus to:
                  </p>
                  <div className="pt-2 space-y-1 text-xs font-bold text-amber-950">
                    <div className="flex items-center gap-1.5">
                      <span>🔴</span>
                      <span>{sortedTopics[0]?.topicName || 'Brachial Plexus'} ({sortedTopics[0]?.confidenceScore || 42}%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span>🔴</span>
                      <span>Viva Voce Table Practice ({readiness.vivaReadiness}%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Today's High Yield Study Schedule */}
          <div className="med-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-sky-600" />
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  TODAY'S AI SCHEDULE ({profile.dailyAvailableHours}h)
                </h4>
              </div>
              <button 
                onClick={onOpenFocusTimer}
                className="text-[11px] font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Start Session</span>
              </button>
            </div>

            <div className="space-y-2">
              {activePlan?.items.slice(0, 3).map((item) => (
                <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-800">{item.topic}</div>
                    <span className="text-[10px] text-slate-400 font-mono">{item.timeSlot} • {item.mode}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-700">
                    {item.durationMinutes}m
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigate('emergency')}
              className="w-full py-2.5 px-3 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl text-rose-700 text-xs font-bold transition text-center block"
            >
              Switch to 6-Hour Emergency Night-Before Plan &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
