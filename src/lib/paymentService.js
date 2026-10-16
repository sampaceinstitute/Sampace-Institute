// ============================================================
// SAMPACE PAYMENT SERVICE
// Paystack + Supabase integration
// ============================================================

import { supabase, isSupabaseConfigured } from './supabaseClient.js'

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY

export function getPaystackPublicKey() {
  return PAYSTACK_PUBLIC_KEY
}

export function isPaystackConfigured() {
  return Boolean(PAYSTACK_PUBLIC_KEY)
}

// Generate a unique payment reference
export function generatePaymentReference() {
  const year = new Date().getFullYear()
  const random = Math.floor(100000 + Math.random() * 900000)
  return `PAY-${year}-${random}`
}

// Load Paystack inline script
export function loadPaystack() {
  return new Promise((resolve, reject) => {
    if (window.PaystackPop) return resolve(window.PaystackPop)

    const existing = document.querySelector('script[src*="paystack"]')
    if (existing) {
      existing.onload = () => resolve(window.PaystackPop)
      existing.onerror = reject
      return
    }

    const script = document.createElement('script')
    script.src = 'https://js.paystack.co/v1/inline.js'
    script.async = true
    script.onload = () => resolve(window.PaystackPop)
    script.onerror = reject
    document.head.appendChild(script)
  })
}

// Create a payment record in database (pending)
export async function createPaymentRecord({ userId, applicationId, reference, amount, purpose, description }) {
  if (!isSupabaseConfigured()) return { error: { message: 'Supabase not configured' } }
  try {
    const { data, error } = await supabase
      .from('payments')
      .insert({
        user_id: userId,
        application_id: applicationId || null,
        reference,
        amount: Math.round(amount * 100), // convert to kobo
        currency: 'NGN',
        channel: 'paystack',
        status: 'pending',
        purpose: purpose || 'course_fee',
        description: description || ''
      })
      .select()
      .maybeSingle()
    return { data, error }
  } catch (err) { return { error: err } }
}

// Mark payment success
export async function markPaymentSuccess(reference, paystackReference, metadata = {}) {
  if (!isSupabaseConfigured()) return { error: { message: 'Supabase not configured' } }
  try {
    const { data, error } = await supabase
      .from('payments')
      .update({
        status: 'success',
        paystack_reference: paystackReference,
        metadata,
        confirmed_at: new Date().toISOString()
      })
      .eq('reference', reference)
      .select()
      .maybeSingle()
    return { data, error }
  } catch (err) { return { error: err } }
}

export async function markPaymentFailed(reference) {
  if (!isSupabaseConfigured()) return { error: { message: 'Supabase not configured' } }
  try {
    const { data, error } = await supabase
      .from('payments')
      .update({ status: 'failed' })
      .eq('reference', reference)
      .select()
      .maybeSingle()
    return { data, error }
  } catch (err) { return { error: err } }
}

export async function getUserPayments(userId) {
  if (!isSupabaseConfigured() || !userId) return { data: [] }
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    return { data: data || [], error }
  } catch (err) { return { data: [], error: err } }
}

export async function getAllPayments() {
  if (!isSupabaseConfigured()) return { data: [] }
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500)
    return { data: data || [], error }
  } catch (err) { return { data: [], error: err } }
}

// Initiate Paystack popup
export async function openPaystackPopup({ email, amount, reference, onSuccess, onClose, metadata }) {
  const PaystackPop = await loadPaystack()
  const handler = PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email,
    amount: Math.round(amount * 100), // kobo
    currency: 'NGN',
    ref: reference,
    metadata: metadata || {},
    callback: (response) => onSuccess(response),
    onClose: () => onClose && onClose()
  })
  handler.openIframe()
  return handler
}
