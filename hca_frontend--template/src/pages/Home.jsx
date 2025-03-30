import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../pages/Home.css';
import FilterMenu from '../components/filterMenu';
import Message from '../components/message';

export default function Home() {
  // Store the two payloads separately
  const [messagesDeidentified, setMessagesDeidentified] = useState(null);
  const [messagesOriginal, setMessagesOriginal] = useState(null);
  const [error, setError] = useState(null);
  // New state to keep track of how many messages to display
  const [visibleCount, setVisibleCount] = useState(10);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    // First fetch for deidentified data
    try {
      const response = await fetch('http://localhost:8000/get_json', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      setMessagesDeidentified(data);
      setError(null);
      // Reset visibleCount when new messages are loaded
      setVisibleCount(10);
    } catch (err) {
      console.error('Error uploading deidentified file:', err);
      setError(err.message);
    }

    // Second fetch for original data (for testing, same API is used)
    try {
      const response2 = await fetch('http://localhost:8000/get_json', {
        method: 'POST',
        body: formData,
      });

      if (!response2.ok) {
        throw new Error(`Upload failed: ${response2.statusText}`);
      }

      const data2 = await response2.json();
      setMessagesOriginal(data2);
      setError(null);
      setVisibleCount(10);
    } catch (err) {
      console.error('Error uploading original file:', err);
      setError(err.message);
    }
  };

  // Function to render messages with lazy loading and pass compareData
  const renderMessages = () => {
    if (!messagesDeidentified) return 'Upload a file to view messages';
    
    // For array data
    if (Array.isArray(messagesDeidentified)) {
      return (
        <div className="messages-container">
          {messagesDeidentified.slice(0, visibleCount).map((message, index) => (
            <Message 
              key={index} 
              data={message} 
              index={index} 
              controlId={index}
              compareData={messagesOriginal ? messagesOriginal[index] : null}
            />
          ))}
        </div>
      );
    } 
    // For object data with keys
    else if (typeof messagesDeidentified === 'object' && messagesDeidentified !== null) {
      const entries = Object.entries(messagesDeidentified);
      return (
        <div className="messages-container">
          {entries.slice(0, visibleCount).map(([key, value], index) => (
            <Message 
              key={key} 
              data={value} 
              controlId={key}
              index={index}
              compareData={messagesOriginal ? messagesOriginal[key] : null}
            />
          ))}
        </div>
      );
    }
    
    // Fallback for other data types
    return <pre>{JSON.stringify(messagesDeidentified, null, 2)}</pre>;
  };

  // useEffect to implement lazy loading on scroll
  useEffect(() => {
    const scrollContainer = document.getElementById('message-display');
    
    const handleScroll = () => {
      if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - 100) {
        setVisibleCount(prevCount => prevCount + 50);
      }
    };
  
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
  

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
            {renderMessages()}
          </div>
        </div>
      </div>
    </div>
  );
}
