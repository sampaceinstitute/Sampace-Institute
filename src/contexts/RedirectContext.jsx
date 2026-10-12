import React, { createContext, useContext, useState, useEffect } from 'react'

const RedirectContext = createContext(null)

export function RedirectProvider({ children }) {
  const [redirectTo, setRedirectTo] = useState(null)

  const saveRedirect = (path) => {
    sessionStorage.setItem('sampace_redirect_after_login', path)
    setRedirectTo(path)
  }

  const consumeRedirect = () => {
    const saved = sessionStorage.getItem('sampace_redirect_after_login')
    sessionStorage.removeItem('sampace_redirect_after_login')
    setRedirectTo(null)
    return saved
  }

  return (
    <RedirectContext.Provider value={{ redirectTo, saveRedirect, consumeRedirect }}>
      {children}
    </RedirectContext.Provider>
  )
}

export function useRedirect() {
  const ctx = useContext(RedirectContext)
  if (!ctx) throw new Error('useRedirect must be used within RedirectProvider')
  return ctx
}
