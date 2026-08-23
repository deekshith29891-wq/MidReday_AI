import React, { useState } from 'react';
import { 
  FolderPlus, 
  Upload, 
  FileText, 
  Sparkles, 
  Layers, 
  Mic, 
  ArrowRight, 
  Trash2, 
  Check,
  BookOpen
} from 'lucide-react';
import { SmartNoteItem } from '../../types';
import { AppView } from '../../hooks/useAppStore';

interface SmartNotesViewProps {
  notes: SmartNoteItem[];
  onSaveNotes: (notes: SmartNoteItem[]) => void;
  onNavigate: (view: AppView, topic?: string) => void;
}

export const SmartNotesView: React.FC<SmartNotesViewProps> = ({
  notes,
  onSaveNotes,
  onNavigate,
}) => {
  const [selectedNote, setSelectedNote] = useState<SmartNoteItem | null>(notes[0] || null);
  const [isUploading, setIsUploading] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Human Anatomy');
  const [newContent, setNewContent] = useState('');

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newItem: SmartNoteItem = {
      id: `note-${Date.now()}`,
      title: newTitle,
      subject: newSubject,
      fileType: 'TEXT',
      fileName: `${newTitle.replace(/\s+/g, '_')}.txt`,
      extractedText: newContent,
      summary: `AI clinical summary of ${newTitle} highlighting cardinal mechanisms, innervation/pathology, and viva prompts.`,
      keyTerms: newContent.split(' ').filter(w => w.length > 5).slice(0, 4),
      flashcardsCount: 5,
      vivaQuestionsCount: 3,
      uploadedAt: new Date().toISOString()
    };

    const updated = [newItem, ...notes];
    onSaveNotes(updated);
    setSelectedNote(newItem);
    setNewTitle('');
    setNewContent('');
  };

  const handleDeleteNote = (id: string) => {
    const updated = notes.filter(n => n.id !== id);
    onSaveNotes(updated);
    if (selectedNote?.id === id) {
      setSelectedNote(updated[0] || null);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="med-card p-6 bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 text-white rounded-3xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sky-300 text-xs font-bold uppercase tracking-wider">
            <FolderPlus className="w-4 h-4 text-sky-400" />
            <span>📖 AI Smart Notes & Document Synthesizer</span>
          </div>
          <h1 className="text-2xl font-black">Clinical Notes & Syllabus Repository</h1>
          <p className="text-xs text-slate-300">
            Upload personal notes, lecture PDFs, or paste syllabus snippets to generate instant executive summaries, active flashcards, and viva spots.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Notes List & Create Form (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Create / Upload Card */}
          <div className="med-card p-5 bg-white space-y-3">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
              + ADD NEW CLINICAL NOTE
            </h3>

            <form onSubmit={handleCreateNote} className="space-y-3">
              <div>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Note Title (e.g. Femoral Canal & Hernia)"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div>
                <select
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="Human Anatomy">Human Anatomy</option>
                  <option value="Physiology">Physiology</option>
                  <option value="Biochemistry">Biochemistry</option>
                  <option value="Pathology">Pathology</option>
                  <option value="Pharmacology">Pharmacology</option>
                  <option value="Microbiology">Microbiology</option>
                </select>
              </div>

              <div>
                <textarea
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Paste note text or bullet points here..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 font-sans"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Synthesize Note with AI</span>
              </button>
            </form>
          </div>

          {/* Notes Directory */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider px-1">
              SAVED MATERIALS ({notes.length})
            </h4>

            {notes.map((n) => {
              const isSelected = selectedNote?.id === n.id;
              return (
                <div
                  key={n.id}
                  onClick={() => setSelectedNote(n)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between group ${
                    isSelected
                      ? 'bg-sky-50/90 border-sky-300 text-sky-950 shadow-sm'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="space-y-0.5 overflow-hidden pr-2">
                    <span className="text-[10px] font-bold text-sky-700 bg-sky-100/60 px-2 py-0.5 rounded">
                      {n.subject}
                    </span>
                    <h5 className="text-xs font-bold text-slate-900 truncate mt-1">{n.title}</h5>
                    <span className="text-[10px] text-slate-400">{n.fileName}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNote(n.id);
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition"
                    title="Delete Note"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: AI Note Decomposition & Synthesis (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {selectedNote ? (
            <div className="med-card p-6 sm:p-8 space-y-6 bg-white">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                    {selectedNote.subject} • {selectedNote.fileType}
                  </span>
                  <h2 className="text-lg font-black text-slate-900 mt-1">{selectedNote.title}</h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('recall')}
                    className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-xl text-xs font-bold border border-sky-200 transition flex items-center gap-1"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>{selectedNote.flashcardsCount} Flashcards</span>
                  </button>
                  <button
                    onClick={() => onNavigate('viva')}
                    className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold border border-indigo-200 transition flex items-center gap-1"
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>{selectedNote.vivaQuestionsCount} Viva Qs</span>
                  </button>
                </div>
              </div>

              {/* AI Structured Summary */}
              <div className="p-4 bg-sky-50/60 border border-sky-100 rounded-2xl space-y-2">
                <span className="text-[10px] font-extrabold text-sky-900 uppercase tracking-wider block">
                  AI EXECUTIVE SUMMARY
                </span>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {selectedNote.summary}
                </p>
              </div>

              {/* Key Medical Terms */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 block">Extracted Cardinal Terminology:</span>
                <div className="flex flex-wrap gap-2">
                  {selectedNote.keyTerms.map((term, idx) => (
                    <span key={idx} className="text-xs font-bold px-2.5 py-1 bg-slate-100 text-slate-800 rounded-lg border border-slate-200">
                      🏷 {term}
                    </span>
                  ))}
                </div>
              </div>

              {/* Raw Source Text */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">
                  Raw Document Source Text
                </span>
                <pre className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-700 whitespace-pre-wrap max-h-48 overflow-y-auto">
                  {selectedNote.extractedText}
                </pre>
              </div>
            </div>
          ) : (
            <div className="med-card p-10 text-center text-slate-400">
              Select or upload a note on the left.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
