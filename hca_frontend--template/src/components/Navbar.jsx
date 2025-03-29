import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav style={{ background: '#333', color: '#fff', padding: '1rem' }}>
      <Link to="/" style={{ color: '#fff', marginRight: '1rem' }}>Home</Link>
      <Link to="/login" style={{ color: '#fff' }}>Login</Link>
    </nav>
  )
}

export default Navbar
