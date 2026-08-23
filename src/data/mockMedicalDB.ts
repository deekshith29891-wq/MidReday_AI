import { TheoryAnswerResponse, PracticalSpotterStation, ActiveRecallCard, PYQAnalysisItem } from '../types';

export const MOCK_THEORY_ANSWERS: Record<string, TheoryAnswerResponse> = {
  'top-brachial-plexus': {
    topic: 'Brachial Plexus',
    marksCategory: '10-Mark',
    definition: 'The brachial plexus is a major somatic nerve plexus formed by the ventral rami of the lower four cervical nerves (C5, C6, C7, C8) and the first thoracic nerve (T1), with variable prefixation (C4) or postfixation (T2), supplying motor and sensory innervation to the upper limb and pectoral girdle.',
    keySections: [
      {
        heading: '1. Formation & Architectural Plan (Roots to Branches)',
        points: [
          '• Roots: Ventral rami of C5, C6, C7, C8, T1 emerging between Scalenus anterior and Scalenus medius muscles in the posterior triangle of the neck.',
          '• Trunks: Upper Trunk (C5 + C6 union), Middle Trunk (C7 continuation), Lower Trunk (C8 + T1 union).',
          '• Divisions: Each of the 3 trunks splits into Anterior (flexor compartment) and Posterior (extensor compartment) divisions behind the clavicle.',
          '• Cords (Arranged in relation to the 2nd part of the Axillary Artery): Lateral Cord (Anterior divisions of Upper + Middle trunks), Medial Cord (Anterior division of Lower trunk), Posterior Cord (Union of all 3 posterior divisions: C5-T1).'
        ]
      },
      {
        heading: '2. Branches from Cords & Roots',
        points: [
          '• Direct from Roots: Long Thoracic Nerve of Bell (C5, C6, C7) to Serratus Anterior; Dorsal Scapular Nerve (C5) to Rhomboids.',
          '• From Upper Trunk: Suprascapular Nerve (C5, C6) to Supraspinatus & Infraspinatus; Nerve to Subclavius (C5, C6).',
          '• Lateral Cord Branches: Lateral Pectoral, Musculocutaneous (C5, C6, C7), Lateral Root of Median Nerve.',
          '• Medial Cord Branches: Medial Pectoral, Medial Cutaneous N. of Arm, Medial Cutaneous N. of Forearm, Ulnar Nerve (C8, T1), Medial Root of Median Nerve.',
          '• Posterior Cord Branches (ULTRA): Upper Subscapular, Lower Subscapular, Thoracodorsal (N. to Latissimus dorsi), Axillary Nerve (C5, C6), Radial Nerve (C5-T1).'
        ]
      },
      {
        heading: '3. Clinical Anatomy & Applied Correlations',
        points: [
          "• Erb-Duchenne Paralysis: Injury to upper trunk at Erb's point (C5, C6). Mechanism: Excessive separation of head from shoulder (birth trauma, motorcycle falls). Deformity: 'Policeman's tip' or 'Waiter's tip' hand (Arm adducted, medially rotated; forearm extended and pronated).",
          "• Klumpke's Paralysis: Injury to lower trunk (C8, T1). Mechanism: Forceful upward traction on arm (breech delivery, falling from height grasping a tree). Deformity: Total Claw Hand (intrinsic hand muscles paralyzed, Horner syndrome if T1 sympathetic root involved).",
          "• Winging of Scapula: Injury to Long Thoracic Nerve of Bell during radical mastectomy or axillary clearance."
        ]
      }
    ],
    clinicalSignificance: [
      "Erb's Palsy (C5-C6): Loss of abductors (Deltoid/Supraspinatus) and lateral rotators → Waiter's Tip deformity.",
      "Klumpke's Palsy (C8-T1): Loss of lumbricals and interossei → Claw hand + Horner's syndrome.",
      "Brachial Plexus Block: Injected into the axillary sheath around the 3rd part of the axillary artery for upper extremity surgery."
    ],
    diagramGuide: {
      title: 'Schematic 5-Stage Brachial Plexus Diagram',
      mustLabel: ['Roots (C5-T1)', 'Trunks (Upper, Middle, Lower)', 'Divisions (Ant/Post)', 'Cords (Lateral, Posterior, Medial)', 'Terminal Branches (MARMU)'],
      drawingTips: 'Draw 5 horizontal lines on the left for roots. Join C5-C6 and C8-T1. Draw 3 X-crosses for divisions. Draw a prominent M-shaped junction over the axillary artery for the Median, Musculocutaneous, and Ulnar nerves.',
      asciiDiagram: `
  C5 ----\\--- Upper Trunk --/-- [Lateral Cord] ---> Musculocutaneous & Median Root
  C6 ----/                 X
  C7 -------- Middle Trunk -\\-- [Posterior Cord] -> Axillary & Radial Nerves
  C8 ----\\--- Lower Trunk --/-- [Medial Cord] ----> Ulnar & Median Root
  T1 ----/
      `
    },
    highYieldPoints: [
      'Mnemonic for Posterior Cord: ULTRA (Upper subscapular, Lower subscapular, Thoracodorsal, Radial, Axillary)',
      "Erb's point is the union of 6 nerves: C5 root, C6 root, Suprascapular n., N. to Subclavius, Anterior division, Posterior division.",
      'Horner syndrome (Ptosis, Miosis, Anhidrosis, Enophthalmos) accompanies Klumpke paralysis due to T1 sympathetic chain involvement.'
    ],
    commonMisconceptions: [
      'Thinking the Radial nerve arises from lateral or medial cords (it is the direct continuation of the posterior cord).',
      'Confusing the root value of the Long Thoracic Nerve (C5, C6, C7 - arises directly from roots, not trunks).'
    ],
    sampleMCQs: [
      {
        id: 'mcq-bp-1',
        question: 'A 24-year-old motorcyclist falls on his shoulder. On examination, the upper limb is adducted and internally rotated with the forearm extended and pronated. Which roots of the brachial plexus are injured?',
        options: ['C5 and C6', 'C7 and C8', 'C8 and T1', 'C5, C6, and C7'],
        correctIndex: 0,
        explanation: 'This is the classical Waiter’s tip / Policeman’s tip deformity seen in Erb-Duchenne palsy caused by traction injury to upper trunk roots C5 and C6.'
      },
      {
        id: 'mcq-bp-2',
        question: 'Which of the following nerves arises directly from the roots of the brachial plexus?',
        options: ['Suprascapular nerve', 'Long thoracic nerve', 'Axillary nerve', 'Thoracodorsal nerve'],
        correctIndex: 1,
        explanation: 'Long Thoracic Nerve of Bell arises directly from the ventral rami roots of C5, C6, and C7 before trunk formation.'
      }
    ],
    activeRecallPrompts: [
      {
        prompt: 'State the 6 nerves that meet at Erb’s point.',
        answer: '1) C5 root, 2) C6 root, 3) Suprascapular nerve, 4) Nerve to subclavius, 5) Anterior division of upper trunk, 6) Posterior division of upper trunk.'
      },
      {
        prompt: 'Why does Horner syndrome occur in Klumpke paralysis?',
        answer: 'Because the T1 ventral ramus carries preganglionic sympathetic fibers heading to the superior cervical ganglion. T1 avulsion interrupts sympathetic innervation to the eye.'
      }
    ]
  },
  'top-cardiac-cycle': {
    topic: 'Cardiac Cycle & Pressure-Volume Relationships',
    marksCategory: '10-Mark',
    definition: 'The cardiac cycle consists of all the electrical, mechanical, acoustic, and volumetric events that occur from the beginning of one heartbeat to the beginning of the next. At a normal resting heart rate of 75 bpm, the total duration is 0.8 seconds (Atrial Systole 0.1s, Diastole 0.7s; Ventricular Systole 0.3s, Diastole 0.5s).',
    keySections: [
      {
        heading: '1. Phases of Ventricular Systole (0.3 seconds)',
        points: [
          '• Isovolumetric Contraction (0.05s): Begins with closure of AV valves (First Heart Sound - S1/LUB). Ventricle is a closed chamber; intraventricular pressure rises steeply without change in ventricular blood volume.',
          '• Rapid Ejection Phase (0.10s): Ventricular pressure exceeds aortic (80 mmHg) and pulmonary (10 mmHg) pressures; semilunar valves open. About 70% of stroke volume (~50 mL) is rapidly pumped.',
          '• Reduced Ejection Phase (0.15s): Ventricular pressure begins declining; remaining 30% of stroke volume is ejected.'
        ]
      },
      {
        heading: '2. Phases of Ventricular Diastole (0.5 seconds)',
        points: [
          '• Protodiastole (0.04s): Brief interval where ventricular pressure falls below arterial pressure; reversal of blood column closes aortic & pulmonary semilunar valves (Second Heart Sound - S2/DUB).',
          '• Isovolumetric Relaxation (0.08s): All 4 valves closed. Ventricular pressure plummets rapidly to near 0 mmHg without volume alteration.',
          '• Rapid Passive Filling (0.11s): AV valves swing open; intraventricular suction draws ~70% of venous blood rapidly into ventricles (Generates S3 if turbulent/dilated).',
          '• Diastasis / Reduced Filling (0.19s): Slow continuous flow into ventricles (~10%).',
          '• Atrial Systole (0.10s): Atrial contraction (P-wave on ECG, ‘a’ wave on JVP) tops up remaining 10-20% blood (Generates pathological S4 if non-compliant ventricle).'
        ]
      },
      {
        heading: '3. Clinical Volumes & Hemodynamic Indicators',
        points: [
          '• End-Diastolic Volume (EDV): ~120-130 mL.',
          '• End-Systolic Volume (ESV): ~50-60 mL.',
          '• Stroke Volume (SV) = EDV - ESV = ~70 mL.',
          '• Ejection Fraction (EF) = (SV / EDV) × 100% = 55% - 70% (Clinical marker for systolic heart failure).'
        ]
      }
    ],
    clinicalSignificance: [
      'Heart Sounds: S1 (AV valve closure, best heard at apex) and S2 (Semilunar valve closure, best at base).',
      'Valvular murmurs: Systolic murmurs (Aortic Stenosis, Mitral Regurgitation) occur between S1 and S2; Diastolic murmurs (Mitral Stenosis, Aortic Regurgitation) occur between S2 and next S1.',
      'Jugular Venous Pulse (JVP): a wave (Atrial contraction), c wave (Tricuspid bulging during isovolumetric contraction), v wave (Atrial filling against closed tricuspid).'
    ],
    diagramGuide: {
      title: 'Wiggers Diagram & Pressure Curves',
      mustLabel: ['Left Ventricular Pressure', 'Aortic Pressure & Dicrotic Notch', 'Left Atrial Pressure', 'ECG (P-QRS-T alignment)', 'Heart Sounds S1 & S2'],
      drawingTips: 'Align ventricular pressure peak (120 mmHg) with aortic curve. Show the dicrotic incisura notch on the aortic line right after semilunar valve closure at S2.',
      asciiDiagram: `
  Pressure (mmHg)
  120 |       /---\\ (LV Peak)
      |      /     \\________ Aortic Dicrotic Notch
   80 |-----/                \\----------------- (Aortic Diastolic 80)
    0 |____/__________________\\_________________
        | S1 |      | S2 |      |
        [Isovol Cont][Eject] [Isovol Relax][Rapid Filling]
      `
    },
    highYieldPoints: [
      'Isovolumetric phases are the ONLY phases where all 4 cardiac valves are simultaneously shut.',
      'Dicrotic notch (incisura) in the aortic pressure trace is caused by elastic recoil of aortic walls upon aortic valve closure.',
      'Coronary blood flow to the left ventricle occurs predominantly during DIASTOLE due to extravascular compression during systole.'
    ],
    commonMisconceptions: [
      'Believing atrial contraction pumps most of the ventricular blood (Atria contribute only ~15-20% at rest; ventricular filling is 80% passive).',
      'Confusing S2 split: Physiological splitting of S2 occurs during inspiration due to increased venous return delaying pulmonic valve closure (A2 before P2).'
    ],
    sampleMCQs: [
      {
        id: 'mcq-cc-1',
        question: 'During which phase of the cardiac cycle do all 4 heart valves remain closed while intraventricular pressure drops steeply?',
        options: ['Isovolumetric contraction', 'Protodiastole', 'Isovolumetric relaxation', 'Rapid filling'],
        correctIndex: 2,
        explanation: 'Isovolumetric relaxation occurs between aortic valve closure (S2) and mitral valve opening, with all 4 valves closed and ventricular pressure dropping rapidly toward 0 mmHg.'
      }
    ],
    activeRecallPrompts: [
      {
        prompt: 'What causes the "c" wave on a Jugular Venous Pulse waveform?',
        answer: 'The bulging of the tricuspid valve into the right atrium during right ventricular isovolumetric contraction (and transmitted carotid pulsation).'
      }
    ]
  },
  'top-cranial-nerves': {
    topic: 'Cranial Nerves: Facial & Trigeminal Functional Anatomy',
    marksCategory: '10-Mark',
    definition: 'The Facial Nerve (CN VII) and Trigeminal Nerve (CN V) are mixed cranial nerves emerging from the brainstem that provide intricate motor, sensory, parasympathetic, and special visceral gustatory innervation to the face, scalp, and oral/pharyngeal cavities.',
    keySections: [
      {
        heading: '1. Trigeminal Nerve (CN V) - Major Sensory Division',
        points: [
          '• Nuclei: Mesencephalic (proprioception), Main Sensory (touch/vibration in pons), Spinal nucleus of V (pain & temperature down to C2 spinal cord), Motor nucleus (pons).',
          '• V1 Ophthalmic: Pure sensory through superior orbital fissure (Frontal, Lacrimal, Nasociliary nerves). Corneal reflex afferent.',
          '• V2 Maxillary: Pure sensory through foramen rotundum to pterygopalatine fossa; gives infraorbital, superior alveolar nerves.',
          '• V3 Mandibular: Mixed through foramen ovale. Motor to 8 muscles (4 muscles of mastication: Masseter, Temporalis, Medial/Lateral Pterygoids; Tensor tympani, Tensor veli palatini, Mylohyoid, Anterior belly of digastric). Sensory to anterior 2/3 tongue (general sensation via Lingual nerve).'
        ]
      },
      {
        heading: '2. Facial Nerve (CN VII) - Pathway and 5 Terminal Branches',
        points: [
          '• Origin & Exit: Emerges from pontomedullary junction (cerebellopontine angle), enters internal acoustic meatus, travels in facial canal of petrous temporal bone, exits via stylomastoid foramen.',
          '• Branches inside temporal bone: Greater Petrosal (lacrimation), Nerve to Stapedius (hyperacusis protection), Chorda Tympani (taste anterior 2/3 tongue + submandibular/lingual salivation).',
          '• Extracranial Terminal Motor Branches in Parotid gland: 1) Temporal, 2) Zygomatic, 3) Buccal, 4) Marginal Mandibular, 5) Cervical.'
        ]
      },
      {
        heading: '3. Clinical Syndromes & UMN vs LMN Lesions',
        points: [
          "• Upper Motor Neuron (Supranuclear) Lesion: Contralateral lower face paralysis only, forehead wrinkles PRESERVED due to bilateral cortical innervation of upper facial subnucleus.",
          "• Lower Motor Neuron (Bell's Palsy / Infranuclear) Lesion: Complete ipsilateral hemifacial paralysis with loss of forehead wrinkling, inability to close eye (Bell's phenomenon), hyperacusis, loss of taste on anterior 2/3 tongue."
        ]
      }
    ],
    clinicalSignificance: [
      "Corneal Reflex: Afferent limb = CN V1 (Nasociliary n.), Efferent limb = CN VII (Temporal & Zygomatic branches to Orbicularis oculi).",
      "Trigeminal Neuralgia (Tic Douloureux): Severe lancinating facial pain along V2/V3 triggered by touching trigger zones. Drug of choice: Carbamazepine.",
      "Ramsay Hunt Syndrome: Herpes zoster reactivation in geniculate ganglion with vesicular ear rash and facial palsy."
    ],
    diagramGuide: {
      title: 'Facial Nerve Branches & UMN vs LMN Map',
      mustLabel: ['Stylomastoid foramen', 'Parotid plexus (T-Z-B-M-C)', 'Chorda tympani', 'Greater petrosal nerve', 'Forehead sparing in UMN'],
      drawingTips: 'Draw a hand spread across the face: Thumb (Temporal), Index (Zygomatic), Middle (Buccal), Ring (Mandibular), Little (Cervical).',
      asciiDiagram: `
         /-- Temporal (Forehead / Orbicularis oculi)
        /--- Zygomatic (Cheek / Upper lip)
  CN VII --- Buccal (Buccinator / Angle of mouth)
        \\--- Marginal Mandibular (Depressor anguli oris)
         \\-- Cervical (Platysma)
      `
    },
    highYieldPoints: [
      'UMN lesion spares the upper half of the face (forehead) because upper facial motor neurons receive bilateral corticobulbar projections.',
      'Chorda tympani joins the Lingual nerve in the infratemporal fossa to reach the submandibular ganglion.',
      'Stapedius muscle paralysis produces hyperacusis (intolerance to ordinary sound levels).'
    ],
    commonMisconceptions: [
      'Believing taste from anterior 2/3 of tongue is carried by CN V (General sensation is CN V3, but taste is CN VII via Chorda tympani!).'
    ],
    sampleMCQs: [
      {
        id: 'mcq-cn-1',
        question: 'A 55-year-old stroke patient cannot move the right lower face or smile on the right side, but can wrinkle both sides of the forehead symmetrically. What is the location of the lesion?',
        options: ['Right facial nerve at stylomastoid foramen', 'Left motor cortex / internal capsule (UMN)', 'Right geniculate ganglion', 'Left cerebellopontine angle'],
        correctIndex: 1,
        explanation: 'Contralateral lower facial weakness with sparing of the forehead is the hallmark of an Upper Motor Neuron (corticobulbar) lesion.'
      }
    ],
    activeRecallPrompts: [
      {
        prompt: 'What are the 8 muscles innervated by the motor branch of the Mandibular Nerve (V3)?',
        answer: '4 Mastication: Masseter, Temporalis, Medial Pterygoid, Lateral Pterygoid; + 4 Others: Tensor tympani, Tensor veli palatini, Mylohyoid, Anterior belly of digastric.'
      }
    ]
  }
};

