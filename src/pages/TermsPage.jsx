import React from 'react'
import { SITE } from '../constants.js'

export default function TermsPage() {
  return (
    <main className="legal-page">
      <div className="page-header">
        <div className="badge">
          <span className="badge-dot" />
          Legal Agreement
        </div>
        <h1 className="page-title">Terms of Service</h1>
        <p className="page-subtitle">
          Last updated: {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      <div className="legal-content">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using any SAMPACE platform (website, mobile app, or learning
          management system), you agree to be bound by these Terms of Service. If you do
          not agree, please do not use our services.
        </p>

        <h2>2. About SAMPACE</h2>
        <p>
          {SITE.name} is a company registered in Nigeria (RC: {SITE.rc}) offering
          educational services, training, and technology solutions.
        </p>

        <h2>3. Account Responsibilities</h2>
        <ul>
          <li>You are responsible for maintaining the confidentiality of your account.</li>
          <li>You must provide accurate and current information.</li>
          <li>You must not share your login credentials with others.</li>
          <li>You must not use the platform for any unlawful purpose.</li>
        </ul>

        <h2>4. Enrollment & Payment</h2>
        <ul>
          <li>Course fees are payable as indicated at enrollment.</li>
          <li>Installment plans are available on selected courses.</li>
          <li>Fees once paid are non-refundable after lessons have been accessed.</li>
          <li>Refund requests within 7 days of enrollment and before accessing content may be considered.</li>
        </ul>

        <h2>5. Intellectual Property</h2>
        <p>
          All course content, textbooks, videos, software, and materials on the platform
          are the intellectual property of SAMPACE or its licensors. You may not copy,
          distribute, resell, or reproduce any material without written permission.
        </p>

        <h2>6. User Content</h2>
        <p>
          By uploading content (assignments, discussions, reviews), you grant SAMPACE a
          non-exclusive license to use, display, and distribute such content for educational
          purposes. You retain ownership of your original work.
        </p>

        <h2>7. Code of Conduct</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Harass, bully, or threaten other learners or staff.</li>
          <li>Upload malicious code, viruses, or harmful material.</li>
          <li>Impersonate another person or entity.</li>
          <li>Attempt to gain unauthorised access to our systems.</li>
          <li>Post false, misleading, or defamatory content.</li>
        </ul>

        <h2>8. Certification</h2>
        <p>
          Certificates are issued upon successful completion of a course. SAMPACE
          certificates are internally certified. For regulated professions, additional
          external certification may be required.
        </p>

        <h2>9. Disclaimers</h2>
        <p>
          While we strive for excellence, SAMPACE does not guarantee specific exam results,
          job placements, or income outcomes. Success depends on individual effort,
          dedication, and other factors beyond our control.
        </p>

        <h2>10. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by Nigerian law, SAMPACE shall not be liable for
          indirect, incidental, or consequential damages arising from your use of the platform.
        </p>

        <h2>11. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your account for violation of these
          terms, without refund, at our discretion.
        </p>

        <h2>12. Governing Law</h2>
        <p>
          These Terms are governed by the laws of the Federal Republic of Nigeria.
          Disputes shall be resolved in Nigerian courts.
        </p>

        <h2>13. Changes to Terms</h2>
        <p>
          We may update these Terms at any time. Continued use of the platform after
          changes constitutes acceptance of the new terms.
        </p>

        <h2>14. Contact</h2>
        <p>
          For legal enquiries: <strong>{SITE.email}</strong> · {SITE.phone}
        </p>
      </div>
    </main>
  )
}
