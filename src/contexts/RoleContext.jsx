import React, { createContext, useContext, useMemo } from 'react'
import { useAuth } from './AuthContext.jsx'

const RoleContext = createContext(null)

// Priority order — the highest matching role determines the "primary role"
const ROLE_PRIORITY = [
  'super_admin',
  'platform_admin',
  'founder',
  'group_ceo',
  'board_member',
  'entity_lead',
  'division_head',
  'school_head',
  'department_head',
  'teacher',
  'staff',
  'parent',
  'student',
  'applicant'
]

// Map each role code to a dashboard type
const DASHBOARD_MAP = {
   admin: 'admin', 
  super_admin: 'admin',
  platform_admin: 'admin',
  founder: 'admin',
  group_ceo: 'admin',
  board_member: 'admin',
  entity_lead: 'admin',
  division_head: 'admin',
  school_head: 'admin',
  department_head: 'teacher',
  teacher: 'teacher',
  staff: 'teacher',
  parent: 'parent',
  student: 'student',
  applicant: 'student'
}

export function RoleProvider({ children }) {
  const { roles, isAuthenticated } = useAuth()

  const roleCodes = useMemo(
    () => roles.map((r) => r.roles?.code).filter(Boolean),
    [roles]
  )

  const primaryRole = useMemo(() => {
    // Preview override — for testing: /dashboard?preview=teacher
    const params = new URLSearchParams(window.location.search)
    const preview = params.get('preview')
    if (preview && DASHBOARD_MAP[preview]) return preview

    for (const p of ROLE_PRIORITY) {
      if (roleCodes.includes(p)) return p
    }
    return null
  }, [roleCodes])

  const dashboardType = useMemo(() => {
    if (!isAuthenticated) return null
    if (!primaryRole) return 'student' // default for new users
    return DASHBOARD_MAP[primaryRole] || 'student'
  }, [primaryRole, isAuthenticated])

  const hasRole = (code) => roleCodes.includes(code)
  const hasAnyRole = (codes) => codes.some((c) => roleCodes.includes(c))

  const value = {
    roleCodes,
    primaryRole,
    dashboardType,
    hasRole,
    hasAnyRole,
    isNewUser: isAuthenticated && roleCodes.length === 0
  }

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
}

export function useRole() {
  const ctx = useContext(RoleContext)
  if (!ctx) throw new Error('useRole must be used within RoleProvider')
  return ctx
}
