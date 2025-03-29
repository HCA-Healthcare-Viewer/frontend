// This is the home page
import React from 'react';
import Navbar from '../components/Navbar';
import '../pages/Home.css';

export default function Home() {
    return (
        <>
        <body>
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
                            onChange={() => {}}
                        />
                    </div>
                    
                    {/* <button type="button" onClick=insert function here for button functionality >Deidentify</button> */}
                </div>
                <div id="main-content">
                    <div id="filter-bar">
                        filter bar
                    </div>
                    <div id="message-display">
                        insert messages here
                    </div>
                </div>
            </div>
        </body>
        </>
    );
}