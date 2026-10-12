import React from 'react'
import { SITE } from '../constants.js'

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <div className="page-header">
        <div className="badge">
          <span className="badge-dot" />
          NDPR Compliant
        </div>
        <h1 className="page-title">Privacy Policy</h1>
        <p className="page-subtitle">
          Last updated: {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      <div className="legal-content">
        <h2>1. Introduction</h2>
        <p>
          {SITE.name} ("SAMPACE", "we", "our", "us") respects your privacy and is committed
          to protecting the personal data you share with us. This Privacy Policy explains
          how we collect, use, and protect your information, in compliance with the Nigeria
          Data Protection Regulation (NDPR).
        </p>

        <h2>2. Information We Collect</h2>
        <p>We may collect the following information:</p>
        <ul>
          <li><strong>Personal Details:</strong> Name, email, phone number, gender, age, address.</li>
          <li><strong>Academic Data:</strong> Educational background, course preferences, diagnostic scores.</li>
          <li><strong>Payment Data:</strong> Transaction references (we do not store card details).</li>
          <li><strong>Usage Data:</strong> Pages visited, time spent, device information.</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>To provide and manage your enrollment.</li>
          <li>To personalise your learning experience.</li>
          <li>To communicate with you about courses, events, and updates.</li>
          <li>To process payments and issue receipts.</li>
          <li>To improve our platform and services.</li>
        </ul>

        <h2>4. Legal Basis for Processing</h2>
        <p>
          We process your data on the basis of: (a) your consent, (b) performance of a contract
          (enrollment), (c) compliance with legal obligations, and (d) legitimate interests.
        </p>

        <h2>5. Data Sharing</h2>
        <p>
          We do not sell your data. We may share information with trusted service providers
          (payment processors, email providers) who assist in delivering our services, under
          strict confidentiality agreements.
        </p>

        <h2>6. Data Security</h2>
        <p>
          We use SSL encryption, secure servers, and access controls to protect your data.
          However, no system is 100% secure. Please use strong passwords and protect your
          account credentials.
        </p>

        <h2>7. Your Rights</h2>
        <ul>
          <li>Right to access your personal data.</li>
          <li>Right to correct inaccurate data.</li>
          <li>Right to delete your data ("right to be forgotten").</li>
          <li>Right to object to processing.</li>
          <li>Right to data portability.</li>
        </ul>

        <h2>8. Cookies</h2>
        <p>
          We use cookies to remember your preferences and improve site performance. You can
          disable cookies in your browser settings, though some features may not work properly.
        </p>

        <h2>9. Data Retention</h2>
        <p>
          We retain your data for as long as your account is active or as needed to provide
          services. After account closure, we keep minimal records for legal and tax purposes.
        </p>

        <h2>10. Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. Significant changes will be notified
          via email or on our website.
        </p>

        <h2>11. Contact Us</h2>
        <p>
          For privacy questions, contact us at <strong>{SITE.email}</strong> or
          WhatsApp <strong>{SITE.phone}</strong>.
        </p>
      </div>
    </main>
  )
}
