import { supabase } from './supabaseClient';

// ---------- ACADEMIC TERMS ----------
export async function getAcademicTerms(organisationId) {
  const { data, error } = await supabase
    .from('academic_terms')
    .select('*')
    .eq('organisation_id', organisationId)
    .order('session', { ascending: false })
    .order('term', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function createAcademicTerm(payload) {
  const { data, error } = await supabase
    .from('academic_terms')
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ---------- SUBJECTS ----------
export async function getSubjects(organisationId, level = null) {
  let q = supabase
    .from('subjects')
    .select('*')
    .eq('organisation_id', organisationId)
    .order('name');
  if (level) q = q.eq('level', level);
  const { data, error } = await q;
  if (error) throw error;
  return data || [];
}

export async function createSubject(payload) {
  const { data, error } = await supabase
    .from('subjects')
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ---------- TEMPLATES ----------
export async function getGradingTemplate(organisationId) {
  const { data, error } = await supabase
    .from('report_card_templates')
    .select('*')
    .eq('organisation_id', organisationId)
    .eq('is_default', true)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function saveGradingTemplate(payload) {
  // payload: { organisation_id, name, grading_scale, ca1_max, ca2_max, exam_max, is_default }
  const { data, error } = await supabase
    .from('report_card_templates')
    .upsert(payload, { onConflict: 'organisation_id' })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ---------- STUDENTS ----------
/**
 * Fetch students in an org (role = 'student').
 * Assumes user_roles(user_id, organisation_id, role) + profiles(id, name, email).
 */
export async function getStudentsInOrganisation(organisationId) {
  const { data: roleRows, error: roleErr } = await supabase
    .from('user_roles')
    .select('user_id')
    .eq('organisation_id', organisationId)
    .eq('role', 'student');
  if (roleErr) throw roleErr;
  const ids = (roleRows || []).map((r) => r.user_id);
  if (!ids.length) return [];

  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, email')
    .in('id', ids)
    .order('name');
  if (error) throw error;
  return data || [];
}

// ---------- RESULTS ----------
/**
 * Fetch all results for a given term + org (+ optional level filter).
 */
export async function getResultsByTerm({ organisationId, termId, level }) {
  let q = supabase
    .from('results')
    .select(`
      id, student_id, subject_id, term_id, organisation_id, level,
      ca1, ca2, exam, total, grade, remark, points,
      subject:subject_id ( id, name, code, credit_units )
    `)
    .eq('organisation_id', organisationId)
    .eq('term_id', termId);
  if (level) q = q.eq('level', level);
  const { data, error } = await q;
  if (error) throw error;
  return data || [];
}

export async function getStudentResults({ studentId, termId }) {
  const { data, error } = await supabase
    .from('results')
    .select(`
      id, student_id, subject_id, term_id, level,
      ca1, ca2, exam, total, grade, remark, points,
      subject:subject_id ( id, name, code, credit_units )
    `)
    .eq('student_id', studentId)
    .eq('term_id', termId)
    .order('subject_id');
  if (error) throw error;
  return data || [];
}

/**
 * Upsert an array of result rows. Conflict on (student_id, subject_id, term_id).
 */
export async function upsertResults(rows) {
  if (!rows.length) return [];
  const { data, error } = await supabase
    .from('results')
    .upsert(rows, { onConflict: 'student_id,subject_id,term_id' })
    .select();
  if (error) throw error;
  return data || [];
}

// ---------- ORG / ROLE HELPERS ----------
/**
 * Get all organisations the current user belongs to, plus their roles.
 */
// ---------- ORG / ROLE HELPERS ----------
export async function getUserOrganisations() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  
  const { data, error } = await supabase
    .from('user_roles')
    .select(`
      organisation_id, 
      organisation:organisation_id ( id, name ),
      roles:role_id ( name )
    `) // <--- WE NOW JOIN THE ROLES TABLE HERE
    .eq('user_id', user.id);
    
  if (error) throw error;
  
  // Flatten the role name so the front-end pages don't break
  return (data || []).map(row => ({
    organisation_id: row.organisation_id,
    organisation: row.organisation,
    role: row.roles?.name || 'unknown'
  }));
}
