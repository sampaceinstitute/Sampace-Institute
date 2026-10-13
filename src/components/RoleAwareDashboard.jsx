import React from 'react'
import { useRole } from '../contexts/RoleContext.jsx'
import StudentDashboard from '../pages/StudentDashboard.jsx'
import TeacherDashboard from '../pages/TeacherDashboard.jsx'
import ParentDashboard from '../pages/ParentDashboard.jsx'
import AdminDashboard from '../pages/AdminDashboard.jsx'

export default function RoleAwareDashboard({ onNavigate }) {
  const { dashboardType, isNewUser } = useRole()

  switch (dashboardType) {
    case 'admin':
      return <AdminDashboard onNavigate={onNavigate} />
    case 'teacher':
      return <TeacherDashboard onNavigate={onNavigate} />
    case 'parent':
      return <ParentDashboard onNavigate={onNavigate} />
    case 'student':
    default:
      return <StudentDashboard onNavigate={onNavigate} isNewUser={isNewUser} />
  }
}
