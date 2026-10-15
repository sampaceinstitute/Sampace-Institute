import React, { useState } from 'react'
import { ALL_DIVISIONS, SITE } from '../constants.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import { saveApplication } from '../lib/applicationService.js'
import {
  SCHOOL_LEVELS,
  SECONDARY_STREAMS,
  PROFESSIONAL_SERVICES,
  getFormType,
  needsAcademicStep,
  needsDepartment,
  needsCourse
} from '../data/formDefinitions.js'

export default function ApplyPage() {
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [reference, setReference] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    schoolId: '',
    level: '',
    classLevel: '',
    stream: '',
    serviceType: '',
    departmentId: '',
    course: '',
    additionalAnswer: '',
    mode: 'Online',
    qualification: '',
    schoolAttended: '',
    graduationYear: '',
    motivation: ''
  })

  const updateField = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleSchoolChange = (schoolId) => {
    setForm((prev) => ({
      ...prev,
      schoolId,
      level: '',
      classLevel: '',
      stream: '',
      serviceType: '',
      departmentId: '',
      course: '',
      additionalAnswer: ''
    }))
  }

  const handleDepartmentChange = (departmentId) =>
    setForm((prev) => ({ ...prev, departmentId, course: '' }))

  const selectedSchool = ALL_DIVISIONS.find((d) => d.id === form.schoolId) || null
  const formType = selectedSchool ? getFormType(selectedSchool.id) : null
  const departments = selectedSchool?.departments || []
  const selectedDept = departments.find((d) => d.id === form.departmentId) || null
  const courses = selectedDept?.courses || []

  const selectedLevel = SCHOOL_LEVELS.find((l) => l.id === form.level) || null
  const availableClasses = selectedLevel?.classes || []
  const streamRequired = selectedLevel?.streamRequired || false

  const canProceed = () => {
    if (step === 1) {
      return form.fullName.trim() && form.email.includes('@') && form.phone.length >= 10
    }
    if (step === 2) {
      if (!form.schoolId || !formType) return false
      if (formType.type === 'school-admission') {
        if (!form.level || !form.classLevel) return false
        if (streamRequired && !form.stream) return false
        return true
      }
      if (
        formType.type === 'service-request' ||
        formType.type === 'consulting-request' ||
        formType.type === 'research-request'
      ) {
        return !!form.serviceType
      }
      return form.departmentId && form.course
    }
    if (step === 3) {
      if (formType && !needsAcademicStep(formType)) return true
      return !!form.qualification
    }
    return true
  }

  const getNextStep = () => {
    if (step === 2 && formType && !needsAcademicStep(formType)) return 4
    return step + 1
  }

  const getPrevStep = () => {
    if (step === 4 && formType && !needsAcademicStep(formType)) return 2
    return step - 1
  }

  const goNext = () => canProceed() && setStep(getNextStep())
  const goPrev = () => setStep(getPrevStep())

  // ---------- SUBMIT ----------
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!canProceed()) return

    setSaving(true)
    setSaveError('')

    // 1) SAVE TO DATABASE
    const { data, error, reference: ref } = await saveApplication({
      userId: user?.id || null,
      formType,
      formData: form,
      derived: {
        schoolId: form.schoolId,
        schoolName: selectedSchool?.name,
        departmentName: selectedDept?.name,
        courseId: form.course
      }
    })

    if (error) {
      console.warn('[Apply] Save failed but continuing to WhatsApp:', error)
      setSaveError('Could not save to database, but you can still send via WhatsApp.')
    }

    const finalRef = data?.reference || ref || 'Pending'
    setReference(finalRef)
    setSaving(false)
    setSubmitted(true)

    // 2) OPEN WHATSAPP (with structured details)
    let programmeDetails = ''
    if (formType?.type === 'school-admission') {
      programmeDetails =
        `🏫 Level: ${selectedLevel?.label}\n` +
        `📚 Class: ${form.classLevel}\n` +
        (form.stream ? `🎯 Stream: ${form.stream}\n` : '')
    } else if (
      formType?.type === 'service-request' ||
      formType?.type === 'consulting-request' ||
      formType?.type === 'research-request'
    ) {
      const service = PROFESSIONAL_SERVICES.find((s) => s.id === form.serviceType)
      programmeDetails = `🛠️ Service: ${service?.label || form.serviceType || 'Not specified'}\n`
    } else {
      programmeDetails =
        `📂 Department: ${selectedDept?.name || '—'}\n` +
        `📚 Course: ${form.course}\n`
    }

    const message = encodeURIComponent(
      `Hello SAMPACE! 👋\n\n` +
      `*NEW APPLICATION*\n` +
      `Reference: ${finalRef}\n\n` +
      `👤 Name: ${form.fullName}\n` +
      `📧 Email: ${form.email}\n` +
      `📱 Phone: ${form.phone}\n` +
      `⚧ Gender: ${form.gender || 'Not specified'}\n\n` +
      `🏫 School: ${selectedSchool?.name}\n` +
      programmeDetails +
      `💻 Mode: ${form.mode}\n\n` +
      (form.qualification ? `🎓 Qualification: ${form.qualification}\n` : '') +
      (form.schoolAttended ? `🏛️ School attended: ${form.schoolAttended}\n` : '') +
      (form.graduationYear ? `📅 Graduation year: ${form.graduationYear}\n` : '') +
      (form.additionalAnswer ? `❓ Extra info: ${form.additionalAnswer}\n` : '') +
      `\n💬 Motivation: ${form.motivation || 'Not provided'}\n\n` +
      `Please process my application and send me next steps.`
    )

    window.open(`https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`, '_blank')
  }

  const resetForm = () => {
    setSubmitted(false)
    setStep(1)
    setReference('')
    setSaveError('')
    setForm({
      fullName: '', email: '', phone: '', gender: '',
      schoolId: '', level: '', classLevel: '', stream: '',
      serviceType: '', departmentId: '', course: '',
      additionalAnswer: '', mode: 'Online',
      qualification: '', schoolAttended: '', graduationYear: '',
      motivation: ''
    })
  }

  // ---------- SUCCESS ----------
  if (submitted) {
    return (
      <main className="apply-page">
        <div className="apply-success">
          <div className="success-icon">✓</div>
          <h1 className="page-title">Application Sent!</h1>
          <p className="page-subtitle">
            Your reference: <strong style={{ color: 'var(--gold-light)' }}>{reference}</strong>
          </p>
          {saveError && (
            <p className="diagnostic-note" style={{ color: '#fbbf24', marginTop: '0.75rem' }}>
              ⚠️ {saveError}
            </p>
          )}
          {user && !saveError && (
            <p className="diagnostic-note" style={{ marginTop: '0.75rem' }}>
              ✅ Saved to your account. Track it in <strong>My Applications</strong>.
            </p>
          )}
          <p className="page-subtitle" style={{ marginTop: '0.75rem' }}>
            Check your WhatsApp. Our team will contact you within 24 hours.
          </p>
          <a
            href={`https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ marginTop: '1.5rem' }}
          >
            Open WhatsApp →
          </a>
          <button className="btn btn-outline" style={{ marginTop: '0.75rem' }} onClick={resetForm}>
            Submit Another Application
          </button>
        </div>
      </main>
    )
  }

  // ---------- FORM ----------
  const step2Title = formType?.label?.step2Title || 'Programme Selection'
  const totalSteps = formType && !needsAcademicStep(formType) ? 3 : 4

  return (
    <main className="apply-page">
      <div className="page-header">
        <div className="badge">
          <span className="badge-dot" />
          Step {step} of {totalSteps}
        </div>
        <h1 className="page-title">Apply to SAMPACE</h1>
        <p className="page-subtitle">Complete the form below. Takes 2 minutes.</p>
      </div>

      <div className="apply-progress">
        {[1, 2, 3, 4].map((n) => {
          if (n === 3 && formType && !needsAcademicStep(formType)) return null
          return (
            <div key={n} className={`apply-step-dot ${step >= n ? 'active' : ''}`}>
              {step > n ? '✓' : n}
            </div>
          )
        })}
      </div>

      <form className="apply-form" onSubmit={handleSubmit}>
        {/* STEP 1 */}
        {step === 1 && (
          <div className="apply-step">
            <h3 className="apply-step-title">Personal Information</h3>
            <div className="form-grid">
              <label className="form-field">
                <span>Full Name *</span>
                <input type="text" value={form.fullName} onChange={(e) => updateField('fullName', e.target.value)} placeholder="e.g. Chidinma Okafor" required />
              </label>
              <label className="form-field">
                <span>Email Address *</span>
                <input type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} placeholder="you@example.com" required />
              </label>
              <label className="form-field">
                <span>WhatsApp Number *</span>
                <input type="tel" value={form.phone} onChange={(e) => updateField('phone', e.target.value)} placeholder="08012345678" required />
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

        {/* STEP 2 */}
        {step === 2 && (
          <div className="apply-step">
            <h3 className="apply-step-title">{step2Title}</h3>
            <div className="form-grid">
              <label className="form-field form-field-full">
                <span>School / Division *</span>
                <select value={form.schoolId} onChange={(e) => handleSchoolChange(e.target.value)} required>
                  <option value="">Select a school</option>
                  {ALL_DIVISIONS.map((d) => (
                    <option key={d.id} value={d.id}>{d.icon} {d.name}</option>
                  ))}
                </select>
              </label>

              {/* SCHOOL ADMISSION */}
              {formType?.type === 'school-admission' && (
                <>
                  <div className="form-field form-field-full">
                    <span>School Level *</span>
                    <div className="level-cards">
                      {SCHOOL_LEVELS.map((lvl) => (
                        <button
                          key={lvl.id}
                          type="button"
                          className={`level-card ${form.level === lvl.id ? 'active' : ''}`}
                          onClick={() => setForm((prev) => ({ ...prev, level: lvl.id, classLevel: '', stream: '' }))}
                        >
                          <div className="level-card-icon">{lvl.icon}</div>
                          <div className="level-card-label">{lvl.label}</div>
                          <div className="level-card-desc">{lvl.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {selectedLevel && (
                    <label className="form-field form-field-full">
                      <span>Class *</span>
                      <select
                        value={form.classLevel}
                        onChange={(e) => setForm((prev) => ({ ...prev, classLevel: e.target.value, stream: '' }))}
                        required
                      >
                        <option value="">Select a class</option>
                        {availableClasses.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </label>
                  )}

                  {streamRequired && form.classLevel && (
                    <div className="form-field form-field-full">
                      <span>Stream *</span>
                      <div className="level-cards">
                        {SECONDARY_STREAMS.map((st) => (
                          <button
                            key={st.id}
                            type="button"
                            className={`level-card ${form.stream === st.label ? 'active' : ''}`}
                            onClick={() => updateField('stream', st.label)}
                          >
                            <div className="level-card-icon">{st.icon}</div>
                            <div className="level-card-label">{st.label}</div>
                            <div className="level-card-desc">{st.subjects}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <label className="form-field form-field-full">
                    <span>Preferred Mode *</span>
                    <div className="mode-options">
                      {['Online', 'Physical', 'Hybrid'].map((m) => (
                        <button key={m} type="button" className={`mode-pill ${form.mode === m ? 'active' : ''}`} onClick={() => updateField('mode', m)}>
                          {m}
                        </button>
                      ))}
                    </div>
                  </label>
                </>
              )}

              {/* SERVICE REQUEST */}
              {(formType?.type === 'service-request' || formType?.type === 'consulting-request' || formType?.type === 'research-request') && (
                <>
                  <label className="form-field form-field-full">
                    <span>{formType?.label?.finalLabel || 'Service'} *</span>
                    <select value={form.serviceType} onChange={(e) => updateField('serviceType', e.target.value)} required>
                      <option value="">Select a service</option>
                      {PROFESSIONAL_SERVICES.map((s) => (
                        <option key={s.id} value={s.id}>{s.icon} {s.label}</option>
                      ))}
                    </select>
                  </label>

                  <label className="form-field form-field-full">
                    <span>Preferred Contact</span>
                    <div className="mode-options">
                      {['WhatsApp', 'Email', 'Phone Call'].map((m) => (
                        <button key={m} type="button" className={`mode-pill ${form.mode === m ? 'active' : ''}`} onClick={() => updateField('mode', m)}>
                          {m}
                        </button>
                      ))}
                    </div>
                  </label>
                </>
              )}

              {/* STANDARD (Training, Higher Ed) */}
              {formType && !['school-admission', 'service-request', 'consulting-request', 'research-request'].includes(formType.type) && (
                <>
                  {needsDepartment(formType) && (
                    <label className="form-field">
                      <span>Department *</span>
                      <select value={form.departmentId} onChange={(e) => handleDepartmentChange(e.target.value)} disabled={!form.schoolId} required>
                        <option value="">{form.schoolId ? 'Select a department' : 'Select a school first'}</option>
                        {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                      </select>
                    </label>
                  )}

                  {needsCourse(formType) && (
                    <label className="form-field">
                      <span>{formType?.label?.finalLabel || 'Course'} *</span>
                      <select value={form.course} onChange={(e) => updateField('course', e.target.value)} disabled={!form.departmentId} required>
                        <option value="">{form.departmentId ? 'Select a course' : 'Select a department first'}</option>
                        {courses.map((c, i) => <option key={i} value={c}>{c}</option>)}
                      </select>
                    </label>
                  )}

                  {formType.additionalQuestion && form.departmentId && (
                    <label className="form-field form-field-full">
                      <span>{formType.additionalQuestion.label}</span>
                      <select value={form.additionalAnswer} onChange={(e) => updateField('additionalAnswer', e.target.value)}>
                        <option value="">Select</option>
                        {formType.additionalQuestion.options.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </label>
                  )}

                  <label className="form-field form-field-full">
                    <span>Preferred Mode *</span>
                    <div className="mode-options">
                      {['Online', 'Physical', 'Hybrid'].map((m) => (
                        <button key={m} type="button" className={`mode-pill ${form.mode === m ? 'active' : ''}`} onClick={() => updateField('mode', m)}>
                          {m}
                        </button>
                      ))}
                    </div>
                  </label>
                </>
              )}
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && formType && needsAcademicStep(formType) && (
          <div className="apply-step">
            <h3 className="apply-step-title">Academic Background</h3>
            <div className="form-grid">
              <label className="form-field">
                <span>Highest Qualification *</span>
                <select value={form.qualification} onChange={(e) => updateField('qualification', e.target.value)} required>
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
                <input type="text" value={form.schoolAttended} onChange={(e) => updateField('schoolAttended', e.target.value)} placeholder="e.g. King's College Lagos" />
              </label>
              <label className="form-field">
                <span>Year of Graduation</span>
                <input type="text" value={form.graduationYear} onChange={(e) => updateField('graduationYear', e.target.value)} placeholder="e.g. 2025" />
              </label>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div className="apply-step">
            <h3 className="apply-step-title">Review & Submit</h3>
            <div className="apply-summary">
              <h4>Application Summary</h4>
              <div className="summary-row"><span>Name:</span><strong>{form.fullName}</strong></div>
              <div className="summary-row"><span>Email:</span><strong>{form.email}</strong></div>
              <div className="summary-row"><span>Phone:</span><strong>{form.phone}</strong></div>
              <div className="summary-row"><span>School:</span><strong>{selectedSchool?.name || '—'}</strong></div>

              {formType?.type === 'school-admission' && (
                <>
                  <div className="summary-row"><span>Level:</span><strong>{selectedLevel?.label || '—'}</strong></div>
                  <div className="summary-row"><span>Class:</span><strong>{form.classLevel || '—'}</strong></div>
                  {form.stream && <div className="summary-row"><span>Stream:</span><strong>{form.stream}</strong></div>}
                </>
              )}

              {['service-request', 'consulting-request', 'research-request'].includes(formType?.type) && (
                <div className="summary-row">
                  <span>Service:</span>
                  <strong>{PROFESSIONAL_SERVICES.find((s) => s.id === form.serviceType)?.label || '—'}</strong>
                </div>
              )}

              {formType && !['school-admission', 'service-request', 'consulting-request', 'research-request'].includes(formType.type) && (
                <>
                  <div className="summary-row"><span>Department:</span><strong>{selectedDept?.name || '—'}</strong></div>
                  <div className="summary-row"><span>Course:</span><strong>{form.course || '—'}</strong></div>
                </>
              )}

              <div className="summary-row"><span>Mode:</span><strong>{form.mode}</strong></div>
              {form.qualification && <div className="summary-row"><span>Qualification:</span><strong>{form.qualification}</strong></div>}
            </div>

            <label className="form-field form-field-full" style={{ marginTop: '1.5rem' }}>
              <span>Anything else we should know? (optional)</span>
              <textarea rows="4" value={form.motivation} onChange={(e) => updateField('motivation', e.target.value)} placeholder="Tell us briefly about your goals..." />
            </label>
          </div>
        )}

        <div className="apply-nav">
          {step > 1 && (
            <button type="button" className="btn btn-outline" onClick={goPrev} disabled={saving}>← Back</button>
          )}
          {step < 4 ? (
            <button type="button" className="btn btn-primary" onClick={goNext} disabled={!canProceed() || saving} style={{ opacity: canProceed() ? 1 : 0.5 }}>
              Continue →
            </button>
          ) : (
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Submitting...' : 'Submit Application →'}
            </button>
          )}
        </div>
      </form>
    </main>
  )
}
