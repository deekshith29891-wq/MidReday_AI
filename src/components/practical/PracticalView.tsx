import React, { useState } from 'react';
import { 
  Microscope, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  HelpCircle, 
  ChevronRight, 
  RefreshCw,
  Layers,
  Award
} from 'lucide-react';
import { PracticalSpotterStation } from '../../types';
import { AIPracticalService } from '../../services/aiPractical';
import { MedicalGraphic } from '../common/MedicalIllustrations';

interface PracticalViewProps {
  onRecordAssessment: (topicId: string, mode: 'Practical', grade: number) => void;
}

export const PracticalView: React.FC<PracticalViewProps> = ({ onRecordAssessment }) => {
  const stations = AIPracticalService.getSpotterStations();
  const [selectedStationIndex, setSelectedStationIndex] = useState(0);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [evaluation, setEvaluation] = useState<any>(null);
  const [showModelAnswer, setShowModelAnswer] = useState(false);

  const currentStation: PracticalSpotterStation = stations[selectedStationIndex] || stations[0];

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentAnswer.trim()) return;
    const res = AIPracticalService.evaluatePracticalAnswer(currentStation.id, studentAnswer);
    setEvaluation(res);
    onRecordAssessment('top-brachial-plexus', 'Practical', res.score);
  };

  const handleNextStation = () => {
    setStudentAnswer('');
    setEvaluation(null);
    setShowModelAnswer(false);
    setSelectedStationIndex((prev) => (prev + 1) % stations.length);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="med-card p-6 bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-teal-300 text-xs font-bold uppercase tracking-wider">
              <Microscope className="w-4 h-4 text-teal-400" />
              <span>🔬 AI Practical & Spotter Specialist</span>
            </div>
            <h1 className="text-2xl font-black mt-1">Medical Practical Examination Simulator</h1>
            <p className="text-xs text-slate-300">
              Identify cadaveric structures, gross specimens, drug formulations, and microscopy slides under university timed conditions.
            </p>
          </div>

          {/* Station selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-teal-200 font-semibold">Station:</span>
            <div className="flex gap-1">
              {stations.map((st, idx) => (
                <button
                  key={st.id}
                  onClick={() => {
                    setSelectedStationIndex(idx);
                    setStudentAnswer('');
                    setEvaluation(null);
                    setShowModelAnswer(false);
                  }}
                  className={`w-8 h-8 rounded-xl text-xs font-bold transition flex items-center justify-center ${
                    selectedStationIndex === idx
                      ? 'bg-teal-500 text-white shadow-md'
                      : 'bg-white/10 text-slate-200 hover:bg-white/20'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Station Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Specimen Graphic & Station Prompt (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="med-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200">
                {currentStation.subject} • {currentStation.subCategory}
              </span>
              <span className="text-xs font-mono font-bold text-slate-400">
                Station {selectedStationIndex + 1} of {stations.length}
              </span>
            </div>

            <h2 className="text-base font-extrabold text-slate-900">{currentStation.title}</h2>

            {/* Specimen Visual SVG */}
            <MedicalGraphic type={currentStation.svgGraphicType} />

            {/* Spotter Prompt */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-teal-600" />
                <span>SPOTTER INSTRUCTIONS</span>
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {currentStation.spotterPrompt}
              </p>
            </div>
          </div>

          {/* Table Viva Follow-up questions for this specimen */}
          <div className="med-card p-5 space-y-3 bg-gradient-to-br from-slate-50 to-teal-50/30 border-teal-100">
            <h4 className="text-xs font-extrabold text-teal-950 uppercase tracking-wider">
              TABLE VIVA QUESTIONS FOR THIS SPECIMEN
            </h4>
            <div className="space-y-2">
              {currentStation.vivaQuestions.map((vq, idx) => (
                <div key={idx} className="p-3 bg-white border border-teal-100 rounded-xl space-y-1">
                  <span className="text-xs font-bold text-slate-800 block">Q: {vq.question}</span>
                  <p className="text-xs text-teal-800 font-medium">Expected: {vq.expectedAnswer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Student Answer Input & Evaluation Rubric (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="med-card p-6 space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              YOUR SPOTTER SUBMISSION
            </h3>

            <form onSubmit={handleEvaluate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Write: 1) Identification, 2) Key Features, 3) Blood/Nerve supply or Mechanism, 4) Clinical Note
                </label>
                <textarea
                  rows={6}
                  value={studentAnswer}
                  onChange={(e) => setStudentAnswer(e.target.value)}
                  placeholder="1. Identification: Left Anterior Descending Artery...&#10;2. Origin: Left Coronary Artery...&#10;3. Clinical Significance: Widow maker..."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono transition"
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  type="submit"
                  disabled={!studentAnswer.trim()}
                  className="px-6 py-3 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md shadow-teal-600/20 transition flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Evaluate Answer</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowModelAnswer(!showModelAnswer)}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
                >
                  {showModelAnswer ? 'Hide Key' : 'Reveal Answer Key'}
                </button>

                <button
                  type="button"
                  onClick={handleNextStation}
                  className="px-4 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition flex items-center gap-1"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* AI Practical Evaluation Result */}
          {evaluation && (
            <div className="med-card p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm">
                    {evaluation.score}/10
                  </span>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900">AI PRACTICE EVALUATION</h4>
                    <span className="text-[10px] text-slate-400 font-medium">Educational practical marking</span>
                  </div>
                </div>

                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  evaluation.identificationMatch ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}>
                  {evaluation.identificationMatch ? '✓ Identification Correct' : '✕ ID Mismatched'}
                </span>
              </div>

              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                {evaluation.examinerFeedback}
              </p>

              {/* Awarded vs Missing Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl space-y-1">
                  <span className="text-[11px] font-bold text-emerald-900 block">✓ Points Awarded:</span>
                  {evaluation.pointsAwarded.length > 0 ? (
                    evaluation.pointsAwarded.map((pt: string, idx: number) => (
                      <span key={idx} className="text-[10px] text-emerald-800 block">• {pt}</span>
                    ))
                  ) : (
                    <span className="text-[10px] text-emerald-700 italic">None detected</span>
                  )}
                </div>

                <div className="p-3 bg-rose-50/70 border border-rose-100 rounded-xl space-y-1">
                  <span className="text-[11px] font-bold text-rose-900 block">⚠ Missing Points:</span>
                  {evaluation.missingElements.map((pt: string, idx: number) => (
                    <span key={idx} className="text-[10px] text-rose-800 block">• {pt}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Model Answer Key */}
          {showModelAnswer && (
            <div className="med-card p-5 bg-slate-900 text-white rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-teal-300">
                <span>OFFICIAL MODEL SPOTTER ANSWER</span>
                <Award className="w-4 h-4 text-amber-400" />
              </div>
              <pre className="text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed">
                {currentStation.sampleAnswer}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
