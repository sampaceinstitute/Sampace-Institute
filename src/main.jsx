import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { RoleProvider } from './contexts/RoleContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RoleProvider>
        <App />
      </RoleProvider>
    </AuthProvider>
  </React.StrictMode>
)
