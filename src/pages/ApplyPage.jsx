import React, { useState } from 'react'
import { ALL_DIVISIONS, SITE } from '../constants.js'

export default function ApplyPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    schoolId: '',
    departmentId: '',
    course: '',
    mode: 'Online',
    qualification: '',
    schoolAttended: '',
    graduationYear: '',
    motivation: ''
  })

  // ---------- SAFE UPDATERS (function-based, no stale closure) ----------
  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSchoolChange = (schoolId) => {
    setForm((prev) => ({
      ...prev,
      schoolId,
      departmentId: '',
      course: ''
    }))
  }

  const handleDepartmentChange = (departmentId) => {
    setForm((prev) => ({
      ...prev,
      departmentId,
      course: ''
    }))
  }

  // ---------- DERIVED DATA ----------
  const selectedSchool = ALL_DIVISIONS.find((d) => d.id === form.schoolId) || null
  const departments = selectedSchool?.departments || []
  const selectedDept = departments.find((d) => d.id === form.departmentId) || null
  const courses = selectedDept?.courses || []

  const canProceed = () => {
    if (step === 1) return form.fullName && form.email && form.phone
    if (step === 2) return form.schoolId && form.departmentId && form.course
    if (step === 3) return form.qualification
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!canProceed()) return

    const message = encodeURIComponent(
      `Hello SAMPACE! 👋\n\n` +
      `*NEW APPLICATION*\n\n` +
      `👤 Name: ${form.fullName}\n` +
      `📧 Email: ${form.email}\n` +
      `📱 Phone: ${form.phone}\n` +
      `⚧ Gender: ${form.gender || 'Not specified'}\n\n` +
      `🏫 School: ${selectedSchool?.name || ''}\n` +
      `📂 Department: ${selectedDept?.name || ''}\n` +
      `📚 Course: ${form.course}\n` +
      `💻 Mode: ${form.mode}\n\n` +
      `🎓 Qualification: ${form.qualification}\n` +
      `🏛️ School attended: ${form.schoolAttended || 'N/A'}\n` +
      `📅 Graduation year: ${form.graduationYear || 'N/A'}\n\n` +
      `💬 Motivation: ${form.motivation || 'Not provided'}\n\n` +
      `Please process my application and send me next steps.`
    )

    window.open(`https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`, '_blank')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="apply-page">
        <div className="apply-success">
          <div className="success-icon">✓</div>
          <h1 className="page-title">Application Sent!</h1>
          <p className="page-subtitle">
            Check your WhatsApp. Our admissions team will contact you within 24 hours
            with enrollment details and next steps.
          </p>
          <a
            href={`https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Open WhatsApp →
          </a>
          <button
            className="btn btn-outline"
            style={{ marginTop: '0.75rem' }}
            onClick={() => {
              setSubmitted(false)
              setStep(1)
              setForm({
                fullName: '', email: '', phone: '', gender: '',
                schoolId: '', departmentId: '', course: '', mode: 'Online',
                qualification: '', schoolAttended: '', graduationYear: '',
                motivation: ''
              })
            }}
          >
            Submit Another Application
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="apply-page">
      <div className="page-header">
        <div className="badge">
          <span className="badge-dot" />
          Step {step} of 4
        </div>
        <h1 className="page-title">Apply to SAMPACE</h1>
        <p className="page-subtitle">
          Complete the 4-step form below. Takes 2 minutes.
        </p>
      </div>

      <div className="apply-progress">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className={`apply-step-dot ${step >= n ? 'active' : ''}`}>
            {step > n ? '✓' : n}
          </div>
        ))}
      </div>

      <form className="apply-form" onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="apply-step">
            <h3 className="apply-step-title">Personal Information</h3>
            <div className="form-grid">
              <label className="form-field">
                <span>Full Name *</span>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  placeholder="e.g. Chidinma Okafor"
                  required
                />
              </label>
              <label className="form-field">
                <span>Email Address *</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label className="form-field">
                <span>WhatsApp Number *</span>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="08012345678"
                  required
                />
              </label>
              <label className="form-field">
                <span>Gender</span>
                <select value={form.gender} onChange={(e) => updateField('gender', e.target.value)}>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </label>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="apply-step">
            <h3 className="apply-step-title">Programme Selection</h3>
            <div className="form-grid">
              <label className="form-field">
                <span>School *</span>
                <select
                  value={form.schoolId}
                  onChange={(e) => handleSchoolChange(e.target.value)}
                  required
                >
                  <option value="">Select a school</option>
                  {ALL_DIVISIONS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.icon} {d.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="form-field">
                <span>Department *</span>
                <select
                  value={form.departmentId}
                  onChange={(e) => handleDepartmentChange(e.target.value)}
                  disabled={!form.schoolId}
                  required
                >
                  <option value="">
                    {form.schoolId ? 'Select a department' : 'Select a school first'}
                  </option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </label>

              <label className="form-field form-field-full">
                <span>Course / Programme *</span>
                <select
                  value={form.course}
                  onChange={(e) => updateField('course', e.target.value)}
                  disabled={!form.departmentId}
                  required
                >
                  <option value="">
                    {form.departmentId ? 'Select a course' : 'Select a department first'}
                  </option>
                  {courses.map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                  ))}
                </select>
              </label>

              <label className="form-field form-field-full">
                <span>Preferred Mode *</span>
                <div className="mode-options">
                  {['Online', 'Physical', 'Hybrid'].map((m) => (
                    <button
                      key={m}
                      type="button"
                      className={`mode-pill ${form.mode === m ? 'active' : ''}`}
                      onClick={() => updateField('mode', m)}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </label>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="apply-step">
            <h3 className="apply-step-title">Academic Background</h3>
            <div className="form-grid">
              <label className="form-field">
                <span>Highest Qualification *</span>
                <select
                  value={form.qualification}
                  onChange={(e) => updateField('qualification', e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  <option value="Primary">Primary School</option>
                  <option value="JSS">Junior Secondary</option>
                  <option value="SSS">Senior Secondary</option>
                  <option value="WAEC/NECO">WAEC / NECO</option>
                  <option value="NCE/OND">NCE / OND</option>
                  <option value="HND/BSc">HND / BSc</option>
                  <option value="Masters">Masters</option>
                  <option value="PhD">PhD</option>
                  <option value="Other">Other</option>
                </select>
              </label>
              <label className="form-field">
                <span>School Attended</span>
                <input
                  type="text"
                  value={form.schoolAttended}
                  onChange={(e) => updateField('schoolAttended', e.target.value)}
                  placeholder="e.g. King's College Lagos"
                />
              </label>
              <label className="form-field">
                <span>Year of Graduation</span>
                <input
                  type="text"
                  value={form.graduationYear}
                  onChange={(e) => updateField('graduationYear', e.target.value)}
                  placeholder="e.g. 2025"
                />
              </label>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="apply-step">
            <h3 className="apply-step-title">Final Step</h3>
            <label className="form-field form-field-full">
              <span>Why do you want to take this course? (optional)</span>
              <textarea
                rows="5"
                value={form.motivation}
                onChange={(e) => updateField('motivation', e.target.value)}
                placeholder="Tell us briefly about your goals..."
              />
            </label>

            <div className="apply-summary">
              <h4>Review Your Application</h4>
              <div className="summary-row"><span>Name:</span><strong>{form.fullName}</strong></div>
              <div className="summary-row"><span>Email:</span><strong>{form.email}</strong></div>
              <div className="summary-row"><span>Phone:</span><strong>{form.phone}</strong></div>
              <div className="summary-row"><span>School:</span><strong>{selectedSchool?.name || '—'}</strong></div>
              <div className="summary-row"><span>Department:</span><strong>{selectedDept?.name || '—'}</strong></div>
              <div className="summary-row"><span>Course:</span><strong>{form.course || '—'}</strong></div>
              <div className="summary-row"><span>Mode:</span><strong>{form.mode}</strong></div>
            </div>
          </div>
        )}

        <div className="apply-nav">
          {step > 1 && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setStep(step - 1)}
            >
              ← Back
            </button>
          )}
          {step < 4 ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => canProceed() && setStep(step + 1)}
              disabled={!canProceed()}
              style={{ opacity: canProceed() ? 1 : 0.5 }}
            >
              Continue →
            </button>
          ) : (
            <button type="submit" className="btn btn-primary">
              Submit Application →
            </button>
          )}
        </div>
      </form>
    </main>
  )
}

