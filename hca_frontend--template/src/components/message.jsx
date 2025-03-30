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
 * @param {Object} props.compareData - The second json message for comparison
 * @param {string} props.controlId - Control ID of the message
 * @param {number} props.index - Index of the message in the list
 */
export default function Message({ data, compareData, controlId, index }) {
  const [expanded, setExpanded] = useState(false);
  const [comparing, setComparing] = useState(false);
  
  if (!data) return null;

  // Toggle expanded state
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Toggle compare mode
  const toggleCompare = () => {
    setComparing(!comparing);
  };
  
  // Helper to extract MCID:
  const extractMCID = (msgData) => {
    if (controlId) return controlId;
    if (
      msgData.MSH &&
      msgData.MSH.fields &&
      msgData.MSH.fields["MSH-10"] &&
      msgData.MSH.fields["MSH-10"].Subfields &&
      msgData.MSH.fields["MSH-10"].Subfields["MSH-10.1"]
    ) {
      return msgData.MSH.fields["MSH-10"].Subfields["MSH-10.1"];
    }
    return 'Unknown';
  };

  const mcid = extractMCID(data);

  // Function to get all sections with grouped subfields for a given message object
  const getSectionsWithGroupedSubfields = (obj) => {
    const sections = {};
    
    if (obj.name && typeof obj.name === 'string') {
      const sectionName = obj.name;
      sections[sectionName] = {};
      
      if (obj.fields && typeof obj.fields === 'object') {
        Object.entries(obj.fields).forEach(([fieldKey, fieldValue]) => {
          if (fieldValue && typeof fieldValue === 'object' && fieldValue.Subfields) {
            const fieldNumber = fieldKey;
            if (!Object.keys(fieldValue.Subfields || {}).length) return;
            
            if (!sections[sectionName][fieldNumber]) {
              sections[sectionName][fieldNumber] = [];
            }
            
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
    
    Object.entries(obj).forEach(([key, value]) => {
      if (value && typeof value === 'object' && key !== 'fields') {
        const nestedSections = getSectionsWithGroupedSubfields(value);
        Object.entries(nestedSections).forEach(([nestedSectionKey, nestedFieldGroups]) => {
          if (!sections[nestedSectionKey]) {
            sections[nestedSectionKey] = {};
          }
          Object.entries(nestedFieldGroups).forEach(([nestedFieldKey, nestedSubfields]) => {
            sections[nestedSectionKey][nestedFieldKey] = nestedSubfields;
          });
        });
      }
    });
    
    return sections;
  };

  // Helper function to render the message content (header, summary, details)
  // The header now shows the MCID with the Compare button immediately to its right,
  // followed by the Expand button.
  const renderMessageContent = (msgData, label) => {
    const msgSummary = msgData.summary || {};
    return (
      <div className="message-content">
        <div
          className="message-header"
          onClick={toggleExpand}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <h3 style={{ margin: 0, marginRight: '10px' }}>
            {label ? label + ' ' : ''}MCID: {mcid}
          </h3>
          {(!label || label === 'Deidentified') && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleCompare();
              }}
              style={{ marginRight: '0px' }}
            >
              {comparing ? 'Exit Compare' : 'Compare'}
            </button>
          )}
          <button
            className={`expand-button ${expanded ? 'expanded' : ''}`}
            aria-label={expanded ? 'Collapse message' : 'Expand message'}
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand();
            }}
          >
            ▼
          </button>
        </div>
        <div className="message-summary">
          {Object.entries(msgSummary).map(([key, value], i) => (
            <div key={i} className="message-field-summary">
              <strong>{key}:</strong> <span>{value}</span>
            </div>
          ))}
          {Object.keys(msgSummary).length === 0 && (
            <div className="more-fields">No summary data available</div>
          )}
        </div>
        {expanded && (
          <div className="message-details">
            {Object.entries(getSectionsWithGroupedSubfields(msgData)).map(
              ([sectionName, fieldGroups], sectionIndex) => (
                <div key={sectionIndex} className="message-section">
                  <h4 className="section-title">{sectionName}</h4>
                  <div className="fields-grid">
                    {Object.entries(fieldGroups).map(
                      ([fieldName, subfields], fieldIndex) => (
                        <FieldGroup
                          key={fieldIndex}
                          fieldName={fieldName}
                          subfields={subfields}
                        />
                      )
                    )}
                    {Object.keys(fieldGroups).length === 0 && (
                      <div className="no-subfields">
                        No fields available for this section
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
            {Object.keys(getSectionsWithGroupedSubfields(msgData)).length === 0 && (
              <div className="no-subfields">
                No sections with values available
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Non-compare view
  if (!comparing) {
    return (
      <div className="message-item">
        {renderMessageContent(data)}
      </div>
    );
  } else {
    // Compare mode: side-by-side rendering
    return (
      <div className="message-item compare-mode">
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1, paddingRight: '10px', borderRight: '1px solid #ccc' }}>
            {renderMessageContent(data, "Deidentified")}
          </div>
          <div style={{ flex: 1, paddingLeft: '10px' }}>
            {compareData ? renderMessageContent(compareData, "Original") : <div>No compare data available</div>}
          </div>
        </div>
      </div>
    );
  }
}
