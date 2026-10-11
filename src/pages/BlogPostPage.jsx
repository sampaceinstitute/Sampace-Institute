import React from 'react'
import { findPost, BLOG_POSTS } from '../data/blogPosts.js'

export default function BlogPostPage({ slug, onNavigate }) {
  const post = findPost(slug)

  if (!post) {
    return (
      <main className="blog-post-page">
        <div className="empty-state">
          <div className="empty-icon">📄</div>
          <h3>Article not found</h3>
          <button className="btn btn-primary" onClick={() => onNavigate('blog')}>
            Back to Blog
          </button>
        </div>
      </main>
    )
  }

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 2)

  return (
    <main className="blog-post-page">
      <button className="back-button" onClick={() => onNavigate('blog')}>
        ← Back to Blog
      </button>

      <article className="blog-post">
        <div className="blog-post-category">{post.category}</div>
        <h1 className="blog-post-title">{post.title}</h1>
        <div className="blog-post-meta">
          <span>{post.author}</span>
          <span>·</span>
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>

        <div className="blog-post-content">
          {post.content.split('\n\n').map((para, i) => {
            const trimmed = para.trim()
            if (!trimmed) return null
            if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
              return <h3 key={i} className="blog-post-h3">{trimmed.replace(/\*\*/g, '')}</h3>
            }
            if (trimmed.startsWith('- ')) {
              const items = trimmed.split('\n').map((line) => line.replace(/^-\s*/, ''))
              return (
                <ul key={i} className="blog-post-list">
                  {items.map((it, j) => <li key={j}>{it}</li>)}
                </ul>
              )
            }
            return <p key={i} className="blog-post-para">{trimmed}</p>
          })}
        </div>

        <div className="blog-post-cta">
          <p>Ready to start learning? Explore our courses.</p>
          <button className="btn btn-primary" onClick={() => onNavigate('courses')}>
            Browse Courses →
          </button>
        </div>
      </article>

      {related.length > 0 && (
        <section className="related-posts">
          <h3 className="related-title">Related Articles</h3>
          <div className="blog-grid">
            {related.map((r) => (
              <button
                key={r.slug}
                className="blog-card"
                onClick={() => onNavigate({ route: 'blogPost', slug: r.slug })}
              >
                <div className="blog-card-category">{r.category}</div>
                <h3 className="blog-card-title">{r.title}</h3>
                <p className="blog-card-excerpt">{r.excerpt}</p>
                <div className="blog-card-cta">Read Article <span>→</span></div>
              </button>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
