// ============================================================
// SAMPACE ANALYTICS SERVICE
// Aggregations for admin dashboard + analytics page
// ============================================================

import { supabase, isSupabaseConfigured } from './supabaseClient.js'

// ---------- ADMIN: Overview Stats ----------
export async function getAdminOverview() {
  if (!isSupabaseConfigured()) return { data: null }

  try {
    const [
      usersRes,
      applicationsRes,
      enrolledRes,
      paymentsRes
    ] = await Promise.all([
      supabase.from('profiles').select('id', { count: 'exact', head: true }),
      supabase.from('applications').select('id', { count: 'exact', head: true }),
      supabase.from('applications').select('id', { count: 'exact', head: true }).eq('status', 'enrolled'),
      supabase.from('payments').select('amount, status').eq('status', 'success')
    ])

    const revenue = (paymentsRes.data || []).reduce((sum, p) => sum + (p.amount || 0), 0) / 100

    return {
      data: {
        totalUsers: usersRes.count || 0,
        totalApplications: applicationsRes.count || 0,
        totalEnrollments: enrolledRes.count || 0,
        totalRevenue: revenue,
        successfulPayments: (paymentsRes.data || []).length
      }
    }
  } catch (err) {
    console.warn('[Analytics] Overview error:', err)
    return { data: null }
  }
}

// ---------- ADMIN: Applications by Status ----------
export async function getApplicationsByStatus() {
  if (!isSupabaseConfigured()) return { data: [] }

  try {
    const { data } = await supabase
      .from('applications')
      .select('status')

    if (!data) return { data: [] }

    const counts = {}
    data.forEach((a) => {
      const s = a.status || 'unknown'
      counts[s] = (counts[s] || 0) + 1
    })

    return {
      data: Object.entries(counts).map(([status, count]) => ({ status, count }))
    }
  } catch (err) {
    return { data: [] }
  }
}

// ---------- ADMIN: Applications by School ----------
export async function getApplicationsBySchool() {
  if (!isSupabaseConfigured()) return { data: [] }

  try {
    const { data } = await supabase
      .from('applications')
      .select('school_name')

    if (!data) return { data: [] }

    const counts = {}
    data.forEach((a) => {
      const s = a.school_name || 'Unknown'
      counts[s] = (counts[s] || 0) + 1
    })

    return {
      data: Object.entries(counts)
        .map(([school_name, count]) => ({ school_name, count }))
        .sort((a, b) => b.count - a.count)
    }
  } catch (err) {
    return { data: [] }
  }
}

// ---------- ADMIN: Revenue by Day ----------
export async function getRevenueByDay(days = 14) {
  if (!isSupabaseConfigured()) return { data: [] }

  try {
    const since = new Date()
    since.setDate(since.getDate() - days)

    const { data } = await supabase
      .from('payments')
      .select('amount, created_at, status')
      .eq('status', 'success')
      .gte('created_at', since.toISOString())
      .order('created_at', { ascending: true })

    if (!data) return { data: [] }

    // Group by date (YYYY-MM-DD)
    const byDay = {}
    data.forEach((p) => {
      const day = p.created_at.slice(0, 10)
      byDay[day] = (byDay[day] || 0) + (p.amount || 0)
    })

    // Fill in missing days
    const result = []
    for (let i = 0; i < days; i++) {
      const d = new Date()
      d.setDate(d.getDate() - (days - 1 - i))
      const dayKey = d.toISOString().slice(0, 10)
      result.push({
        date: dayKey,
        amount: (byDay[dayKey] || 0) / 100 // to Naira
      })
    }

    return { data: result }
  } catch (err) {
    return { data: [] }
  }
}

// ---------- ADMIN: Recent Payments ----------
export async function getRecentPayments(limit = 5) {
  if (!isSupabaseConfigured()) return { data: [] }

  try {
    const { data } = await supabase
      .from('payments')
      .select('reference, amount, status, description, created_at')
      .order('created_at', { ascending: false })
      .limit(limit)

    return { data: data || [] }
  } catch (err) {
    return { data: [] }
  }
}

// ---------- ADMIN: Recent Applications ----------
export async function getRecentApplications(limit = 5) {
  if (!isSupabaseConfigured()) return { data: [] }

  try {
    const { data } = await supabase
      .from('applications')
      .select('id, reference, applicant_name, school_name, status, created_at')
      .order('created_at', { ascending: false })
      .limit(limit)

    return { data: data || [] }
  } catch (err) {
    return { data: [] }
  }
}

// ---------- ADMIN: Top Courses ----------
export async function getTopCourses(limit = 8) {
  if (!isSupabaseConfigured()) return { data: [] }

  try {
    const { data } = await supabase
      .from('applications')
      .select('course_title')  // Only course_title, no "course"

    if (!data) return { data: [] }

    const counts = {}
    data.forEach((a) => {
      const c = a.course_title
      if (c) counts[c] = (counts[c] || 0) + 1
    })

    return {
      data: Object.entries(counts)
        .map(([course, count]) => ({ course, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, limit)
    }
  } catch (err) {
    return { data: [] }
  }
}
// ---------- STUDENT: My Stats ----------
export async function getStudentOverview(userId) {
  if (!isSupabaseConfigured() || !userId) return { data: null }

  try {
    const [
      applicationsRes,
      enrolledRes,
      paymentsRes,
      diagnosticsRes
    ] = await Promise.all([
      supabase.from('applications').select('id', { count: 'exact', head: true }).eq('user_id', userId),
      supabase.from('applications').select('id', { count: 'exact', head: true }).eq('user_id', userId).eq('status', 'enrolled'),
      supabase.from('payments').select('amount, status').eq('user_id', userId).eq('status', 'success'),
      supabase.from('diagnostic_results').select('id', { count: 'exact', head: true }).eq('user_id', userId)
    ])

    const totalPaid = (paymentsRes.data || []).reduce((sum, p) => sum + (p.amount || 0), 0) / 100

    return {
      data: {
        totalApplications: applicationsRes.count || 0,
        enrolledCourses: enrolledRes.count || 0,
        totalPaid,
        diagnosticsTaken: diagnosticsRes.count || 0
      }
    }
  } catch (err) {
    console.warn('[Student Analytics] error:', err)
    return { data: null }
  }
}

// ---------- STUDENT: Enrolled Applications ----------
export async function getMyEnrolledCourses(userId) {
  if (!isSupabaseConfigured() || !userId) return { data: [] }

  try {
    const { data } = await supabase
      .from('applications')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'enrolled')
      .order('created_at', { ascending: false })

    return { data: data || [] }
  } catch (err) {
    return { data: [] }
  }
}
