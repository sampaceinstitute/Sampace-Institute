import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('[SAMPACE ErrorBoundary]', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary-inner">
            <div className="error-boundary-icon">⚠️</div>
            <h1 className="error-boundary-title">Something went wrong</h1>
            <p className="error-boundary-text">
              We've logged this error. Please refresh the page — if it happens again, contact support.
            </p>
            <div className="error-boundary-actions">
              <button
                className="btn btn-primary"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </button>
              <a
                href="https://wa.me/2347082166496"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Contact Support
              </a>
            </div>
            <details className="error-boundary-details">
              <summary>Technical Details</summary>
              <pre>{this.state.error?.toString()}</pre>
            </details>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
