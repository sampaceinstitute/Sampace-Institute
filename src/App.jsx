    case 'adminResultTemplates': return '/admin/result-templates'
    case 'adminResults': return '/admin/results'
    case 'studentReportCard': return '/report-card'
    case 'adminApplications': return '/admin/applications'
    case 'adminApplicationDetail': return `/admin/applications/${routeObj.id}`
    case 'studentExams': return '/student/exams'
    case 'studentExamTaking': return `/student/exams/${routeObj.id}`
    case 'studentResults': return '/student/results'
    case 'studentResultDetail': return `/student/results/${routeObj.id}`
    case 'studentInbox': return '/student/inbox'
    default: return '/'
  }
}

function getPageTitle(routeObj) {
  const base = 'SAMPACE Educational Ltd'
  const map = {
    home: `${base} — Empowering Learners`,
    dashboard: `My Dashboard — ${base}`,
    adminExams: `Exam Manager — ${base}`,
    adminExamView: `Exam Details — ${base}`,
    adminExamEditor: `Edit Exam — ${base}`,
    adminResultTemplates: `Result Templates — ${base}`,
    adminResults: `Results Entry — ${base}`,
    studentReportCard: `My Report Card — ${base}`
  }
  return map[routeObj.route] || base
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
      case 'forSchools': return <ForSchoolsPage />
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
      case 'adminMessages': return <ProtectedRoute onNavigate={navigate} requiredRoles={ADMIN_ROLES}><AdminMessagesPage onNavigate={navigate} /></ProtectedRoute>
      case 'adminExams': return <ProtectedRoute onNavigate={navigate} requiredRoles={ADMIN_ROLES}><AdminExamsPage onNavigate={navigate} /></ProtectedRoute>
      case 'adminExamView': return <ProtectedRoute onNavigate={navigate} requiredRoles={ADMIN_ROLES}><AdminExamViewPage id={routeObj.id} onNavigate={navigate} /></ProtectedRoute>
      case 'adminExamEditor': return <ProtectedRoute onNavigate={navigate} requiredRoles={ADMIN_ROLES}><AdminExamEditorPage id={routeObj.id} onNavigate={navigate} /></ProtectedRoute>
      case 'adminGrading': return <ProtectedRoute onNavigate={navigate} requiredRoles={ADMIN_ROLES}><AdminGradingPage onNavigate={navigate} /></ProtectedRoute>
      case 'adminGradingDetail': return <ProtectedRoute onNavigate={navigate} requiredRoles={ADMIN_ROLES}><AdminGradingDetailPage id={routeObj.id} onNavigate={navigate} /></ProtectedRoute>
      case 'adminResultTemplates': return <ProtectedRoute onNavigate={navigate} requiredRoles={['super_admin', 'admin']}><AdminResultTemplatesPage onNavigate={navigate} /></ProtectedRoute>
      case 'adminResults': return <ProtectedRoute onNavigate={navigate} requiredRoles={['super_admin', 'admin', 'teacher']}><AdminResultsEntryPage onNavigate={navigate} /></ProtectedRoute>
      case 'studentReportCard': return <ProtectedRoute onNavigate={navigate} requiredRoles={['student']}><StudentReportCardPage onNavigate={navigate} /></ProtectedRoute>
      case 'studentExams': return <ProtectedRoute onNavigate={navigate}><StudentExamsPage onNavigate={navigate} /></ProtectedRoute>
      case 'studentExamTaking': return <ProtectedRoute onNavigate={navigate}><StudentExamTakingPage id={routeObj.id} onNavigate={navigate} /></ProtectedRoute>
      case 'studentResults': return <ProtectedRoute onNavigate={navigate}><StudentResultsPage onNavigate={navigate} /></ProtectedRoute>
      case 'studentResultDetail': return <ProtectedRoute onNavigate={navigate}><StudentResultDetailPage id={routeObj.id} onNavigate={navigate} /></ProtectedRoute>
      case 'studentInbox': return <ProtectedRoute onNavigate={navigate}><StudentInboxPage onNavigate={navigate} /></ProtectedRoute>
      case 'dashboard': return <ProtectedRoute onNavigate={navigate}><RoleAwareDashboard onNavigate={navigate} /></ProtectedRoute>
      case 'home': return <HomePage onNavigate={navigate} />
      case 'notFound':
      default: return <NotFoundPage onNavigate={navigate} />
    }
  }

  return (
    <div className="app">
      <SEOHelmet title={getPageTitle(routeObj)} />
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
