import React, { useState } from 'react';

/**
 * Individual subfield value component
 * @param {Object} props - Component props
 * @param {string} props.value - The subfield value
 * @param {string} props.fieldId - The field identifier (optional)
 */
function SubfieldValue({ value, fieldId }) {
    return (
        <div className="subfield-item">
            <div className="subfield-value" title={fieldId || ""}>{value}</div>
            {fieldId && <div className="subfield-id">{fieldId}</div>}
        </div>
    );
}

/**
 * Field group component to display values from the same parent field
 * @param {Object} props - Component props
 * @param {string} props.fieldName - The name of the parent field (e.g., MSH-9)
 * @param {Array} props.subfields - Array of subfield objects with fieldId and value
 */
function FieldGroup({ fieldName, subfields }) {
    return (
        <div className="field-group">
            <div className="field-group-header">{fieldName}</div>
            <div className="field-group-content">
                {subfields.map((subfield, index) => (
                    <SubfieldValue 
                        key={index}
                        value={subfield.value} 
                        fieldId={subfield.fieldId} 
                    />
                ))}
            </div>
        </div>
    );
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

    // Get all sections with their detailed subfield values grouped by parent field
    const getSectionsWithGroupedSubfields = (obj) => {
        const sections = {};
        
        // Check if the object has a name property (like "MSH", "PID", etc.)
        if (obj.name && typeof obj.name === 'string') {
            const sectionName = obj.name;
            sections[sectionName] = {};
            
            // If this object has fields
            if (obj.fields && typeof obj.fields === 'object') {
                // Process each field
                Object.entries(obj.fields).forEach(([fieldKey, fieldValue]) => {
                    // If the field has Subfields
                    if (fieldValue && typeof fieldValue === 'object' && fieldValue.Subfields) {
                        // Extract the field number (e.g., MSH-9)
                        const fieldNumber = fieldKey; // e.g., MSH-1, MSH-9
                        
                        // Skip if no subfields to process
                        if (!Object.keys(fieldValue.Subfields).length) return;
                        
                        // Initialize the field group if it doesn't exist
                        if (!sections[sectionName][fieldNumber]) {
                            sections[sectionName][fieldNumber] = [];
                        }
                        
                        // Add each subfield to its parent field group
                        Object.entries(fieldValue.Subfields).forEach(([subfieldKey, subfieldValue]) => {
                            if (typeof subfieldValue === 'string') {
                                sections[sectionName][fieldNumber].push({
                                    fieldId: subfieldKey,
                                    value: subfieldValue
                                });
                            }
                        });
                    }
                });
            }
        }
        
        // Process other properties for nested objects
        Object.entries(obj).forEach(([key, value]) => {
            if (value && typeof value === 'object' && key !== 'fields') {
                const nestedSections = getSectionsWithGroupedSubfields(value);
                // Merge nested sections with current sections
                Object.entries(nestedSections).forEach(([nestedSectionKey, nestedFieldGroups]) => {
                    if (!sections[nestedSectionKey]) {
                        sections[nestedSectionKey] = {};
                    }
                    // Merge field groups
                    Object.entries(nestedFieldGroups).forEach(([nestedFieldKey, nestedSubfields]) => {
                        sections[nestedSectionKey][nestedFieldKey] = nestedSubfields;
                    });
                });
            }
        });
        
        return sections;
    };

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
            
            {/* Display sections with field groups when expanded */}
            {expanded && (
                <div className="message-details">
                    {Object.entries(getSectionsWithGroupedSubfields(data)).map(([sectionName, fieldGroups], sectionIndex) => (
                        <div key={sectionIndex} className="message-section">
                            <h4 className="section-title">{sectionName}</h4>
                            <div className="fields-grid">
                                {Object.entries(fieldGroups).map(([fieldName, subfields], fieldIndex) => (
                                    <FieldGroup 
                                        key={fieldIndex}
                                        fieldName={fieldName}
                                        subfields={subfields}
                                    />
                                ))}
                                {Object.keys(fieldGroups).length === 0 && (
                                    <div className="no-subfields">No fields available for this section</div>
                                )}
                            </div>
                        </div>
                    ))}
                    {Object.keys(getSectionsWithGroupedSubfields(data)).length === 0 && (
                        <div className="no-subfields">No sections with values available</div>
                    )}
                </div>
            )}
        </div>
    );
}