// ============================================================
// SAMPACE APPLICATION SERVICE
// Structured save functions — one per form type
// ============================================================

import { supabase, isSupabaseConfigured } from './supabaseClient.js'

function generateReference() {
  const year = new Date().getFullYear()
  const random = Math.floor(10000 + Math.random() * 90000)
  return `SMP-${year}-${random}`
}

// ---------- MAIN ENTRY POINT ----------
// Routes to the correct save function based on formType
export async function saveApplication({ userId, formType, formData, derived }) {
  if (!isSupabaseConfigured()) {
    return { error: { message: 'Supabase not configured' } }
  }

  const reference = generateReference()

  // Common fields for all form types
  const baseRecord = {
    user_id: userId || null,
    reference,
    form_template: formType?.type || 'generic',
    form_type: formType?.type || 'generic',
    applicant_name: formData.fullName,
    applicant_email: formData.email,
    phone: formData.phone,
    gender: formData.gender || null,
    preferred_mode: formData.mode || null,
    school_name: derived.schoolName || null,
    division_code: derived.schoolId || null,
    motivation: formData.motivation || null,
    status: 'submitted',
    submitted_at: new Date().toISOString()
  }

  // ---------- TYPE-SPECIFIC DATA ----------
  let typeSpecific = {}

  if (formType?.type === 'school-admission') {
    typeSpecific = {
      level: formData.level || null,
      class_level: formData.classLevel || null,
      stream: formData.stream || null,
      department_name: null,
      course_title: formData.classLevel
        ? `${formData.level} · ${formData.classLevel}${formData.stream ? ' · ' + formData.stream : ''}`
        : null,
      department_code: null,
      programme: formData.classLevel,
      answers: {
        level: formData.level,
        classLevel: formData.classLevel,
        stream: formData.stream,
        mode: formData.mode
      }
    }
  } else if (
    formType?.type === 'service-request' ||
    formType?.type === 'consulting-request' ||
    formType?.type === 'research-request'
  ) {
    typeSpecific = {
      service_type: formData.serviceType || null,
      course_title: formData.serviceType || null,
      programme: formData.serviceType || null,
      department_name: null,
      department_code: null,
      contact_method: formData.mode || null,
      preferred_mode: null,
      answers: {
        serviceType: formData.serviceType,
        contactMethod: formData.mode
      }
    }
  } else {
    // Training / Higher Ed / Generic
    typeSpecific = {
      department_name: derived.departmentName || null,
      department_code: formData.departmentId || null,
      course_title: formData.course || null,
      course_id: derived.courseId || null,
      programme: formData.course || null,
      qualification: formData.qualification || null,
      school_attended: formData.schoolAttended || null,
      graduation_year: formData.graduationYear || null,
      additional_data: {
        additionalAnswer: formData.additionalAnswer || null,
        additionalQuestion: formType?.additionalQuestion?.id || null
      },
      answers: {
        department: derived.departmentName,
        course: formData.course,
        qualification: formData.qualification,
        additionalAnswer: formData.additionalAnswer
      }
    }
  }

  const finalRecord = {
    ...baseRecord,
    ...typeSpecific,
    metadata: { generatedAt: new Date().toISOString() }
  }

  try {
    const { data, error } = await supabase
      .from('applications')
      .insert(finalRecord)
      .select()
      .maybeSingle()

    if (error) {
      console.warn('[Application] Save failed:', error.message)
      return { error, reference }
    }

    return { data, reference }
  } catch (err) {
    console.warn('[Application] Network error:', err)
    return { error: err, reference }
  }
}

// ---------- ADMIN: fetch all applications ----------
export async function getAllApplications({ status = null, formType = null, limit = 100 } = {}) {
  if (!isSupabaseConfigured()) return { data: [] }

  try {
    let query = supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (status) query = query.eq('status', status)
    if (formType) query = query.eq('form_type', formType)

    const { data, error } = await query
    return { data: data || [], error }
  } catch (err) {
    return { data: [], error: err }
  }
}

// ---------- ADMIN: update application status ----------
export async function updateApplicationStatus({ id, status, notes }) {
  if (!isSupabaseConfigured()) return { error: { message: 'Supabase not configured' } }

  try {
    const { data, error } = await supabase
      .from('applications')
      .update({
        status,
        decision_notes: notes || null,
        reviewed_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .maybeSingle()

    return { data, error }
  } catch (err) {
    return { error: err }
  }
}
