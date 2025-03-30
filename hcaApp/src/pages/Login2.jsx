// src/pages/Login.jsx
import React from 'react'
import Navbar from '../components/Navbar'

const Login = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <h1>🔐 Login Page</h1>
        <form style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
          <input type="text" placeholder="Username" style={{ marginBottom: '1rem', padding: '0.5rem' }} />
          <input type="password" placeholder="Password" style={{ marginBottom: '1rem', padding: '0.5rem' }} />
          <button type="submit" style={{ padding: '0.5rem', background: '#333', color: '#fff' }}>
            Login
          </button>
        </form>
      </div>
    </>
  )
}

export default Login
