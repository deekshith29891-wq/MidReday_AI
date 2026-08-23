import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  AlertTriangle, 
  Award, 
  Layers, 
  BookOpen, 
  ArrowRight, 
  ShieldCheck,
  FileCheck2
} from 'lucide-react';
import { WrittenEvaluationResult } from '../../types';
import { AIEvaluatorService } from '../../services/aiEvaluator';
import { MEDICAL_TOPICS } from '../../data/curriculumData';

interface EvaluatorViewProps {
  initialTopicName?: string;
  onRecordAssessment: (topicId: string, mode: 'Theory', grade: number) => void;
}

export const EvaluatorView: React.FC<EvaluatorViewProps> = ({
  initialTopicName = 'Brachial Plexus',
  onRecordAssessment,
}) => {
  const [topicName, setTopicName] = useState(initialTopicName);
  const [marksCategory, setMarksCategory] = useState<5 | 10>(10);
  const [answerText, setAnswerText] = useState('');
  const [evaluation, setEvaluation] = useState<WrittenEvaluationResult | null>(null);
  const [isGrading, setIsGrading] = useState(false);

  const sampleStudentEssay = `The brachial plexus is formed by the ventral rami of C5 to T1 spinal nerves. 
It has 5 stages: Roots, Trunks, Divisions, Cords, and Branches.
Roots C5 and C6 join to form Upper Trunk. C7 forms Middle Trunk. C8 and T1 form Lower Trunk.
Divisions split into anterior and posterior.
Cords are Lateral, Medial, and Posterior cords relative to axillary artery.
Branches of posterior cord are ULTRA: Upper subscapular, Lower subscapular, Thoracodorsal, Radial, Axillary.
Branches of lateral cord give Musculocutaneous nerve.
Clinical: Erb's palsy involves C5-C6 leading to policeman's tip hand.`;

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerText.trim()) return;

    setIsGrading(true);
    setTimeout(() => {
      const res = AIEvaluatorService.evaluateWrittenAnswer(topicName, answerText, marksCategory);
      setEvaluation(res);
      setIsGrading(false);
      onRecordAssessment('top-brachial-plexus', 'Theory', res.score);
    }, 800);
  };

  const handleLoadSample = () => {
    setAnswerText(sampleStudentEssay);
    setTopicName('Brachial Plexus');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="med-card p-6 bg-gradient-to-r from-emerald-950 via-slate-900 to-sky-950 text-white rounded-3xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <FileCheck2 className="w-4 h-4 text-emerald-400" />
            <span>🧪 AI Written Answer Evaluator</span>
          </div>
          <h1 className="text-2xl font-black">AI Practice Evaluation Station</h1>
          <p className="text-xs text-slate-300">
            Paste or type your handwritten/typed medical essay to get instant academic rubric grading, clinical point verification, and honors feedback.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Submission (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="med-card p-6 space-y-4 bg-white">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">SUBMIT ESSAY FOR GRADING</h3>
              <button
                onClick={handleLoadSample}
                className="text-xs font-bold text-sky-600 hover:text-sky-800 underline"
              >
                Load Sample Student Answer
              </button>
            </div>

            <form onSubmit={handleEvaluate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Medical Topic</label>
                  <input
                    type="text"
                    value={topicName}
                    onChange={(e) => setTopicName(e.target.value)}
                    placeholder="e.g. Brachial Plexus, Cardiac Cycle..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Marks Format</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setMarksCategory(10)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                        marksCategory === 10
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      10-Mark Essay
                    </button>
                    <button
                      type="button"
                      onClick={() => setMarksCategory(5)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                        marksCategory === 5
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      5-Mark Short
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Your Written Answer Text
                </label>
                <textarea
                  rows={9}
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  placeholder="Type or paste your complete medical answer here including definition, anatomical stages, classification, and clinical significance..."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition leading-relaxed font-sans"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="submit"
                  disabled={!answerText.trim() || isGrading}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 transition flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isGrading ? 'Grading Answer...' : 'Grade Written Answer'}</span>
                </button>

                <span className="text-[11px] text-slate-400">
                  {answerText.split(/\s+/).filter(Boolean).length} Words Typed
                </span>
              </div>
            </form>
          </div>
        </div>

        {/* Right: AI Evaluation Report (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {evaluation ? (
            <div className="med-card p-6 space-y-5 bg-white animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                    AI PRACTICE EVALUATION
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-slate-900">{evaluation.score}</span>
                    <span className="text-xs font-bold text-slate-400">/ {evaluation.maxScore}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Readiness: {evaluation.readinessPercentage}%
                  </span>
                </div>
              </div>

              {/* 4 Rubric Criteria Scores */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Definition & Core</span>
                  <strong className="text-slate-800 font-bold">{evaluation.criteriaScores.definitionAndCore} pts</strong>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Structure & Layout</span>
                  <strong className="text-slate-800 font-bold">{evaluation.criteriaScores.structuralOrganization} pts</strong>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Key Pathology / Anatomy</span>
                  <strong className="text-slate-800 font-bold">{evaluation.criteriaScores.keyPathologyOrAnatomy} pts</strong>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Clinical Correlation</span>
                  <strong className="text-slate-800 font-bold">{evaluation.criteriaScores.clinicalCorrelation} pts</strong>
                </div>
              </div>

              {/* Positive Points & Missing Elements */}
              <div className="space-y-3">
                <div className="p-3 bg-emerald-50/80 border border-emerald-100 rounded-xl space-y-1">
                  <span className="text-[11px] font-bold text-emerald-900 block">✓ What You Did Well:</span>
                  {evaluation.positivePoints.map((pt, idx) => (
                    <span key={idx} className="text-[11px] text-emerald-800 block">• {pt}</span>
                  ))}
                </div>

                {evaluation.missingKeyPoints.length > 0 && (
                  <div className="p-3 bg-rose-50/80 border border-rose-100 rounded-xl space-y-1">
                    <span className="text-[11px] font-bold text-rose-900 block">⚠ Missing Points for Top Honors:</span>
                    {evaluation.missingKeyPoints.map((pt, idx) => (
                      <span key={idx} className="text-[11px] text-rose-800 block">• {pt}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Suggested Improvement */}
              <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-950 space-y-1">
                <strong className="block font-bold">💡 Recommended Action:</strong>
                <p>{evaluation.suggestedImprovement}</p>
              </div>
            </div>
          ) : (
            <div className="med-card p-8 text-center space-y-3 text-slate-400 bg-white">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-xl">
                ✍️
              </div>
              <h4 className="text-xs font-bold text-slate-600">Awaiting Essay Submission</h4>
              <p className="text-[11px] text-slate-400">
                Submit an answer on the left or click "Load Sample" to see how our AI breaks down definitions, anatomical structures, and clinical correlations.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
