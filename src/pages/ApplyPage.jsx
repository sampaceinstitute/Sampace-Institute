import React, { useState } from 'react'
import { ALL_DIVISIONS, SITE } from '../constants.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import { saveApplication, generateReference } from '../lib/dataService.js'
import FileUpload from '../components/FileUpload';
import LoadingButton from '../components/LoadingButton.jsx'
import {
  SCHOOL_LEVELS,
  SECONDARY_STREAMS,
  PROFESSIONAL_SERVICES,
  getFormType,
  needsAcademicStep,
  needsDepartment,
  needsCourse,
  getDynamicFields
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
    motivation: '', passportUrl: '' // <-- NEW: Global Passport State
  })

  const [dynamicData, setDynamicData] = useState({})

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))
  const updateDynamic = (field, value) => setDynamicData((prev) => ({ ...prev, [field]: value }))

  const handleSchoolChange = (schoolId) => {
    setForm((prev) => ({
      ...prev,
      schoolId, level: '', classLevel: '', stream: '',
      serviceType: '', departmentId: '', course: '', additionalAnswer: ''
    }))
    setDynamicData({})
  }

  const handleDepartmentChange = (departmentId) => {
    setForm((prev) => ({ ...prev, departmentId, course: '' }))
  }

  const selectedSchool = ALL_DIVISIONS.find((d) => d.id === form.schoolId) || null
  const formType = selectedSchool ? getFormType(selectedSchool.id) : null
  const dynamicFields = selectedSchool ? getDynamicFields(selectedSchool.id) : []
  const departments = selectedSchool?.departments || []
  const selectedDept = departments.find((d) => d.id === form.departmentId) || null
  const courses = selectedDept?.courses || []
  const selectedLevel = SCHOOL_LEVELS.find((l) => l.id === form.level) || null
  const availableClasses = selectedLevel?.classes || []
  const streamRequired = selectedLevel?.streamRequired || false

  // NEW: Adjusted for the 5-step flow
  const canProceed = () => {
    if (step === 1) return form.fullName.trim() && form.email.includes('@') && form.phone.length >= 10
    if (step === 2) return !!form.passportUrl // Must upload passport
    if (step === 3) {
      if (!form.schoolId || !formType) return false
      if (formType.type === 'school-admission') {
        if (!form.level || !form.classLevel) return false
        if (streamRequired && !form.stream) return false
      } else if (['service-request', 'consulting-request', 'research-request'].includes(formType.type)) {
        if (!form.serviceType) return false
      } else {
        if (!form.departmentId || !form.course) return false
      }
      for (const field of dynamicFields) {
        if (field.required && !dynamicData[field.id]) return false
      }
      return true
    }
    if (step === 4) {
      if (formType && !needsAcademicStep(formType)) return true
      return !!form.qualification
    }
    return true
  }

  // NEW: Skip academic step if not needed
  const getNextStep = () => {
    if (step === 3 && formType && !needsAcademicStep(formType)) return 5
    return step + 1
  }
  
  const getPrevStep = () => {
    if (step === 5 && formType && !needsAcademicStep(formType)) return 3
    return step - 1
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!canProceed() || saving) return
    setSaving(true)

    const ref = generateReference()
    setReference(ref)
    const service = PROFESSIONAL_SERVICES.find((s) => s.id === form.serviceType)

    // Merge the passport URL into the dynamic data payload for the database
    const finalDynamicData = { ...dynamicData, passport_photo: form.passportUrl }

    try {
      await saveApplication({
        userId: user?.id || null, reference: ref, formType: formType?.type,
        schoolId: form.schoolId, schoolName: selectedSchool?.name,
        departmentId: form.departmentId, departmentName: selectedDept?.name,
        course: form.course, courseTitle: form.course,
        level: selectedLevel?.label || form.level, classLevel: form.classLevel, stream: form.stream,
        serviceType: form.serviceType, serviceLabel: service?.label,
        preferredMode: form.mode, additionalAnswer: form.additionalAnswer,
        applicantName: form.fullName, email: form.email, phone: form.phone, gender: form.gender,
        qualification: form.qualification, schoolAttended: form.schoolAttended, graduationYear: form.graduationYear,
        motivation: form.motivation, dynamicData: finalDynamicData
      })
    } catch (err) { console.warn(err) }

    let programmeDetails = ''
    if (formType?.type === 'school-admission') {
      programmeDetails = `🏫 Level: ${selectedLevel?.label}\n📚 Class: ${form.classLevel}\n` + (form.stream ? `🎯 Stream: ${form.stream}\n` : '')
    } else if (['service-request', 'consulting-request', 'research-request'].includes(formType?.type)) {
      programmeDetails = `🛠️ Service: ${service?.label || '—'}\n`
    } else {
      programmeDetails = `📂 Dept: ${selectedDept?.name || '—'}\n📚 Course: ${form.course}\n`
    }

    let dynamicMessage = ''
    if (Object.keys(dynamicData).length > 0) {
      dynamicMessage = `\n*ADDITIONAL INFO:*\n`
      Object.entries(dynamicData).forEach(([key, val]) => {
        const fieldLabel = dynamicFields.find(f => f.id === key)?.label || key
        dynamicMessage += `• ${fieldLabel}: ${val}\n`
      })
    }

    const message = encodeURIComponent(
      `Hello SAMPACE! 👋\n\n*NEW APPLICATION*\nReference: ${ref}\n\n` +
      `👤 Name: ${form.fullName}\n📧 Email: ${form.email}\n📱 Phone: ${form.phone}\n\n` +
      `🏫 School: ${selectedSchool?.name}\n` + programmeDetails + dynamicMessage +
      `📸 Passport: ✅ Uploaded\n` + // Notify admin
      `\nPlease process my application.`
    )

    window.open(`https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`, '_blank')
    setSaving(false)
    setSubmitted(true)
  }

  const resetForm = () => {
    setSubmitted(false); setStep(1); setReference('')
    setForm({ fullName: '', email: '', phone: '', gender: '', schoolId: '', level: '', classLevel: '', stream: '', serviceType: '', departmentId: '', course: '', additionalAnswer: '', mode: 'Online', qualification: '', schoolAttended: '', graduationYear: '', motivation: '', passportUrl: '' })
    setDynamicData({})
  }

  if (submitted) {
    return (
      <main className="apply-page">
        <div className="apply-success">
          <div className="success-icon">✓</div>
          <h1 className="page-title">Application Sent!</h1>
          <p className="page-subtitle">Your reference: <strong>{reference}</strong></p>
          <a href={`https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Open WhatsApp →</a>
          <button className="btn btn-outline" style={{ marginTop: '0.75rem' }} onClick={resetForm}>Submit Another</button>
        </div>
      </main>
    )
  }

  const step2Title = formType?.label?.step2Title || 'Programme Selection'
  
  // Dynamic Total Steps for UI
  const totalSteps = formType && !needsAcademicStep(formType) ? 4 : 5;

  return (
    <main className="apply-page">
      <div className="page-header">
        <div className="badge"><span className="badge-dot" />Step {step} of {totalSteps}</div>
        <h1 className="page-title">Apply to SAMPACE</h1>
      </div>

      <form className="apply-form" onSubmit={handleSubmit}>
        
        {/* STEP 1: PERSONAL INFO */}
        {step === 1 && (
          <div className="apply-step">
            <h3 className="apply-step-title">Personal Information</h3>
            <div className="form-grid">
              <label className="form-field"><span>Full Name *</span><input type="text" required value={form.fullName} onChange={(e) => updateField('fullName', e.target.value)} /></label>
              <label className="form-field"><span>Email Address *</span><input type="email" required value={form.email} onChange={(e) => updateField('email', e.target.value)} /></label>
              <label className="form-field"><span>WhatsApp Number *</span><input type="tel" required value={form.phone} onChange={(e) => updateField('phone', e.target.value)} /></label>
              <label className="form-field"><span>Gender</span><select value={form.gender} onChange={(e) => updateField('gender', e.target.value)}><option value="">Select</option><option value="Male">Male</option><option value="Female">Female</option></select></label>
            </div>
          </div>
        )}

        {/* STEP 2: GLOBAL PASSPORT UPLOAD */}
        {step === 2 && (
          <div className="apply-step">
            <h3 className="apply-step-title">Identification</h3>
            <p className="page-subtitle" style={{ marginBottom: '1.5rem' }}>Please upload a clear passport photograph. This will be used for your student ID and official records.</p>
            <FileUpload 
              label="Passport Photograph" 
              required={true}
              onUploadComplete={(url) => updateField('passportUrl', url)} 
            />
          </div>
        )}

        {/* STEP 3: PROGRAMME SELECTION */}
        {step === 3 && (
          <div className="apply-step">
            <h3 className="apply-step-title">{step2Title}</h3>
            <div className="form-grid">
              <label className="form-field form-field-full">
                <span>School / Division *</span>
                <select required value={form.schoolId} onChange={(e) => handleSchoolChange(e.target.value)}>
                  <option value="">Select a school</option>
                  {ALL_DIVISIONS.map((d) => <option key={d.id} value={d.id}>{d.icon} {d.name}</option>)}
                </select>
              </label>

              {formType?.type === 'school-admission' && (
                <>
                  <div className="form-field form-field-full">
                    <span>School Level *</span>
                    <div className="level-cards">
                      {SCHOOL_LEVELS.map((lvl) => (
                        <button key={lvl.id} type="button" className={`level-card ${form.level === lvl.id ? 'active' : ''}`} onClick={() => setForm((prev) => ({ ...prev, level: lvl.id, classLevel: '', stream: '' }))}>
                          <div className="level-card-icon">{lvl.icon}</div>
                          <div className="level-card-label">{lvl.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  {selectedLevel && (
                    <label className="form-field form-field-full"><span>Class *</span>
                      <select required value={form.classLevel} onChange={(e) => setForm((prev) => ({ ...prev, classLevel: e.target.value, stream: '' }))}>
                        <option value="">Select a class</option>
                        {availableClasses.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </label>
                  )}
                  {streamRequired && form.classLevel && (
                    <div className="form-field form-field-full"><span>Stream *</span>
                      <div className="level-cards">
                        {SECONDARY_STREAMS.map((st) => (
                          <button key={st.id} type="button" className={`level-card ${form.stream === st.label ? 'active' : ''}`} onClick={() => updateField('stream', st.label)}>
                            <div className="level-card-label">{st.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {formType && !['school-admission', 'service-request', 'consulting-request', 'research-request'].includes(formType.type) && (
                <>
                  {needsDepartment(formType) && (
                    <label className="form-field"><span>Department *</span>
                      <select required value={form.departmentId} onChange={(e) => handleDepartmentChange(e.target.value)} disabled={!form.schoolId}>
                        <option value="">Select a department</option>
                        {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                      </select>
                    </label>
                  )}
                  {needsCourse(formType) && (
                    <label className="form-field"><span>Course *</span>
                      <select required value={form.course} onChange={(e) => updateField('course', e.target.value)} disabled={!form.departmentId}>
                        <option value="">Select a course</option>
                        {courses.map((c, i) => <option key={i} value={c}>{c}</option>)}
                      </select>
                    </label>
                  )}
                </>
              )}

              {dynamicFields.length > 0 && (
                <div className="form-field form-field-full" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                  <h4 style={{ color: 'var(--gold-light)', marginBottom: '1rem' }}>Additional Information</h4>
                  <div className="form-grid">
                    {dynamicFields.map((field) => (
                      <label key={field.id} className={`form-field ${field.type === 'text' && field.id === 'parent_address' ? 'form-field-full' : ''}`}>
                        <span>{field.label} {field.required && '*'}</span>
                        {field.type === 'select' ? (
                          <select required={field.required} value={dynamicData[field.id] || ''} onChange={(e) => updateDynamic(field.id, e.target.value)}>
                            <option value="">Select</option>
                            {field.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                          </select>
                        ) : (
                          <input type={field.type} required={field.required} value={dynamicData[field.id] || ''} onChange={(e) => updateDynamic(field.id, e.target.value)} />
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 4: ACADEMIC BACKGROUND */}
        {step === 4 && formType && needsAcademicStep(formType) && (
          <div className="apply-step">
            <h3 className="apply-step-title">Academic Background</h3>
            <div className="form-grid">
              <label className="form-field"><span>Highest Qualification *</span>
                <select required value={form.qualification} onChange={(e) => updateField('qualification', e.target.value)}>
                  <option value="">Select</option>
                  <option value="Primary">Primary School</option>
                  <option value="JSS">Junior Secondary</option>
                  <option value="SSS">Senior Secondary</option>
                  <option value="WAEC/NECO">WAEC / NECO</option>
                  <option value="NCE/OND">NCE / OND</option>
                  <option value="HND/BSc">HND / BSc</option>
                  <option value="Masters">Masters</option>
                  <option value="PhD">PhD</option>
                </select>
              </label>
              <label className="form-field"><span>School Attended</span><input type="text" value={form.schoolAttended} onChange={(e) => updateField('schoolAttended', e.target.value)} /></label>
              <label className="form-field"><span>Year of Graduation</span><input type="text" value={form.graduationYear} onChange={(e) => updateField('graduationYear', e.target.value)} /></label>
            </div>
          </div>
        )}

        {/* STEP 5: REVIEW & SUBMIT */}
        {step === totalSteps && (
          <div className="apply-step">
            <h3 className="apply-step-title">Review & Submit</h3>
            
            <div className="apply-summary">
              <h4>Application Summary</h4>
              
              <div className="summary-row">
                <span>Passport Photo:</span>
                <img src={form.passportUrl} alt="Passport" style={{ height: '50px', width: '50px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border)' }} />
              </div>
              <div className="summary-row"><span>Name:</span><strong>{form.fullName}</strong></div>
              <div className="summary-row"><span>School:</span><strong>{selectedSchool?.name}</strong></div>
              {form.course && <div className="summary-row"><span>Course:</span><strong>{form.course}</strong></div>}
              
              {Object.entries(dynamicData).map(([key, val]) => {
                const field = dynamicFields.find(f => f.id === key)
                if (!val) return null
                return <div key={key} className="summary-row"><span>{field?.label}:</span><strong>{val}</strong></div>
              })}
            </div>

            <label className="form-field form-field-full" style={{ marginTop: '1.5rem' }}>
              <span>Anything else we should know?</span>
              <textarea rows="3" value={form.motivation} onChange={(e) => updateField('motivation', e.target.value)} />
            </label>
          </div>
        )}

        <div className="apply-nav">
          {step > 1 && <button type="button" className="btn btn-outline" onClick={() => setStep(getPrevStep())}>← Back</button>}
          {step < totalSteps ? (
            <button type="button" className="btn btn-primary" onClick={() => canProceed() && setStep(getNextStep())} disabled={!canProceed()} style={{ opacity: canProceed() ? 1 : 0.5 }}>Continue →</button>
          ) : (
            <LoadingButton type="submit" loading={saving} className="btn btn-primary">Submit Application →</LoadingButton>
          )}
        </div>
      </form>
    </main>
  )
}
