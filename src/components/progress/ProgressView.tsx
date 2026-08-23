import React from 'react';
import { 
  TrendingUp, 
  Award, 
  Flame, 
  CheckCircle2, 
  Layers, 
  Calendar, 
  ArrowUpRight,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { ReadinessOverview, TopicConfidenceRecord } from '../../types';

interface ProgressViewProps {
  readiness: ReadinessOverview;
  topicRecords: Record<string, TopicConfidenceRecord>;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  readiness,
  topicRecords,
}) => {
  const topics = Object.values(topicRecords);
  const mastered = topics.filter(t => t.confidenceScore >= 80);
  const inProgress = topics.filter(t => t.confidenceScore >= 60 && t.confidenceScore < 80);
  const weak = topics.filter(t => t.confidenceScore < 60);

  // Sorted for the mastery card grid
  const sortedTopics = [...topics].sort((a, b) => b.confidenceScore - a.confidenceScore);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="med-card p-6 bg-gradient-to-r from-teal-950 via-slate-900 to-sky-950 text-white rounded-3xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-teal-300 text-xs font-bold uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-teal-400" />
            <span>PROGRESS &amp; MASTERY DASHBOARD</span>
          </div>
          <h1 className="text-2xl font-black">7-Day Exam Readiness Trajectory</h1>
          <p className="text-xs text-slate-300">
            Track tangible medical preparation gains, active recall consistency, and topic mastery growth.
          </p>
        </div>
      </div>

      {/* 7-Day Chart & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 7-Day Chart (8 cols) */}
        <div className="lg:col-span-8 med-card p-6 sm:p-8 space-y-6 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                CONFIDENCE TRAJECTORY (LAST 7 DAYS)
              </h3>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                From <span className="font-bold text-slate-800">52%</span> on Monday to <span className="font-bold text-emerald-600">81%</span> today (+29% improvement)
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
              Honors Trajectory
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="grid grid-cols-7 gap-3 pt-6 items-end h-56 border-b border-slate-100 pb-4">
            {readiness.historicalReadiness.map((pt, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[11px] font-mono font-bold text-slate-600 group-hover:text-sky-600 transition">
                  {pt.score}%
                </span>
                <div className="w-full bg-slate-100 rounded-xl h-full flex items-end p-1">
                  <div
                    className="w-full bg-gradient-to-t from-sky-600 to-teal-500 rounded-lg transition-all duration-700 group-hover:from-sky-500 group-hover:to-teal-400"
                    style={{ height: `${pt.score}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-slate-500">{pt.day}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
            <div className="p-3 bg-sky-50 rounded-xl border border-sky-100">
              <span className="text-sky-600 block text-[10px] uppercase font-bold">Theory Index</span>
              <strong className="text-slate-800 text-base">{readiness.theoryReadiness}%</strong>
            </div>
            <div className="p-3 bg-teal-50 rounded-xl border border-teal-100">
              <span className="text-teal-600 block text-[10px] uppercase font-bold">Practical Index</span>
              <strong className="text-slate-800 text-base">{readiness.practicalReadiness}%</strong>
            </div>
            <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100">
              <span className="text-indigo-600 block text-[10px] uppercase font-bold">Viva Voce Index</span>
              <strong className="text-slate-800 text-base">{readiness.vivaReadiness}%</strong>
            </div>
          </div>
        </div>

        {/* Right: Breakdown (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="med-card p-6 bg-white space-y-4">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">TOPIC BREAKDOWN</h3>
            
            <div className="space-y-3">
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">🟢</span>
                  <div>
                    <h5 className="text-xs font-bold text-emerald-950">Mastered ({mastered.length})</h5>
                    <span className="text-[10px] text-emerald-700">Confidence &gt; 80%</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700">{mastered.length} Topics</span>
              </div>

              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">🟡</span>
                  <div>
                    <h5 className="text-xs font-bold text-amber-950">In Progress ({inProgress.length})</h5>
                    <span className="text-[10px] text-amber-700">Confidence 60–79%</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-amber-700">{inProgress.length} Topics</span>
              </div>

              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">🔴</span>
                  <div>
                    <h5 className="text-xs font-bold text-rose-950">Priority Focus ({weak.length})</h5>
                    <span className="text-[10px] text-rose-700">Confidence &lt; 60%</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-rose-700">{weak.length} Topics</span>
              </div>
            </div>
          </div>

          {/* Momentum Stats */}
          <div className="med-card p-5 bg-white space-y-3">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">STUDY MOMENTUM</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs p-2.5 bg-amber-50 rounded-xl border border-amber-100">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🔥</span>
                  <span className="font-bold text-amber-900">{readiness.streakDays}-Day Streak</span>
                </div>
                <span className="font-mono font-bold text-amber-700">Active</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2.5 bg-sky-50 rounded-xl border border-sky-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  <span className="font-bold text-sky-900">{readiness.topicsMastered} Topics Mastered</span>
                </div>
                <span className="font-mono font-bold text-sky-700">Mastery</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2.5 bg-teal-50 rounded-xl border border-teal-100">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-teal-600" />
                  <span className="font-bold text-teal-900">{readiness.questionsPracticed} Questions Done</span>
                </div>
                <span className="font-mono font-bold text-teal-700">Drills</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Per-Topic Mastery Grid */}
      <div className="med-card p-6 bg-white space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">TOPIC MASTERY MAP</h3>
            <p className="text-xs text-slate-400 mt-0.5">Live confidence scores across all {topics.length} topics — click to open theory</p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            {mastered.length}/{topics.length} mastered
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sortedTopics.map((topic) => {
            const isStrong = topic.confidenceScore >= 80;
            const isMid = topic.confidenceScore >= 60 && topic.confidenceScore < 80;
            const isWeak = topic.confidenceScore < 60;

            const barColor = isStrong ? 'bg-emerald-500' : isMid ? 'bg-amber-500' : 'bg-rose-500';
            const badge = isStrong ? '🟢 Mastered' : isMid ? '🟡 In Progress' : '🔴 Needs Work';
            const badgeBg = isStrong ? 'bg-emerald-50 text-emerald-700' : isMid ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700';

            return (
              <div
                key={topic.topicId}
                className="p-4 bg-slate-50 hover:bg-white border border-slate-200 hover:border-slate-300 rounded-2xl cursor-pointer transition hover:shadow-md group space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-sky-700 transition leading-tight">{topic.topicName}</h4>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap ${badgeBg}`}>{badge}</span>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>{topic.subjectId}</span>
                  <span className="font-mono font-bold text-slate-700">{topic.confidenceScore}%</span>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`${barColor} h-full rounded-full transition-all duration-700`}
                    style={{ width: `${topic.confidenceScore}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">Priority: <span className="font-bold text-slate-600">{topic.priorityScore}%</span></span>
                  <span className="text-sky-600 font-bold group-hover:underline flex items-center gap-0.5">
                    Revise <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

