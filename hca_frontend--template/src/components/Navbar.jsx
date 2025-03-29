import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav style={{ 
      background: '#add6ff', 
      color: '#27262c', 
      padding: '1rem 2rem',
      borderRadius: '25px',
      display: 'flex',
      justifyContent: 'flex-end',
      boxShadow: '0 4px 8px rgba(83, 150, 211, 0.5)'
    }}>
      <Link to="/" style={{ 
        color: '#27262c', 
        marginRight: '1.5rem',
        textDecoration: 'none',
        fontWeight: 'bold'
      }}>Home</Link>
      <Link to="/login" style={{ 
        color: '#27262c',
        textDecoration: 'none',
        fontWeight: 'bold'
      }}>Login</Link>
    </nav>
  )
}

export default Navbar
