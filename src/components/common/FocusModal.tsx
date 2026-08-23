import React, { useState } from 'react';
import { X, Play, Pause, RotateCcw, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import { useTimer } from '../../hooks/useTimer';

interface FocusModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTopic: string;
  onRecordResult: (grade: 'YES' | 'PARTIAL' | 'NO') => void;
}

export const FocusModal: React.FC<FocusModalProps> = ({
  isOpen,
  onClose,
  currentTopic,
  onRecordResult,
}) => {
  const { secondsLeft, isRunning, isCompleted, start, pause, reset, formatTime } = useTimer(25 * 60, false);
  const [showAssessment, setShowAssessment] = useState(false);

  if (!isOpen) return null;

  const handleFinishEarly = () => {
    pause();
    setShowAssessment(true);
  };

  const handleFeedback = (grade: 'YES' | 'PARTIAL' | 'NO') => {
    onRecordResult(grade);
    setShowAssessment(false);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!showAssessment && !isCompleted ? (
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-50 text-sky-700 border border-sky-200 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
              High-Yield Focus Session
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-slate-900">Current Revision Task</h3>
              <p className="text-sm font-semibold text-sky-700 mt-1">{currentTopic || 'Brachial Plexus & Upper Limb'}</p>
            </div>

            {/* Big Countdown Display */}
            <div className="py-8 bg-gradient-to-b from-slate-50 to-sky-50/50 rounded-2xl border border-sky-100">
              <div className="text-6xl font-mono font-black text-slate-800 tracking-tight">
                {formatTime()}
              </div>
              <p className="text-xs text-slate-400 font-medium mt-2">25-minute Pomodoro Block</p>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center justify-center gap-3">
              {!isRunning ? (
                <button
                  onClick={start}
                  className="flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold shadow-md shadow-sky-600/20 transition"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Start Session</span>
                </button>
              ) : (
                <button
                  onClick={pause}
                  className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold shadow-md shadow-amber-500/20 transition"
                >
                  <Pause className="w-5 h-5 fill-current" />
                  <span>Pause</span>
                </button>
              )}

              <button
                onClick={() => reset(25 * 60)}
                className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition"
                title="Reset Timer"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                onClick={handleFinishEarly}
                className="px-4 py-3 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 text-xs font-bold rounded-xl transition border border-slate-200"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Post-Session Understanding Check */
          <div className="text-center space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
              🎯
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">Session Complete!</h3>
              <p className="text-xs text-slate-500 mt-1">Did you understand <span className="font-semibold text-slate-700">{currentTopic}</span>?</p>
            </div>

            <p className="text-xs text-slate-400">Your answer will calibrate your dynamic readiness score and future study priorities.</p>

            <div className="grid grid-cols-3 gap-2.5 pt-2">
              <button
                onClick={() => handleFeedback('YES')}
                className="p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-center transition flex flex-col items-center gap-1.5 group"
              >
                <CheckCircle2 className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition" />
                <span className="text-xs font-bold">Yes, Got It</span>
                <span className="text-[10px] text-emerald-600 font-medium">+8% Recall</span>
              </button>

              <button
                onClick={() => handleFeedback('PARTIAL')}
                className="p-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-center transition flex flex-col items-center gap-1.5 group"
              >
                <HelpCircle className="w-6 h-6 text-amber-600 group-hover:scale-110 transition" />
                <span className="text-xs font-bold">Need Review</span>
                <span className="text-[10px] text-amber-600 font-medium">+2% Review</span>
              </button>

              <button
                onClick={() => handleFeedback('NO')}
                className="p-3.5 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 text-center transition flex flex-col items-center gap-1.5 group"
              >
                <AlertCircle className="w-6 h-6 text-rose-600 group-hover:scale-110 transition" />
                <span className="text-xs font-bold">Confused</span>
                <span className="text-[10px] text-rose-600 font-medium">Keep High Urgency</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
