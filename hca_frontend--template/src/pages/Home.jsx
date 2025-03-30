import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../pages/Home.css';
import FilterMenu from '../components/filterMenu';

export default function Home() {
  const [messages, setMessages] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Adjust the URL if your backend is on a different domain/port
      const response = await fetch('http://localhost:8000/get_json', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      setMessages(data);
      setError(null);
    } catch (err) {
      console.error('Error uploading file:', err);
      setError(err.message);
    }
  };

  return (
    <div className="home-container">
      <header>
        <h2>HCA Data Dashboard</h2>
        <Navbar />
      </header>
      <div id="wrapper">
        <div id="sidebar">
          <div className="file-upload">
            <label htmlFor="hl7-file-upload">Upload HL7 File:</label>
            <input 
              type="file" 
              id="hl7-file-upload" 
              accept=".hl7,.txt"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div id="main-content">
          <div id="filter-bar">
            <FilterMenu filter_type="Message Control ID" position="first" />
            <FilterMenu filter_type="MRN" position="middle" />
            <FilterMenu filter_type="Last Name" position="last" />
          </div>
          <div id="message-display">
            {error && <p className="error">{error}</p>}
            {messages ? (
              <pre>{JSON.stringify(messages, null, 2)}</pre>
            ) : (
              'insert messages here'
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
