import React, { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import SchoolsPage from './pages/SchoolsPage.jsx'
import DivisionPage from './pages/DivisionPage.jsx'
import CoursesPage from './pages/CoursesPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import { findDivision } from './constants.js'

export default function App() {
  const [mounted, setMounted] = useState(false)
  const [route, setRoute] = useState('home')
  const [divisionId, setDivisionId] = useState(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navigate = (target) => {
    if (typeof target === 'string') {
      setRoute(target)
      setDivisionId(null)
    } else if (target?.route === 'division') {
      setDivisionId(target.id)
      setRoute('division')
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPage = () => {
    switch (route) {
      case 'schools':
        return <SchoolsPage onSelectDivision={(id) => navigate({ route: 'division', id })} />
      case 'division':
        return (
          <DivisionPage
            division={findDivision(divisionId)}
            onBack={() => navigate('schools')}
          />
        )
      case 'courses':
        return <CoursesPage onNavigate={navigate} />
      case 'about':
        return <AboutPage />
      case 'contact':
        return <ContactPage />
      case 'apply':
      case 'home':
      default:
        return <HomePage onNavigate={navigate} />
    }
  }

  return (
    <div className="app">
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <span key={i} className={`particle particle-${i % 5}`} />
        ))}
      </div>

      <Header currentRoute={route} onNavigate={navigate} mounted={mounted} />

      <div className="page-container">{renderPage()}</div>

      <Footer mounted={mounted} />
    </div>
  )
}
