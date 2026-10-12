// ============================================================
// SAMPACE EDUCATIONAL LTD — MASTER CONSTANTS
// RC: 9677766
// All divisions, schools, departments, and site config.
// Edit this file to add/remove divisions without touching UI.
// ============================================================

export const SITE = {
  name: 'SAMPACE EDUCATIONAL LTD',
  shortName: 'SAMPACE',
  tagline: 'Learn · Empower · Excel',
  motto: 'Empowering Learners. Transforming Education. Building the Future.',
  rc: '9677766',
  domain: 'sampaceedu.com.ng',
  email: 'info@sampaceedu.com.ng',
  adminEmail: 'admin@sampaceedu.com.ng',
  phone: '+234 708 216 6496',
  whatsapp: '+2347082166496',
  address: {
    street: '6, Ahmed Street, New Legun Road',
    city: 'Koye, Olamba',
    state: 'Ogun State',
    country: 'Nigeria'
  },
  founded: 2026,
  vision: 'To be a leading force in transforming education, empowering individuals and shaping a better future.',
  mission: 'To deliver innovative, quality and accessible education solutions that build capacity, inspire excellence and create impact.',
  values: ['Integrity', 'Excellence', 'Innovation', 'Impact', 'Collaboration']
}

// ------------------------------------------------------------
// ENTITY 1: SAMPACE EDUCATIONAL LTD (Limited by Shares)
// Commercial operations — training, EdTech, tutorials, consultancy
// ------------------------------------------------------------
export const DIVISIONS_LTD = [
  {
    id: 'basic-secondary',
    code: 'A',
    name: 'School of Basic & Secondary Education',
    short: 'Basic & Secondary',
    icon: '🏫',
    entity: 'ltd',
    color: '#1a3a6e',
    tagline: 'Physical and virtual primary & secondary schooling',
    description:
      'Full nursery, primary, and secondary education — in physical campuses and online. WAEC, NECO, and JAMB integrated.',
    departments: [
      {
        id: 'nursery-primary',
        name: 'SAMPACE Nursery & Primary School',
        courses: [
          'Nursery 1–2', 'Primary 1–6', 'Early Childhood Education',
          'After-School Care', 'Numeracy & Literacy Boosters'
        ]
      },
      {
        id: 'secondary',
        name: 'SAMPACE Secondary School',
        courses: [
          'JSS 1–3', 'SSS 1–3 (Science)', 'SSS 1–3 (Arts)',
          'SSS 1–3 (Commercial)', 'SSS 1–3 (Technical)', 'WAEC/NECO/JAMB Integration'
        ]
      },
      {
        id: 'boarding',
        name: 'SAMPACE Boarding Academy',
        courses: [
          'Residential Schooling', 'Pastoral Care', '24/7 Academic Support', 'Sports Academy'
        ]
      },
      {
        id: 'special-needs',
        name: 'SAMPACE Special Needs & Inclusive School',
        courses: [
          'Gifted & Talented Programme', 'Neurodiverse Learners (ADHD, Autism)',
          'Dyslexia Support', 'Physically Challenged Support', 'Inclusive Education Training'
        ]
      }
    ]
  },

  {
    id: 'extramural-exam-hub',
    code: 'B',
    name: 'SAMPACE Extramural & Exam Hub',
    short: 'Exam Hub',
    icon: '📝',
    entity: 'ltd',
    color: '#0d2a5c',
    tagline: 'High-volume exam prep and tutorials',
    description:
      'National and international exam preparation, academic support, admission guidance — physical, online, and hybrid.',
    departments: [
      {
        id: 'national-exams',
        name: 'Department of National Exams',
        courses: [
          'JAMB/UTME Prep', 'WAEC Prep', 'NECO Prep', 'NABTEB Prep',
          'BECE Prep', 'GCE Prep', 'Mock CBT', 'Past Question Bank', 'Diagnostic JAMB App', 'Diagnostic WAEC App'
        ]
      },
      {
        id: 'international-exams',
        name: 'Department of International Exams',
        courses: [
          'IJMB', 'JUPEB', 'IGCSE', 'Cambridge Checkpoint',
          'IELTS', 'TOEFL', 'SAT', 'GMAT', 'GRE'
        ]
      },
      {
        id: 'academic-support',
        name: 'Department of Academic Support',
        courses: [
          'Holiday Coaching', 'Weekend Classes', 'Evening Classes',
          'Home Tutoring', 'One-on-One Coaching', 'Remedial Classes', 'Adult Education'
        ]
      },
      {
        id: 'admission-guidance',
        name: 'Department of Admission Guidance',
        courses: [
          'University Admission Support', 'Cut-off Analysis',
          'Course Eligibility', 'Scholarship Guidance', 'Study Abroad Advisory'
        ]
      },
      {
        id: 'pre-university',
        name: 'Department of Pre-University & Foundation Studies',
        courses: [
          'Foundation Programmes', 'Pre-Degree Programmes', 'IJMB (Pre-University)',
          'JUPEB (Pre-University)', 'A-Levels', 'Cambridge A-Levels',
          'University Pathway Programmes', 'Study Abroad Preparation',
          'International Foundation Year', 'Direct Entry Preparation', 'Mature Student Access Courses'
        ]
      }
    ]
  },

  {
    id: 'technology-innovation',
    code: 'C',
    name: 'School of Technology & Innovation',
    short: 'Technology',
    icon: '💻',
    entity: 'ltd',
    color: '#1e40af',
    tagline: 'Digital skills, software, and current tech',
    description:
      'Industry-grade training in software, data, AI, cybersecurity, and creative technology. Built for the digital economy.',
    departments: [
      {
        id: 'software-engineering',
        name: 'Department of Software Engineering',
        courses: [
          'Web Development', 'Mobile App Development', 'Full-Stack Development',
          'Backend Development', 'Frontend Development', 'DevOps'
        ]
      },
      {
        id: 'data-ai',
        name: 'Department of Data & AI',
        courses: [
          'Data Analysis', 'Data Science', 'Power BI', 'Machine Learning',
          'Generative AI', 'Prompt Engineering', 'Data Engineering'
        ]
      },
      {
        id: 'cybersecurity',
        name: 'Department of Cybersecurity & Networking',
        courses: [
          'Ethical Hacking', 'Network Security', 'Cloud Computing (AWS, Azure)',
          'IT Support', 'Cybersecurity Compliance'
        ]
      },
      {
        id: 'design-creative',
        name: 'Department of Design & Creative Tech',
        courses: [
          'UI/UX Design', 'Graphic Design', 'Video Editing',
          'Motion Graphics', '3D Animation', 'Game Design'
        ]
      },
      {
        id: 'robotics',
        name: 'Department of Robotics & Emerging Tech',
        courses: [
          'Robotics', 'IoT', '3D Printing', 'Drone Technology',
          'Blockchain', 'Fintech', 'Embedded Systems'
        ]
      },
      {
        id: 'edtech-solutions',
        name: 'Department of EdTech Solutions',
        courses: [
          'LMS Development', 'School Management Software', 'CBT Platforms',
          'AI Tutoring Systems', 'Learning Analytics'
        ]
      }
    ]
  },

  {
    id: 'frontier-sciences',
    code: 'D',
    name: 'School of Frontier Sciences & Future Civilizations',
    short: 'Frontier Sciences',
    icon: '🚀',
    entity: 'ltd',
    color: '#7c3aed',
    tagline: '100–200 year forward-looking disciplines',
    description:
      'The future of humanity — space, biotech, climate, neurotech, quantum, longevity, and next-generation governance.',
    departments: [
      {
        id: 'space-cosmic',
        name: 'Department of Space & Cosmic Studies',
        courses: [
          'Space Law & Extraterrestrial Property Rights', 'Space Economy & Off-World Commerce',
          'Satellite Engineering & Orbital Communications', 'Space Tourism & Civilian Flight Infrastructure',
          'Astrobiology & Alien Life Detection', 'Space Medicine & Zero-Gravity Physiology',
          'Space Policy & Interplanetary Diplomacy', 'Planetary Engineering & Terraforming',
          'Deep-Space Mining & Resource Rights', 'Extraterrestrial Architecture',
          'Space Elevators & Orbital Tethers', 'Asteroid Deflection & Planetary Defense'
        ]
      },
      {
        id: 'biotech',
        name: 'Department of Biotechnology & Synthetic Life',
        courses: [
          'Genetic Engineering & Epigenetic Editing', 'Synthetic Biology & Living Materials',
          'Precision & Personalized Medicine', 'Bioinformatics & Genomic Computing',
          'CRISPR Technology & Gene Therapy', 'Biomanufacturing & Industrial Biology',
          'Cellular Agriculture & Cultured Foods', 'Synthetic Ecology & Soil Engineering',
          'Epigenetic Editing & Reversal', 'Xenobiology', 'Biomechatronics & Artificial Organs'
        ]
      },
      {
        id: 'climate',
        name: 'Department of Climate Tech, Energy & Sustainability',
        courses: [
          'Renewable Energy Systems & Storage', 'Carbon Capture & Atmospheric Scrubbing',
          'Climate Finance & Green Capital', 'ESG Architecture',
          'Circular Economy Systems', 'Regenerative Agriculture & Agroecology',
          'Nuclear Fusion & Plasma Physics', 'Solar Geoengineering',
          'Atmospheric Carbon Harvesting', 'Hydrogen Economy & Fuel Cells',
          'Ocean Cleanup & Marine Restoration'
        ]
      },
      {
        id: 'neurotech',
        name: 'Department of Neurotechnology, AI Ethics & Cognitive Liberty',
        courses: [
          'Brain-Computer Interfaces (BCIs)', 'Neuro-Informatics & Brain Mapping',
          'AI Governance & Superintelligence Safety', 'Algorithmic Fairness & Bias Mitigation',
          'Machine Ethics & Moral Code Programming', 'Digital Consciousness & Machine Sentience',
          'Neural Rights & Cognitive Liberty Jurisprudence', 'Synthetic Consciousness & AGI Alignment',
          'Accelerated Learning & Cognitive Amplification', 'Neuro-Ethics of AI Companions',
          'Memory Editing & Cognitive Enhancement'
        ]
      },
      {
        id: 'quantum',
        name: 'Department of Quantum Computing & Information Science',
        courses: [
          'Quantum Algorithms & Software', 'Quantum Cryptography & Unhackable Security',
          'Quantum Hardware Engineering', 'Quantum Information Theory',
          'Quantum Material & Chemical Simulation', 'Post-Quantum Cryptography Architecture',
          'Quantum Biology & Quantum Medicine', 'Quantum Internet & Entanglement Networks'
        ]
      },
      {
        id: 'longevity',
        name: 'Department of Longevity, Healthspan & Human Performance',
        courses: [
          'Gerontology & Cellular Senescence Reversal', 'Regenerative Medicine & Tissue Engineering',
          'Advanced Nutritional Science & Nutraceuticals', 'Mental Health Tech & Biofeedback',
          'Biohacking & Preventive Health', 'Bio-Hybrid Organ Printing & 3D Bioprinting',
          'Nanorobotic Preventive Medicine', 'Biohacked Athletic Optimization',
          'Cryonics & Suspended Animation', 'Exoskeletons & Human Augmentation'
        ]
      },
      {
        id: 'metaverse',
        name: 'Department of Metaverse, Digital Twins & Immersive Media',
        courses: [
          'Virtual World Building & Spatial Design', 'Immersive Experience Design (VR/AR)',
          'Digital Twin Architecture', 'Extended Reality (XR) Psychology',
          'Multi-Sensory & Synesthetic Media Design', 'Holographic Telepresence Architecture',
          'Neural Interfaces for Immersive Media', 'Virtual Economies & Digital Asset Management'
        ]
      },
      {
        id: 'nextgen-economics',
        name: 'Department of Next-Gen Economics, Governance & Legal Systems',
        courses: [
          'Cryptocurrency & DeFi', 'Decentralized Autonomous Organizations (DAOs)',
          'Universal Basic Income (UBI) Economics', 'Digital Diplomacy & Cyber-Relations',
          'Post-Scarcity Resource Economics', 'Algorithmic Monetary & Token Systems',
          'Smart Contracts & Blockchain Law', 'Cyber Sovereignty & Digital Borders'
        ]
      },
      {
        id: 'mobility',
        name: 'Department of Advanced Mobility, Transport & Infrastructure',
        courses: [
          'Sub-Orbital & Hypersonic Flight Engineering', 'Autonomous Sky-Traffic & Drone Logistics',
          'Planetary Transit Systems', 'Smart Self-Healing Infrastructure',
          'Hyperloop & Vacuum Tube Transit', 'Autonomous Maritime & Submersible Transport',
          'Spaceports & Interstellar Launch Infrastructure'
        ]
      },
      {
        id: 'future-education',
        name: 'Department of Future Education & Human Capacity',
        courses: [
          'Neuro-Pedagogy & Brain-Based Learning', 'AI Companion Tutor Engineering',
          'Immersive Holographic Academies', 'Post-Human Talent Analytics',
          'Neuro-Education & Cognitive Training', 'Lifelong Learning Passports & Skill Wallets',
          'AI-Human Co-Teaching Methodologies', 'Future of Work & Skills Forecasting'
        ]
      }
    ]
  },

  {
    id: 'professional-vocational',
    code: 'E',
    name: 'College of Professional & Vocational Studies',
    short: 'Professional & Vocational',
    icon: '🎓',
    entity: 'ltd',
    color: '#0891b2',
    tagline: 'Career, vocational, and professional development',
    description:
      'Practical, job-ready training — from leadership and business to vocational trades, health, hospitality, aviation, and real estate.',
    departments: [
      {
        id: 'professional-learning',
        name: 'Department of Professional Learning',
        courses: [
          'Leadership Development', 'HR Management', 'Business Management',
          'Project Management (PMP)', 'Customer Service', 'Supply Chain Management'
        ]
      },
      {
        id: 'business-finance',
        name: 'Department of Business & Finance',
        courses: [
          'Entrepreneurship', 'Financial Literacy', 'Bookkeeping',
          'Accounting', 'Business Plan Writing', 'E-Commerce', 'Digital Marketing'
        ]
      },
      {
        id: 'vocational-trades',
        name: 'Department of Vocational Trades',
        courses: [
          'Tailoring/Fashion', 'Catering/Confectionery', 'Cosmetology',
          'Carpentry', 'Plumbing', 'Electrical Installation', 'Solar Installation',
          'Welding', 'Automotive Repair', 'Agritech/Hydroponics'
        ]
      },
      {
        id: 'communication-soft-skills',
        name: 'Department of Communication & Soft Skills',
        courses: [
          'Public Speaking', 'Debate Coaching', 'Presentation Skills',
          'CV Writing', 'Interview Prep', 'Emotional Intelligence', 'Conflict Resolution'
        ]
      },
      {
        id: 'teacher-network',
        name: 'Department of Teacher Social Network',
        courses: [
          'Teacher Chat Platform', 'Peer Collaboration', 'Resource Sharing',
          'Mentorship Matching', 'Teacher Job Board', 'CPD'
        ]
      },
      {
        id: 'health-wellness',
        name: 'Department of Health & Wellness',
        courses: [
          'Telehealth', 'Medical Coding', 'Health Informatics',
          'First Aid', 'Caregiving', 'Nutrition & Dietetics'
        ]
      },
      {
        id: 'hospitality-tourism',
        name: 'Department of Hospitality, Tourism & Culinary Arts',
        courses: [
          'Hotel Management', 'Event Planning', 'Tourism & Travel Management',
          'Professional Culinary Arts', 'Pastry & Baking'
        ]
      },
      {
        id: 'aviation-maritime',
        name: 'Department of Aviation & Maritime Studies',
        courses: [
          'Pilot Training (Ground School)', 'Cabin Crew Training', 'Airport Management',
          'Shipping & Port Management', 'Maritime Law', 'Logistics & Freight Forwarding'
        ]
      },
      {
        id: 'real-estate',
        name: 'Department of Real Estate & Urban Development',
        courses: [
          'Property Management', 'Real Estate Marketing', 'Facility Management',
          'Urban Planning', 'Land Surveying'
        ]
      }
    ]
  },

  {
    id: 'edtech-intelligence',
    code: 'F',
    name: 'Educational Intelligence & Technology Solutions',
    short: 'EdTech Intelligence',
    icon: '🧠',
    entity: 'ltd',
    color: '#059669',
    tagline: 'Proprietary EdTech engines',
    description:
      'The intelligence layer — JAMB/WAEC diagnostic engines, university study tools, learning analytics, and longitudinal data.',
    departments: [
      {
        id: 'jamb-intelligence',
        name: 'Department of JAMB Intelligence',
        courses: [
          'Adaptive Diagnostic Engine', 'Learner Profiling', 'Cause Investigation',
          'Personalised Learning', 'Readiness Analysis', 'Mock CBT'
        ]
      },
      {
        id: 'waec-intelligence',
        name: 'Department of WAEC Intelligence',
        courses: [
          'Stream Diagnostics', 'Practical/Oral Exams', 'Essay Grading', 'Grade Prediction'
        ]
      },
      {
        id: 'university-study-tools',
        name: 'Department of University Study Tools',
        courses: [
          'AI Summariser', 'Flashcard Generator', 'Citation Manager',
          'Thesis/Dissertation Guidance', 'GPA Calculator'
        ]
      },
      {
        id: 'longitudinal-data',
        name: 'Department of Longitudinal Data & Analytics',
        courses: [
          'Data Warehousing', 'xAPI', 'Predictive Modelling', 'Learning Analytics Dashboards'
        ]
      },
      {
        id: 'parent-teacher-intel',
        name: 'Department of Parent & Teacher Intelligence',
        courses: [
          'Parent Dashboard', 'Teacher Analytics', 'Early Warning Systems', 'At-Risk Student Alerts'
        ]
      }
    ]
  },

  {
    id: 'professional-services',
    code: 'L',
    name: 'SAMPACE Professional & Business Services',
    short: 'Professional Services',
    icon: '🛠️',
    entity: 'ltd',
    color: '#b45309',
    tagline: 'Printing, design, research, CV, and business support',
    description:
      'Direct services to students, professionals, schools, and businesses — printing, graphic design, research writing, CV services, and business support.',
    departments: [
      {
        id: 'print-document',
        name: 'Department of Print & Document Services',
        courses: [
          'Printing', 'Photocopying', 'Binding', 'Lamination',
          'ID Card Printing', 'Exam Cards', 'Certificate Printing'
        ]
      },
      {
        id: 'graphic-design',
        name: 'Department of Graphic Design & Branding',
        courses: [
          'Logo Design', 'Flyer Design', 'Business Cards', 'School Branding',
          'Book Cover Design', 'Social Media Graphics'
        ]
      },
      {
        id: 'research-writing',
        name: 'Department of Research & Academic Writing',
        courses: [
          'Thesis Writing Support', 'Dissertation Editing', 'Research Assistance',
          'Statistical Analysis', 'Literature Review', 'Plagiarism Checking',
          'Referencing (APA, MLA, Harvard)'
        ]
      },
      {
        id: 'career-cv',
        name: 'Department of Career & CV Services',
        courses: [
          'CV Writing', 'Cover Letter Writing', 'LinkedIn Optimization',
          'Portfolio Design', 'Interview Coaching', 'Job Application Support', 'Career Counselling'
        ]
      },
      {
        id: 'business-support',
        name: 'Department of Business Support Services',
        courses: [
          'Business Plan Writing', 'Grant Writing', 'Proposal Writing',
          'Company Profile Design', 'Pitch Deck Design', 'CAC/TIN Registration Support'
        ]
      }
    ]
  },

  {
    id: 'publishing-media',
    code: 'G',
    name: 'SAMPACE Publishing & Creative Media',
    short: 'Publishing & Media',
    icon: '📚',
    entity: 'ltd',
    color: '#be123c',
    tagline: 'Content creation, publishing, and media',
    description:
      'Publishing house, digital media studio, IP licensing, and journalism — the voice of SAMPACE.',
    departments: [
      {
        id: 'educational-publishing',
        name: 'Department of Educational Publishing',
        courses: [
          'Textbooks', 'E-books', 'Workbooks', 'Lesson Notes',
          'Past Question Books', 'Journals'
        ]
      },
      {
        id: 'digital-media',
        name: 'Department of Digital Media',
        courses: [
          'Educational YouTube Channel', 'Podcasts', 'Animation', 'Audio-Visual Materials'
        ]
      },
      {
        id: 'intellectual-property',
        name: 'Department of Intellectual Property (IP)',
        courses: [
          'Copyright Management', 'Trademark Licensing', 'Content Localisation', 'IP Commercialisation'
        ]
      },
      {
        id: 'journalism-broadcasting',
        name: 'Department of Journalism & Broadcasting',
        courses: [
          'Digital Journalism', 'Broadcast Presentation', 'Investigative Reporting',
          'Public Relations', 'Media Law'
        ]
      }
    ]
  },

  {
    id: 'consulting-institutional',
    code: 'H',
    name: 'SAMPACE Consulting & Institutional Support',
    short: 'Consulting',
    icon: '🏛️',
    entity: 'ltd',
    color: '#4338ca',
    tagline: 'B2B, B2G, and institutional strengthening',
    description:
      'Consulting for schools, governments, and institutions — school improvement, teacher training, research, and partnerships.',
    departments: [
      {
        id: 'school-improvement',
        name: 'Department of School Improvement',
        courses: [
          'School Setup Consulting', 'Academic Audits', 'Quality Assurance',
          'Accreditation Support', 'School Branding'
        ]
      },
      {
        id: 'teacher-capacity',
        name: 'Department of Teacher Capacity Building',
        courses: [
          'Teacher Training', 'ICT Training', 'AI in Education', 'Digital Pedagogy'
        ]
      },
      {
        id: 'educational-research',
        name: 'Department of Educational Research & Policy',
        courses: [
          'Baseline/Midline/Endline Studies', 'Impact Evaluations', 'M&E', 'Policy Briefs'
        ]
      },
      {
        id: 'partnerships',
        name: 'Department of Partnerships & Alliances',
        courses: [
          'School Partnerships', 'Corporate Partnerships', 'Government Partnerships',
          'International Affiliations'
        ]
      }
    ]
  }
]

