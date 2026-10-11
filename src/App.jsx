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
import { findDivision } from './constants.js'

// ============================================================
// ROUTE PARSING — converts URL pathname into a route object
// ============================================================
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
  return { route: 'notFound' }
}

// ============================================================
// BUILD PATH — converts a route object into a URL pathname
// ============================================================
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
    default: return '/'
  }
}

// ============================================================
// PAGE TITLES — for SEO and browser tab
// ============================================================
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
    case 'notFound': return `Page Not Found — ${base}`
    default: return base
  }
}

export default function App() {
  const [mounted, setMounted] = useState(false)
  const [routeObj, setRouteObj] = useState(() => parseRoute(window.location.pathname))

  // Init: parse URL + listen for back/forward
  useEffect(() => {
    setMounted(true)

    const handlePopState = () => {
      const newRoute = parseRoute(window.location.pathname)
      setRouteObj(newRoute)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Update document title on route change
  useEffect(() => {
    document.title = getPageTitle(routeObj)
  }, [routeObj])

  const navigate = (target) => {
    const newRoute = typeof target === 'string' ? { route: target } : target
    const newPath = buildPath(newRoute)

    // Only push if path actually changed
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
        return (
          <SchoolsPage
            onSelectDivision={(id) => navigate({ route: 'division', divisionId: id })}
          />
        )
      case 'division':
        return (
          <DivisionPage
            division={findDivision(routeObj.divisionId)}
            onBack={() => navigate('schools')}
          />
        )
      case 'courses':
        return <CoursesPage onNavigate={navigate} />
      case 'about':
        return <AboutPage />
      case 'contact':
        return <ContactPage />
      case 'blog':
        return <BlogPage onNavigate={navigate} />
      case 'blogPost':
        return <BlogPostPage slug={routeObj.slug} onNavigate={navigate} />
      case 'faq':
        return <FAQPage />
      case 'apply':
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

      <Footer mounted={mounted} />
    </div>
  )
}
