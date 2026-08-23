import { AIStudyPlan, AIPlanItem, TopicConfidenceRecord } from '../types';
import { MEDICAL_TOPICS, CURRICULUM_SUBJECTS } from '../data/curriculumData';

export class AIPlannerService {
  /**
   * Generates a tailored dynamic study plan based on available hours and student's weakest topics
   */
  static generateStudyPlan(
    availableHours: number,
    topicRecords: Record<string, TopicConfidenceRecord>,
    examType: string
  ): AIStudyPlan {
    const totalMinutes = Math.round(availableHours * 60);
    const sortedWeakest = Object.values(topicRecords)
      .sort((a, b) => b.priorityScore - a.priorityScore);

    const items: AIPlanItem[] = [];
    let currentMinute = 0;

    const formatSlot = (startMin: number, durMin: number) => {
      const startH = Math.floor(startMin / 60);
      const startM = startMin % 60;
      const endH = Math.floor((startMin + durMin) / 60);
      const endM = (startMin + durMin) % 60;
      return `${String(startH).padStart(2, '0')}:${String(startM).padStart(2, '0')} - ${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
    };

    // Slot 1: Highest Priority Weakest Topic (Theory & Core concepts)
    if (sortedWeakest[0] && totalMinutes >= 45) {
      const dur = Math.min(60, Math.floor(totalMinutes * 0.25));
      const topic = sortedWeakest[0];
      const subj = CURRICULUM_SUBJECTS.find(s => s.id === topic.subjectId)?.name || 'Anatomy';
      items.push({
        id: 'plan-1',
        timeSlot: formatSlot(currentMinute, dur),
        durationMinutes: dur,
        subject: subj,
        topic: topic.topicName,
        mode: 'Theory',
        priority: topic.priorityCategory,
        description: `Deep-dive high-yield theory notes, definitions, 5/10-mark points, and schematic diagrams for ${topic.topicName}.`,
        highYieldTips: [
          'Focus on classification, clinical anatomy, and draw diagrams from memory.',
          'Review the common exam traps identified by AI.'
        ]
      });
      currentMinute += dur;
    }

    // Slot 2: 2nd Weakest Topic (Theory / Applied)
    if (sortedWeakest[1] && totalMinutes - currentMinute >= 45) {
      const dur = Math.min(60, Math.floor(totalMinutes * 0.22));
      const topic = sortedWeakest[1];
      const subj = CURRICULUM_SUBJECTS.find(s => s.id === topic.subjectId)?.name || 'Physiology';
      items.push({
        id: 'plan-2',
        timeSlot: formatSlot(currentMinute, dur),
        durationMinutes: dur,
        subject: subj,
        topic: topic.topicName,
        mode: 'Theory',
        priority: topic.priorityCategory,
        description: `Master mechanisms, physiological curves, pathways, and clinical correlations for ${topic.topicName}.`,
        highYieldTips: [
          'Memorize regulatory enzymes/steps or pressure-volume relationships.',
          'Practice 1 long essay framework.'
        ]
      });
      currentMinute += dur;
    }

    // Break
    if (totalMinutes - currentMinute >= 75) {
      const breakDur = 15;
      items.push({
        id: 'plan-break-1',
        timeSlot: formatSlot(currentMinute, breakDur),
        durationMinutes: breakDur,
        subject: 'Rest & Hydration',
        topic: 'Mind Reset & Hydration Break',
        mode: 'Break',
        priority: 'LOW_PRIORITY',
        description: 'Step away from the screen, drink water, and do light physical stretches to consolidate neuroplastic retention.',
        highYieldTips: ['Avoid social media scrolling during this break.']
      });
      currentMinute += breakDur;
    }

    // Slot 3: Practical & Spotters Station
    if (totalMinutes - currentMinute >= 40) {
      const dur = Math.min(45, Math.floor((totalMinutes - currentMinute) * 0.35));
      items.push({
        id: 'plan-3',
        timeSlot: formatSlot(currentMinute, dur),
        durationMinutes: dur,
        subject: 'Pathology & Anatomy Spotters',
        topic: 'Clinical Spotter Stations & Gross Identification',
        mode: 'Practical',
        priority: 'MUST_STUDY',
        description: 'Simulate timed spotter identification: cadaveric vessels, gross lung/heart specimens, drug formulations, and microscopy.',
        highYieldTips: [
          'State: 1) Identification, 2) Two cardinal features, 3) Clinical significance.',
          'Double check side determination and orientation.'
        ]
      });
      currentMinute += dur;
    }

    // Slot 4: Interactive Viva Voce Practice
    if (totalMinutes - currentMinute >= 35) {
      const dur = Math.min(45, Math.floor((totalMinutes - currentMinute) * 0.5));
      items.push({
        id: 'plan-4',
        timeSlot: formatSlot(currentMinute, dur),
        durationMinutes: dur,
        subject: 'Multi-Subject Viva',
        topic: 'Examiner Simulation — Rapid-Fire Viva',
        mode: 'Viva',
        priority: 'HIGH_PRIORITY',
        description: 'Practice speaking answers out loud against the AI Examiner. Target precision, speed, and overcoming hesitation on follow-ups.',
        highYieldTips: [
          'Give concise direct definitions first before elaborating.',
          'Volunteer clinical correlations to impress examiners.'
        ]
      });
      currentMinute += dur;
    }

    // Slot 5: PYQs & Rapid Active Recall
    if (totalMinutes - currentMinute >= 20) {
      const dur = totalMinutes - currentMinute;
      items.push({
        id: 'plan-5',
        timeSlot: formatSlot(currentMinute, dur),
        durationMinutes: dur,
        subject: 'Previous-Year Questions',
        topic: 'PYQ High-Yield Drill & Active Flashcards',
        mode: 'Rapid Recall',
        priority: 'MUST_STUDY',
        description: 'Review the 5 most repeated exam questions from 2020-2025 and test memory retention with active recall cards.',
        highYieldTips: [
          'Rate your recall strictly: if hesitant, mark partially known.',
          'Review the repeated mistakes list.'
        ]
      });
      currentMinute += dur;
    }

    return {
      id: `plan-${Date.now()}`,
      title: `${availableHours}-Hour High-Yield Preparation Plan`,
      totalDurationMinutes: totalMinutes,
      createdAt: new Date().toISOString(),
      targetExam: examType,
      summary: `AI personalized ${availableHours}-hour roadmap prioritizing ${sortedWeakest.slice(0, 2).map(t => t.topicName).join(' and ')}.`,
      rationale: 'Dynamic time allocation prioritizes high-yield weak areas over equal distribution to maximize readiness gain before exam time.',
      items,
    };
  }

  /**
   * Generates the Night-Before 6-Hour Emergency Revision Plan
   */
  static generateNightBeforeEmergencyPlan(): AIStudyPlan {
    return {
      id: 'emergency-6h-plan',
      title: '6-Hour Night-Before Emergency Revision Protocol',
      totalDurationMinutes: 360,
      createdAt: new Date().toISOString(),
      targetExam: 'University Professional Examination Tomorrow',
      summary: 'High-impact 6-hour surgical revision schedule engineered specifically for the night before your medical exam.',
      rationale: 'Eliminates rereading strong topics. Directs 100% focus towards highest-yield exam essays, gross spotters, and oral viva traps.',
      items: [
        {
          id: 'em-1',
          timeSlot: '00:00 - 00:45',
          durationMinutes: 45,
          subject: 'Human Anatomy',
          topic: 'Brachial Plexus & Cranial Nerves',
          mode: 'Theory',
          priority: 'MUST_STUDY',
          description: 'Draw brachial plexus diagram 3 times from memory. Review Erb’s vs Klumpke’s palsy and UMN vs LMN facial nerve lesion table.',
          highYieldTips: ['Label all 5 stages: Roots, Trunks, Divisions, Cords, Branches.', 'Remember: UMN spares forehead wrinkles.']
        },
        {
          id: 'em-2',
          timeSlot: '00:45 - 01:30',
          durationMinutes: 45,
          subject: 'Physiology',
          topic: 'Cardiac Cycle & Action Potentials',
          mode: 'Theory',
          priority: 'MUST_STUDY',
          description: 'Sketch Wiggers diagram pressure curves. Align S1 with AV closure and S2 with semilunar closure. Write 5-mark answer framework.',
          highYieldTips: ['Isovolumetric contraction: all 4 valves shut + steepest pressure rise.']
        },
        {
          id: 'em-3',
          timeSlot: '01:30 - 02:15',
          durationMinutes: 45,
          subject: 'Biochemistry',
          topic: 'TCA Cycle & Irreversible Gluconeogenesis Steps',
          mode: 'Theory',
          priority: 'MUST_STUDY',
          description: 'Write out the 4 bypass enzymes of gluconeogenesis and calculate the 30/32 ATP yield from glucose oxidation.',
          highYieldTips: ['Pyruvate carboxylase needs Biotin & ATP in the mitochondria.']
        },
        {
          id: 'em-4',
          timeSlot: '02:15 - 02:30',
          durationMinutes: 15,
          subject: 'Rest & Mental Reset',
          topic: 'Hydration & Breathing Break',
          mode: 'Break',
          priority: 'LOW_PRIORITY',
          description: 'Step away completely. Drink water, perform box breathing (4s in, 4s hold, 4s out, 4s hold). Prevent exam fatigue.',
          highYieldTips: ['No phone notifications. Rest your eyes.']
        },
        {
          id: 'em-5',
          timeSlot: '02:30 - 03:15',
          durationMinutes: 45,
          subject: 'Anatomy & Pathology',
          topic: 'Practical Spotters: Heart, TB Lung, Histology',
          mode: 'Practical',
          priority: 'MUST_STUDY',
          description: 'Timed visual drill on top 6 gross specimens: LAD coronary artery, apical TB lung cavitation, slide identification criteria.',
          highYieldTips: ['Write: 1) ID, 2) Salient features, 3) Clinical note.']
        },
        {
          id: 'em-6',
          timeSlot: '03:15 - 04:00',
          durationMinutes: 45,
          subject: 'Multi-Subject Viva',
          topic: 'AI Examiner Viva Voce Simulation',
          mode: 'Viva',
          priority: 'HIGH_PRIORITY',
          description: 'Speak 10 rapid-fire viva answers out loud. Train immediate fluency and eliminate clinical hesitation.',
          highYieldTips: ['Start with crisp definition; state 3 bullet points.']
        },
        {
          id: 'em-7',
          timeSlot: '04:00 - 05:00',
          durationMinutes: 60,
          subject: 'Previous Question Drill',
          topic: 'Top 10 Repeated University PYQs (2020-2025)',
          mode: 'PYQ',
          priority: 'MUST_STUDY',
          description: 'Speed-solve recurring 10-mark and 5-mark university essay outlines to ensure complete paper coverage.',
          highYieldTips: ['Structure answers with Subheadings + Boxed Clinical Notes.']
        },
        {
          id: 'em-8',
          timeSlot: '05:00 - 06:00',
          durationMinutes: 60,
          subject: 'Active Recall & Spaced Retention',
          topic: 'Final Active Recall Flashcard Sweep',
          mode: 'Rapid Recall',
          priority: 'MUST_STUDY',
          description: 'Rapid-fire swipe through 25 high-yield active recall flashcards. Lock memory for tomorrow morning.',
          highYieldTips: ['Sleep at least 6 hours afterwards. Sleep is required for memory consolidation.']
        }
      ]
    };
  }

  /**
   * Generates the 10-Minute Ultra High-Yield Rescue Plan
   */
  static generate10MinuteRescuePlan(): {
    title: string;
    totalMinutes: number;
    sprints: { minuteLabel: string; title: string; subject: string; pearls: string[]; keyDiagramTip: string }[];
  } {
    return {
      title: '⚡ 10-Minute High-Yield Medical Rescue Sprint',
      totalMinutes: 10,
      sprints: [
        {
          minuteLabel: '3 min',
          title: 'Brachial Plexus & Erb vs Klumpke',
          subject: 'Human Anatomy',
          pearls: [
            'Roots: C5, C6, C7, C8, T1. Trunks: Upper (C5-C6), Middle (C7), Lower (C8-T1).',
            "Erb's Palsy (C5-C6): Waiter's tip hand (adducted, medially rotated, extended, pronated).",
            "Klumpke's Palsy (C8-T1): Total Claw hand + Horner syndrome (T1 sympathetic chain).",
            'Posterior Cord: ULTRA (Upper subscapular, Lower subscapular, Thoracodorsal, Radial, Axillary).'
          ],
          keyDiagramTip: 'Remember the M-pattern formed by Musculocutaneous, Median, and Ulnar nerves in front of the axillary artery.'
        },
        {
          minuteLabel: '2 min',
          title: 'Facial Nerve & UMN vs LMN Lesion',
          subject: 'Human Anatomy / Neuro',
          pearls: [
            'Exits via Stylomastoid foramen, enters Parotid gland (T-Z-B-M-C branches).',
            'UMN Lesion: Spares upper face (forehead wrinkles intact) due to bilateral cortical innervation.',
            "LMN Lesion (Bell's Palsy): Complete ipsilateral paralysis including forehead & eye closure."
          ],
          keyDiagramTip: 'Afferent corneal reflex = CN V1; Efferent corneal reflex = CN VII.'
        },
        {
          minuteLabel: '2 min',
          title: 'Cardiac Cycle & Heart Sounds',
          subject: 'Physiology',
          pearls: [
            'Total duration = 0.8s (Systole 0.3s, Diastole 0.5s).',
            'S1 = AV valve closure (Mitral + Tricuspid) at onset of Isovolumetric contraction.',
            'S2 = Semilunar valve closure (Aortic + Pulmonic) at onset of Isovolumetric relaxation.',
            'All 4 valves are shut ONLY in Isovolumetric Contraction and Relaxation.'
          ],
          keyDiagramTip: 'Dicrotic notch on aortic pressure curve occurs immediately after S2.'
        },
        {
          minuteLabel: '2 min',
          title: 'Gluconeogenesis Irreversible Bypass Steps',
          subject: 'Biochemistry',
          pearls: [
            '1) Pyruvate → Oxaloacetate (Pyruvate Carboxylase + Biotin + ATP in mitochondria).',
            '2) Oxaloacetate → PEP (PEP Carboxykinase / PEPCK + GTP).',
            '3) Fructose 1,6-BP → Fructose 6-P (Fructose 1,6-Bisphosphatase).',
            '4) Glucose 6-P → Glucose (Glucose 6-Phosphatase; absent in muscle, present in liver/kidney).'
          ],
          keyDiagramTip: 'Von Gierke disease is deficiency of Glucose 6-Phosphatase.'
        },
        {
          minuteLabel: '1 min',
          title: 'Rapid Viva Reflex Rules',
          subject: 'Viva Voce Exam',
          pearls: [
            '1. State exact standard definition first without filler words.',
            '2. Name 3 classifications or branches chronologically.',
            '3. Always mention the clinical application at the end.'
          ],
          keyDiagramTip: 'Keep posture upright and maintain confident eye contact.'
        }
      ]
    };
  }
}
