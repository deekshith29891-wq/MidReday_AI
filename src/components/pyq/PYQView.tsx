import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Sparkles, 
  TrendingUp, 
  Calendar, 
  CheckCircle2, 
  Filter, 
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';
import { PYQAnalysisItem } from '../../types';
import { AIPYQService } from '../../services/aiPYQ';

interface PYQViewProps {
  onNavigateToTheory: (topic: string) => void;
}

export const PYQView: React.FC<PYQViewProps> = ({ onNavigateToTheory }) => {
  const [filterSubject, setFilterSubject] = useState('ALL');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [analyzedList, setAnalyzedList] = useState<PYQAnalysisItem[]>(() => AIPYQService.getPYQAnalysis());
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    setIsUploading(true);

    setTimeout(() => {
      const extracted = AIPYQService.analyzeUploadedPaper(file.name, file.name);
      setAnalyzedList(prev => [...extracted, ...prev]);
      setIsUploading(false);
    }, 1200);
  };

  const filteredItems = filterSubject === 'ALL' 
    ? analyzedList 
    : analyzedList.filter(item => item.subject.toLowerCase().includes(filterSubject.toLowerCase()));

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="med-card p-6 bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 text-white rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sky-300 text-xs font-bold uppercase tracking-wider">
              <FileText className="w-4 h-4 text-sky-400" />
              <span>📚 AI Previous-Year Question (PYQ) Analyzer</span>
            </div>
            <h1 className="text-2xl font-black">Historical Exam Pattern Analysis</h1>
            <p className="text-xs text-slate-300">
              Exam patterns extracted from 2013-2025 university professional papers. Frequency indicators show historically tested repeat topics.
            </p>
          </div>

          <label className="flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition">
            <Upload className="w-4 h-4" />
            <span>Upload Question Paper</span>
            <input type="file" accept=".pdf,.doc,.docx,.txt" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>

        {/* Upload status */}
        {isUploading && (
          <div className="mt-4 p-3 bg-white/10 rounded-xl text-xs text-sky-200 flex items-center gap-2 animate-pulse">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>AI analyzing "{uploadedFileName}" — extracting recurring medical essay topics...</span>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {['ALL', 'Anatomy', 'Physiology', 'Biochemistry', 'Pathology', 'Pharmacology', 'Microbiology'].map((subj) => (
            <button
              key={subj}
              onClick={() => setFilterSubject(subj)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                filterSubject === subj
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {subj}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-400 hidden sm:inline">
          Showing <strong className="text-slate-700">{filteredItems.length}</strong> core high-yield topics
        </span>
      </div>

      {/* Main PYQ Cards Grid */}
      <div className="space-y-4">
        {filteredItems.map((item, idx) => (
          <div key={idx} className="med-card p-6 bg-white space-y-4 hover:border-sky-300 transition">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded uppercase tracking-wider">
                  {item.subject}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">{item.topic}</h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Exam Frequency</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-black text-rose-600">{item.frequency}x Times</span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigateToTheory(item.topic)}
                  className="px-3.5 py-2 bg-slate-50 hover:bg-sky-50 text-sky-700 hover:text-sky-900 border border-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1"
                >
                  <span>Study Answers</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Visual Frequency Gauge */}
            <div className="space-y-1">
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-sky-500 to-rose-500 h-full rounded-full"
                  style={{ width: `${Math.min(100, item.frequency * 12.5)}%` }}
                />
              </div>
            </div>

            {/* Years Asked */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-bold text-slate-500 mr-1">Tested In:</span>
              {item.years.map((yr) => (
                <span key={yr} className="text-[11px] font-mono font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md border border-slate-200">
                  {yr}
                </span>
              ))}
            </div>

            {/* Sample Past Questions */}
            <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Sample University Question Paper Formulation:</span>
              {item.samplePastQuestions.map((q, qIdx) => (
                <p key={qIdx} className="text-xs text-slate-800 font-medium italic">
                  "{q}"
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="p-4 bg-slate-100 border border-slate-200 rounded-2xl text-[11px] text-slate-500 flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0" />
        <span>
          Note: PYQ data indicates topics that have been frequently tested historically by medical universities. MedReady AI does not guarantee questions for any specific future exam.
        </span>
      </div>
    </div>
  );
};
