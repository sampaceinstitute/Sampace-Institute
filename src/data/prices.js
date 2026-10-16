// ============================================================
// SAMPACE PRICING
// Edit this file to change prices across the platform.
// All prices in Naira (₦). Paystack requires kobo — auto-converted.
// ============================================================

// Price Tiers — set a default price per course using these values
export const PRICE_TIERS = {
  free: 0,
  starter: 20000,
  standard: 50000,
  professional: 100000,
  premium: 250000,
  enterprise: 500000,
  contact: -1  // -1 means "Contact us for pricing"
}

// Course-specific prices (override tiers)
// Format: 'Course Name': 30000
export const COURSE_PRICES = {
  // Exam prep
  'JAMB/UTME Prep': 30000,
  'WAEC Prep': 30000,
  'NECO Prep': 30000,
  'Mock CBT': 5000,
  'IELTS': 80000,
  'TOEFL': 80000,
  'SAT': 100000,

  // Technology
  'Web Development': 120000,
  'Mobile App Development': 150000,
  'Full-Stack Development': 200000,
  'Data Analysis': 100000,
  'Data Science': 180000,
  'Machine Learning': 200000,
  'Generative AI': 150000,
  'Ethical Hacking': 150000,
  'Cybersecurity Compliance': 120000,
  'UI/UX Design': 100000,
  'Graphic Design': 80000,
  'Video Editing': 60000,

  // Vocational
  'Tailoring/Fashion': 50000,
  'Catering/Confectionery': 50000,
  'Cosmetology': 45000,
  'Solar Installation': 80000,
  'Welding': 60000,

  // Professional
  'Project Management (PMP)': 150000,
  'Leadership Development': 100000,
  'Entrepreneurship': 80000,
  'Digital Marketing': 80000,

  // School admission fees (annual, per level)
  'Nursery 1': 150000,
  'Nursery 2': 150000,
  'Grade 1': 180000,
  'Grade 2': 180000,
  'Grade 3': 180000,
  'Grade 4': 200000,
  'Grade 5': 200000,
  'JSS 1': 220000,
  'JSS 2': 220000,
  'JSS 3': 220000,
  'SSS 1': 250000,
  'SSS 2': 250000,
  'SSS 3': 280000,

  // Service fees (professional services)
  'Printing & Photocopying': 500,
  'Binding & Lamination': 2000,
  'Graphic Design': 25000,
  'Logo Design': 40000,
  'CV Writing': 15000,
  'Cover Letter Writing': 8000,
  'LinkedIn Optimization': 20000,
  'Research Support': 50000,
  'Statistical Analysis': 75000,
  'Business Plan Writing': 100000,
  'Grant Writing': 120000,
  'Company Profile Design': 60000,
  'CAC / TIN Registration Support': 30000
}

// Default tier fallback for unknown courses
export const DEFAULT_TIER = PRICE_TIERS.standard

// Lookup a price for a given course or service name
export function getPrice(name) {
  if (!name) return DEFAULT_TIER
  return COURSE_PRICES[name] ?? DEFAULT_TIER
}

// Format ₦ price for display
export function formatNaira(amount) {
  if (amount === -1) return 'Contact us'
  if (amount === 0) return 'Free'
  return '₦' + amount.toLocaleString('en-NG')
}
