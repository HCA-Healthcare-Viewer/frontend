import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../pages/Home.css';
import FilterMenu from '../components/filterMenu';
import Message from '../components/message';

export default function Home() {
  const [messages, setMessages] = useState(null);
  const [error, setError] = useState(null);
  // New state to keep track of how many messages to display
  const [visibleCount, setVisibleCount] = useState(10);

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
      // Reset visibleCount when new messages are loaded
      setVisibleCount(10);
    } catch (err) {
      console.error('Error uploading file:', err);
      setError(err.message);
    }
  };

  // Function to render messages by iterating over the JSON data with lazy loading
  const renderMessages = () => {
    if (!messages) return 'Upload a file to view messages';
    
    // Check if messages is an array
    if (Array.isArray(messages)) {
      return (
        <div className="messages-container">
          {messages.slice(0, visibleCount).map((message, index) => (
            <Message 
              key={index} 
              data={message} 
              index={index} 
            />
          ))}
        </div>
      );
    } 
    // If messages is an object with keys
    else if (typeof messages === 'object' && messages !== null) {
      const entries = Object.entries(messages);
      return (
        <div className="messages-container">
          {entries.slice(0, visibleCount).map(([key, value], index) => (
            <Message 
              key={key} 
              data={value} 
              controlId={key}
            />
          ))}
        </div>
      );
    }
    
    // Fallback for other data types
    return <pre>{JSON.stringify(messages, null, 2)}</pre>;
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
