import React, { useState } from 'react'
import { ALL_DIVISIONS, SITE } from '../constants.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import { saveApplication, generateReference } from '../lib/dataService.js'
import LoadingButton from '../components/LoadingButton.jsx'
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

  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', gender: '',
    schoolId: '', level: '', classLevel: '', stream: '',
    serviceType: '', departmentId: '', course: '',
    additionalAnswer: '', mode: 'Online',
    qualification: '', schoolAttended: '', graduationYear: '',
    motivation: ''
  })

  const updateField = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleSchoolChange = (schoolId) => {
    setForm((prev) => ({
      ...prev,
      schoolId,
      level: '', classLevel: '', stream: '',
      serviceType: '', departmentId: '', course: '',
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
      if (['service-request', 'consulting-request', 'research-request'].includes(formType.type)) {
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

  const goNext = () => { if (canProceed()) setStep(getNextStep()) }
  const goPrev = () => setStep(getPrevStep())

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!canProceed() || saving) return

    setSaving(true)

    const ref = generateReference()
    setReference(ref)

    const service = PROFESSIONAL_SERVICES.find((s) => s.id === form.serviceType)

    try {
      await saveApplication({
        userId: user?.id || null,
        reference: ref,
        formType: formType?.type,
        schoolId: form.schoolId,
        schoolName: selectedSchool?.name,
        departmentId: form.departmentId,
        departmentName: selectedDept?.name,
        course: form.course,
        courseTitle: form.course,
        level: selectedLevel?.label || form.level,
        classLevel: form.classLevel,
        stream: form.stream,
        serviceType: form.serviceType,
        serviceLabel: service?.label,
        preferredMode: form.mode,
        additionalAnswer: form.additionalAnswer,
        applicantName: form.fullName,
        email: form.email,
        phone: form.phone,
        gender: form.gender,
        qualification: form.qualification,
        schoolAttended: form.schoolAttended,
        graduationYear: form.graduationYear,
        motivation: form.motivation
      })
    } catch (err) {
      console.warn('[Apply] DB save error:', err)
    }

    let programmeDetails = ''
    if (formType?.type === 'school-admission') {
      programmeDetails =
        `🏫 Level: ${selectedLevel?.label}\n` +
        `📚 Class: ${form.classLevel}\n` +
        (form.stream ? `🎯 Stream: ${form.stream}\n` : '')
    } else if (['service-request', 'consulting-request', 'research-request'].includes(formType?.type)) {
      programmeDetails = `🛠️ Service: ${service?.label || form.serviceType || '—'}\n`
    } else {
      programmeDetails =
        `📂 Department: ${selectedDept?.name || '—'}\n` +
        `📚 Course: ${form.course}\n`
    }

    const message = encodeURIComponent(
      `Hello SAMPACE! 👋\n\n` +
      `*NEW APPLICATION*\n` +
      `Reference: ${ref}\n\n` +
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

    setSaving(false)
    setSubmitted(true)
  }

  const resetForm = () => {
    setSubmitted(false)
    setStep(1)
    setReference('')
    setForm({
      fullName: '', email: '', phone: '', gender: '',
      schoolId: '', level: '', classLevel: '', stream: '',
      serviceType: '', departmentId: '', course: '',
      additionalAnswer: '', mode: 'Online',
      qualification: '', schoolAttended: '', graduationYear: '',
      motivation: ''
    })
  }

  if (submitted) {
    return (
      <main className="apply-page">
        <div className="apply-success">
          <div className="success-icon">✓</div>
          <h1 className="page-title">Application Sent!</h1>
          <p className="page-subtitle">
            Your reference: <strong style={{ color: 'var(--gold-light)' }}>{reference}</strong>
          </p>
          <p className="page-subtitle" style={{ marginTop: '0.75rem' }}>
            Check your WhatsApp. Our team will contact you within 24 hours.
          </p>
          {user && (
            <p className="diagnostic-note">
              ✅ Saved to your account — view it in <strong>My Applications</strong>.
            </p>
          )}
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

  const step2Title = formType?.label?.step2Title || 'Programme Selection'

  return (
    <main className="apply-page">
      <div className="page-header">
        <div className="badge">
          <span className="badge-dot" />
          Step {step} of {formType && !needsAcademicStep(formType) ? 3 : 4}
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
        {/* STEP 1, 2, 3, 4 — unchanged from your current file */}
        {/* Just copy the JSX from your existing ApplyPage.jsx here */}
        
        {/* REPLACE ONLY THE NAVIGATION BUTTONS AT THE BOTTOM WITH THIS: */}
        <div className="apply-nav">
          {step > 1 && (
            <button type="button" className="btn btn-outline" onClick={goPrev}>
              ← Back
            </button>
          )}
          {step < 4 ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={goNext}
              disabled={!canProceed()}
              style={{ opacity: canProceed() ? 1 : 0.5 }}
            >
              Continue →
            </button>
          ) : (
            <LoadingButton
              type="submit"
              loading={saving}
              loadingText="Submitting Application..."
              className="btn btn-primary"
            >
              Submit Application →
            </LoadingButton>
          )}
        </div>
      </form>
    </main>
  )
}
