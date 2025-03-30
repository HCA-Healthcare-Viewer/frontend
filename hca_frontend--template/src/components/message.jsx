import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Processes a segment with the provided configuration
 * @param {Object} config - Configuration object for the segment
 * @param {string} config.id - Segment identifier
 * @param {Object} config.options - Additional options for segment processing
 * @returns {Object} The processed segment data
 */
function segment(config) {
    // Process the segment using the config dictionary
    console.log('Processing segment with config:', config);
    return {
        // Return processed data
        id: config.id,
        processed: true
    };
}

/**
 * Processes a field with the provided configuration
 * @param {Object} config - Configuration object for the field
 * @param {string} config.name - Field name
 * @param {string} config.value - Field value
 * @param {Object} config.options - Additional options for field processing
 * @returns {Object} The processed field data
 */
function field(config) {
    // Process the field using the config dictionary
    console.log('Processing field with config:', config);
    return {
        // Return processed data
        name: config.name,
        value: config.value,
        processed: true
    };
}

/**
 * Message component to display a single HL7 message
 * @param {Object} props - Component props
 * @param {Object} props.data - The message data to display
 * @param {string} props.controlId - Control ID of the message
 * @param {number} props.index - Index of the message in the list
 */
export default function Message({ data, controlId, index }) {
    const [expanded, setExpanded] = useState(false);
    
    // If no data is provided, return null
    if (!data) return null;

    // Toggle expanded state
    const toggleExpand = () => {
        setExpanded(!expanded);
    };
    
    // Extract summary data if it exists
    const summaryData = data.summary || {};

    return (
        <div className="message-item">
            <div className="message-header" onClick={toggleExpand}>
                <h3>Message {index !== undefined ? index + 1 : controlId || 'Unknown'}</h3>
                <button 
                    className={`expand-button ${expanded ? 'expanded' : ''}`}
                    aria-label={expanded ? "Collapse message" : "Expand message"}
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the parent onClick
                        toggleExpand();
                    }}
                >
                    ▼
                </button>
            </div>
            
            {/* Display summary data */}
            <div className="message-summary">
                {Object.entries(summaryData).map(([key, value], i) => (
                    <div key={i} className="message-field-summary">
                        <strong>{key}:</strong> <span>{value}</span>
                    </div>
                ))}
                {Object.keys(summaryData).length === 0 && (
                    <div className="more-fields">No summary data available</div>
                )}
            </div>
            
            {/* Display full message details when expanded */}
            {expanded && (
                <div className="message-details">
                    {Object.entries(data).filter(([key]) => key !== 'summary').map(([key, value], i) => (
                        <div key={i} className="message-field">
                            <strong>{key}:</strong> 
                            {typeof value === 'object' ? (
                                <pre>{JSON.stringify(value, null, 2)}</pre>
                            ) : (
                                <span>{value}</span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}