// ============================================================
// SAMPACE SUCCESS STORIES — Placeholder content
// ============================================================

export const SUCCESS_STORIES = [
  {
    id: 'chidinma-jamb',
    name: 'Chidinma Okafor',
    role: 'JAMB Candidate',
    location: 'Lagos',
    avatar: '👩🏾‍🎓',
    exam: 'JAMB',
    year: 2026,
    score: '274',
    previousScore: '187',
    improvement: '+87',
    quote:
      'I jumped from 187 to 274 in JAMB after using the SAMPACE diagnostic test. The personalised study plan showed me exactly what to fix.',
    story:
      'Chidinma was struggling with Chemistry and Physics. She took the SAMPACE free diagnostic test, discovered her weakest topics were Organic Chemistry and Waves, and followed the personalised study plan for 4 months. Her JAMB score jumped from 187 to 274.'
  },
  {
    id: 'emeka-tech',
    name: 'Emeka Nwosu',
    role: 'Software Developer',
    location: 'Enugu',
    avatar: '👨🏿‍💻',
    exam: 'Tech Career',
    year: 2026,
    score: '$1,200/mo',
    previousScore: 'Unemployed',
    improvement: 'Job landed',
    quote:
      'I learned AI and Data Analysis at SAMPACE. Within 4 months I landed a remote job paying $1,200/month. Life-changing.',
    story:
      'Emeka was a graduate with no tech skills. He enrolled in SAMPACE\'s Data & AI track, completed the Python, SQL, and Machine Learning courses in 4 months, built 3 portfolio projects, and landed a remote role with a US-based startup.'
  },
  {
    id: 'fatima-school',
    name: 'Fatima Bello',
    role: 'School Owner',
    location: 'Kano',
    avatar: '👩🏾‍💼',
    exam: 'B2B Partnership',
    year: 2026,
    score: '3 campuses',
    previousScore: 'Manual records',
    improvement: '10hrs/wk saved',
    quote:
      'We deployed the SAMPACE LMS across our 3 campuses. Our teachers save 10 hours a week. Our parents are happier than ever.',
    story:
      'Fatima runs 3 private schools in Kano. After deploying SAMPACE\'s Learning Management System, attendance tracking, grade entry, and parent communication all moved online — saving teachers 10 hours per week and increasing parent satisfaction.'
  },
  {
    id: 'adebayo-parent',
    name: 'Mr. Adebayo Kuti',
    role: 'Parent',
    location: 'Abuja',
    avatar: '👨🏿',
    exam: 'WAEC',
    year: 2025,
    score: 'A1 in Mathematics',
    previousScore: 'C6',
    improvement: 'A1 achieved',
    quote:
      'The parent portal lets me see my daughter\'s progress weekly. I know exactly what she\'s studying and where she needs help.',
    story:
      'Adebayo\'s daughter was getting C6 in Mathematics. Through SAMPACE\'s WAEC Intelligence Model, she identified weak topics, followed a personalised plan, and achieved A1 in the final exam.'
  },
  {
    id: 'grace-fashion',
    name: 'Grace Adeyemi',
    role: 'Fashion Entrepreneur',
    location: 'Ibadan',
    avatar: '👩🏾‍🎨',
    exam: 'Vocational',
    year: 2026,
    score: '₦500k/mo',
    previousScore: '₦50k/mo',
    improvement: '10x growth',
    quote:
      'I took the Tailoring/Fashion course at SAMPACE. In 6 months I grew my small shop into a business earning ₦500,000/month.',
    story:
      'Grace was a self-taught tailor making ₦50,000/month. After completing SAMPACE\'s vocational fashion programme — including digital marketing and business management — she scaled to ₦500,000/month.'
  },
  {
    id: 'ibrahim-space',
    name: 'Ibrahim Yusuf',
    role: 'Future Sciences Student',
    location: 'Kaduna',
    avatar: '👨🏿‍🚀',
    exam: 'Frontier Sciences',
    year: 2026,
    score: 'Space Law',
    previousScore: 'No direction',
    improvement: 'Career clarity',
    quote:
      'I always loved space but had no idea how to turn it into a career. SAMPACE showed me that Space Law is a real field — and I\'m now enrolled.',
    story:
      'Ibrahim was a bright student passionate about space but living in a city with no space industry. Through SAMPACE\'s School of Frontier Sciences & Future Civilizations, he discovered Space Law and Space Policy — fields he can now pursue online.'
  }
]

export function findStory(id) {
  return SUCCESS_STORIES.find((s) => s.id === id) || null
}
