import React, { useState } from 'react';
import { 
  Settings, 
  Key, 
  Sparkles, 
  RotateCcw, 
  ShieldCheck, 
  Check, 
  BookOpen,
  User,
  Sliders
} from 'lucide-react';
import { StudentProfile, MedicalProgram, AcademicYear, ExamType } from '../../types';

interface SettingsViewProps {
  profile: StudentProfile;
  onUpdateProfile: (profile: Partial<StudentProfile>) => void;
  onResetData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  profile,
  onUpdateProfile,
  onResetData,
}) => {
  const [apiKey, setApiKey] = useState(profile.apiKey || '');
  const [name, setName] = useState(profile.name || 'Deekshith');
  const [year, setYear] = useState<AcademicYear>(profile.year || '1st Year');
  const [useDemoAI, setUseDemoAI] = useState(profile.useDemoAI ?? true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name,
      year,
      apiKey,
      useDemoAI,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="med-card p-6 bg-gradient-to-r from-slate-900 to-sky-950 text-white rounded-3xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sky-300 text-xs font-bold uppercase tracking-wider">
            <Settings className="w-4 h-4 text-sky-400" />
            <span>PLATFORM SETTINGS & AI ENGINE</span>
          </div>
          <h1 className="text-2xl font-black">Curriculum, Profile & AI Settings</h1>
          <p className="text-xs text-slate-300">
            Configure your medical academic year, customize AI provider keys, or toggle zero-setup Demo AI mode.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Details */}
        <div className="med-card p-6 bg-white space-y-4">
          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <User className="w-4 h-4 text-sky-600" />
            <span>Student Profile Details</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Student Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Academic Year</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value as AcademicYear)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="1st Year">1st Year MBBS (Anatomy, Physio, Biochem)</option>
                <option value="2nd Year">2nd Year MBBS (Pathology, Pharma, Micro)</option>
                <option value="3rd Year (Part 1)">3rd Year MBBS (FMT, PSM, ENT, Ophth)</option>
                <option value="Final Year (Part 2)">Final Year MBBS (Medicine, Surgery, OBG, Peds)</option>
              </select>
            </div>
          </div>
        </div>

        {/* AI Mode & API Key Management (User Requirement #33) */}
        <div className="med-card p-6 bg-white space-y-4">
          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-600" />
            <span>AI Provider & Zero-Setup Demo Mode</span>
          </h3>

          <div className="p-4 bg-sky-50/80 border border-sky-200 rounded-2xl flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-sky-950">Local Medical Demo AI Mode</span>
              <p className="text-[11px] text-sky-800">
                Uses high-fidelity seeded clinical datasets. Fully offline capable without requiring external API keys.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setUseDemoAI(!useDemoAI)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${
                useDemoAI ? 'bg-sky-600 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="bg-white w-4 h-4 rounded-full shadow-md transform transition" />
            </button>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Optional Google Gemini / OpenAI API Key (For Live AI Generation)
            </label>
            <div className="relative">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy... (leave blank to continue using offline Demo AI)"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
            <p className="text-[10px] text-slate-400">
              Your API key remains securely stored in local browser state and is never exposed or logged.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="submit"
            className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-md shadow-sky-600/20 transition flex items-center gap-2"
          >
            {saved ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            <span>{saved ? 'Settings Saved!' : 'Save Configuration'}</span>
          </button>

          <button
            type="button"
            onClick={onResetData}
            className="px-4 py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset to Default Medical Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
};
