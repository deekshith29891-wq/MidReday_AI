import React, { useState } from 'react';
import { Search, X, Sparkles, ArrowRight, BookOpen, Mic, Microscope, Zap, FileText, GraduationCap } from 'lucide-react';
import { AIOrchestratorService } from '../../services/aiOrchestrator';
import { AppView } from '../../hooks/useAppStore';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: AppView, topicName?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const [routingResult, setRoutingResult] = useState<any>(null);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const res = AIOrchestratorService.routeStudentQuery(query);
    setRoutingResult(res);
  };

  const handleSelectRoute = (view: AppView, topic?: string) => {
    onNavigate(view, topic);
    onClose();
  };

  const quickPrompts = [
    { label: 'Brachial Plexus 10M Essay', query: 'Show 10 mark theory answer on brachial plexus', view: 'theory' as AppView },
    { label: 'Quiz me on Cranial Nerves', query: 'Quiz me in viva on cranial nerves', view: 'viva' as AppView },
    { label: 'Night-Before Exam Plan', query: 'I have an exam tomorrow morning', view: 'emergency' as AppView },
    { label: 'Pathology TB Lung Spotter', query: 'Show practical spotter for pulmonary tuberculosis', view: 'practical' as AppView },
    { label: '10-Minute Rescue Sprint', query: 'I only have 10 minutes to revise', view: 'rescue' as AppView },
    { label: 'Frequent PYQs from 2020-2025', query: 'Show repeated previous year questions', view: 'pyqs' as AppView },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-sm">
            <Sparkles className="w-4 h-4 text-sky-600" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900">AI Multi-Specialist Orchestrator</h3>
            <p className="text-xs text-slate-400">Ask any medical question or state your exam scenario</p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSearch} className="relative mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value.trim().length > 3) {
                setRoutingResult(AIOrchestratorService.routeStudentQuery(e.target.value));
              } else {
                setRoutingResult(null);
              }
            }}
            placeholder="e.g., 'What are the branches of external carotid?' or 'Exam in 6 hours'..."
            className="w-full pl-11 pr-24 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            autoFocus
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
          <button
            type="submit"
            className="absolute right-2 top-2 px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl transition"
          >
            Route
          </button>
        </form>

        {/* AI Routing Output */}
        {routingResult && (
          <div className="mb-6 p-4 bg-gradient-to-r from-sky-50 to-cyan-50 border border-sky-200 rounded-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-sky-600 text-white text-[10px] font-bold rounded-md uppercase tracking-wider">
                  Specialist: {routingResult.primarySpecialist}
                </span>
                <span className="text-xs text-sky-800 font-medium">Confidence: {Math.round(routingResult.confidence * 100)}%</span>
              </div>
              <button
                onClick={() => handleSelectRoute(routingResult.recommendedView, routingResult.topicIdentified)}
                className="flex items-center gap-1 text-xs font-bold text-sky-700 hover:text-sky-900"
              >
                <span>Proceed</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs font-bold text-slate-800 mt-2">{routingResult.suggestedActionText}</p>
          </div>
        )}

        {/* Suggested Quick Inquiries */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Suggested Medical Prompts</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(p.query);
                  const res = AIOrchestratorService.routeStudentQuery(p.query);
                  setRoutingResult(res);
                }}
                className="flex items-center justify-between p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl text-left transition group text-xs text-slate-700"
              >
                <span className="font-semibold group-hover:text-sky-700">{p.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-0.5 transition shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