export const MOCK_PRACTICAL_STATIONS: PracticalSpotterStation[] = [
  {
    id: 'spot-anat-heart',
    subject: 'Anatomy',
    title: 'Specimen: Human Heart — Anterior Surface & Coronary Sulcus',
    subCategory: 'Gross Anatomy Cadaveric Spotter',
    specimenType: 'Gross Specimen',
    svgGraphicType: 'HEART_ANATOMY',
    spotterPrompt: 'Identify the tagged structure (marked with red pin in the anterior interventricular groove) and give its source, termination, clinical importance, and area of supply.',
    rubric: {
      identification: 'Left Anterior Descending (LAD) Artery / Anterior Interventricular Artery',
      keyFeatures: [
        'Runs downward in the anterior interventricular sulcus towards cardiac apex',
        'Accompanied by the Great Cardiac Vein',
        'Direct branch of the Left Main Coronary Artery'
      ],
      bloodOrNerveSupply: 'Arises from Left Coronary Artery (from left posterior aortic sinus of ascending aorta)',
      clinicalSignificance: "LAD is known as the 'Widow Maker' artery because occlusion causes massive anterolateral myocardial infarction and bundle branch blocks. Most common site of coronary atherosclerosis."
    },
    sampleAnswer: '1. Identification: Left Anterior Descending (LAD) coronary artery.\n2. Origin: Left coronary artery.\n3. Supply: Anterior 2/3 of interventricular septum, apex of heart, and anterior wall of left ventricle.\n4. Accompanying vein: Great cardiac vein.\n5. Clinical significance: Most frequently thrombosed vessel in acute myocardial infarction leading to STEMI.',
    commonErrors: ['Calling it Right Coronary Artery', 'Confusing Great Cardiac Vein with Middle Cardiac Vein (which runs with Posterior Descending Artery)'],
    vivaQuestions: [
      {
        question: 'Which structure supplies the AV node in 90% of individuals?',
        expectedAnswer: 'The AV nodal artery arising from the Right Coronary Artery (Right dominant circulation).'
      },
      {
        question: 'Where does the Coronary Sinus drain into?',
        expectedAnswer: 'Into the Right Atrium between the inferior vena cava orifice and the right atrioventricular orifice.'
      }
    ]
  },
  {
    id: 'spot-path-tb-lung',
    subject: 'Pathology',
    title: 'Specimen: Caseous Tuberculosis of Lung & Ghon Focus',
    subCategory: 'Systemic Pathology Gross Specimen',
    specimenType: 'Gross Specimen',
    svgGraphicType: 'LUNG_TB_PATHOLOGY',
    spotterPrompt: 'Examine this gross lung specimen showing apical fibro-caseous cavitary lesions. Provide: 1) Gross description, 2) Definitive microscopic hallmarks, 3) Special diagnostic stain, 4) Pathogenesis of caseation.',
    rubric: {
      identification: 'Secondary (Reactivation / Cavitary) Pulmonary Tuberculosis',
      keyFeatures: [
        'Yellowish-white cheesy caseous necrosis at the lung apex',
        'Thick-walled cavitation with erosion into bronchiole and pulmonary vessels',
        'Surrounding fibrous consolidation and pleural thickening'
      ],
      mechanismOrDiagnosis: 'Type IV Cell-Mediated Delayed Hypersensitivity mediated by IFN-gamma activating macrophages into epithelioid cells',
      clinicalSignificance: 'Causes massive hemoptysis (Rasmussen aneurysm), bronchogenic dissemination, and respiratory failure. Requires multi-drug anti-tubercular therapy.'
    },
    sampleAnswer: '1. Identification: Secondary Pulmonary Tuberculosis with Apical Cavitation.\n2. Gross Features: Circumscribed yellowish cheesy-white granular caseous necrotic area with cavity formation in upper lobe.\n3. Microscopic Hallmarks: Caseous necrosis surrounded by epithelioid histiocytes, Langhans multinucleated giant cells (horseshoe nuclei), and lymphocyte collar.\n4. Stain: Ziehl-Neelsen acid-fast stain (AFB appear bright red beaded rods against blue background).',
    commonErrors: ['Calling it lung bronchogenic carcinoma without mentioning caseous necrosis', 'Forgetting Langhans giant cell morphology'],
    vivaQuestions: [
      {
        question: 'What constitutes the Primary Ghon Complex in pediatric tuberculosis?',
        expectedAnswer: '1) Subpleural Ghon focus (usually mid-zone), 2) Lymphangitis, 3) Enlarged hilar lymph node.'
      },
      {
        question: 'What is a Rasmussen Aneurysm?',
        expectedAnswer: 'A pulmonary artery aneurysm wall weakened by adjacent tuberculous cavity caseation, prone to rupture causing fatal hemoptysis.'
      }
    ]
  },
  {
    id: 'spot-pharm-beta-blocker',
    subject: 'Pharmacology',
    title: 'Drug Formulation & Prescription: Tablet Metoprolol Tartrate 50mg',
    subCategory: 'Clinical Pharmacology & Spotter',
    specimenType: 'Drug Formulation',
    svgGraphicType: 'PHARMA_DRUG_BLISTER',
    spotterPrompt: 'Identify this cardiovascular formulation. Detail: 1) Pharmacological class & selectivity, 2) Mechanism of action, 3) 3 approved clinical indications, 4) 3 absolute contraindications.',
    rubric: {
      identification: 'Metoprolol (Cardioselective Beta-1 Adrenergic Receptor Antagonist)',
      keyFeatures: [
        'Selective beta-1 blocker lacking intrinsic sympathomimetic activity (ISA)',
        'Extensive first-pass hepatic metabolism by CYP2D6',
        'Decreases heart rate, myocardial contractility, and cardiac output'
      ],
      mechanismOrDiagnosis: 'Competitive antagonist at cardiac beta-1 receptors → reduces intracellular cAMP, decreases SA nodal firing and AV nodal conduction velocity, suppresses renin release from juxtaglomerular cells.',
      clinicalSignificance: 'Proven mortality reduction in Chronic Heart Failure (HFrEF with Metoprolol Succinate), Post-Myocardial Infarction, Essential Hypertension, and Rate control in Atrial Fibrillation.'
    },
    sampleAnswer: '1. Class: Selective Beta-1 adrenergic blocker (Second-generation).\n2. Mechanism: Blockade of cardiac beta-1 receptors → negative inotropic and chronotropic actions, inhibition of renal renin secretion.\n3. Indications: Post-MI secondary prevention, chronic systolic heart failure (succinate salt), essential hypertension, stable angina pectoris.\n4. Contraindications: Severe bradycardia (<50 bpm), 2nd or 3rd degree AV block, cardiogenic shock, and severe decompensated heart failure.',
    commonErrors: ['Prescribing in cardiogenic shock or 3rd degree heart block', 'Confusing Metoprolol Tartrate (short acting) with Metoprolol Succinate (extended release for CHF)'],
    vivaQuestions: [
      {
        question: 'Why are beta-blockers used with extreme caution in insulin-dependent diabetics?',
        expectedAnswer: 'They mask the autonomic warning signs of hypoglycemia (tremor, tachycardia, palpitations) except for sweating which is cholinergic.'
      }
    ]
  },
  {
    id: 'spot-micro-gram-stain',
    subject: 'Microbiology',
    title: 'Microscopy Slide: Sputum Gram Stain & Culture Media (Blood Agar)',
    subCategory: 'Diagnostic Bacteriology Slide',
    specimenType: 'Culture Media / Gram Stain',
    svgGraphicType: 'GRAM_STAIN_SLIDE',
    spotterPrompt: 'Observe this oil-immersion microscopy field showing Gram-positive lanceolate diplococci with alpha-hemolytic draughtsman colonies on blood agar. Identify organism, key confirmatory tests, and virulence factor.',
    rubric: {
      identification: 'Streptococcus pneumoniae (Pneumococcus)',
      keyFeatures: [
        'Gram-positive flame-shaped / lanceolate diplococci in pairs',
        'Alpha-hemolytic (greenish) colonies on sheep blood agar exhibiting central depression (draughtsman or carrom coin appearance due to autolysis)',
        'Bile solubility positive and Optochin sensitive (zone >= 14mm)'
      ],
      mechanismOrDiagnosis: 'Major polysaccharide capsule inhibits phagocytosis (Quellung capsular swelling reaction positive).',
      clinicalSignificance: 'Leading causative agent of Community-Acquired Pneumonia (rusty sputum), bacterial meningitis in adults, otitis media, and sinusitis.'
    },
    sampleAnswer: '1. Identification: Streptococcus pneumoniae (Pneumococcus).\n2. Morphology: Gram-positive lanceolate diplococci surrounded by a clear halo (capsule).\n3. Confirmatory tests: Optochin disc sensitivity test (sensitive), Bile solubility test (positive lysis in 10% sodium deoxycholate), Inulin fermentation positive.\n4. Main virulence factor: Polysaccharide capsule (basis of 23-valent and conjugate vaccines).',
    commonErrors: ['Confusing with Viridans streptococci (which are Optochin RESISTANT and bile INSOLUBLE)', 'Describing Staphylococcus aureus cluster morphology instead of pairs'],
    vivaQuestions: [
      {
        question: 'How do you differentiate Streptococcus pneumoniae from Streptococcus viridans in the lab?',
        expectedAnswer: 'S. pneumoniae is Optochin sensitive and Bile soluble, whereas S. viridans is Optochin resistant and Bile insoluble.'
      }
    ]
  }
];

