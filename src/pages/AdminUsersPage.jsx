import React, { useEffect, useState } from 'react'
import {
  getAllUsers,
  getAllRoles,
  getAllOrganisations,
  getUserRoles,
  assignRole,
  removeUserRole
} from '../lib/dataService.js'

export default function AdminUsersPage({ onNavigate }) {
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])
  const [orgs, setOrgs] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState(null)
  const [userRoles, setUserRoles] = useState([])
  const [assigning, setAssigning] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    roleId: '',
    organisationId: ''
  })

  useEffect(() => {
    const load = async () => {
      const [uRes, rRes, oRes] = await Promise.all([
        getAllUsers(),
        getAllRoles(),
        getAllOrganisations()
      ])
      setUsers(uRes.data || [])
      setRoles(rRes.data || [])
      setOrgs(oRes.data || [])
      setLoading(false)
    }
    load()
  }, [])

  const openUser = async (user) => {
    setSelectedUser(user)
    setForm({ roleId: '', organisationId: '' })
    setError('')
    const res = await getUserRoles(user.id)
    setUserRoles(res.data || [])
  }

  const handleAssign = async (e) => {
    e.preventDefault()
    if (!form.roleId) {
      setError('Please select a role.')
      return
    }

    setAssigning(true)
    setError('')

    const res = await assignRole({
      userId: selectedUser.id,
      roleId: parseInt(form.roleId, 10),
      organisationId: form.organisationId || null
    })

    if (res.error) {
      setError(res.error.message || 'Could not assign role.')
      setAssigning(false)
      return
    }

    const fresh = await getUserRoles(selectedUser.id)
    setUserRoles(fresh.data || [])
    setForm({ roleId: '', organisationId: '' })
    setAssigning(false)
  }

  const handleRemove = async (id) => {
    const res = await removeUserRole(id)
    if (!res.error) {
      const fresh = await getUserRoles(selectedUser.id)
      setUserRoles(fresh.data || [])
    }
  }

  return (
    <main className="admin-users-page">
      <button className="back-button" onClick={() => onNavigate('dashboard')}>
        ← Back to Dashboard
      </button>

      <div className="page-header">
        <div className="badge">
          <span className="badge-dot" />
          Admin · User Management
        </div>
        <h1 className="page-title">Users & Roles</h1>
        <p className="page-subtitle">
          Assign roles, manage access, and control permissions.
        </p>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner" />
          <p>Loading users...</p>
        </div>
      ) : (
        <div className="admin-users-grid">
          <div className="admin-users-list-panel">
            <h3 className="panel-title">All Users ({users.length})</h3>
            <div className="admin-users-scroll">
              {users.map((u) => (
                <button
                  key={u.id}
                  className={`admin-user-row ${selectedUser?.id === u.id ? 'active' : ''}`}
                  onClick={() => openUser(u)}
                >
                  <div className="admin-user-row-avatar">
                    {(u.full_name || u.email || '?')[0].toUpperCase()}
                  </div>
                  <div className="admin-user-row-info">
                    <div className="admin-user-row-name">{u.full_name || 'Unnamed'}</div>
                    <div className="admin-user-row-email">{u.email}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="admin-users-detail-panel">
            {!selectedUser ? (
              <div className="admin-users-empty">
                <p>Select a user to manage their roles.</p>
              </div>
            ) : (
              <>
                <div className="admin-user-detail-header">
                  <div className="admin-user-detail-avatar">
                    {(selectedUser.full_name || selectedUser.email || '?')[0].toUpperCase()}
                  </div>
                  <div>
                    <h3>{selectedUser.full_name || 'Unnamed User'}</h3>
                    <p>{selectedUser.email}</p>
                  </div>
                </div>

                <div className="admin-section">
                  <h4 className="admin-section-title">Current Roles ({userRoles.length})</h4>
                  {userRoles.length === 0 ? (
                    <p className="admin-empty-text">No roles assigned yet.</p>
                  ) : (
                    <div className="admin-role-chips">
                      {userRoles.map((ur) => (
                        <div key={ur.id} className="admin-role-chip">
                          <div>
                            <strong>{ur.roles?.name}</strong>
                            {ur.organisations?.name && (
                              <span className="admin-role-chip-org"> · {ur.organisations.name}</span>
                            )}
                          </div>
                          <button
                            className="admin-role-chip-remove"
                            onClick={() => handleRemove(ur.id)}
                            aria-label="Remove role"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="admin-section">
                  <h4 className="admin-section-title">Assign a Role</h4>
                  <form className="admin-assign-form" onSubmit={handleAssign}>
                    {error && <div className="auth-error"><span>⚠️</span> {error}</div>}

                    <label className="form-field">
                      <span>Role *</span>
                      <select
                        value={form.roleId}
                        onChange={(e) => setForm({ ...form, roleId: e.target.value })}
                        required
                      >
                        <option value="">Select a role</option>
                        {roles.map((r) => (
                          <option key={r.id} value={r.id}>
                            L{r.level} · {r.name}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="form-field">
                      <span>Organisation (optional)</span>
                      <select
                        value={form.organisationId}
                        onChange={(e) => setForm({ ...form, organisationId: e.target.value })}
                      >
                        <option value="">None</option>
                        {orgs.map((o) => (
                          <option key={o.id} value={o.id}>
                            {o.icon} {o.name}
                          </option>
                        ))}
                      </select>
                    </label>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={assigning}
                    >
                      {assigning ? 'Assigning...' : 'Assign Role →'}
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
