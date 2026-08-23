import React from 'react';
import { LayoutDashboard, BookOpen, Microscope, Mic, GraduationCap } from 'lucide-react';
import { AppView } from '../../hooks/useAppStore';

interface BottomNavProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavigate }) => {
  const items: { id: AppView; label: string; icon: any }[] = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'theory', label: 'Theory', icon: BookOpen },
    { id: 'practical', label: 'Spotters', icon: Microscope },
    { id: 'viva', label: 'Viva', icon: Mic },
    { id: 'exam', label: 'Mock Exam', icon: GraduationCap },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-lg">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition ${
              isActive ? 'text-sky-600 font-bold' : 'text-slate-500 hover:text-slate-900 font-medium'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-sky-600 stroke-[2.5]' : 'text-slate-400'}`} />
            <span className="text-[10px]">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
