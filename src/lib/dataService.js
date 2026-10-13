// ============================================================
// SAMPACE DATA SERVICE
// All database reads/writes go through here (single source of truth)
// ============================================================

import { supabase, isSupabaseConfigured } from './supabaseClient.js'

// ---------- DIAGNOSTIC RESULTS ----------
export async function saveDiagnosticResult({ userId, examType, score, totalQuestions, readinessLevel, answers, weakTopics, phone, name }) {
  if (!isSupabaseConfigured()) return { error: { message: 'Supabase not configured' } }

  try {
    const { data, error } = await supabase
      .from('diagnostic_results')
      .insert({
        user_id: userId || null,
        exam_type: examType || 'JAMB',
        score,
        total_questions: totalQuestions,
        readiness_level: readinessLevel,
        answers: answers || [],
        weak_topics: weakTopics || [],
        phone,
        name
      })
      .select()
      .maybeSingle()

    return { data, error }
  } catch (err) {
    return { error: err }
  }
}

export async function getUserDiagnostics(userId) {
  if (!isSupabaseConfigured() || !userId) return { data: [] }

  try {
    const { data, error } = await supabase
      .from('diagnostic_results')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20)

    return { data: data || [], error }
  } catch (err) {
    return { data: [], error: err }
  }
}

// ---------- APPLICATIONS / ENROLLMENTS ----------
export async function createApplication({
  userId,
  reference,
  formTemplate,
  divisionCode,
  departmentCode,
  programme,
  courseTitle,
  courseId,
  schoolName,
  departmentName,
  phone,
  applicantName,
  answers
}) {
  if (!isSupabaseConfigured()) return { error: { message: 'Supabase not configured' } }

  try {
    const { data, error } = await supabase
      .from('applications')
      .insert({
        user_id: userId || null,
        reference,
        form_template: formTemplate || 'enrollment',
        division_code: divisionCode,
        department_code: departmentCode,
        programme,
        course_title: courseTitle,
        course_id: courseId,
        school_name: schoolName,
        department_name: departmentName,
        phone,
        applicant_name: applicantName,
        answers: answers || {},
        status: 'submitted',
        submitted_at: new Date().toISOString()
      })
      .select()
      .maybeSingle()

    return { data, error }
  } catch (err) {
    return { error: err }
  }
}

export async function getUserApplications(userId) {
  if (!isSupabaseConfigured() || !userId) return { data: [] }

  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    return { data: data || [], error }
  } catch (err) {
    return { data: [], error: err }
  }
}

export async function getApplicationById(id) {
  if (!isSupabaseConfigured() || !id) return { data: null }

  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('id', id)
      .maybeSingle()

    return { data, error }
  } catch (err) {
    return { data: null, error: err }
  }
}

// ---------- USER MANAGEMENT (Admin) ----------
export async function getAllUsers() {
  if (!isSupabaseConfigured()) return { data: [] }

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    return { data: data || [], error }
  } catch (err) {
    return { data: [], error: err }
  }
}

export async function getAllRoles() {
  if (!isSupabaseConfigured()) return { data: [] }

  try {
    const { data, error } = await supabase
      .from('roles')
      .select('*')
      .order('level', { ascending: true })

    return { data: data || [], error }
  } catch (err) {
    return { data: [], error: err }
  }
}

export async function getAllOrganisations() {
  if (!isSupabaseConfigured()) return { data: [] }

  try {
    const { data, error } = await supabase
      .from('organisations')
      .select('*')
      .order('sort_order', { ascending: true })

    return { data: data || [], error }
  } catch (err) {
    return { data: [], error: err }
  }
}

export async function assignRole({ userId, roleId, organisationId, appointmentStatus = 'active' }) {
  if (!isSupabaseConfigured()) return { error: { message: 'Supabase not configured' } }

  try {
    const { data, error } = await supabase
      .from('user_roles')
      .insert({
        user_id: userId,
        role_id: roleId,
        organisation_id: organisationId || null,
        appointment_status: appointmentStatus
      })
      .select()
      .maybeSingle()

    return { data, error }
  } catch (err) {
    return { error: err }
  }
}

export async function getUserRoles(userId) {
  if (!isSupabaseConfigured() || !userId) return { data: [] }

  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select(`
        id,
        appointment_status,
        start_date,
        roles ( id, code, name, level, category ),
        organisations ( id, code, name, icon )
      `)
      .eq('user_id', userId)

    return { data: data || [], error }
  } catch (err) {
    return { data: [], error: err }
  }
}

export async function removeUserRole(userRoleId) {
  if (!isSupabaseConfigured()) return { error: { message: 'Supabase not configured' } }

  try {
    const { error } = await supabase
      .from('user_roles')
      .delete()
      .eq('id', userRoleId)

    return { error }
  } catch (err) {
    return { error: err }
  }
}

// ---------- REFERENCE GENERATOR ----------
export function generateReference() {
  const year = new Date().getFullYear()
  const random = Math.floor(10000 + Math.random() * 90000)
  return `SMP-${year}-${random}`
}
