<div className="user-dropdown-divider" />

<button className="user-dropdown-item" onClick={() => { setOpen(false); onNavigate('dashboard') }}>
  🏠 My Dashboard
</button>
<button className="user-dropdown-item" onClick={() => { setOpen(false); onNavigate('courses') }}>
  📚 Browse Courses
</button>
<button className="user-dropdown-item" onClick={() => { setOpen(false); onNavigate('apply') }}>
  📝 Apply
</button>
<button className="user-dropdown-item" onClick={() => { setOpen(false); onNavigate('myApplications') }}>
  📋 My Applications
</button>
<button className="user-dropdown-item" onClick={() => { setOpen(false); onNavigate('profile') }}>
  ⚙️ Profile Settings
</button>

<div className="user-dropdown-divider" />

<button className="user-dropdown-item user-dropdown-signout" onClick={handleSignOut}>
  🚪 Sign Out
</button>
