import React from 'react';
import { 
  Clock, 
  Search, 
  Sparkles, 
  Timer, 
  Activity, 
  BookOpen, 
  ShieldAlert, 
  Sliders, 
  UserCircle 
} from 'lucide-react';
import { StudentProfile, ReadinessOverview } from '../../types';
import { AppView } from '../../hooks/useAppStore';

interface HeaderProps {
  profile: StudentProfile;
  readiness: ReadinessOverview;
  onOpenSearch: () => void;
  onOpenFocusTimer: () => void;
  onNavigate: (view: AppView) => void;
  currentView: AppView;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  readiness,
  onOpenSearch,
  onOpenFocusTimer,
  onNavigate,
  currentView,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left Branding */}
        <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => onNavigate('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
            <span className="text-xl">🩺</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 tracking-tight text-lg">MedReady</span>
              <span className="bg-sky-100 text-sky-700 text-xs px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">AI</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">Prepare smarter. Walk in with confidence.</p>
          </div>
        </div>

        {/* Center / Search bar trigger */}
        <div className="flex-1 max-w-md hidden md:block">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-2 bg-slate-100/80 hover:bg-slate-200/70 border border-slate-200/80 rounded-xl text-slate-500 text-sm transition group"
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition" />
              <span>Ask AI router: "Quiz me on cranial nerves" or "5M on thorax"...</span>
            </div>
            <kbd className="hidden lg:inline-flex px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-200 rounded text-slate-400">⌘K</kbd>
          </button>
        </div>

        {/* Right Status & Controls */}
        <div className="flex items-center gap-2.5">
          {/* Mobile search button */}
          <button 
            onClick={onOpenSearch}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg md:hidden"
            title="Search AI"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Exam Countdown Chip */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>Exam in: <span className="font-bold text-amber-700">{readiness.hoursUntilExam}h {readiness.minutesUntilExam}m</span></span>
          </div>

          {/* Focus Timer Button */}
          <button
            onClick={onOpenFocusTimer}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200 transition text-xs font-semibold"
            title="Start Focus Session"
          >
            <Timer className="w-4 h-4 text-sky-600" />
            <span className="hidden sm:inline">25m Focus</span>
          </button>

          {/* Emergency Night-Before Trigger */}
          <button
            onClick={() => onNavigate('emergency')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition text-xs font-bold shadow-sm"
            title="Night-Before Exam Mode"
          >
            <span className="text-rose-600 font-extrabold">⚡</span>
            <span className="hidden md:inline">Night-Before Mode</span>
          </button>

          {/* Student Profile avatar */}
          <button
            onClick={() => onNavigate('settings')}
            className="flex items-center gap-1.5 p-1.5 text-slate-700 hover:bg-slate-100 rounded-xl transition"
            title="Profile & Settings"
          >
            <div className="w-8 h-8 rounded-lg bg-sky-600 text-white font-bold flex items-center justify-center text-xs">
              {profile.name?.charAt(0) || 'D'}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
