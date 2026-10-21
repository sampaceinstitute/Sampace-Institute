import React, { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import SEOHelmet from './components/SEOHelmet.jsx' // <-- NEW IMPORT
import HomePage from './pages/HomePage.jsx'
import SchoolsPage from './pages/SchoolsPage.jsx'
import DivisionPage from './pages/DivisionPage.jsx'
import CoursesPage from './pages/CoursesPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import BlogPostPage from './pages/BlogPostPage.jsx'
import FAQPage from './pages/FAQPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import ApplyPage from './pages/ApplyPage.jsx'
import EventsPage from './pages/EventsPage.jsx'
import SuccessStoriesPage from './pages/SuccessStoriesPage.jsx'
import PrivacyPage from './pages/PrivacyPage.jsx'
import TermsPage from './pages/TermsPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import ResetPasswordPage from './pages/ResetPasswordPage.jsx'
import SetNewPasswordPage from './pages/SetNewPasswordPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import MyApplicationsPage from './pages/MyApplicationsPage.jsx'
import AdminMessagesPage from './pages/AdminMessagesPage.jsx'
import AdminUsersPage from './pages/AdminUsersPage.jsx'
import AdminApplicationsPage from './pages/AdminApplicationsPage.jsx'
import AdminApplicationDetailPage from './pages/AdminApplicationDetailPage.jsx'
import AdminAnalyticsPage from './pages/AdminAnalyticsPage.jsx'
import AdminExamsPage from './pages/AdminExamsPage.jsx'
import AdminExamEditorPage from './pages/AdminExamEditorPage.jsx'
import StudentExamsPage from './pages/StudentExamsPage.jsx'
import StudentExamTakingPage from './pages/StudentExamTakingPage.jsx'
import StudentInboxPage from './pages/StudentInboxPage.jsx'
import AdminGradingPage from './pages/AdminGradingPage.jsx'
import AdminGradingDetailPage from './pages/AdminGradingDetailPage.jsx'
import StudentResultsPage from './pages/StudentResultsPage.jsx'
import StudentResultDetailPage from './pages/StudentResultDetailPage.jsx'
import WalletPage from './pages/WalletPage.jsx'
import AdminPaymentsPage from './pages/AdminPaymentsPage.jsx'
import RoleAwareDashboard from './components/RoleAwareDashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { findDivision } from './constants.js'

// ... [parseRoute, buildPath, getPageTitle functions remain exactly the same] ...
function parseRoute(pathname) {
  const parts = pathname.split('/').filter(Boolean)
  if (parts.length === 0) return { route: 'home' }
  if (parts[0] === 'schools') {
    if (parts[1]) return { route: 'division', divisionId: parts[1] }
    return { route: 'schools' }
  }
  if (parts[0] === 'courses') return { route: 'courses' }
  if (parts[0] === 'about') return { route: 'about' }
  if (parts[0] === 'contact') return { route: 'contact' }
  if (parts[0] === 'blog') {
  if (parts[0] === 'student' && parts[1] === 'result-detail') return { route: 'studentResultDetail', id: parts[2] }
    if (parts[1]) return { route: 'blogPost', slug: parts[1] }
    return { route: 'blog' }
  }
  if (parts[0] === 'faq') return { route: 'faq' }
  if (parts[0] === 'apply') return { route: 'apply' }
  if (parts[0] === 'events') return { route: 'events' }
  if (parts[0] === 'success-stories') return { route: 'successStories' }
  if (parts[0] === 'privacy') return { route: 'privacy' }
  if (parts[0] === 'terms') return { route: 'terms' }
  if (parts[0] === 'login') return { route: 'login' }
  if (parts[0] === 'signup') return { route: 'signup' }
  if (parts[0] === 'reset-password') return { route: 'resetPassword' }
  if (parts[0] === 'set-new-password') return { route: 'setNewPassword' }
  if (parts[0] === 'profile') return { route: 'profile' }
  if (parts[0] === 'my-applications') return { route: 'myApplications' }
  if (parts[0] === 'wallet') return { route: 'wallet' }
  if (parts[0] === 'dashboard') return { route: 'dashboard' }
  if (parts[0] === 'student' && parts[1] === 'exams') { if (parts[2]) return { route: 'studentExamTaking', id: parts[2] }; return { route: 'studentExams' } }
  if (parts[0] === 'student' && parts[1] === 'results') return { route: 'studentResults' }
  if (parts[0] === 'student' && parts[1] === 'inbox') return { route: 'studentInbox' }
  if (parts[0] === 'admin') {
    if (parts[1] === 'users') return { route: 'adminUsers' }
    if (parts[1] === 'payments') return { route: 'adminPayments' }
    if (parts[1] === 'analytics') return { route: 'adminAnalytics' }
    if (parts[1] === 'messages') return { route: 'adminMessages' }
    if (parts[1] === 'exams') { if (parts[2]) return { route: 'adminExamEditor', id: parts[2] }; return { route: 'adminExams' } }
    if (parts[1] === 'grading') { 
  if (parts[2]) return { route: 'adminGradingDetail', id: parts[2] }
  return { route: 'adminGrading' } 
    }
    if (parts[1] === 'applications') {
      if (parts[2]) return { route: 'adminApplicationDetail', id: parts[2] }
      return { route: 'adminApplications' }
    }
  }
  return { route: 'notFound' }
}

function buildPath(routeObj) {
  if (typeof routeObj === 'string') routeObj = { route: routeObj }
  switch (routeObj.route) {
    case 'home': return '/'
    case 'schools': return '/schools'
    case 'division': return `/schools/${routeObj.divisionId}`
    case 'courses': return '/courses'
    case 'about': return '/about'
    case 'contact': return '/contact'
    case 'blog': return '/blog'
    case 'blogPost': return `/blog/${routeObj.slug}`
    case 'faq': return '/faq'
    case 'apply': return '/apply'
    case 'events': return '/events'
    case 'successStories': return '/success-stories'
    case 'privacy': return '/privacy'
    case 'terms': return '/terms'
    case 'login': return '/login'
    case 'signup': return '/signup'
    case 'resetPassword': return '/reset-password'
    case 'setNewPassword': return '/set-new-password'
    case 'profile': return '/profile'
    case 'myApplications': return '/my-applications'
    case 'wallet': return '/wallet'
    case 'dashboard': return '/dashboard'
    case 'adminUsers': return '/admin/users'
    case 'adminPayments': return '/admin/payments'
    case 'adminAnalytics': return '/admin/analytics'
    case 'adminMessages': return '/admin/messages'
    case 'adminExams': return '/admin/exams'
    case 'adminExamEditor': return `/admin/exams/${routeObj.id}`
    case 'studentExams': return '/student/exams'
    case 'studentExamTaking': return `/student/exams/${routeObj.id}`
    case 'studentResults': return '/student/results'
    case 'studentResultDetail': return `/student/result-detail/${routeObj.id}`
    case 'adminGrading': return '/admin/grading'
    case 'adminGradingDetail': return `/admin/grading/${routeObj.id}`
    case 'adminApplications': return '/admin/applications'
    case 'adminApplicationDetail': return `/admin/applications/${routeObj.id}`
    default: return '/'
  }
}

function getPageTitle(routeObj) {
  const base = 'SAMPACE Educational Ltd'
  const map = {
    home: `${base} — Empowering Learners`,
    schools: `All Schools & Divisions — ${base}`,
    courses: `Course Catalog — ${base}`,
    about: `About Us — ${base}`,
    contact: `Contact Us — ${base}`,
    blog: `Blog — ${base}`,
    faq: `FAQ — ${base}`,
    apply: `Apply Now — ${base}`,
    events: `Events — ${base}`,
    profile: `My Profile — ${base}`,
    myApplications: `My Activity — ${base}`,
    wallet: `My Wallet — ${base}`,
    dashboard: `My Dashboard — ${base}`,
    adminUsers: `User Management — ${base}`,
    adminApplications: `Applications Review — ${base}`,
    adminApplicationDetail: `Application Detail — ${base}`,
    adminPayments: `Payments — ${base}`,
    adminAnalytics: `Analytics — ${base}`,
    notFound: `Page Not Found — ${base}`
  }
  return map[routeObj.route] || base
}

// Helper for SEO Descriptions
function getPageDescription(routeObj) {
  const map = {
    home: 'SAMPACE is Nigeria\'s leading education platform. From JAMB prep to Space Law, explore 400+ courses across 13 schools.',
    courses: 'Browse our massive catalog of courses. Technology, professional skills, basic education, and frontier sciences.',
    schools: 'Explore the 13 SAMPACE divisions, from primary education to frontier sciences and future civilizations.',
    apply: 'Start your SAMPACE journey today. Apply for school admission, professional courses, or our services.',
    about: 'Learn about our vision, mission, and commitment to transforming education for the next 100 years.',
  }
  return map[routeObj.route] || 'SAMPACE Educational Ltd — Empowering Learners. Transforming Education.'
}

const ADMIN_ROLES = ['super_admin', 'platform_admin', 'founder', 'group_ceo', 'entity_lead']

export default function App() {
  const [mounted, setMounted] = useState(false)
  const [routeObj, setRouteObj] = useState(() => parseRoute(window.location.pathname))

  useEffect(() => {
    setMounted(true)
    const handlePopState = () => {
      setRouteObj(parseRoute(window.location.pathname))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (target) => {
    const newRoute = typeof target === 'string' ? { route: target } : target
    const newPath = buildPath(newRoute)
    if (newPath === window.location.pathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    window.history.pushState({ route: newRoute }, '', newPath)
    setRouteObj(newRoute)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPage = () => {
    switch (routeObj.route) {
      case 'schools': return <SchoolsPage onSelectDivision={(id) => navigate({ route: 'division', divisionId: id })} />
      case 'division': return <DivisionPage division={findDivision(routeObj.divisionId)} onBack={() => navigate('schools')} />
      case 'courses': return <CoursesPage onNavigate={navigate} />
      case 'about': return <AboutPage />
      case 'contact': return <ContactPage />
      case 'blog': return <BlogPage onNavigate={navigate} />
      case 'blogPost': return <BlogPostPage slug={routeObj.slug} onNavigate={navigate} />
      case 'faq': return <FAQPage />
      case 'apply': return <ApplyPage />
      case 'events': return <EventsPage />
      case 'successStories': return <SuccessStoriesPage onNavigate={navigate} />
      case 'privacy': return <PrivacyPage />
      case 'terms': return <TermsPage />
      case 'login': return <LoginPage onNavigate={navigate} />
      case 'signup': return <SignupPage onNavigate={navigate} />
      case 'resetPassword': return <ResetPasswordPage onNavigate={navigate} />
      case 'setNewPassword': return <SetNewPasswordPage onNavigate={navigate} />
      case 'profile': return <ProtectedRoute onNavigate={navigate}><ProfilePage onNavigate={navigate} /></ProtectedRoute>
      case 'myApplications': return <ProtectedRoute onNavigate={navigate}><MyApplicationsPage onNavigate={navigate} /></ProtectedRoute>
      case 'wallet': return <ProtectedRoute onNavigate={navigate}><WalletPage onNavigate={navigate} /></ProtectedRoute>
      case 'adminUsers': return <ProtectedRoute onNavigate={navigate} requiredRoles={ADMIN_ROLES}><AdminUsersPage onNavigate={navigate} /></ProtectedRoute>
      case 'adminApplications': return <ProtectedRoute onNavigate={navigate} requiredRoles={ADMIN_ROLES}><AdminApplicationsPage onNavigate={navigate} /></ProtectedRoute>
      case 'adminApplicationDetail': return <ProtectedRoute onNavigate={navigate} requiredRoles={ADMIN_ROLES}><AdminApplicationDetailPage id={routeObj.id} onNavigate={navigate} /></ProtectedRoute>
      case 'adminPayments': return <ProtectedRoute onNavigate={navigate} requiredRoles={ADMIN_ROLES}><AdminPaymentsPage onNavigate={navigate} /></ProtectedRoute>
      case 'adminAnalytics': return <ProtectedRoute onNavigate={navigate} requiredRoles={ADMIN_ROLES}><AdminAnalyticsPage onNavigate={navigate} /></ProtectedRoute>
      case 'dashboard': return <ProtectedRoute onNavigate={navigate}><RoleAwareDashboard onNavigate={navigate} /></ProtectedRoute>
      case 'adminExams':
  return <ProtectedRoute onNavigate={navigate} requiredRoles={ADMIN_ROLES}><AdminExamsPage onNavigate={navigate} /></ProtectedRoute>
case 'adminExamEditor':
  return <ProtectedRoute onNavigate={navigate} requiredRoles={ADMIN_ROLES}><AdminExamEditorPage id={routeObj.id} onNavigate={navigate} /></ProtectedRoute>
      case 'studentExams':
  return <ProtectedRoute onNavigate={navigate}><StudentExamsPage onNavigate={navigate} /></ProtectedRoute>
case 'studentExamTaking':
  return <ProtectedRoute onNavigate={navigate}><StudentExamTakingPage id={routeObj.id} onNavigate={navigate} /></ProtectedRoute>
      case 'studentResults':
  return <ProtectedRoute onNavigate={navigate}><StudentResultsPage onNavigate={navigate} /></ProtectedRoute>
      case 'studentResultDetail':
  return <ProtectedRoute onNavigate={navigate}><StudentResultDetailPage id={routeObj.id} onNavigate={navigate} /></ProtectedRoute>
      case 'adminGrading':
  return <ProtectedRoute onNavigate={navigate} requiredRoles={ADMIN_ROLES}><AdminGradingPage onNavigate={navigate} /></ProtectedRoute>
case 'adminGradingDetail':
  return <ProtectedRoute onNavigate={navigate} requiredRoles={ADMIN_ROLES}><AdminGradingDetailPage id={routeObj.id} onNavigate={navigate} /></ProtectedRoute>
      case 'adminMessages':
  return <ProtectedRoute onNavigate={navigate} requiredRoles={ADMIN_ROLES}><AdminMessagesPage onNavigate={navigate} /></ProtectedRoute>
      case 'home': return <HomePage onNavigate={navigate} />
      case 'notFound':
      default: return <NotFoundPage onNavigate={navigate} />
    }
  }

  return (
    <div className="app">
      <SEOHelmet 
        title={getPageTitle(routeObj)} 
        description={getPageDescription(routeObj)} 
      />
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <span key={i} className={`particle particle-${i % 5}`} />
        ))}
      </div>
      <Header currentRoute={routeObj.route} onNavigate={navigate} mounted={mounted} />
      <div className="page-container">{renderPage()}</div>
      <Footer mounted={mounted} onNavigate={navigate} />
    </div>
  )
}
