import React, { useState, useEffect } from 'react';
import '../pages/Home.css';
import Message from '../components/message';
import Header from '../components/header';
import Sidebar from '../components/sidebar';

export default function Home() {
  // Store the two payloads separately
  const [messagesDeidentified, setMessagesDeidentified] = useState(null);
  const [messagesOriginal, setMessagesOriginal] = useState(null);
  const [error, setError] = useState(null);
  // New state to keep track of how many messages to display
  const [visibleCount, setVisibleCount] = useState(10);
  // Filter states
  const [filterMRN, setFilterMRN] = useState("");
  const [filterMCID, setFilterMCID] = useState("");
  const [filterLastName, setFilterLastName] = useState("");

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
      setVisibleCount(10);
    } catch (err) {
      console.error('Error uploading deidentified file:', err);
      setError(err.message);
    }

    // Second fetch for original data (pass deidentify=false)
    try {
      const response2 = await fetch('http://localhost:8000/get_json?deidentify=false', {
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

  // Helper functions to extract filterable values from each message
  const getMCID = (message) => {
    if (
      message.MSH &&
      message.MSH.fields &&
      message.MSH.fields["MSH-10"] &&
      message.MSH.fields["MSH-10"].Subfields &&
      message.MSH.fields["MSH-10"].Subfields["MSH-10.1"]
    ) {
      return message.MSH.fields["MSH-10"].Subfields["MSH-10.1"];
    }
    return "";
  };

  // Updated getLastName: first check PID-5.2, then look for a summary key "pln:" (case-insensitive)
  const getLastName = (message) => {
    if (
      message.PID &&
      message.PID.fields &&
      message.PID.fields["PID-5"] &&
      message.PID.fields["PID-5"].Subfields &&
      message.PID.fields["PID-5"].Subfields["PID-5.1"]
    ) {
      return message.PID.fields["PID-5"].Subfields["PID-5.1"];
    }
    if (message.summary) {
      for (const key in message.summary) {
        if (key.trim().toLowerCase() === "pln:") {
          return message.summary[key];
        }
      }
    }
    return "";
  };

  // Filter messages based on MRN, Message Control ID, and Last Name
  const filterMessages = (messages) => {
    if (!messages) return messages;

    const checkMessage = (msg) => {
      let valid = true;
      // MRN filter (using summary.MRN)
      if (
        filterMRN &&
        (!msg.summary ||
          !msg.summary.MRN ||
          !msg.summary.MRN.toLowerCase().includes(filterMRN.toLowerCase()))
      ) {
        valid = false;
      }
      // Message Control ID filter
      if (filterMCID) {
        const mcidVal = getMCID(msg);
        if (!mcidVal.toLowerCase().includes(filterMCID.toLowerCase())) {
          valid = false;
        }
      }
      // Last Name filter (using getLastName)
      if (filterLastName) {
        const lastNameVal = getLastName(msg);
        if (!lastNameVal.toLowerCase().includes(filterLastName.toLowerCase())) {
          valid = false;
        }
      }
      return valid;
    };

    if (Array.isArray(messages)) {
      return messages.filter(checkMessage);
    } else if (typeof messages === 'object' && messages !== null) {
      const filtered = {};
      Object.entries(messages).forEach(([key, value]) => {
        if (checkMessage(value)) {
          filtered[key] = value;
        }
      });
      return filtered;
    }
    return messages;
  };

  const renderMessages = () => {
    const filteredMessages = filterMessages(messagesDeidentified);
    if (!filteredMessages) return 'Upload a file to view messages';

    if (Array.isArray(filteredMessages)) {
      return (
        <div className="messages-container">
          {filteredMessages.slice(0, visibleCount).map((message, index) => (
            <Message 
              key={index} 
              data={message} 
              index={index} 
              controlId={index}
              compareData={messagesOriginal ? messagesOriginal[index] : null}
              onMRNClick={setFilterMRN}
            />
          ))}
        </div>
      );
    } else if (typeof filteredMessages === 'object' && filteredMessages !== null) {
      const entries = Object.entries(filteredMessages);
      return (
        <div className="messages-container">
          {entries.slice(0, visibleCount).map(([key, value], index) => (
            <Message 
              key={key} 
              data={value} 
              controlId={key}
              index={index}
              compareData={messagesOriginal ? messagesOriginal[key] : null}
              onMRNClick={setFilterMRN}
            />
          ))}
        </div>
      );
    }
    return <pre>{JSON.stringify(filteredMessages, null, 2)}</pre>;
  };

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
      <Header />

      <div id="wrapper">
        <div className="sidebar-container">
          <Sidebar 
            onFileChange={handleFileChange} 
            filterMRN={filterMRN}
            onMRNFilterChange={setFilterMRN}
            filterMCID={filterMCID}
            onMCIDFilterChange={setFilterMCID}
            filterLastName={filterLastName}
            onLastNameFilterChange={setFilterLastName}
          />
        </div>

        <div id="main-content">  
          <div id="message-display">
            {error && <p className="error">{error}</p>}
            {renderMessages()}
          </div>
        </div>
      </div>
    </div>
  );
}
