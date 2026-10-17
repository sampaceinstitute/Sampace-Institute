import React from 'react'

export default function LoadingButton({
  loading = false,
  loadingText = 'Processing...',
  children,
  className = 'btn btn-primary',
  disabled = false,
  ...props
}) {
  return (
    <button
      className={className}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <span className="loading-btn-content">
          <span className="loading-btn-spinner" />
          {loadingText}
        </span>
      ) : (
        children
      )}
    </button>
  )
}
