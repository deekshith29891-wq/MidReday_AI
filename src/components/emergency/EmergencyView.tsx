import React, { useState } from 'react';
import { 
  Zap, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  Play, 
  ArrowRight, 
  ShieldAlert,
  HelpCircle,
  Award
} from 'lucide-react';
import { AIPlannerService } from '../../services/aiPlanner';
import { AppView } from '../../hooks/useAppStore';

interface EmergencyViewProps {
  onNavigate: (view: AppView, topic?: string) => void;
  onOpenFocusTimer: () => void;
}

export const EmergencyView: React.FC<EmergencyViewProps> = ({ onNavigate, onOpenFocusTimer }) => {
  const emergencyPlan = AIPlannerService.generateNightBeforeEmergencyPlan();
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setCompletedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(completedItems).filter(Boolean).length;
  const totalCount = emergencyPlan.items.length;
  const progressPct = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="med-card p-6 sm:p-8 bg-gradient-to-r from-rose-950 via-slate-900 to-amber-950 text-white rounded-3xl relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-400/30 rounded-full text-xs font-extrabold uppercase tracking-wider">
            <span>🔥 NIGHT-BEFORE EXAM MODE</span>
            <span>•</span>
            <span>6-Hour Emergency Revision</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            "I Have An Exam Tomorrow"
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            A surgical, minute-by-minute revision schedule built strictly around your high-yield weaknesses. Zero time wasted on topics you already know.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-300">
              Protocol Completed: <strong className="text-rose-400 font-mono">{completedCount}/{totalCount} Blocks ({progressPct}%)</strong>
            </span>
            <div className="w-32 bg-white/10 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-400 to-rose-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => onNavigate('rescue')}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition shadow-md flex items-center gap-1.5"
          >
            <span>Only have 10 minutes? Switch to Rescue Sprint &rarr;</span>
          </button>
        </div>
      </div>

      {/* Emergency Schedule Timeline */}
      <div className="space-y-3">
        {emergencyPlan.items.map((item, idx) => {
          const isDone = !!completedItems[item.id];
          const isBreak = item.mode === 'Break';

          return (
            <div
              key={item.id}
              className={`med-card p-5 sm:p-6 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isDone 
                  ? 'bg-emerald-50/50 border-emerald-200 opacity-85' 
                  : isBreak 
                  ? 'bg-slate-50 border-dashed border-slate-300' 
                  : 'bg-white hover:border-rose-300'
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleItem(item.id)}
                  className={`w-7 h-7 rounded-xl flex items-center justify-center border text-xs font-bold shrink-0 mt-0.5 transition ${
                    isDone 
                      ? 'bg-emerald-600 border-emerald-600 text-white' 
                      : 'border-slate-300 bg-white hover:border-slate-400 text-slate-400'
                  }`}
                >
                  {isDone ? '✓' : idx + 1}
                </button>

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                      {item.timeSlot}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {item.subject}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {item.mode}
                    </span>
                  </div>

                  <h3 className={`text-sm font-extrabold ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                    {item.topic}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                    {item.description}
                  </p>

                  {item.highYieldTips.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {item.highYieldTips.map((tip, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                          💡 {tip}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                {!isBreak && (
                  <button
                    onClick={() => {
                      if (item.mode === 'Theory') onNavigate('theory', item.topic);
                      else if (item.mode === 'Practical') onNavigate('practical');
                      else if (item.mode === 'Viva') onNavigate('viva');
                      else if (item.mode === 'PYQ') onNavigate('pyqs');
                      else onNavigate('recall');
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Launch Station</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
