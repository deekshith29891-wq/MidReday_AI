import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Send, 
  ChevronRight, 
  RotateCcw, 
  Award, 
  AlertCircle,
  HelpCircle,
  MessageSquare,
  UserCheck
} from 'lucide-react';
import { VivaQuestionSession, VivaRubricEvaluation } from '../../types';
import { DEFAULT_VIVA_QUESTIONS, AIVivaService } from '../../services/aiViva';
import { useSpeech } from '../../hooks/useSpeech';

interface VivaViewProps {
  onRecordAssessment: (topicId: string, mode: 'Viva', grade: number) => void;
}

export const VivaView: React.FC<VivaViewProps> = ({ onRecordAssessment }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [evaluation, setEvaluation] = useState<VivaRubricEvaluation | null>(null);
  const [history, setHistory] = useState<{ q: string; a: string; score: number }[]>([]);
  const [activeTab, setActiveTab] = useState<'speak' | 'type'>('speak');

  const {
    isSpeaking,
    isListening,
    transcript,
    setTranscript,
    speechSupported,
    recognitionSupported,
    speak,
    stopSpeaking,
    startListening,
    stopListening,
  } = useSpeech();

  const currentQuestion: VivaQuestionSession = DEFAULT_VIVA_QUESTIONS[questionIndex] || DEFAULT_VIVA_QUESTIONS[0];

  // Auto-speak question when loaded
  useEffect(() => {
    if (speechSupported) {
      speak(currentQuestion.question, 1.0, 0.95);
    }
  }, [currentQuestion, speak, speechSupported]);

  // Sync transcript to typedAnswer if speaking
  useEffect(() => {
    if (transcript) {
      setTypedAnswer(transcript);
    }
  }, [transcript]);

  const handleEvaluate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalAnswer = typedAnswer.trim() || transcript.trim();
    if (!finalAnswer) return;

    if (isListening) stopListening();

    const result = AIVivaService.evaluateVivaAnswer(currentQuestion, finalAnswer);
    setEvaluation(result);
    onRecordAssessment('top-brachial-plexus', 'Viva', result.score);

    setHistory(prev => [
      ...prev,
      { q: currentQuestion.question, a: finalAnswer, score: result.score }
    ]);
  };

  const handleNextQuestion = () => {
    setTypedAnswer('');
    setTranscript('');
    setEvaluation(null);
    setQuestionIndex((prev) => (prev + 1) % DEFAULT_VIVA_QUESTIONS.length);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="med-card p-6 bg-gradient-to-r from-indigo-950 via-slate-900 to-sky-950 text-white rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <Mic className="w-4 h-4 text-indigo-400" />
              <span>🎤 AI Viva Voce Examiner Simulator</span>
            </div>
            <h1 className="text-2xl font-black">Interactive Medical Viva Table</h1>
            <p className="text-xs text-slate-300">
              Practice spoken clarity, fast recall, and answering follow-up questions under strict examiner scrutiny.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => isSpeaking ? stopSpeaking() : speak(currentQuestion.question)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold transition text-white"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-indigo-300" />}
              <span>{isSpeaking ? 'Mute' : 'Replay Audio'}</span>
            </button>

            <span className="px-3 py-1 bg-white/10 rounded-xl text-xs font-mono font-bold text-indigo-200">
              Q {questionIndex + 1} of {DEFAULT_VIVA_QUESTIONS.length}
            </span>
          </div>
        </div>
      </div>

      {/* Main Table Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Examiner Avatar & Question Card (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="med-card p-6 sm:p-8 space-y-6 bg-white">
            {/* Examiner Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-xl shadow-sm">
                  👨‍⚕️
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">Professor / External Examiner</h3>
                  <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    Persona: {currentQuestion.examinerPersonality} • {currentQuestion.difficulty}
                  </span>
                </div>
              </div>

              {isSpeaking && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-200 animate-pulse">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Examiner Speaking...</span>
                </div>
              )}
            </div>

            {/* Big Question Prompt */}
            <div className="p-6 bg-gradient-to-br from-indigo-50/60 to-sky-50/40 border border-indigo-100 rounded-2xl space-y-2">
              <span className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider block">
                {currentQuestion.subjectName} • {currentQuestion.topicName}
              </span>
              <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                "{currentQuestion.question}"
              </p>
            </div>

            {/* Input Selection: Speak vs Type */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <button
                  onClick={() => setActiveTab('speak')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    activeTab === 'speak' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>🎙 Speak Answer</span>
                </button>

                <button
                  onClick={() => setActiveTab('type')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    activeTab === 'type' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>⌨ Type Answer</span>
                </button>
              </div>

              {activeTab === 'speak' ? (
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-4">
                  <div className="flex justify-center">
                    <button
                      onClick={isListening ? stopListening : startListening}
                      className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-all ${
                        isListening
                          ? 'bg-rose-500 ring-pulse-active scale-110 shadow-rose-500/40'
                          : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30'
                      }`}
                    >
                      {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                    </button>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      {isListening ? 'Listening to your medical answer... speak clearly' : 'Tap microphone to speak your answer'}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {recognitionSupported ? 'Speech-to-text active' : 'Note: Web Speech supported or type answer directly'}
                    </p>
                  </div>

                  {typedAnswer && (
                    <div className="p-4 bg-white border border-slate-200 rounded-xl text-left text-xs sm:text-sm text-slate-800 font-medium">
                      <span className="text-[10px] font-bold text-slate-400 block mb-1">Live Transcript:</span>
                      {typedAnswer}
                    </div>
                  )}
                </div>
              ) : (
                <textarea
                  rows={4}
                  value={typedAnswer}
                  onChange={(e) => setTypedAnswer(e.target.value)}
                  placeholder="Type your viva answer here... (e.g. Superior thyroid, Lingual, Facial, Occipital...)"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition font-sans"
                />
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  onClick={handleEvaluate}
                  disabled={!typedAnswer.trim()}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 transition flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Submit Viva Answer</span>
                </button>

                <button
                  onClick={handleNextQuestion}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: AI Viva Evaluation Rubric (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {evaluation ? (
            <div className="med-card p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200 bg-white">
              {/* Score Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">VIVA EVALUATION</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-indigo-950">{evaluation.score}</span>
                    <span className="text-xs font-bold text-slate-400">/ 10</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    evaluation.score >= 8 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {evaluation.score >= 8 ? '🌟 Honors Response' : 'Pass / Adequate'}
                  </span>
                </div>
              </div>

              {/* 4 Rubric Criteria */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Knowledge</span>
                  <strong className="text-slate-800 text-sm">{evaluation.rubricScores.knowledge}/10</strong>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Accuracy</span>
                  <strong className="text-slate-800 text-sm">{evaluation.rubricScores.accuracy}/10</strong>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Completeness</span>
                  <strong className="text-slate-800 text-sm">{evaluation.rubricScores.completeness}/10</strong>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Communication</span>
                  <strong className="text-slate-800 text-sm">{evaluation.rubricScores.communication}/10</strong>
                </div>
              </div>

              {/* Covered vs Missing */}
              <div className="space-y-3">
                <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl space-y-1">
                  <span className="text-[11px] font-bold text-emerald-900 block">✓ Covered Points:</span>
                  {evaluation.coveredPoints.map((pt, idx) => (
                    <span key={idx} className="text-[11px] text-emerald-800 block">• {pt}</span>
                  ))}
                </div>

                {evaluation.missingPoints.length > 0 && (
                  <div className="p-3 bg-rose-50/70 border border-rose-100 rounded-xl space-y-1">
                    <span className="text-[11px] font-bold text-rose-900 block">⚠ Missing Points:</span>
                    {evaluation.missingPoints.map((pt, idx) => (
                      <span key={idx} className="text-[11px] text-rose-800 block">• {pt}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Follow-up question trigger */}
              {evaluation.followUpQuestion && (
                <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl space-y-2">
                  <span className="text-[10px] font-extrabold text-indigo-700 uppercase tracking-wider block">
                    PROGRESSIVE FOLLOW-UP QUESTION
                  </span>
                  <p className="text-xs font-bold text-indigo-950 italic">
                    "{evaluation.followUpQuestion}"
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="med-card p-6 text-center space-y-3 text-slate-400">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-xl">
                🎙
              </div>
              <h4 className="text-xs font-bold text-slate-600">Awaiting Your Verbal Response</h4>
              <p className="text-[11px] text-slate-400">
                Speak or type your answer on the left to view multi-dimensional rubric scoring, missing anatomical terms, and examiner follow-ups.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
