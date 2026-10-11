import React from 'react'
import { ALL_DIVISIONS } from '../constants.js'

const MODES = ['All Modes', 'Online', 'Physical', 'Hybrid']

export default function CourseFilters({
  search,
  setSearch,
  selectedSchool,
  setSelectedSchool,
  selectedMode,
  setSelectedMode,
  resultCount,
  onReset
}) {
  return (
    <div className="course-filters">
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search 400+ courses... (try 'JAMB', 'AI', 'cyber', 'space')"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button
            className="search-clear"
            onClick={() => setSearch('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      <div className="filters-row">
        <div className="filter-group">
          <label className="filter-label">School</label>
          <select
            className="filter-select"
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
          >
            <option value="all">All Schools</option>
            {ALL_DIVISIONS.map((div) => (
              <option key={div.id} value={div.id}>
                {div.icon} {div.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Mode</label>
          <select
            className="filter-select"
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value)}
          >
            {MODES.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group filter-actions">
          <button className="btn-reset" onClick={onReset}>
            Reset Filters
          </button>
        </div>
      </div>

      <div className="filter-result-count">
        <span className="result-num">{resultCount}</span> courses found
        {(search || selectedSchool !== 'all' || selectedMode !== 'All Modes') && (
          <span className="result-filtered"> · filtered</span>
        )}
      </div>
    </div>
  )
}
