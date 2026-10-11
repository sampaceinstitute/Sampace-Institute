import React, { useState, useMemo, useEffect } from 'react'
import { ALL_DIVISIONS } from '../constants.js'
import CourseCard from '../components/CourseCard.jsx'
import CourseFilters from '../components/CourseFilters.jsx'
import EnrollModal from '../components/EnrollModal.jsx'

// Build a flat course catalog from constants
function buildCatalog() {
  const catalog = []
  ALL_DIVISIONS.forEach((div) => {
    div.departments.forEach((dept) => {
      dept.courses.forEach((courseTitle, idx) => {
        catalog.push({
          courseId: `${div.id}-${dept.id}-${idx}`,
          title: courseTitle,
          school: div.name,
          schoolShort: div.short,
          schoolId: div.id,
          schoolIcon: div.icon,
          schoolColor: div.color,
          department: dept.name,
          mode: 'Online · Physical · Hybrid'
        })
      })
    })
  })
  return catalog
}

const CATALOG = buildCatalog()

export default function CoursesPage() {
  const [search, setSearch] = useState('')
  const [selectedSchool, setSelectedSchool] = useState('all')
  const [selectedMode, setSelectedMode] = useState('All Modes')
  const [visibleCount, setVisibleCount] = useState(24)
  const [enrollCourse, setEnrollCourse] = useState(null)
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Read URL query params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const s = params.get('search')
    const sch = params.get('school')
    if (s) setSearch(s)
    if (sch) setSelectedSchool(sch)
  }, [])

  // Sync filters to URL
  useEffect(() => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (selectedSchool !== 'all') params.set('school', selectedSchool)
    const qs = params.toString()
    const newUrl = qs ? `?${qs}` : window.location.pathname
    window.history.replaceState({}, '', newUrl)
  }, [search, selectedSchool])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return CATALOG.filter((c) => {
      if (selectedSchool !== 'all' && c.schoolId !== selectedSchool) return false
      if (q) {
        const haystack = `${c.title} ${c.school} ${c.department}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [search, selectedSchool, selectedMode])

  const visible = filtered.slice(0, visibleCount)

  const resetFilters = () => {
    setSearch('')
    setSelectedSchool('all')
    setSelectedMode('All Modes')
    setVisibleCount(24)
  }

  return (
    <main className="courses-page">
      <div className="page-header">
        <div className="badge">
          <span className="badge-dot" />
          {CATALOG.length}+ Courses
        </div>
        <h1 className="page-title">Course Catalog</h1>
        <p className="page-subtitle">
          Search, filter, and enroll across every SAMPACE school.
        </p>
      </div>

      <button
        className="mobile-filter-toggle"
        onClick={() => setFiltersOpen(!filtersOpen)}
      >
        {filtersOpen ? '✕ Close Filters' : '🔍 Search & Filter'}
      </button>

      <div className={`filters-wrapper ${filtersOpen ? 'open' : ''}`}>
        <CourseFilters
          search={search}
          setSearch={setSearch}
          selectedSchool={selectedSchool}
          setSelectedSchool={setSelectedSchool}
          selectedMode={selectedMode}
          setSelectedMode={setSelectedMode}
          resultCount={filtered.length}
          onReset={resetFilters}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No courses match your search</h3>
          <p>Try a different keyword, or reset your filters.</p>
          <button className="btn btn-primary" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          <div className="courses-grid">
            {visible.map((c) => (
              <CourseCard key={c.courseId} course={c} onEnroll={setEnrollCourse} />
            ))}
          </div>

          {visibleCount < filtered.length && (
            <div className="load-more-wrapper">
              <button
                className="btn btn-outline"
                onClick={() => setVisibleCount((v) => v + 24)}
              >
                Load More ({filtered.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      )}

      {enrollCourse && (
        <EnrollModal course={enrollCourse} onClose={() => setEnrollCourse(null)} />
      )}
    </main>
  )
}
