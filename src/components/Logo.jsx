import React from 'react'

export default function Logo({ size = 48, showText = true }) {
  return (
    <div className="logo-container">
      <div className="logo-mark" style={{ width: size, height: size }}>
        <svg viewBox="0 0 60 60" width={size} height={size} aria-hidden="true">
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E5C158" />
              <stop offset="100%" stopColor="#C9A227" />
            </linearGradient>
          </defs>
          <path
            d="M12 40 Q30 32 30 40 Q30 32 48 40 L48 46 Q30 38 30 46 Q30 38 12 46 Z"
            fill="url(#goldGrad)"
          />
          <path
            d="M30 38 L30 18"
            stroke="url(#goldGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M30 8 L32 14 L38 14 L33 18 L35 24 L30 20 L25 24 L27 18 L22 14 L28 14 Z"
            fill="url(#goldGrad)"
          />
        </svg>
      </div>
      {showText && (
        <div className="logo-text">
          <h1 className="logo-name">SAMPACE</h1>
          <p className="logo-sub">EDUCATIONAL LTD</p>
        </div>
      )}
    </div>
  )
}
