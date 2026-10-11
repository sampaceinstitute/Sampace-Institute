import React from 'react'
import { SITE } from '../constants.js'

export default function WhatsAppBar() {
  const whatsappUrl = `https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Hi SAMPACE! I want to join the learner community and get free JAMB/WAEC tips.'
  )}`

  return (
    <section className="whatsapp-bar">
      <div className="whatsapp-content">
        <div className="whatsapp-icon">💬</div>
        <div className="whatsapp-text">
          <h3>Join 8,000+ Learners on WhatsApp</h3>
          <p>Daily JAMB tips · Free past questions · Mock alerts · Study motivation</p>
        </div>
      </div>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button"
      >
        Join Free Community →
      </a>
    </section>
  )
}