// ------------------------------------------------------------
// ENTITY 2: SAMPACE EDUCATION FOUNDATION (Ltd/Gte — Non-Profit)
// Degree-awarding, research, and public-good initiatives
// ------------------------------------------------------------
export const DIVISIONS_FOUNDATION = [
  {
    id: 'open-university',
    code: 'I',
    name: 'SAMPACE Open University',
    short: 'Open University',
    icon: '🎓',
    entity: 'foundation',
    color: '#1e3a8a',
    tagline: 'Future — degree-awarding institution',
    description:
      'Planned open university. Requires NUC approval, 100 hectares, and N200m annual funding guarantee.',
    departments: [
      { id: 'science-tech', name: 'Faculty of Science & Technology', courses: ['Computer Science', 'Data Science', 'Cybersecurity', 'AI', 'Software Engineering'] },
      { id: 'arts-social', name: 'Faculty of Arts, Social Sciences & Communication', courses: ['Mass Communication', 'English', 'History', 'Economics', 'Political Science', 'Psychology'] },
      { id: 'education', name: 'Faculty of Education', courses: ['Education', 'Educational Management', 'Guidance & Counselling', 'Special Education'] },
      { id: 'management', name: 'Faculty of Management Sciences', courses: ['Business Administration', 'Accounting', 'Entrepreneurship', 'Project Management'] },
      { id: 'health', name: 'Faculty of Health Sciences', courses: ['Public Health', 'Nursing', 'Community Health'] },
      { id: 'postgrad', name: 'School of Postgraduate Studies', courses: ['PGD', 'Masters', 'PhD'] },
      { id: 'vocational-continuing', name: 'School of Vocational & Continuing Education', courses: ['HND', 'Diploma', 'Certificate'] },
      { id: 'odl', name: 'Open & Distance Learning (ODL) Centre', courses: ['Full Online Delivery'] }
    ]
  },
  {
    id: 'college-of-education',
    code: 'M',
    name: 'SAMPACE College of Education',
    short: 'College of Education',
    icon: '👨‍🏫',
    entity: 'foundation',
    color: '#065f46',
    tagline: 'Teacher training & education',
    description:
      'Teacher training college — NCE, Diploma, and CPD. Subject to NCCE approval.',
    departments: [
      { id: 'ece', name: 'Department of Early Childhood Education (ECE)', courses: ['NCE ECE', 'Diploma in ECE'] },
      { id: 'primary-ed', name: 'Department of Primary Education Studies', courses: ['NCE Primary', 'Diploma'] },
      { id: 'secondary-ed', name: 'Department of Secondary Education', courses: ['NCE Science', 'NCE Arts', 'NCE Commercial'] },
      { id: 'special-needs-ed', name: 'Department of Special Needs Education', courses: ['NCE Special Needs', 'Diploma'] },
      { id: 'ed-management', name: 'Department of Educational Management', courses: ['Diploma in School Admin', 'Advanced Diploma'] },
      { id: 'guidance-counselling', name: 'Department of Guidance & Counselling', courses: ['Certificate', 'Diploma'] },
      { id: 'adult-ed', name: 'Department of Adult & Non-Formal Education', courses: ['Certificate', 'Diploma'] },
      { id: 'teacher-pd', name: 'Department of Teacher Professional Development', courses: ['CPD Courses', 'TRCN Exam Prep'] }
    ]
  },
  {
    id: 'research-policy',
    code: 'J',
    name: 'SAMPACE Research & Policy Institute',
    short: 'Research & Policy',
    icon: '🔬',
    entity: 'foundation',
    color: '#7e22ce',
    tagline: 'Think tank & research',
    description:
      'Non-profit research arm focused on educational policy, African studies, and the future of learning.',
    departments: [
      { id: 'policy-innovation', name: 'Centre for Educational Policy & Innovation', courses: ['Think Tank', 'Policy Briefs', 'Government Advisory'] },
      { id: 'african-studies', name: 'Centre for African Education Studies', courses: ['Decolonisation', 'Indigenous Knowledge', 'African Languages'] },
      { id: 'edtech-futures', name: 'Centre for Educational Technology & Futures', courses: ['AI in Education', 'Future of Learning', '100-Year Vision'] },
      { id: 'endowment', name: 'SAMPACE Endowment & Scholarship Fund', courses: ['Scholarships', 'Grants', 'Financial Aid'] }
    ]
  },
  {
    id: 'community-impact',
    code: 'K',
    name: 'SAMPACE Community & Social Impact',
    short: 'Community Impact',
    icon: '🤝',
    entity: 'foundation',
    color: '#be123c',
    tagline: 'Non-profit community programmes',
    description:
      'Rural education, inclusion, youth empowerment, and outreach — serving the underserved.',
    departments: [
      { id: 'community-ed', name: 'Department of Community Education', courses: ['Rural Education', 'Adult Literacy', 'Out-of-School Children', 'Reading Campaigns'] },
      { id: 'inclusion', name: 'Department of Inclusion & Special Needs', courses: ['Disability Support', 'Gifted & Talented', 'Inclusive Education Training'] },
      { id: 'youth-women', name: 'Department of Youth & Women Empowerment', courses: ['Skills Acquisition', 'Entrepreneurship Grants', 'STEM for Girls'] },
      { id: 'outreach', name: 'Department of Educational Outreach', courses: ['Prison Education', 'Refugee Education', 'Community Learning Centres'] }
    ]
  }
]

// ------------------------------------------------------------
// COMBINED — used by the site to render all divisions
// ------------------------------------------------------------
export const ALL_DIVISIONS = [...DIVISIONS_LTD, ...DIVISIONS_FOUNDATION]

// ------------------------------------------------------------
// NAVIGATION
// ------------------------------------------------------------
export const NAV_LINKS = [
  { label: 'Home', route: 'home' },
  { label: 'Schools', route: 'schools' },
  { label: 'Courses', route: 'courses' },
  { label: 'Events', route: 'events' },
  { label: 'Blog', route: 'blog' },
  { label: 'FAQ', route: 'faq' },
  { label: 'About', route: 'about' },
  { label: 'Contact', route: 'contact' }
]

// ------------------------------------------------------------
// STATS (for hero animation)
// ------------------------------------------------------------
export const STATS = {
  learners: 12482,
  schools: 47,
  courses: 312,
  states: 19
}

// ------------------------------------------------------------
// HELPER: find a division by id
// ------------------------------------------------------------
export function findDivision(id) {
  return ALL_DIVISIONS.find((d) => d.id === id) || null
}
