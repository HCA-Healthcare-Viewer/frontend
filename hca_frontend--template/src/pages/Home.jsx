// This is the home page
import React from 'react';
import Navbar from '../components/Navbar';
import '../pages/Home.css';
import FilterMenu from '../components/filterMenu';

// Fix the home page so that we don't have to scroll at all

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
                </div>
                <div id="main-content">
                    <div id="filter-bar">
                        <FilterMenu filter_type="Message Control ID" position="first" />
                        <FilterMenu filter_type="MRN" position="middle" />
                        <FilterMenu filter_type="Last Name" position="last" />
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