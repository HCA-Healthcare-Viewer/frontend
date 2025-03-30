// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login2'
import TextDownload from './pages/textDownload'
import Header from './components/header'
import Sidebar from './components/sidebar'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login2" element={<Login />} />
        <Route path="/textDownload" element={<TextDownload />} />
        <Route path="/header" element={<Header />} />
        <Route path="/sidebar" element={<Sidebar />} />
      </Routes>
    </Router>
  )
}

export default App
