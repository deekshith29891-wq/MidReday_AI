import React, { useState } from 'react';
import { 
  Clock, 
  Sparkles, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Zap, 
  ChevronRight, 
  Layers 
} from 'lucide-react';
import { AIPlannerService } from '../../services/aiPlanner';
import { useTimer } from '../../hooks/useTimer';

export const RescueView: React.FC = () => {
  const rescueData = AIPlannerService.generate10MinuteRescuePlan();
  const [activeSprintIndex, setActiveSprintIndex] = useState(0);
  const { secondsLeft, isRunning, isCompleted, start, pause, reset, formatTime } = useTimer(10 * 60, false);

  const currentSprint = rescueData.sprints[activeSprintIndex] || rescueData.sprints[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner with Big 10-Min Timer */}
      <div className="med-card p-6 sm:p-8 bg-gradient-to-r from-amber-950 via-slate-900 to-rose-950 text-white rounded-3xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-400/30 rounded-full text-xs font-extrabold uppercase tracking-wider">
              <span>⚡ AI 10-MINUTE RESCUE MODE</span>
              <span>•</span>
              <span>Ultra High-Yield Sprint</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">"I Have Only 10 Minutes"</h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Distilled high-yield medical pearls and rapid viva reflex rules. Absolute highest impact points before walking into your exam hall.
            </p>
          </div>

          {/* Timer Display & Controls */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:px-6 flex items-center gap-4 shrink-0">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-amber-200 block">Rescue Timer</span>
              <span className="text-3xl sm:text-4xl font-mono font-black text-amber-300">
                {formatTime()}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {!isRunning ? (
                <button
                  onClick={start}
                  className="p-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold shadow-md transition"
                  title="Start 10-min countdown"
                >
                  <Play className="w-5 h-5 fill-current" />
                </button>
              ) : (
                <button
                  onClick={pause}
                  className="p-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold shadow-md transition"
                  title="Pause countdown"
                >
                  <Pause className="w-5 h-5 fill-current" />
                </button>
              )}
              <button
                onClick={() => reset(10 * 60)}
                className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition"
                title="Reset timer"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Sprints Navigation Pills */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1">
          {rescueData.sprints.map((sp, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSprintIndex(idx)}
              className={`py-2 px-3.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 ${
                activeSprintIndex === idx
                  ? 'bg-amber-400 text-slate-950 font-extrabold shadow-md'
                  : 'bg-white/10 text-slate-200 hover:bg-white/15'
              }`}
            >
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/20 font-mono">{sp.minuteLabel}</span>
              <span>{sp.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Sprint Detail Card */}
      <div className="med-card p-6 sm:p-8 space-y-6 bg-white">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
              {currentSprint.subject} • {currentSprint.minuteLabel} High-Yield Window
            </span>
            <h2 className="text-xl font-black text-slate-900 mt-2">{currentSprint.title}</h2>
          </div>

          <button
            onClick={() => setActiveSprintIndex((prev) => (prev + 1) % rescueData.sprints.length)}
            className="px-4 py-2 bg-slate-100 hover:bg-amber-50 hover:text-amber-800 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1"
          >
            <span>Next Card</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* High-Yield Bullets */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
            CARDINAL HIGH-YIELD POINTS TO MEMORIZE
          </h4>
          <div className="space-y-2.5">
            {currentSprint.pearls.map((pearl, pIdx) => (
              <div key={pIdx} className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {pIdx + 1}
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                  {pearl}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Tip */}
        <div className="p-4 bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200 rounded-2xl flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold text-sky-950 block">Key Visual / Diagram Memory Hook:</span>
            <p className="text-xs text-sky-900 font-medium mt-0.5">{currentSprint.keyDiagramTip}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
