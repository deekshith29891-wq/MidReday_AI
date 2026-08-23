import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Microscope, 
  Mic, 
  FileText, 
  GraduationCap, 
  Zap, 
  Clock, 
  Layers, 
  CheckCircle2, 
  FolderPlus, 
  TrendingUp, 
  Settings,
  Sparkles,
  Flame,
  ShieldCheck
} from 'lucide-react';
import { AppView } from '../../hooks/useAppStore';
import { StudentProfile, ReadinessOverview } from '../../types';

interface SidebarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  profile: StudentProfile;
  readiness: ReadinessOverview;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  profile,
  readiness,
}) => {
  const navItems: { id: AppView; label: string; icon: any; badge?: string; badgeColor?: string }[] = [
    { id: 'dashboard', label: 'Command Dashboard', icon: LayoutDashboard },
    { id: 'theory', label: 'Theory Specialist', icon: BookOpen, badge: '5M & 10M' },
    { id: 'practical', label: 'Practical Spotters', icon: Microscope, badge: 'Stations' },
    { id: 'viva', label: 'Viva Voice Examiner', icon: Mic, badge: 'Audio AI', badgeColor: 'bg-emerald-100 text-emerald-700' },
    { id: 'pyqs', label: 'PYQ Analyzer', icon: FileText, badge: '2020-25' },
    { id: 'evaluator', label: 'AI Answer Evaluator', icon: CheckCircle2 },
    { id: 'exam', label: 'Full Mock Exam', icon: GraduationCap, badge: 'Sim' },
    { id: 'emergency', label: 'Night-Before Mode', icon: Zap, badge: '6-Hour', badgeColor: 'bg-rose-100 text-rose-700' },
    { id: 'rescue', label: '10-Min Rescue Sprint', icon: Clock, badge: 'Fast', badgeColor: 'bg-amber-100 text-amber-700' },
    { id: 'recall', label: 'Active Recall Decks', icon: Layers },
    { id: 'notes', label: 'Smart Notes & Uploads', icon: FolderPlus },
    { id: 'progress', label: 'Readiness Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Curriculum & Setup', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-4rem)] flex flex-col justify-between p-4 hidden md:flex shrink-0">
      <div className="space-y-6">
        {/* Profile Card */}
        <div className="p-3.5 bg-gradient-to-br from-sky-50 to-slate-50 border border-sky-100 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
              {profile.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <h4 className="font-bold text-slate-900 text-sm truncate">{profile.name}</h4>
              <p className="text-[11px] font-semibold text-sky-700 truncate">{profile.program} • {profile.year}</p>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-sky-100/80 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Readiness Index</span>
            <span className="font-extrabold text-sky-700">{readiness.overallReadiness}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-sky-500 to-teal-500 h-1.5 rounded-full transition-all duration-500" 
              style={{ width: `${readiness.overallReadiness}%` }}
            />
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition group ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/20'
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-sky-600 transition'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                    isActive ? 'bg-white/20 text-white' : (item.badgeColor || 'bg-slate-100 text-slate-600')
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer disclaimer & Responsible AI note */}
      <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 space-y-2">
        <div className="flex items-center gap-1.5 text-slate-500 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Educational Exam Tool</span>
        </div>
        <p className="text-[10px] leading-relaxed text-slate-400">
          Verify medical facts with official CBME curriculum & faculty.
        </p>
      </div>
    </aside>
  );
};
