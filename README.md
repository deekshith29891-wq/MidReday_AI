# 🩺 MedReady AI — Real Medical Student Exam Platform

> **"Prepare smarter. Practice like the real exam. Walk in with confidence."**

MedReady AI is a full-stack, AI-powered medical education and examination preparation platform built for MBBS students from 1st year through Final year. It supports Theory, Practical spotters, Viva Voce simulations, Previous-Year Question (PYQ) analytics, active recall, dynamic study planning, and real-time exam readiness assessment.

---

## 🌟 Key Features

### 1. 🧠 Dynamic AI Confidence & Priority Engine
- Calculates topic mastery & urgency from recall scores, review decay, and exam proximity.
- Priority classifications: 🔴 **MUST STUDY**, 🟠 **HIGH PRIORITY**, 🟢 **MAINTAIN**, ⚪ **LOW PRIORITY**.
- **"Don't Study This Now"** intervention alerting students away from overstudying mastered topics (>85%).

### 2. 📚 Theory Specialist
- Structured 10-Mark Long Essays & 5-Mark Short Answers with clinical pearls and schematic diagram guides.
- Practice MCQs with detailed explanations for every distractor.
- Rapid revision high-yield summaries.

### 3. 🔬 Practical Spotters & Specimens
- Interactive spotter stations (Anatomy gross specimens & histology, Pathology slides, Pharmacology drugs, Microbiology Gram stains).
- Instant AI evaluation with rubric-based score breakdown.

### 4. 🎤 Interactive Viva Voce Examiner Simulator
- Simulated oral exam table with audio voice synthesis & microphone speech recognition (with typing fallback).
- Multi-dimensional rubric grading (Knowledge, Accuracy, Completeness, Communication).
- Progressive examiner follow-up questions.

### 5. 📅 PYQ Analyzer & Predictions
- High-yield previous year question frequency heat map (2013–2025).
- Frequency probability ranking for upcoming exams.

### 6. 🚨 Emergency Modes
- **6-Hour Night-Before Protocol**: High-yield minute-by-minute rescue schedule.
- **10-Minute Rescue Sprint**: Fast-fire flashcard pearls & one-liner mnemonics.

### 7. 🃏 Active Recall & Spaced Retrieval Decks
- Synaptic consolidation flashcard testing with live confidence recalibration.

### 8. 🎓 Full University Mock Exam Simulation
- 3-Station timed mock examination: Station 1 (Theory Essay) ➔ Station 2 (Practical Spotters) ➔ Station 3 (Viva Voce).
- Live countdown timers, auto-advance alerts, and overall readiness report.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide React
- **Build Tool**: Vite
- **Testing**: Vitest (Unit test suite for confidence & AI engine)
- **AI Gateway**: Local Deterministic Medical Knowledge Engine + Optional Google Gemini API live caller

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/deekshith29891-wq/MidReday_AI.git

# Navigate to project directory
cd MidReday_AI

# Install dependencies
npm install

# Start local dev server
npm run dev
```

The application will be running at `http://localhost:5173/`.

### Run Tests
```bash
npm test
```

### Build for Production
```bash
npm run build
```

---

## 🔒 Responsible AI & Medical Safety

MedReady AI is strictly designed as an **educational exam preparation and revision platform** for medical students adhering to standard curricula (e.g. NMC CBME). It is **not** intended for clinical diagnostic decision-making or direct patient care.

---

## 📄 License
MIT License