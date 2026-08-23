import React from 'react';

interface GraphicProps {
  type: string;
  className?: string;
}

export const MedicalGraphic: React.FC<GraphicProps> = ({ type, className = "w-full h-56" }) => {
  if (type === 'HEART_ANATOMY') {
    return (
      <div className={`relative bg-gradient-to-br from-slate-900 to-sky-950 rounded-xl flex items-center justify-center p-4 overflow-hidden border border-sky-800/40 ${className}`}>
        <svg viewBox="0 0 300 240" className="w-full h-full max-h-56 drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cardiac outline */}
          <path d="M150 210 C90 170, 45 125, 55 75 C65 25, 125 35, 150 70 C175 35, 235 25, 245 75 C255 125, 210 170, 150 210 Z" fill="#e11d48" fillOpacity="0.85" stroke="#be123c" strokeWidth="3" />
          
          {/* Ascending Aorta & Pulmonary Trunk */}
          <path d="M130 70 C130 20, 160 15, 175 18 C185 20, 185 50, 170 70" stroke="#f43f5e" strokeWidth="14" strokeLinecap="round" />
          <path d="M165 65 C175 30, 205 35, 215 45" stroke="#0284c7" strokeWidth="12" strokeLinecap="round" />

          {/* Left Anterior Descending Artery (LAD) - Tagged */}
          <path d="M150 75 Q155 110 145 140 T150 205" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round" strokeDasharray="2 1" />
          <path d="M152 110 Q180 130 190 145" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
          <path d="M147 140 Q125 160 120 175" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />

          {/* Great Cardiac Vein */}
          <path d="M144 78 Q148 112 140 142 T145 200" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" opacity="0.8" />

          {/* Red Pin Tag on LAD */}
          <circle cx="152" cy="115" r="8" fill="#ef4444" stroke="#ffffff" strokeWidth="2.5" className="animate-pulse" />
          <text x="168" y="119" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="sans-serif">🔴 PIN A: Anterior Interventricular Sulcus</text>
        </svg>
        <div className="absolute bottom-2 left-3 bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-mono text-amber-300 border border-amber-500/30">
          📍 Tagged Structure: Anterior Groove Artery
        </div>
      </div>
    );
  }

  if (type === 'LUNG_TB_PATHOLOGY') {
    return (
      <div className={`relative bg-gradient-to-br from-slate-900 to-rose-950 rounded-xl flex items-center justify-center p-4 overflow-hidden border border-rose-800/40 ${className}`}>
        <svg viewBox="0 0 300 240" className="w-full h-full max-h-56 drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Right Lung Lobes Outline */}
          <path d="M150 20 C100 20, 70 80, 75 150 C80 200, 110 220, 150 220 C190 220, 220 200, 225 150 C230 80, 200 20, 150 20 Z" fill="#64748b" fillOpacity="0.4" stroke="#94a3b8" strokeWidth="2.5" />
          
          {/* Apical Cavity */}
          <circle cx="150" cy="55" r="28" fill="#fef08a" fillOpacity="0.85" stroke="#ca8a04" strokeWidth="3" />
          <circle cx="150" cy="55" r="16" fill="#451a03" stroke="#ca8a04" strokeWidth="2" />
          
          {/* Fibro-caseous satellite granules */}
          <circle cx="125" cy="85" r="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
          <circle cx="170" cy="90" r="8" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
          <circle cx="140" cy="115" r="5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
          
          {/* Bronchial erosion link */}
          <path d="M150 71 Q150 110 170 140" stroke="#f43f5e" strokeWidth="3" strokeDasharray="3 2" />

          {/* Tag pin */}
          <circle cx="150" cy="55" r="7" fill="#ef4444" stroke="#ffffff" strokeWidth="2" className="animate-pulse" />
          <text x="185" y="58" fill="#fef08a" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Apical Cavitation</text>
        </svg>
        <div className="absolute bottom-2 left-3 bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-mono text-rose-300 border border-rose-500/30">
          🔬 Gross Specimen: Upper Lobe Caseation
        </div>
      </div>
    );
  }

  if (type === 'PHARMA_DRUG_BLISTER') {
    return (
      <div className={`relative bg-gradient-to-br from-slate-900 to-emerald-950 rounded-xl flex items-center justify-center p-4 overflow-hidden border border-emerald-800/40 ${className}`}>
        <svg viewBox="0 0 300 240" className="w-full h-full max-h-56 drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Blister pack outline */}
          <rect x="50" y="30" width="200" height="170" rx="12" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="3" />
          <rect x="60" y="40" width="180" height="150" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

          {/* Tablet Pockets */}
          <rect x="75" y="55" width="40" height="35" rx="6" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
          <rect x="130" y="55" width="40" height="35" rx="6" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
          <rect x="185" y="55" width="40" height="35" rx="6" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />

          <rect x="75" y="105" width="40" height="35" rx="6" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
          <rect x="130" y="105" width="40" height="35" rx="6" fill="#38bdf8" stroke="#0369a1" strokeWidth="2" />
          <rect x="185" y="105" width="40" height="35" rx="6" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />

          {/* Text branding */}
          <text x="75" y="165" fill="#0f172a" fontSize="11" fontWeight="bold">METOPROLOL TARTRATE 50mg</text>
          <text x="75" y="180" fill="#64748b" fontSize="9">Cardioselective Beta-1 Blocker</text>

          {/* Pin */}
          <circle cx="150" cy="122" r="7" fill="#ef4444" stroke="#ffffff" strokeWidth="2" className="animate-pulse" />
        </svg>
        <div className="absolute bottom-2 left-3 bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-mono text-emerald-300 border border-emerald-500/30">
          💊 Spotter Station: Cardiovascular Formulation
        </div>
      </div>
    );
  }

  // Gram stain microscopy slide default
  return (
    <div className={`relative bg-gradient-to-br from-slate-950 to-indigo-950 rounded-xl flex items-center justify-center p-4 overflow-hidden border border-indigo-800/40 ${className}`}>
      <svg viewBox="0 0 300 240" className="w-full h-full max-h-56 drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Microscope circular field */}
        <circle cx="150" cy="115" r="95" fill="#1e1b4b" stroke="#6366f1" strokeWidth="4" />
        
        {/* Gram positive lanceolate diplococci pairs (Dark Purple/Violet) */}
        <ellipse cx="120" cy="90" rx="6" ry="10" transform="rotate(-20 120 90)" fill="#7c3aed" stroke="#c4b5fd" strokeWidth="1" />
        <ellipse cx="127" cy="93" rx="6" ry="10" transform="rotate(-20 127 93)" fill="#7c3aed" stroke="#c4b5fd" strokeWidth="1" />

        <ellipse cx="160" cy="130" rx="6" ry="10" transform="rotate(35 160 130)" fill="#7c3aed" stroke="#c4b5fd" strokeWidth="1" />
        <ellipse cx="167" cy="135" rx="6" ry="10" transform="rotate(35 167 135)" fill="#7c3aed" stroke="#c4b5fd" strokeWidth="1" />

        <ellipse cx="140" cy="150" rx="5" ry="8" fill="#7c3aed" />
        <ellipse cx="146" cy="150" rx="5" ry="8" fill="#7c3aed" />

        {/* Halo capsule representation */}
        <ellipse cx="123" cy="91" rx="16" ry="18" fill="none" stroke="#a78bfa" strokeWidth="1" strokeDasharray="2 2" opacity="0.7" />
        <ellipse cx="163" cy="132" rx="16" ry="18" fill="none" stroke="#a78bfa" strokeWidth="1" strokeDasharray="2 2" opacity="0.7" />

        {/* Background PMN Polymorph leucocyte fragment */}
        <path d="M180 80 Q190 70 200 85 Q210 100 195 105 Q180 110 180 80 Z" fill="#be185d" fillOpacity="0.2" stroke="#be185d" strokeWidth="1" />

        {/* Pin */}
        <circle cx="163" cy="132" r="7" fill="#ef4444" stroke="#ffffff" strokeWidth="2" className="animate-pulse" />
      </svg>
      <div className="absolute bottom-2 left-3 bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-mono text-indigo-300 border border-indigo-500/30">
        🔬 Oil Immersion 1000x: Lanceolate Diplococci
      </div>
    </div>
  );
};
