import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient.js'
import { sendWelcomeEmail } from '../lib/emailService.js'
import { clearAttempts } from '../lib/rateLimiter.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false)
      return
    }

    let mounted = true

    const loadSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!mounted) return

        if (session?.user) {
          setUser(session.user)
          await loadProfileAndRoles(session.user.id)
        }
      } catch (err) {
        console.error('[Auth] session load error:', err)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return
        if (session?.user) {
          setUser(session.user)
          await loadProfileAndRoles(session.user.id)
        } else {
          setUser(null)
          setProfile(null)
          setRoles([])
        }
      }
    )

    return () => {
      mounted = false
      subscription?.unsubscribe()
    }
  }, [])

  const loadProfileAndRoles = async (userId) => {
    try {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle()

      if (profileData) setProfile(profileData)

      const { data: roleData } = await supabase
        .from('user_roles')
        .select(`
          id,
          appointment_status,
          roles ( code, name, level ),
          organisations ( code, name, icon )
        `)
        .eq('user_id', userId)
        .eq('appointment_status', 'active')

      if (roleData) setRoles(roleData)
    } catch (err) {
      console.error('[Auth] profile/roles load error:', err)
    }
  }

  const logAudit = async (action, metadata = {}) => {
    try {
      await supabase.from('audit_logs').insert({
        actor_id: user?.id || null,
        action,
        resource: 'auth',
        metadata,
        user_agent: navigator.userAgent
      })
    } catch (err) {
      console.warn('[Audit] log failed:', err)
    }
  }

  const signUp = async ({ email, password, fullName, phone }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, phone }
      }
    })

    // Fire welcome email asynchronously (do not block signup on this)
    if (!error && data?.user) {
      sendWelcomeEmail({ to: email, name: fullName }).then((result) => {
        if (result.error) {
          console.warn('[Auth] Welcome email failed but signup succeeded:', result.error)
        }
      })
    }

    return { data, error }
  }

  const signIn = async ({ email, password, rememberMe = true }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (!error && data?.user) {
      clearAttempts()
      await logAudit('login_success', { email, rememberMe })
    } else {
      await logAudit('login_failed', { email, reason: error?.message })
    }

    return { data, error }
  }

  const signOut = async () => {
    await logAudit('logout', {})
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  const resetPassword = async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/set-new-password`
    })
    if (!error) await logAudit('password_reset_requested', { email })
    return { data, error }
  }

  const updateProfile = async (updates) => {
    if (!user?.id) return { error: { message: 'Not authenticated' } }

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .maybeSingle()

    if (!error && data) {
      setProfile(data)
      await logAudit('profile_updated', { fields: Object.keys(updates) })
    }

    return { data, error }
  }

  const hasRole = (roleCode) => roles.some((r) => r.roles?.code === roleCode)
  const hasAnyRole = (codes = []) => codes.some((c) => hasRole(c))

  const value = {
    user,
    profile,
    roles,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile,
    hasRole,
    hasAnyRole,
    isAuthenticated: Boolean(user)
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
