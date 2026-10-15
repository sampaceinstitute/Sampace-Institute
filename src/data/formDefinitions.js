// ============================================================
// SAMPACE DYNAMIC FORM DEFINITIONS
// Each division has its own form structure.
// The ApplyPage reads these to decide what fields to show.
// ============================================================

export const SCHOOL_LEVELS = [
  {
    id: 'nursery',
    label: 'Nursery School',
    icon: '🍼',
    description: 'Nursery 1 & 2',
    classes: ['Nursery 1', 'Nursery 2']
  },
  {
    id: 'primary',
    label: 'Primary School',
    icon: '📚',
    description: 'Grade 1 – Grade 5',
    classes: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5']
  },
  {
    id: 'jss',
    label: 'Junior Secondary',
    icon: '📖',
    description: 'JSS 1 – JSS 3',
    classes: ['JSS 1', 'JSS 2', 'JSS 3']
  },
  {
    id: 'sss',
    label: 'Senior Secondary',
    icon: '🎓',
    description: 'SSS 1 – SSS 3',
    classes: ['SSS 1', 'SSS 2', 'SSS 3'],
    streamRequired: true
  }
]

export const SECONDARY_STREAMS = [
  { id: 'science', label: 'Science', icon: '🔬', subjects: 'Physics · Chemistry · Biology · Further Maths' },
  { id: 'arts', label: 'Arts / Humanities', icon: '📜', subjects: 'Literature · Government · History · CRS/IRS' },
  { id: 'commercial', label: 'Commercial', icon: '💼', subjects: 'Accounting · Commerce · Economics' },
  { id: 'technical', label: 'Technical', icon: '⚙️', subjects: 'Technical Drawing · Woodwork · Metalwork' }
]

export const PROFESSIONAL_SERVICES = [
  { id: 'printing', label: 'Printing & Photocopying', icon: '🖨️' },
  { id: 'binding', label: 'Binding & Lamination', icon: '📎' },
  { id: 'graphic-design', label: 'Graphic Design', icon: '🎨' },
  { id: 'logo-design', label: 'Logo Design', icon: '✒️' },
  { id: 'cv-writing', label: 'CV Writing', icon: '📄' },
  { id: 'cover-letter', label: 'Cover Letter Writing', icon: '✉️' },
  { id: 'linkedin', label: 'LinkedIn Optimization', icon: '💼' },
  { id: 'research-support', label: 'Research Support', icon: '🔬' },
  { id: 'statistical-analysis', label: 'Statistical Analysis', icon: '📊' },
  { id: 'business-plan', label: 'Business Plan Writing', icon: '📈' },
  { id: 'grant-writing', label: 'Grant Writing', icon: '🏆' },
  { id: 'company-profile', label: 'Company Profile Design', icon: '🏢' },
  { id: 'cac-registration', label: 'CAC / TIN Registration Support', icon: '📋' }
]

// ============================================================
// FORM TYPES PER DIVISION
// ============================================================
export const FORM_TYPES = {
  'basic-secondary': {
    type: 'school-admission',
    label: {
      step2Title: 'School Admission Details',
      finalLabel: 'Class Level'
    },
    // Uses SCHOOL_LEVELS, SECONDARY_STREAMS
    hideDepartment: true,
    hideCourse: true
  },
  'extramural-exam-hub': {
    type: 'exam-prep',
    label: {
      step2Title: 'Exam Preparation Details',
      finalLabel: 'Course / Exam Prep Track'
    },
    // Uses Department + Course as normal
    showExamYear: true
  },
  'technology-innovation': {
    type: 'training',
    label: {
      step2Title: 'Course Selection',
      finalLabel: 'Course'
    },
    additionalQuestion: {
      id: 'codingExperience',
      label: 'Your Coding / Tech Experience',
      type: 'select',
      options: ['No experience', 'Beginner', 'Intermediate', 'Advanced']
    }
  },
  'frontier-sciences': {
    type: 'training',
    label: {
      step2Title: 'Course Selection',
      finalLabel: 'Course'
    },
    additionalQuestion: {
      id: 'background',
      label: 'Your Background in Science / Tech',
      type: 'select',
      options: ['No background', 'Basic interest', 'Undergraduate', 'Postgraduate']
    }
  },
  'professional-vocational': {
    type: 'training',
    label: {
      step2Title: 'Programme Selection',
      finalLabel: 'Course'
    },
    additionalQuestion: {
      id: 'experience',
      label: 'Your Experience in This Field',
      type: 'select',
      options: ['No experience', 'Some experience', 'Working professional']
    }
  },
  'professional-services': {
    type: 'service-request',
    label: {
      step2Title: 'Select the Service You Need',
      finalLabel: 'Service'
    },
    // Uses PROFESSIONAL_SERVICES
    hideDepartment: true,
    hideCourse: true,
    hideAcademicStep: true  // Skip Step 3 for services
  },
  'publishing-media': {
    type: 'service-request',
    label: {
      step2Title: 'Select Publishing / Media Service'
    },
    hideCourse: false,
    hideAcademicStep: true
  },
  'consulting-institutional': {
    type: 'consulting-request',
    label: {
      step2Title: 'Consulting Service Needed'
    },
    hideDepartment: true,
    hideCourse: true,
    hideAcademicStep: true
  },
  'edtech-intelligence': {
    type: 'training',
    label: {
      step2Title: 'Solution Selection',
      finalLabel: 'Course'
    }
  },
  // Foundation entities — treat as standard course enrolment for now
  'open-university': {
    type: 'higher-ed',
    label: {
      step2Title: 'Programme Selection',
      finalLabel: 'Course'
    }
  },
  'college-of-education': {
    type: 'higher-ed',
    label: {
      step2Title: 'Programme Selection',
      finalLabel: 'Course'
    }
  },
  'research-policy': {
    type: 'research-request',
    label: {
      step2Title: 'Research Area'
    },
    hideAcademicStep: true
  },
  'community-impact': {
    type: 'community-request',
    label: {
      step2Title: 'Programme of Interest'
    }
  },
  default: {
    type: 'generic',
    label: {
      step2Title: 'Programme Selection',
      finalLabel: 'Course'
    }
  }
}

export function getFormType(schoolId) {
  return FORM_TYPES[schoolId] || FORM_TYPES.default
}

// Helper: check if this form needs the academic background step
export function needsAcademicStep(formType) {
  return !formType.hideAcademicStep
}

// Helper: check if this form needs department field
export function needsDepartment(formType) {
  return !formType.hideDepartment
}

// Helper: check if this form needs course field
export function needsCourse(formType) {
  return !formType.hideCourse
}
