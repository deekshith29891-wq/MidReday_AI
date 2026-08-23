import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  Layers, 
  FileText, 
  Share2, 
  Copy, 
  Check, 
  ChevronRight,
  Stethoscope,
  Info,
  Edit3
} from 'lucide-react';
import { TheoryAnswerResponse } from '../../types';
import { AITheoryService } from '../../services/aiTheory';
import { MEDICAL_TOPICS } from '../../data/curriculumData';

interface TheoryViewProps {
  selectedTopicId: string;
  onSelectTopic: (id: string) => void;
  onRecordAssessment: (topicId: string, mode: 'Theory' | 'Recall', grade: 'YES' | 'PARTIAL' | 'NO') => void;
  onNavigateToEvaluator: (topicName: string) => void;
}

export const TheoryView: React.FC<TheoryViewProps> = ({
  selectedTopicId,
  onSelectTopic,
  onRecordAssessment,
  onNavigateToEvaluator,
}) => {
  const [tab, setTab] = useState<'10-Mark' | '5-Mark' | 'Rapid-Revision' | 'MCQs' | 'Active-Recall'>('10-Mark');
  const [copied, setCopied] = useState(false);
  const [selectedMCQAnswers, setSelectedMCQAnswers] = useState<Record<string, number>>({});
  const [revealedMCQs, setRevealedMCQs] = useState<Record<string, boolean>>({});

  const currentTopic = MEDICAL_TOPICS.find(t => t.id === selectedTopicId) || MEDICAL_TOPICS[0];
  const theoryData: TheoryAnswerResponse = AITheoryService.getStructuredTheoryAnswer(
    currentTopic.id,
    tab === '5-Mark' ? '5-Mark' : tab === 'Rapid-Revision' ? 'Rapid-Revision' : '10-Mark'
  );

  const handleCopy = () => {
    const textToCopy = `${theoryData.topic} (${theoryData.marksCategory})\n\nDefinition:\n${theoryData.definition}\n\n${theoryData.keySections.map(s => `${s.heading}\n${s.points.join('\n')}`).join('\n\n')}\n\nClinical Significance:\n${theoryData.clinicalSignificance.join('\n')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectMCQ = (mcqId: string, optIndex: number) => {
    setSelectedMCQAnswers(prev => ({ ...prev, [mcqId]: optIndex }));
    setRevealedMCQs(prev => ({ ...prev, [mcqId]: true }));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Topic Switcher & Selector */}
      <div className="med-card p-4 sm:p-6 bg-gradient-to-r from-sky-900 to-slate-900 text-white rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sky-300 text-xs font-bold uppercase tracking-wider">
              <span>🤖 AI Theory Specialist</span>
              <span>•</span>
              <span className="text-emerald-400">{currentTopic.highYieldTag}</span>
            </div>
            <h1 className="text-2xl font-black">{theoryData.topic}</h1>
            <p className="text-xs text-slate-300">
              Exam-oriented structured answers, schematic diagram guides, and clinical correlation boxes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedTopicId}
              onChange={(e) => onSelectTopic(e.target.value)}
              className="py-2 px-3 bg-white/10 border border-white/20 text-white text-xs font-bold rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              {MEDICAL_TOPICS.map((t) => (
                <option key={t.id} value={t.id} className="text-slate-900 font-semibold">
                  {t.name} ({t.importance.toUpperCase()})
                </option>
              ))}
            </select>

            <button
              onClick={handleCopy}
              className="p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition"
              title="Copy notes to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Answer Format Switcher Tabs */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1">
          {[
            { id: '10-Mark', label: '10-Mark Long Essay' },
            { id: '5-Mark', label: '5-Mark Short Answer' },
            { id: 'Rapid-Revision', label: '⚡ Rapid Revision' },
            { id: 'MCQs', label: 'Practice MCQs' },
            { id: 'Active-Recall', label: 'Active Recall' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={`py-2 px-4 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                tab === t.id
                  ? 'bg-white text-sky-950 shadow-md'
                  : 'bg-white/10 text-slate-200 hover:bg-white/15'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Central Document (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {tab === '10-Mark' || tab === '5-Mark' || tab === 'Rapid-Revision' ? (
            <div className="med-card p-6 sm:p-8 space-y-6 bg-white">
              {/* Definition Box */}
              <div className="p-4 bg-sky-50/80 border-l-4 border-sky-600 rounded-r-2xl space-y-1">
                <h4 className="text-xs font-extrabold text-sky-900 uppercase tracking-wider">STANDARD EXAM DEFINITION</h4>
                <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                  {theoryData.definition}
                </p>
              </div>

              {/* Sections Breakdown */}
              <div className="space-y-6">
                {theoryData.keySections.map((section, idx) => (
                  <div key={idx} className="space-y-2.5">
                    <h3 className="text-sm font-extrabold text-slate-900 pb-1 border-b border-slate-100 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-mono font-bold">
                        {idx + 1}
                      </span>
                      <span>{section.heading}</span>
                    </h3>
                    <div className="space-y-2 pl-2">
                      {section.points.map((pt, pIdx) => (
                        <p key={pIdx} className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {pt}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Clinical Significance Box */}
              <div className="p-5 bg-gradient-to-br from-emerald-50/90 to-teal-50/50 border border-emerald-200 rounded-2xl space-y-2.5">
                <div className="flex items-center gap-2 text-emerald-900">
                  <Stethoscope className="w-4 h-4 text-emerald-700" />
                  <h4 className="text-xs font-extrabold uppercase tracking-wider">APPLIED CLINICAL CORRELATIONS (HONORS MARKS)</h4>
                </div>
                <div className="space-y-1.5 pl-2">
                  {theoryData.clinicalSignificance.map((cs, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-2 text-xs text-emerald-950 font-medium leading-relaxed">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{cs}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diagram Guide */}
              {theoryData.diagramGuide && (
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                      <span>🎨</span>
                      <span>{theoryData.diagramGuide.title}</span>
                    </h4>
                    <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                      Mandatory Exam Schematic
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 italic">
                    💡 Tip: {theoryData.diagramGuide.drawingTips}
                  </p>

                  {theoryData.diagramGuide.asciiDiagram && (
                    <pre className="p-3.5 bg-slate-900 text-sky-300 font-mono text-xs rounded-xl overflow-x-auto border border-slate-800">
                      {theoryData.diagramGuide.asciiDiagram}
                    </pre>
                  )}

                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-slate-700 block mb-1">Essential Labels Required:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {theoryData.diagramGuide.mustLabel.map((lbl, lIdx) => (
                        <span key={lIdx} className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                          ✓ {lbl}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Evaluator Callout */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-500">Want to test how your handwritten or typed essay scores?</span>
                <button
                  onClick={() => onNavigateToEvaluator(theoryData.topic)}
                  className="px-4 py-2 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-xl text-sky-800 text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Edit3 className="w-4 h-4 text-sky-600" />
                  <span>Grade My Written Answer &rarr;</span>
                </button>
              </div>
            </div>
          ) : tab === 'MCQs' ? (
            /* MCQs Tester */
            <div className="med-card p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Clinical Case & Theory MCQs</h3>
                <p className="text-xs text-slate-400">Test high-yield concept mastery for {theoryData.topic}</p>
              </div>

              <div className="space-y-6">
                {theoryData.sampleMCQs.map((mcq, mIdx) => {
                  const isAnswered = revealedMCQs[mcq.id];
                  const selectedIdx = selectedMCQAnswers[mcq.id];

                  return (
                    <div key={mcq.id} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-xs text-sky-700">Q{mIdx + 1}.</span>
                        <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">{mcq.question}</p>
                      </div>

                      <div className="space-y-2 pt-1">
                        {mcq.options.map((opt, oIdx) => {
                          const isCorrect = oIdx === mcq.correctIndex;
                          const isSelected = selectedIdx === oIdx;

                          let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';
                          if (isAnswered) {
                            if (isCorrect) btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                            else if (isSelected && !isCorrect) btnStyle = 'bg-rose-50 border-rose-300 text-rose-800 font-bold';
                          }

                          return (
                            <button
                              key={oIdx}
                              onClick={() => handleSelectMCQ(mcq.id, oIdx)}
                              disabled={isAnswered}
                              className={`w-full text-left p-3 rounded-xl border text-xs transition flex items-center justify-between ${btnStyle}`}
                            >
                              <span>{String.fromCharCode(65 + oIdx)}. {opt}</span>
                              {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                            </button>
                          );
                        })}
                      </div>

                      {isAnswered && (
                        <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-xs text-sky-900 space-y-1">
                          <strong className="block font-bold">Explanation:</strong>
                          <p>{mcq.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Active Recall Mode */
            <div className="med-card p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Active Recall Prompts</h3>
                <p className="text-xs text-slate-400">Force your brain to retrieve knowledge without passive reading</p>
              </div>

              <div className="space-y-4">
                {theoryData.activeRecallPrompts.map((arp, aIdx) => (
                  <div key={aIdx} className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center text-xs font-bold shrink-0">
                        {aIdx + 1}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 pt-0.5">{arp.prompt}</h4>
                    </div>

                    <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Key Active Recall Answer:</span>
                      <p className="text-xs font-bold text-slate-900">{arp.answer}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[11px] text-slate-500">Did you recall this?</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onRecordAssessment(currentTopic.id, 'Recall', 'YES')}
                          className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold"
                        >
                          🟢 Yes
                        </button>
                        <button
                          onClick={() => onRecordAssessment(currentTopic.id, 'Recall', 'PARTIAL')}
                          className="px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-lg text-xs font-bold"
                        >
                          🟡 Partial
                        </button>
                        <button
                          onClick={() => onRecordAssessment(currentTopic.id, 'Recall', 'NO')}
                          className="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-bold"
                        >
                          🔴 No
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar / High-Yield Insights (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Key High-Yield Points */}
          <div className="med-card p-5 space-y-3 bg-gradient-to-br from-sky-50 to-cyan-50/40 border-sky-100">
            <div className="flex items-center gap-2 text-sky-900 font-extrabold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>HIGH-YIELD EXAM PEARLS</span>
            </div>
            <div className="space-y-2">
              {theoryData.highYieldPoints.map((pt, idx) => (
                <div key={idx} className="p-2.5 bg-white rounded-xl border border-sky-100 text-xs text-slate-800 font-medium">
                  {pt}
                </div>
              ))}
            </div>
          </div>

          {/* Common Mistakes & Traps */}
          <div className="med-card p-5 space-y-3 bg-rose-50/60 border-rose-100">
            <div className="flex items-center gap-2 text-rose-900 font-extrabold text-xs uppercase tracking-wider">
              <Info className="w-4 h-4 text-rose-600" />
              <span>COMMON EXAM PITFALLS</span>
            </div>
            <div className="space-y-2">
              {theoryData.commonMisconceptions.map((mis, idx) => (
                <div key={idx} className="p-2.5 bg-white rounded-xl border border-rose-100 text-xs text-rose-950 font-medium">
                  ⚠️ {mis}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Self-Calibrate Confidence */}
          <div className="med-card p-5 space-y-3 text-center">
            <h4 className="text-xs font-bold text-slate-900">Update Topic Confidence</h4>
            <p className="text-[11px] text-slate-400">Calibrates your live readiness score</p>
            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                onClick={() => onRecordAssessment(currentTopic.id, 'Theory', 'YES')}
                className="py-2 px-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold"
              >
                🟢 Mastered
              </button>
              <button
                onClick={() => onRecordAssessment(currentTopic.id, 'Theory', 'PARTIAL')}
                className="py-2 px-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-xl text-xs font-bold"
              >
                🟡 Review
              </button>
              <button
                onClick={() => onRecordAssessment(currentTopic.id, 'Theory', 'NO')}
                className="py-2 px-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold"
              >
                🔴 Confused
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
