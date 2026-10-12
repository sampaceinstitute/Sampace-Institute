import React, { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
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
import { findDivision } from './constants.js'

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
    default: return '/'
  }
}

function getPageTitle(routeObj) {
  const base = 'SAMPACE Educational Ltd'
  switch (routeObj.route) {
    case 'home': return `${base} — Empowering Learners`
    case 'schools': return `All Schools & Divisions — ${base}`
    case 'division': return `Division — ${base}`
    case 'courses': return `Course Catalog — ${base}`
    case 'about': return `About Us — ${base}`
    case 'contact': return `Contact Us — ${base}`
    case 'blog': return `Blog — ${base}`
    case 'blogPost': return `Article — ${base}`
    case 'faq': return `FAQ — ${base}`
    case 'apply': return `Apply Now — ${base}`
    case 'events': return `Events & Webinars — ${base}`
    case 'successStories': return `Success Stories — ${base}`
    case 'privacy': return `Privacy Policy — ${base}`
    case 'terms': return `Terms of Service — ${base}`
    case 'login': return `Sign In — ${base}`
    case 'signup': return `Create Account — ${base}`
    case 'resetPassword': return `Reset Password — ${base}`
    case 'notFound': return `Page Not Found — ${base}`
    default: return base
  }
}

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

  useEffect(() => {
    document.title = getPageTitle(routeObj)
  }, [routeObj])

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
      case 'schools':
        return <SchoolsPage onSelectDivision={(id) => navigate({ route: 'division', divisionId: id })} />
      case 'division':
        return <DivisionPage division={findDivision(routeObj.divisionId)} onBack={() => navigate('schools')} />
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
      case 'home':
        return <HomePage onNavigate={navigate} />
      case 'notFound':
      default:
        return <NotFoundPage onNavigate={navigate} />
    }
  }

  return (
    <div className="app">
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