export const MOCK_ACTIVE_RECALL_CARDS: ActiveRecallCard[] = [
  {
    id: 'card-1',
    topicId: 'top-brachial-plexus',
    topicName: 'Brachial Plexus',
    subjectName: 'Human Anatomy',
    question: 'What are the terminal branches of the Posterior Cord of the Brachial Plexus?',
    highYieldFact: 'Mnemonic ULTRA: Upper subscapular, Lower subscapular, Thoracodorsal, Radial, Axillary nerve.',
    mustRememberPoints: [
      'Axillary nerve (C5, C6) enters quadrangular space to supply Deltoid & Teres Minor',
      'Radial nerve (C5-T1) largest branch, runs in spiral groove'
    ],
    clinicalContext: 'Fracture of the surgical neck of the humerus injures the axillary nerve; midshaft humeral fracture injures the radial nerve.'
  },
  {
    id: 'card-2',
    topicId: 'top-cranial-nerves',
    topicName: 'Cranial Nerves',
    subjectName: 'Human Anatomy',
    question: 'Why does an Upper Motor Neuron (UMN) facial palsy spare the upper half of the face?',
    highYieldFact: 'The frontalis and orbicularis oculi muscles receive bilateral supranuclear corticobulbar input.',
    mustRememberPoints: [
      'Lower facial subnucleus receives ONLY contralateral corticobulbar fibers',
      'Upper facial subnucleus receives BILATERAL corticobulbar fibers'
    ],
    clinicalContext: 'A stroke patient can wrinkle the forehead on both sides, while a Bell’s palsy patient cannot wrinkle the affected forehead.'
  },
  {
    id: 'card-3',
    topicId: 'top-cardiac-cycle',
    topicName: 'Cardiac Cycle',
    subjectName: 'Physiology',
    question: 'What happens during Isovolumetric Contraction, and which heart sound is generated?',
    highYieldFact: 'All 4 valves are closed; ventricular pressure rises from ~8 mmHg to 80 mmHg without volume change. S1 is generated.',
    mustRememberPoints: [
      'Initiated by closure of mitral and tricuspid valves (S1/LUB)',
      'Aortic and pulmonary valves remain closed until pressure exceeds arterial diastolic pressure'
    ],
    clinicalContext: 'The duration of isovolumetric contraction lengthens in left ventricular failure.'
  },
  {
    id: 'card-4',
    topicId: 'top-gluconeogenesis-tca',
    topicName: 'Biochemistry Pathways',
    subjectName: 'Biochemistry',
    question: 'Name the 4 irreversible bypass enzymes of Gluconeogenesis that replace Glycolysis steps.',
    highYieldFact: '1) Pyruvate Carboxylase, 2) PEP Carboxykinase (PEPCK), 3) Fructose 1,6-Bisphosphatase, 4) Glucose 6-Phosphatase.',
    mustRememberPoints: [
      'Pyruvate Carboxylase requires Biotin and ATP in mitochondria',
      'Glucose 6-Phosphatase is absent in skeletal muscle (muscle cannot release free glucose)'
    ],
    clinicalContext: 'Deficiency of Glucose 6-Phosphatase causes von Gierke disease (Type I Glycogen Storage Disease) with severe fasting hypoglycemia.'
  },
  {
    id: 'card-5',
    topicId: 'top-mycobacterium-tuberculosis',
    topicName: 'Mycobacterium tuberculosis',
    subjectName: 'Microbiology',
    question: 'What is the composition and decolorizer concentration used in Ziehl-Neelsen staining?',
    highYieldFact: 'Primary stain: Strong Carbol Fuchsin (with heating). Decolorizer: 20% Sulfuric Acid (H2SO4) and 95% Alcohol. Counterstain: Methylene Blue.',
    mustRememberPoints: [
      '20% H2SO4 used for M. tuberculosis (Acid Fast)',
      '5% H2SO4 for M. leprae; 1% H2SO4 for Nocardia',
      'High lipid content of mycolic acid resists acid decolorization'
    ],
    clinicalContext: 'CBNAAT / GeneXpert has become the rapid diagnostic standard for simultaneous MTB detection and Rifampicin resistance.'
  }
];

