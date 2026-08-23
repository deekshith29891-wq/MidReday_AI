import React, { useState } from 'react';
import { 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  AlertCircle, 
  Eye, 
  RotateCcw,
  Stethoscope,
  TrendingUp,
  Flame
} from 'lucide-react';
import { ActiveRecallCard } from '../../types';
import { MOCK_ACTIVE_RECALL_CARDS } from '../../data/mockMedicalDB';

interface RecallViewProps {
  onRecordAssessment: (topicId: string, mode: 'Recall', grade: 'YES' | 'PARTIAL' | 'NO') => void;
}

export const RecallView: React.FC<RecallViewProps> = ({ onRecordAssessment }) => {
  const [cards] = useState<ActiveRecallCard[]>(MOCK_ACTIVE_RECALL_CARDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [sessionStats, setSessionStats] = useState({ yes: 0, partial: 0, no: 0, total: 0 });
  const [isComplete, setIsComplete] = useState(false);

  const currentCard = cards[currentIndex] || cards[0];
  const progress = Math.round((sessionStats.total / cards.length) * 100);

  const handleFeedback = (grade: 'YES' | 'PARTIAL' | 'NO') => {
    onRecordAssessment(currentCard.topicId, 'Recall', grade);
    const newStats = {
      ...sessionStats,
      total: sessionStats.total + 1,
      yes: grade === 'YES' ? sessionStats.yes + 1 : sessionStats.yes,
      partial: grade === 'PARTIAL' ? sessionStats.partial + 1 : sessionStats.partial,
      no: grade === 'NO' ? sessionStats.no + 1 : sessionStats.no,
    };
    setSessionStats(newStats);
    setIsRevealed(false);
    if (currentIndex + 1 >= cards.length) {
      setIsComplete(true);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsRevealed(false);
    setSessionStats({ yes: 0, partial: 0, no: 0, total: 0 });
    setIsComplete(false);
  };

  const masteryRate = sessionStats.total > 0 ? Math.round((sessionStats.yes / sessionStats.total) * 100) : 0;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="med-card p-6 bg-gradient-to-r from-sky-950 via-slate-900 to-teal-950 text-white rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sky-300 text-xs font-bold uppercase tracking-wider">
              <Layers className="w-4 h-4 text-sky-400" />
              <span>🧠 Active Recall &amp; Spaced Retrieval</span>
            </div>
            <h1 className="text-2xl font-black">Active Knowledge Retrieval Deck</h1>
            <p className="text-xs text-slate-300">
              Active recall forces synaptic consolidation. Test your immediate retrieval and calibrate your confidence score.
            </p>
          </div>
          <span className="px-3.5 py-1.5 bg-white/10 rounded-xl text-xs font-mono font-bold text-sky-200 self-start sm:self-center">
            {isComplete ? `✅ ${cards.length}/${cards.length} Done` : `Card ${currentIndex + 1} of ${cards.length}`}
          </span>
        </div>
      </div>

      {/* Session Progress Bar */}
      <div className="med-card p-4 bg-white space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
          <span>Session Progress</span>
          <span className="text-sky-700">{sessionStats.total}/{cards.length} reviewed</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-sky-500 to-teal-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-3 text-center text-xs">
          <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-200">
            <span className="text-emerald-700 font-bold block text-lg">{sessionStats.yes}</span>
            <span className="text-emerald-600 font-semibold">🟢 Recalled</span>
          </div>
          <div className="p-2 bg-amber-50 rounded-xl border border-amber-200">
            <span className="text-amber-700 font-bold block text-lg">{sessionStats.partial}</span>
            <span className="text-amber-600 font-semibold">🟡 Partial</span>
          </div>
          <div className="p-2 bg-rose-50 rounded-xl border border-rose-200">
            <span className="text-rose-700 font-bold block text-lg">{sessionStats.no}</span>
            <span className="text-rose-600 font-semibold">🔴 Missed</span>
          </div>
        </div>
      </div>

      {/* Session Complete Summary */}
      {isComplete ? (
        <div className="med-card p-8 bg-white text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 flex items-center justify-center mx-auto text-3xl">🎉</div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">Session Complete!</h2>
            <p className="text-xs text-slate-500 mt-1">You've reviewed all {cards.length} cards in this deck.</p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl max-w-xs mx-auto space-y-3">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Session Mastery Rate</span>
            <div className="text-4xl font-black text-slate-900 font-mono">{masteryRate}%</div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${masteryRate >= 80 ? 'bg-emerald-500' : masteryRate >= 60 ? 'bg-amber-500' : 'bg-rose-500'}`}
                style={{ width: `${masteryRate}%` }}
              />
            </div>
            <span className="text-xs font-medium text-slate-500">
              {masteryRate >= 80 ? '🌟 Excellent retention!' : masteryRate >= 60 ? '✅ Good — review missed cards' : '📚 Keep practicing — these are key topics'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto text-xs text-center">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl">
              <div className="text-2xl font-black text-emerald-700">{sessionStats.yes}</div>
              <span className="text-emerald-600 font-bold">Recalled ✓</span>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl">
              <div className="text-2xl font-black text-amber-700">{sessionStats.partial}</div>
              <span className="text-amber-600 font-bold">Partial ~</span>
            </div>
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl">
              <div className="text-2xl font-black text-rose-700">{sessionStats.no}</div>
              <span className="text-rose-600 font-bold">Missed ✗</span>
            </div>
          </div>

          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white rounded-xl font-bold text-sm shadow-md shadow-sky-600/20 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restart Deck</span>
          </button>
        </div>
      ) : (
        /* Main Flashcard */
        <div className="max-w-2xl mx-auto">
          <div className="med-card p-6 sm:p-10 bg-white min-h-[380px] flex flex-col justify-between space-y-6 relative">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100">
                  {currentCard.subjectName} • {currentCard.topicName}
                </span>
                <span className="text-[10px] font-bold text-slate-400">Card #{currentCard.id}</span>
              </div>

              <div className="pt-2">
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block mb-1">
                  EXAM QUESTION / PROMPT
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  "{currentCard.question}"
                </h2>
              </div>

              {isRevealed && (
                <div className="space-y-4 pt-4 border-t border-slate-100 animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-4 bg-sky-50/80 border border-sky-200 rounded-2xl space-y-1">
                    <span className="text-[10px] font-extrabold text-sky-900 uppercase tracking-wider block">
                      HIGH-YIELD CORE FACT
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
                      {currentCard.highYieldFact}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-500 block">Must-Remember Key Details:</span>
                    {currentCard.mustRememberPoints.map((pt, pIdx) => (
                      <div key={pIdx} className="text-xs text-slate-700 font-medium flex items-start gap-2">
                        <span className="text-sky-600 font-bold">•</span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>

                  {currentCard.clinicalContext && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 font-medium flex items-start gap-2">
                      <Stethoscope className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>Clinical Context: {currentCard.clinicalContext}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {!isRevealed ? (
              <button
                onClick={() => setIsRevealed(true)}
                className="w-full py-4 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white rounded-2xl font-bold text-sm shadow-md shadow-sky-600/20 transition flex items-center justify-center gap-2"
              >
                <Eye className="w-5 h-5" />
                <span>Reveal High-Yield Answer</span>
              </button>
            ) : (
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-slate-500 text-center block">
                  Did you accurately retrieve this knowledge?
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleFeedback('YES')}
                    className="py-3 px-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold transition flex flex-col items-center gap-1 group"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition" />
                    <span>🟢 Yes (+8%)</span>
                  </button>
                  <button
                    onClick={() => handleFeedback('PARTIAL')}
                    className="py-3 px-2 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-800 rounded-xl text-xs font-bold transition flex flex-col items-center gap-1 group"
                  >
                    <HelpCircle className="w-5 h-5 text-amber-600 group-hover:scale-110 transition" />
                    <span>🟡 Partial (+2%)</span>
                  </button>
                  <button
                    onClick={() => handleFeedback('NO')}
                    className="py-3 px-2 bg-rose-50 hover:bg-rose-100 border border-rose-300 text-rose-800 rounded-xl text-xs font-bold transition flex flex-col items-center gap-1 group"
                  >
                    <AlertCircle className="w-5 h-5 text-rose-600 group-hover:scale-110 transition" />
                    <span>🔴 No (Flagged)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
