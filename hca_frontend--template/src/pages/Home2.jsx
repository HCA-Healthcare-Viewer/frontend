// src/pages/Home.jsx
import React from 'react'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <h1>🏠 Home Page</h1>
        <p>Welcome to the dashboard home!</p>
      </div>
    </>
  )
}

export default Home
