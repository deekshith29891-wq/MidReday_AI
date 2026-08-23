import React, { useState, useEffect, useRef } from 'react';
import { 
  GraduationCap, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Microscope, 
  Mic, 
  RotateCcw,
  AlertTriangle
} from 'lucide-react';
import { MedicalGraphic } from '../common/MedicalIllustrations';

interface ExamSimulatorViewProps {
  onRecordAssessment: (topicId: string, mode: 'Theory' | 'Practical' | 'Viva', grade: number) => void;
  onFinishExam: () => void;
}

// Per-station time limits in seconds
const STATION_TIMES: Record<string, number> = {
  THEORY: 15 * 60,
  PRACTICAL: 5 * 60,
  VIVA: 3 * 60,
};

function useCountdown(seconds: number, active: boolean) {
  const [remaining, setRemaining] = useState(seconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => { setRemaining(seconds); }, [seconds]);

  useEffect(() => {
    if (!active) { if (intervalRef.current) clearInterval(intervalRef.current); return; }
    intervalRef.current = setInterval(() => {
      setRemaining(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [active]);

  const minutes = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const formatted = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  const isLow = remaining < 120 && remaining > 0;
  const isCritical = remaining < 30 && remaining > 0;
  const isDone = remaining === 0;

  return { remaining, formatted, isLow, isCritical, isDone };
}

export const ExamSimulatorView: React.FC<ExamSimulatorViewProps> = ({
  onRecordAssessment,
  onFinishExam,
}) => {
  const [station, setStation] = useState<'THEORY' | 'PRACTICAL' | 'VIVA' | 'COMPLETED'>('THEORY');
  const [theoryText, setTheoryText] = useState('');
  const [practicalText, setPracticalText] = useState('');
  const [vivaText, setVivaText] = useState('');
  const [theoryScore, setTheoryScore] = useState(0);
  const [practicalScore, setPracticalScore] = useState(0);
  const [vivaScore, setVivaScore] = useState(0);
  const [timeUpWarning, setTimeUpWarning] = useState(false);

  const timerSeconds = station !== 'COMPLETED' ? (STATION_TIMES[station] ?? 0) : 0;
  const { formatted: timeFormatted, isLow, isCritical, isDone } = useCountdown(timerSeconds, station !== 'COMPLETED');

  useEffect(() => {
    if (isDone && station !== 'COMPLETED') setTimeUpWarning(true);
  }, [isDone, station]);

  const handleNextFromTheory = (e: React.FormEvent) => {
    e.preventDefault();
    const score = Math.min(10, Math.max(5, Math.round(theoryText.length / 30)));
    setTheoryScore(score);
    onRecordAssessment('top-brachial-plexus', 'Theory', score);
    setTimeUpWarning(false);
    setStation('PRACTICAL');
  };

  const handleNextFromPractical = (e: React.FormEvent) => {
    e.preventDefault();
    const score = Math.min(10, Math.max(5, Math.round(practicalText.length / 25)));
    setPracticalScore(score);
    onRecordAssessment('top-brachial-plexus', 'Practical', score);
    setTimeUpWarning(false);
    setStation('VIVA');
  };

  const handleNextFromViva = (e: React.FormEvent) => {
    e.preventDefault();
    const score = Math.min(10, Math.max(5, Math.round(vivaText.length / 20)));
    setVivaScore(score);
    onRecordAssessment('top-brachial-plexus', 'Viva', score);
    setTimeUpWarning(false);
    setStation('COMPLETED');
  };

  const overallReadiness = Math.round(((theoryScore * 10) + (practicalScore * 10) + (vivaScore * 10)) / 3);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="med-card p-6 bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 text-white rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sky-300 text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-sky-400" />
              <span>FULL EXAM SIMULATION</span>
            </div>
            <h1 className="text-2xl font-black">University Professional Mock Exam</h1>
            <p className="text-xs text-slate-300">
              Station 1 (Theory Essay) ➔ Station 2 (Practical Spotter) ➔ Station 3 (Viva Voce).
            </p>
          </div>

          <div className="flex items-center gap-2">
            {[
              { id: 'THEORY', label: '1. Theory', icon: BookOpen },
              { id: 'PRACTICAL', label: '2. Practical', icon: Microscope },
              { id: 'VIVA', label: '3. Viva', icon: Mic },
            ].map((st) => {
              const stationOrder = ['THEORY','PRACTICAL','VIVA','COMPLETED'];
              const isDoneStation = stationOrder.indexOf(station) > stationOrder.indexOf(st.id);
              return (
                <span key={st.id} className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 ${station === st.id ? 'bg-sky-500 text-white shadow-md' : isDoneStation ? 'bg-emerald-600/60 text-emerald-100' : 'bg-white/10 text-slate-300'}`}>
                  {isDoneStation && <CheckCircle2 className="w-3.5 h-3.5" />}
                  <span>{st.label}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Time-Up Warning */}
      {timeUpWarning && (
        <div className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-300 rounded-2xl animate-in slide-in-from-top-2 duration-200">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
          <div>
            <span className="text-xs font-extrabold text-rose-900 block">⏰ TIME IS UP — Examiner is collecting papers.</span>
            <span className="text-xs text-rose-700">Submit what you have written to move to the next station.</span>
          </div>
        </div>
      )}

      {/* Live Timer Widget */}
      {station !== 'COMPLETED' && (
        <div className={`flex items-center justify-between p-4 rounded-2xl border transition-colors ${isCritical ? 'bg-rose-50 border-rose-300' : isLow ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-200'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isCritical ? 'bg-rose-100 text-rose-600' : isLow ? 'bg-amber-100 text-amber-600' : 'bg-sky-100 text-sky-600'}`}>
              <Clock className={`w-5 h-5 ${isCritical ? 'animate-ping' : isLow ? 'animate-pulse' : ''}`} />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">Station Timer</span>
              <span className={`text-2xl font-mono font-black ${isCritical ? 'text-rose-600' : isLow ? 'text-amber-600' : 'text-slate-800'}`}>{timeFormatted}</span>
            </div>
          </div>
          <span className="text-xs font-medium text-slate-500">{isCritical ? '🔴 Critical — wrap up now' : isLow ? '🟠 Low time remaining' : '🟢 Within time limit'}</span>
        </div>
      )}

      {/* Station: Theory */}
      {station === 'THEORY' && (
        <div className="med-card p-6 sm:p-8 space-y-6 bg-white">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-extrabold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md">STATION 1 OF 3: THEORY 10-MARK ESSAY</span>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
            <h3 className="text-sm font-extrabold text-slate-900">"Describe the formation, cords, and branches of the Brachial Plexus. Discuss Erb-Duchenne and Klumpke's palsies."</h3>
            <p className="text-xs text-slate-500">Provide definition, architectural diagram labels, and clinical syndromes. (10 Marks)</p>
          </div>
          <form onSubmit={handleNextFromTheory} className="space-y-4">
            <textarea rows={10} value={theoryText} onChange={(e) => setTheoryText(e.target.value)}
              placeholder="Write your structured theory answer here..."
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition" required />
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">{theoryText.length} characters</span>
              <button type="submit" className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-2">
                <span>Submit &amp; Proceed to Practical</span><ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Station: Practical */}
      {station === 'PRACTICAL' && (
        <div className="med-card p-6 sm:p-8 space-y-6 bg-white">
          <div className="pb-3 border-b border-slate-100">
            <span className="text-xs font-extrabold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">STATION 2 OF 3: CADAVERIC SPOTTER IDENTIFICATION</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MedicalGraphic type="HEART_ANATOMY" />
            <form onSubmit={handleNextFromPractical} className="space-y-4">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800">
                Identify tagged structure (Red Pin) in anterior interventricular sulcus and state source artery &amp; clinical importance.
              </div>
              <textarea rows={6} value={practicalText} onChange={(e) => setPracticalText(e.target.value)}
                placeholder="1. Identification: ...&#10;2. Source: ...&#10;3. Clinical importance:"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition" required />
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">{practicalText.length} characters</span>
                <button type="submit" className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-2">
                  <span>Submit &amp; Proceed to Viva</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Station: Viva */}
      {station === 'VIVA' && (
        <div className="med-card p-6 sm:p-8 space-y-6 bg-white">
          <div className="pb-3 border-b border-slate-100">
            <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">STATION 3 OF 3: VIVA VOCE TABLE</span>
          </div>
          <div className="flex items-center gap-3 p-4 bg-indigo-50 border border-indigo-200 rounded-2xl">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-2xl shrink-0">👨‍⚕️</div>
            <div>
              <span className="text-[10px] font-bold uppercase text-indigo-600 block">External Examiner Asks:</span>
              <h3 className="text-sm font-extrabold text-indigo-950">"What are the branches of the external carotid artery, and what is the difference between UMN and LMN facial palsy?"</h3>
            </div>
          </div>
          <form onSubmit={handleNextFromViva} className="space-y-4">
            <textarea rows={6} value={vivaText} onChange={(e) => setVivaText(e.target.value)}
              placeholder="State your answer chronologically..."
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" required />
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">{vivaText.length} characters</span>
              <button type="submit" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-2">
                <span>Finalize &amp; Calculate Readiness</span><Sparkles className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* COMPLETED: Results */}
      {station === 'COMPLETED' && (
        <div className="med-card p-6 sm:p-10 bg-white space-y-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 flex items-center justify-center mx-auto text-3xl shadow-sm">🎯</div>
            <h2 className="text-2xl font-black text-slate-900">SIMULATION RESULT &amp; READINESS REPORT</h2>
            <p className="text-xs text-slate-500">Review your performance across all 3 exam modalities.</p>
          </div>

          <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl max-w-md mx-auto text-center space-y-3">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block">OVERALL PRACTICE READINESS</span>
            <div className="text-5xl font-black text-slate-900 font-mono">{overallReadiness}%</div>
            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
              <div className="bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: `${overallReadiness}%` }} />
            </div>
            <span className="text-xs font-medium text-slate-500">{overallReadiness >= 80 ? '🌟 Honors benchmark achieved!' : overallReadiness >= 65 ? '✅ Pass boundary cleared' : '📚 Needs more revision before exam'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { label: 'THEORY ESSAY', score: theoryScore, color: 'sky', icon: '📝' },
              { label: 'PRACTICAL SPOTTER', score: practicalScore, color: 'teal', icon: '🔬' },
              { label: 'VIVA VOCE', score: vivaScore, color: 'indigo', icon: '🎤' },
            ].map(({ label, score, color, icon }) => (
              <div key={label} className={`p-4 bg-${color}-50 border border-${color}-200 rounded-2xl text-center space-y-2`}>
                <span className="text-lg">{icon}</span>
                <span className={`text-xs text-${color}-800 font-bold block`}>{label}</span>
                <div className={`text-3xl font-black text-${color}-950`}>{score * 10}%</div>
                <div className={`w-full bg-${color}-100 rounded-full h-1.5 overflow-hidden`}>
                  <div className={`bg-${color}-500 h-full rounded-full`} style={{ width: `${score * 10}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl max-w-2xl mx-auto space-y-3">
            <div className="text-amber-900 font-bold text-xs uppercase tracking-wider">⚡ RECOMMENDED FINAL 30-MINUTE ACTION PLAN</div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold text-amber-950">
              <div className="p-2.5 bg-white rounded-xl border border-amber-200">10 min → Cranial Nerves</div>
              <div className="p-2.5 bg-white rounded-xl border border-amber-200">10 min → Viva Practice</div>
              <div className="p-2.5 bg-white rounded-xl border border-amber-200">10 min → Practical Spotters</div>
            </div>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button onClick={() => { setStation('THEORY'); setTheoryText(''); setPracticalText(''); setVivaText(''); setTimeUpWarning(false); }}
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition flex items-center gap-2">
              <RotateCcw className="w-4 h-4" /><span>Retake Simulation</span>
            </button>
            <button onClick={onFinishExam} className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-md transition">
              Return to Command Dashboard →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
