// ============================================================
// SAMPACE DATA SERVICE
// ============================================================

import { supabase, isSupabaseConfigured } from './supabaseClient.js'

// ---------- DIAGNOSTICS ----------
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
  } catch (err) { return { error: err } }
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
  } catch (err) { return { data: [], error: err } }
}

// ---------- APPLICATIONS ----------
export async function saveApplication(payload) {
  if (!isSupabaseConfigured()) return { error: { message: 'Supabase not configured' } }
  const { userId, reference, formType, schoolId, schoolName, departmentId, departmentName, course, courseTitle, level, classLevel, stream, serviceType, serviceLabel, preferredMode, additionalAnswer, applicantName, email, phone, gender, qualification, schoolAttended, graduationYear, motivation } = payload
  try {
    const { data, error } = await supabase
      .from('applications')
      .insert({
        user_id: userId || null,
        reference,
        form_template: formType || 'generic',
        form_type: formType,
        division_code: schoolId,
        school_name: schoolName,
        department_code: departmentId,
        department_name: departmentName,
        course,
        course_title: courseTitle || course,
        level,
        class_level: classLevel,
        stream,
        service_type: serviceType,
        service_label: serviceLabel,
        preferred_mode: preferredMode,
        additional_answer: additionalAnswer,
        applicant_name: applicantName,
        email, phone, gender,
        qualification,
        school_attended: schoolAttended,
        graduation_year: graduationYear,
        motivation,
        status: 'submitted',
        submitted_at: new Date().toISOString(),
        answers: { level, classLevel, stream, serviceType, serviceLabel, preferredMode, additionalAnswer }
      })
      .select()
      .maybeSingle()
    return { data, error }
  } catch (err) { return { error: err } }
}

export const createApplication = saveApplication

export async function getUserApplications(userId) {
  if (!isSupabaseConfigured() || !userId) return { data: [] }
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    return { data: data || [], error }
  } catch (err) { return { data: [], error: err } }
}

// ---------- ADMIN: ALL APPLICATIONS ----------
export async function getAllApplications({ status, formType, schoolName } = {}) {
  if (!isSupabaseConfigured()) return { data: [] }
  try {
    let query = supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500)

    if (status && status !== 'all') query = query.eq('status', status)
    if (formType && formType !== 'all') query = query.eq('form_type', formType)
    if (schoolName && schoolName !== 'all') query = query.eq('school_name', schoolName)

    const { data, error } = await query
    return { data: data || [], error }
  } catch (err) { return { data: [], error: err } }
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
  } catch (err) { return { data: null, error: err } }
}

export async function updateApplicationStatus(id, status, reviewerId, notes) {
  if (!isSupabaseConfigured()) return { error: { message: 'Supabase not configured' } }
  try {
    const { data, error } = await supabase
      .from('applications')
      .update({
        status,
        reviewed_by: reviewerId,
        reviewed_at: new Date().toISOString(),
        decision_notes: notes
      })
      .eq('id', id)
      .select()
      .maybeSingle()
    return { data, error }
  } catch (err) { return { error: err } }
}

// ---------- USER MANAGEMENT ----------
export async function getAllUsers() {
  if (!isSupabaseConfigured()) return { data: [] }
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)
    return { data: data || [], error }
  } catch (err) { return { data: [], error: err } }
}

export async function getAllRoles() {
  if (!isSupabaseConfigured()) return { data: [] }
  try {
    const { data, error } = await supabase
      .from('roles')
      .select('*')
      .order('level', { ascending: true })
    return { data: data || [], error }
  } catch (err) { return { data: [], error: err } }
}

export async function getAllOrganisations() {
  if (!isSupabaseConfigured()) return { data: [] }
  try {
    const { data, error } = await supabase
      .from('organisations')
      .select('*')
      .order('sort_order', { ascending: true })
    return { data: data || [], error }
  } catch (err) { return { data: [], error: err } }
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
  } catch (err) { return { error: err } }
}

export async function getUserRoles(userId) {
  if (!isSupabaseConfigured() || !userId) return { data: [] }
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select(`
        id, appointment_status, start_date,
        roles ( id, code, name, level, category ),
        organisations ( id, code, name, icon )
      `)
      .eq('user_id', userId)
    return { data: data || [], error }
  } catch (err) { return { data: [], error: err } }
}

export async function removeUserRole(userRoleId) {
  if (!isSupabaseConfigured()) return { error: { message: 'Supabase not configured' } }
  try {
    const { error } = await supabase
      .from('user_roles')
      .delete()
      .eq('id', userRoleId)
    return { error }
  } catch (err) { return { error: err } }
}

// ---------- REFERENCE ----------
export function generateReference() {
  const year = new Date().getFullYear()
  const random = Math.floor(10000 + Math.random() * 90000)
  return `SMP-${year}-${random}`
}
