import React from 'react'
import { BLOG_POSTS } from '../data/blogPosts.js'

export default function BlogPreview({ onNavigate }) {
  const recent = BLOG_POSTS.slice(0, 3)

  return (
    <section className="blog-preview">
      <div className="section-header">
        <div className="badge">
          <span className="badge-dot" />
          From the Blog
        </div>
        <h2 className="section-title">Education Insights</h2>
        <p className="section-subtitle">
          Exam tips, tech trends, and future-of-work analysis — fresh every week.
        </p>
      </div>

      <div className="blog-grid">
        {recent.map((post) => (
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

      <div className="blog-preview-cta">
        <button className="btn btn-outline" onClick={() => onNavigate('blog')}>
          View All Articles →
        </button>
      </div>
    </section>
  )
}
