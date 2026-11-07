import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Contexts
import { AuthProvider } from './contexts/AuthContext';
import { RoleProvider } from './contexts/RoleContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppBar from './components/WhatsAppBar';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SchoolsPage from './pages/SchoolsPage';
import DivisionPage from './pages/DivisionPage';
import CoursesPage from './pages/CoursesPage';
import ApplyPage from './pages/ApplyPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import EventsPage from './pages/EventsPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';

// Auth Pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import SetNewPasswordPage from './pages/SetNewPasswordPage';

// Protected: Shared
import DashboardPage from './pages/DashboardPage'; // RoleContext redirects from here
import ProfilePage from './pages/ProfilePage';
import WalletPage from './pages/WalletPage';

// Protected: Student
import StudentDashboard from './pages/StudentDashboard';
import StudentExamsPage from './pages/StudentExamsPage';
import StudentExamTakingPage from './pages/StudentExamTakingPage';
import StudentResultsPage from './pages/StudentResultsPage';
import StudentResultDetailPage from './pages/StudentResultDetailPage';
import StudentInboxPage from './pages/StudentInboxPage';
import MyApplicationsPage from './pages/MyApplicationsPage';
import StudentReportCardPage from './pages/StudentReportCardPage'; // NEW

// Protected: Teacher
import TeacherDashboard from './pages/TeacherDashboard';

// Protected: Parent
import ParentDashboard from './pages/ParentDashboard';

// Protected: Admin
import AdminDashboard from './pages/AdminDashboard';
import AdminAnalyticsPage from './pages/AdminAnalyticsPage';
import AdminApplicationsPage from './pages/AdminApplicationsPage';
import AdminApplicationDetailPage from './pages/AdminApplicationDetailPage';
import AdminExamsPage from './pages/AdminExamsPage';
import AdminExamEditorPage from './pages/AdminExamEditorPage';
import AdminExamViewPage from './pages/AdminExamViewPage';
import AdminGradingPage from './pages/AdminGradingPage';
import AdminGradingDetailPage from './pages/AdminGradingDetailPage';
import AdminMessagesPage from './pages/AdminMessagesPage';
import AdminPaymentsPage from './pages/AdminPaymentsPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminResultTemplatesPage from './pages/AdminResultTemplatesPage'; // NEW
import AdminResultsEntryPage from './pages/AdminResultsEntryPage'; // NEW

// Styles
import './premium.css'; // Main new theme
import './index.css';   // Legacy portal theme

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <RoleProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Header />
              
              <main className="flex-grow">
                <Routes>
                  {/* ================= PUBLIC ROUTES ================= */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/schools" element={<SchoolsPage />} />
                  <Route path="/schools/:divisionSlug" element={<DivisionPage />} />
                  <Route path="/courses" element={<CoursesPage />} />
                  <Route path="/apply" element={<ApplyPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:postSlug" element={<BlogPostPage />} />
                  <Route path="/events" element={<EventsPage />} />
                  <Route path="/success-stories" element={<SuccessStoriesPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/terms" element={<TermsPage />} />

                  {/* ================= AUTH ROUTES ================= */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/reset-password" element={<ResetPasswordPage />} />
                  <Route path="/set-new-password" element={<SetNewPasswordPage />} />

                  {/* ================= SHARED PROTECTED ROUTES ================= */}
                  <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                  <Route path="/wallet" element={<ProtectedRoute><WalletPage /></ProtectedRoute>} />
                  <Route path="/my-applications" element={<ProtectedRoute><MyApplicationsPage /></ProtectedRoute>} />

                  {/* ================= STUDENT ROUTES ================= */}
                  <Route path="/student" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
                  <Route path="/student/exams" element={<ProtectedRoute allowedRoles={['student']}><StudentExamsPage /></ProtectedRoute>} />
                  <Route path="/student/exam/:examId" element={<ProtectedRoute allowedRoles={['student']}><StudentExamTakingPage /></ProtectedRoute>} />
                  <Route path="/student/results" element={<ProtectedRoute allowedRoles={['student']}><StudentResultsPage /></ProtectedRoute>} />
                  <Route path="/student/results/:attemptId" element={<ProtectedRoute allowedRoles={['student']}><StudentResultDetailPage /></ProtectedRoute>} />
                  <Route path="/student/inbox" element={<ProtectedRoute allowedRoles={['student']}><StudentInboxPage /></ProtectedRoute>} />
                  <Route path="/student/report-card" element={<ProtectedRoute allowedRoles={['student']}><StudentReportCardPage /></ProtectedRoute>} />

                  {/* ================= TEACHER ROUTES ================= */}
                  <Route path="/teacher" element={<ProtectedRoute allowedRoles={['teacher', 'admin']}><TeacherDashboard /></ProtectedRoute>} />

                  {/* ================= PARENT ROUTES ================= */}
                  <Route path="/parent" element={<ProtectedRoute allowedRoles={['parent']}><ParentDashboard /></ProtectedRoute>} />

                  {/* ================= ADMIN ROUTES ================= */}
                  <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><AdminDashboard /></ProtectedRoute>} />
                  <Route path="/admin/analytics" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><AdminAnalyticsPage /></ProtectedRoute>} />
                  <Route path="/admin/applications" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><AdminApplicationsPage /></ProtectedRoute>} />
                  <Route path="/admin/applications/:id" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><AdminApplicationDetailPage /></ProtectedRoute>} />
                  <Route path="/admin/payments" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><AdminPaymentsPage /></ProtectedRoute>} />
                  <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><AdminUsersPage /></ProtectedRoute>} />
                  <Route path="/admin/messages" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><AdminMessagesPage /></ProtectedRoute>} />
                  
                  {/* Admin Exams */}
                  <Route path="/admin/exams" element={<ProtectedRoute allowedRoles={['admin', 'super_admin', 'teacher']}><AdminExamsPage /></ProtectedRoute>} />
                  <Route path="/admin/exams/new" element={<ProtectedRoute allowedRoles={['admin', 'super_admin', 'teacher']}><AdminExamEditorPage /></ProtectedRoute>} />
                  <Route path="/admin/exams/:examId" element={<ProtectedRoute allowedRoles={['admin', 'super_admin', 'teacher']}><AdminExamViewPage /></ProtectedRoute>} />
                  <Route path="/admin/exams/:examId/edit" element={<ProtectedRoute allowedRoles={['admin', 'super_admin', 'teacher']}><AdminExamEditorPage /></ProtectedRoute>} />
                  <Route path="/admin/grading" element={<ProtectedRoute allowedRoles={['admin', 'super_admin', 'teacher']}><AdminGradingPage /></ProtectedRoute>} />
                  <Route path="/admin/grading/:attemptId" element={<ProtectedRoute allowedRoles={['admin', 'super_admin', 'teacher']}><AdminGradingDetailPage /></ProtectedRoute>} />
                  
                  {/* NEW: Report Card & Results Entry */}
                  <Route path="/admin/result-templates" element={<ProtectedRoute allowedRoles={['admin', 'super_admin']}><AdminResultTemplatesPage /></ProtectedRoute>} />
                  <Route path="/admin/results" element={<ProtectedRoute allowedRoles={['admin', 'super_admin', 'teacher']}><AdminResultsEntryPage /></ProtectedRoute>} />

                  {/* ================= FALLBACK ================= */}
                  <Route path="/404" element={<NotFoundPage />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
              </main>

              <Footer />
              <WhatsAppBar />
            </div>
          </Router>
        </RoleProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
