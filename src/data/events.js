// ============================================================
// SAMPACE EVENTS — Placeholder content (editable later)
// ============================================================

export const EVENTS = [
  {
    id: 'jamb-2027-bootcamp',
    title: 'JAMB 2027 Free Bootcamp',
    type: 'Webinar',
    date: '2026-11-15',
    time: '10:00 AM (WAT)',
    duration: '3 hours',
    location: 'Online (Zoom)',
    price: 'Free',
    seats: 500,
    seatsLeft: 187,
    description:
      'A 3-hour live bootcamp on the new JAMB 2027 syllabus, CBT technique, and how to use SAMPACE diagnostic tools to identify your weakest topics.',
    highlights: [
      'Live Q&A with JAMB experts',
      'Free diagnostic test access for all attendees',
      'Downloadable study plan template',
      'Certificate of participation'
    ],
    cta: 'Register Free'
  },
  {
    id: 'ai-for-educators',
    title: 'AI for Nigerian Educators',
    type: 'Workshop',
    date: '2026-11-22',
    time: '2:00 PM (WAT)',
    duration: '4 hours',
    location: 'Hybrid (Lagos + Zoom)',
    price: '₦15,000',
    seats: 100,
    seatsLeft: 43,
    description:
      'Hands-on training for teachers on using AI to design lesson plans, generate assessments, grade essays, and personalise learning.',
    highlights: [
      'Live demos with ChatGPT and Claude',
      'Lesson plan generator walkthrough',
      'Assessment builder hands-on',
      'Certificate of completion'
    ],
    cta: 'Enroll Now'
  },
  {
    id: 'sampace-hackathon-2026',
    title: 'SAMPACE EdTech Hackathon 2026',
    type: 'Competition',
    date: '2026-12-05',
    time: '9:00 AM (WAT)',
    duration: '48 hours',
    location: 'Physical (Ogun State + Virtual)',
    price: 'Free to enter',
    seats: 200,
    seatsLeft: 156,
    description:
      'A 48-hour hackathon for students to build solutions to real Nigerian education problems. Cash prizes for top 3 teams.',
    highlights: [
      '₦500,000 prize pool',
      'Mentorship from industry experts',
      'Internship opportunities for top performers',
      'Free swag for all participants'
    ],
    cta: 'Register Team'
  },
  {
    id: 'waec-parents-workshop',
    title: 'WAEC 2027 Parents\' Workshop',
    type: 'Workshop',
    date: '2026-12-12',
    time: '11:00 AM (WAT)',
    duration: '2 hours',
    location: 'Online (Zoom)',
    price: 'Free',
    seats: 1000,
    seatsLeft: 623,
    description:
      'A guide for parents on how to support their child through WASSCE — from fees and study plans to mental health and exam-day logistics.',
    highlights: [
      'Stream-specific guidance',
      'Fee planning & installment options',
      'Mental health support tips',
      'Live Q&A session'
    ],
    cta: 'Register Free'
  },
  {
    id: 'frontier-sciences-open-day',
    title: 'School of Frontier Sciences Open Day',
    type: 'Open Day',
    date: '2027-01-10',
    time: '12:00 PM (WAT)',
    duration: '3 hours',
    location: 'Online (Zoom)',
    price: 'Free',
    seats: 300,
    seatsLeft: 300,
    description:
      'Discover what it means to study Space Law, Synthetic Biology, or AI Ethics. Meet faculty, watch sample lectures, and explore career paths.',
    highlights: [
      'Live sample lectures',
      'Faculty meet-and-greet',
      'Career paths explained',
      'Early-bird enrollment discounts'
    ],
    cta: 'Register Free'
  }
]

export function findEvent(id) {
  return EVENTS.find((e) => e.id === id) || null
}

export const EVENT_TYPES = ['All', 'Webinar', 'Workshop', 'Competition', 'Open Day']
