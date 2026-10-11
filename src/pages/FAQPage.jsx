import React, { useState } from 'react'

const FAQS = [
  {
    q: 'Is SAMPACE accredited?',
    a: 'SAMPACE EDUCATIONAL LTD is a CAC-registered company (RC: 9677766). Our certificate and diploma programmes are internally certified. Our Open University (degree-awarding) is in the planning phase and will pursue full NUC accreditation.'
  },
  {
    q: 'How do I enroll in a course?',
    a: 'Browse our Course Catalog, click "Enroll Now" on any course, enter your name and WhatsApp number, and our team will contact you within 24 hours with enrollment details and pricing.'
  },
  {
    q: 'Are classes online or physical?',
    a: 'Both. All courses are available online, physical, and hybrid. You can choose your preferred mode at enrollment.'
  },
  {
    q: 'Do you offer scholarships?',
    a: 'Yes. The SAMPACE Foundation offers scholarships, bursaries, and financial aid to indigent and high-performing students. Apply through our Community page.'
  },
  {
    q: 'What is the free diagnostic test?',
    a: 'It is a 3-question sample assessment on our homepage. It measures your JAMB/WAEC readiness in under 60 seconds. No login required.'
  },
  {
    q: 'How much do courses cost?',
    a: 'Prices vary by course. After you submit an enrollment request, our team sends you a personalized quote on WhatsApp within 24 hours.'
  },
  {
    q: 'Can I pay in installments?',
    a: 'Yes. Most courses offer 2–3 installment plans. Flexible payment options are discussed during enrollment.'
  },
  {
    q: 'Do you issue certificates?',
    a: 'Yes. Certificates are issued for completed courses and programmes. Digital certificates are also available.'
  },
  {
    q: 'How do I become a teacher on SAMPACE?',
    a: 'Send your CV and credentials to admin@sampaceedu.com.ng. Our academic team reviews applications weekly. We especially welcome teachers with digital skills.'
  },
  {
    q: 'Do you have a mobile app?',
    a: 'A mobile app (Android and iOS) is under development and will launch in Phase 2 of our roadmap. Our website is fully mobile-responsive in the meantime.'
  },
  {
    q: 'How do I contact support?',
    a: 'WhatsApp: +234 708 216 6496. Email: info@sampaceedu.com.ng. We reply to all enquiries within 24 hours.'
  },
  {
    q: 'Can I get a refund?',
    a: 'Refunds are available within 7 days of enrollment if you have not started the course. Once lessons have been accessed, refunds are not available.'
  },
  {
    q: 'What is the SAMPACE Foundation?',
    a: 'The SAMPACE Foundation is our non-profit arm (planned as a Company Limited by Guarantee) that manages scholarships, community outreach, rural education, and the future Open University.'
  },
  {
    q: 'Do you offer corporate training?',
    a: 'Yes. We design custom corporate training programmes for organisations — leadership, digital skills, AI, cybersecurity, and more. Request a proposal at info@sampaceedu.com.ng.'
  },
  {
    q: 'When does the Open University open?',
    a: 'We are in the early planning phase. The university requires NUC licensing, an AGF-approved Guarantee structure, and substantial capital. Our target is to begin application within 24 months.'
  }
]

export default function FAQPage() {
  const [open, setOpen] = useState(0)

  return (
    <main className="faq-page">
      <div className="page-header">
        <div className="badge">
          <span className="badge-dot" />
          {FAQS.length} Questions Answered
        </div>
        <h1 className="page-title">Frequently Asked Questions</h1>
        <p className="page-subtitle">
          Everything you need to know about SAMPACE. Can't find your answer? WhatsApp us.
        </p>
      </div>

      <div className="faq-list">
        {FAQS.map((item, i) => (
          <div key={i} className={`faq-item ${open === i ? 'open' : ''}`}>
            <button
              className="faq-question"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span>{item.q}</span>
              <span className={`chevron ${open === i ? 'rotated' : ''}`}>⌄</span>
            </button>
            {open === i && (
              <div className="faq-answer">
                <p>{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="faq-cta">
        <h3>Still have questions?</h3>
        <p>Our team replies within 24 hours on WhatsApp.</p>
        <a
          href="https://wa.me/2347082166496"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Chat on WhatsApp →
        </a>
      </div>
    </main>
  )
}
