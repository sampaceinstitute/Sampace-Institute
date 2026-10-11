import React, { useState, useMemo } from 'react'
import { BLOG_POSTS, BLOG_CATEGORIES } from '../data/blogPosts.js'

export default function BlogPage({ onNavigate }) {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return BLOG_POSTS.filter((p) => {
      if (category !== 'All' && p.category !== category) return false
      if (q) {
        const hay = `${p.title} ${p.excerpt} ${p.category}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [category, search])

  return (
    <main className="blog-page">
      <div className="page-header">
        <div className="badge">
          <span className="badge-dot" />
          {BLOG_POSTS.length} Articles
        </div>
        <h1 className="page-title">SAMPACE Blog</h1>
        <p className="page-subtitle">
          Insights on exams, technology, and the future of education.
        </p>
      </div>

      <div className="blog-controls">
        <div className="blog-search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="blog-categories">
          {BLOG_CATEGORIES.map((c) => (
            <button
              key={c}
              className={`category-pill ${category === c ? 'active' : ''}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No articles found</h3>
          <p>Try a different search or category.</p>
          <button
            className="btn btn-primary"
            onClick={() => { setSearch(''); setCategory('All') }}
          >
            Reset
          </button>
        </div>
      ) : (
        <div className="blog-full-grid">
          {filtered.map((post) => (
            <button
              key={post.slug}
              className="blog-card"
              onClick={() => onNavigate({ route: 'blogPost', slug: post.slug })}
            >
              <div className="blog-card-category">{post.category}</div>
              <h3 className="blog-card-title">{post.title}</h3>
              <p className="blog-card-excerpt">{post.excerpt}</p>
              <div className="blog-card-meta">
                <span>{post.author}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <div className="blog-card-cta">
                Read Article <span>→</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </main>
  )
}