export const MOCK_PYQ_DATABASE: PYQAnalysisItem[] = [
  {
    topic: 'Brachial Plexus — Anatomy, Branches & Clinical Palsies',
    subject: 'Human Anatomy',
    frequency: 8,
    years: [2025, 2024, 2022, 2020, 2019, 2017, 2015, 2013],
    questionTypes: ['Essay 10M', 'Short Essay 5M', 'Viva', 'Spotter'],
    samplePastQuestions: [
      'Describe the formation, parts, cords, and branches of the brachial plexus with a neat labeled diagram. Discuss the clinical features of Erb’s and Klumpke’s palsy. (10 Marks - 2025)',
      'Short note on Erb’s Point and Erb-Duchenne paralysis. (5 Marks - 2022)',
      'Branches of the posterior cord and their clinical testing. (Viva - 2024)'
    ],
    importanceScore: 98,
    trend: 'frequent_repeater'
  },
  {
    topic: 'Cardiac Cycle & Left Ventricular Pressure-Volume Relationship',
    subject: 'Physiology',
    frequency: 7,
    years: [2025, 2023, 2022, 2020, 2018, 2016, 2014],
    questionTypes: ['Essay 10M', 'Short Essay 5M', 'Viva'],
    samplePastQuestions: [
      'Describe the mechanical events of the cardiac cycle with the help of Wiggers diagram. Explain heart sounds and their clinical significance. (10 Marks - 2025)',
      'Define Isovolumetric contraction and Isovolumetric relaxation. (5 Marks - 2023)'
    ],
    importanceScore: 94,
    trend: 'frequent_repeater'
  },
  {
    topic: 'Cranial Nerves (Facial & Trigeminal Nerves)',
    subject: 'Human Anatomy',
    frequency: 6,
    years: [2024, 2023, 2021, 2019, 2018, 2016],
    questionTypes: ['Essay 10M', 'Short Essay 5M', 'Spotter'],
    samplePastQuestions: [
      'Describe the course, branches, and distribution of the Facial Nerve. Differentiate between UMN and LMN facial paralysis. (10 Marks - 2024)',
      'Mandibular nerve branches and muscles supplied. (5 Marks - 2021)'
    ],
    importanceScore: 88,
    trend: 'stable'
  },
  {
    topic: 'TCA Cycle, Regulation & Energetics',
    subject: 'Biochemistry',
    frequency: 7,
    years: [2025, 2023, 2021, 2019, 2017, 2016, 2014],
    questionTypes: ['Essay 10M', 'Short Essay 5M'],
    samplePastQuestions: [
      'Give the reactions of the Citric Acid Cycle with enzymes and coenzymes. Calculate the ATP yield per mole of glucose. Discuss its amphibolic nature. (10 Marks - 2025)'
    ],
    importanceScore: 92,
    trend: 'frequent_repeater'
  },
  {
    topic: 'Myocardial Infarction — Pathology, Biomarkers & Healing',
    subject: 'Pathology',
    frequency: 6,
    years: [2024, 2023, 2021, 2019, 2017, 2015],
    questionTypes: ['Essay 10M', 'Short Essay 5M', 'Spotter'],
    samplePastQuestions: [
      'Discuss the etiology, gross and microscopic evolution of myocardial infarction over time. List complications. (10 Marks - 2024)'
    ],
    importanceScore: 90,
    trend: 'stable'
  },
  {
    topic: 'Beta-Adrenergic Blockers Classification & Pharmacology',
    subject: 'Pharmacology',
    frequency: 6,
    years: [2025, 2023, 2021, 2020, 2018, 2015],
    questionTypes: ['Essay 10M', 'Short Essay 5M', 'Viva'],
    samplePastQuestions: [
      'Classify beta-adrenergic blockers. Detail the mechanism, therapeutic uses, and adverse effects of Metoprolol and Propranolol. (10 Marks - 2025)'
    ],
    importanceScore: 89,
    trend: 'frequent_repeater'
  },
  {
    topic: 'Mycobacterium tuberculosis & Lab Diagnosis',
    subject: 'Microbiology',
    frequency: 8,
    years: [2025, 2024, 2022, 2021, 2019, 2017, 2015, 2013],
    questionTypes: ['Essay 10M', 'Short Essay 5M', 'Spotter', 'Viva'],
    samplePastQuestions: [
      'Describe the morphology, pathogenesis, and laboratory diagnosis of Pulmonary Tuberculosis. Discuss molecular diagnostic methods (CBNAAT). (10 Marks - 2025)'
    ],
    importanceScore: 97,
    trend: 'frequent_repeater'
  }
];
