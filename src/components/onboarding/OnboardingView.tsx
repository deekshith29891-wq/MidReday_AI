import React, { useState } from 'react';
import { 
  Stethoscope, 
  BookOpen, 
  Calendar, 
  Clock, 
  Award, 
  Sparkles, 
  ArrowRight, 
  Check, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { MedicalProgram, AcademicYear, ExamType, ConfidenceLevel, StudentProfile } from '../../types';
import { CURRICULUM_SUBJECTS } from '../../data/curriculumData';

interface OnboardingViewProps {
  initialProfile: StudentProfile;
  onComplete: (profile: Partial<StudentProfile>) => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({
  initialProfile,
  onComplete,
}) => {
  const [program, setProgram] = useState<MedicalProgram>(initialProfile.program || 'MBBS');
  const [year, setYear] = useState<AcademicYear>(initialProfile.year || '1st Year');
  const [university, setUniversity] = useState(initialProfile.university || 'NMC CBME Standard Medical Curriculum');
  const [examType, setExamType] = useState<ExamType>(initialProfile.targetExamType || 'University Professional');
  const [selectedSubjectIds, setSelectedSubjectIds] = useState<string[]>(initialProfile.selectedSubjectIds || ['sub-anatomy', 'sub-physiology', 'sub-biochemistry']);
  const [dailyHours, setDailyHours] = useState<number>(initialProfile.dailyAvailableHours || 6);
  const [confidence, setConfidence] = useState<ConfidenceLevel>(initialProfile.initialConfidence || 'Medium');

  const filteredSubjects = CURRICULUM_SUBJECTS.filter(s => s.year === year && s.program === program);

  const toggleSubject = (id: string) => {
    setSelectedSubjectIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleYearChange = (newYear: AcademicYear) => {
    setYear(newYear);
    const subjs = CURRICULUM_SUBJECTS.filter(s => s.year === newYear && s.program === program);
    setSelectedSubjectIds(subjs.map(s => s.id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      program,
      year,
      university,
      targetExamType: examType,
      selectedSubjectIds,
      dailyAvailableHours: dailyHours,
      initialConfidence: confidence,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-sky-50/30 to-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl w-full bg-white rounded-3xl border border-slate-200/80 shadow-2xl p-6 sm:p-10 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-sky-50 text-sky-700 border border-sky-200 rounded-full text-xs font-bold mb-3 shadow-sm">
            <span className="text-base">🩺</span>
            <span>Welcome to MedReady AI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Let's Personalize Your Preparation
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Configure your curriculum, target exam, and available study hours for precision AI weakness targeting.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Program & Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Medical Program
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['MBBS', 'BDS', 'Nursing'] as MedicalProgram[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setProgram(p)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition text-center ${
                      program === p
                        ? 'bg-sky-600 text-white border-sky-600 shadow-sm shadow-sky-600/20'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Academic Year
              </label>
              <select
                value={year}
                onChange={(e) => handleYearChange(e.target.value as AcademicYear)}
                className="w-full py-2.5 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="1st Year">1st Year (Anatomy, Physio, Biochem)</option>
                <option value="2nd Year">2nd Year (Pathology, Pharma, Micro)</option>
                <option value="3rd Year (Part 1)">3rd Year (FMT, PSM, ENT, Ophth)</option>
                <option value="Final Year (Part 2)">Final Year (Medicine, Surgery, OBG, Peds)</option>
              </select>
            </div>
          </div>

          {/* Row 2: University Curriculum & Target Exam */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                University / Curriculum Standard
              </label>
              <select
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full py-2.5 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="NMC CBME Standard Medical Curriculum">NMC CBME Scheme (National Standard)</option>
                <option value="AIIMS New Delhi & INI-CET Pattern">AIIMS / INI-CET Pattern</option>
                <option value="Rajiv Gandhi University of Health Sciences (RGUHS)">RGUHS Curriculum</option>
                <option value="Maharashtra University of Health Sciences (MUHS)">MUHS Curriculum</option>
                <option value="Dr. MGR Medical University">Dr. MGR Medical University</option>
                <option value="West Bengal University of Health Sciences (WBUHS)">WBUHS Curriculum</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Target Exam Type
              </label>
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value as ExamType)}
                className="w-full py-2.5 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="University Professional">University Professional Exam (Theory + Practical + Viva)</option>
                <option value="Internal Assessment">Internal Assessment (Term Exam)</option>
                <option value="Practical & Spotters">Practical Stations & Spotter Examination</option>
                <option value="Viva Voce">Viva Voce Table Viva</option>
              </select>
            </div>
          </div>

          {/* Row 3: Subject Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Subjects for Upcoming Exam
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {filteredSubjects.map((sub) => {
                const isSelected = selectedSubjectIds.includes(sub.id);
                return (
                  <div
                    key={sub.id}
                    onClick={() => toggleSubject(sub.id)}
                    className={`p-3 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-sky-50/80 border-sky-300 text-sky-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-bold">{sub.name}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">{sub.code}</span>
                    </div>
                    <div className={`w-5 h-5 rounded-lg flex items-center justify-center border text-xs ${
                      isSelected ? 'bg-sky-600 border-sky-600 text-white' : 'border-slate-300 bg-white'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Row 4: Available Study Hours Today & Confidence Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Available Study Time Today: <span className="text-sky-600 font-extrabold">{dailyHours} Hours</span>
              </label>
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={dailyHours}
                  onChange={(e) => setDailyHours(Number(e.target.value))}
                  className="w-full accent-sky-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
                <span className="text-xs font-mono font-bold text-slate-700 min-w-[40px] text-right">{dailyHours}h</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Current Self-Confidence Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Low', 'Medium', 'High'] as ConfidenceLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setConfidence(lvl)}
                    className={`py-3 px-2 rounded-xl text-xs font-bold border transition text-center ${
                      confidence === lvl
                        ? lvl === 'Low'
                          ? 'bg-rose-500 text-white border-rose-500 shadow-sm shadow-rose-500/20'
                          : lvl === 'Medium'
                          ? 'bg-amber-500 text-white border-amber-500 shadow-sm shadow-amber-500/20'
                          : 'bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-600/20'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-sky-600/25 flex items-center justify-center gap-2 transition group"
            >
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition" />
              <span>Create My Preparation Plan</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>
            <p className="text-[11px] text-slate-400 text-center mt-3">
              Generates calibrated topic priorities, high-yield study timeline, spotter stations & viva voice models.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
