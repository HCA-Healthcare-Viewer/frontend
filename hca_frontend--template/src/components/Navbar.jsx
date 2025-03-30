import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav style={{ 
      background: '#add6ff', 
      color: '#27262c', 
      padding: '0.5rem 1rem',
      borderRadius: '10px',
      display: 'flex',
      justifyContent: 'flex-end',
      boxShadow: '0 4px 8px rgba(83, 150, 211, 0.5)'
    }}>
      <Link to="/" style={{ 
        color: '#27262c', 
        paddingRight: '.5rem',
        textDecoration: 'none',
        fontWeight: 'bold',
        borderRight: '1px solid black'
      }}>Home</Link>
      <Link to="/textDownload" style={{ 
        color: '#27262c',
        textDecoration: 'none',
        fontWeight: 'bold',
        paddingLeft: '.5rem',
        paddingRight: '.5rem',
        borderRight: '1px solid black'
      }}>Text Download</Link>
      <Link to="/login" style={{ 
        color: '#27262c',
        textDecoration: 'none',
        fontWeight: 'bold',
        paddingLeft: '.5rem'
      }}>Login</Link>
    </nav>
  )
}

export default Navbar
