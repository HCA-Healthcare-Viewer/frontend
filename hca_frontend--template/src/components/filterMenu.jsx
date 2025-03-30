// leaving this blank for now, work on once Josh is done with data stuff

import React from 'react';
import { Link } from 'react-router-dom';

/*
@param props.filter_type: string, the type of filter to be applied and the name of the filter to be shown as a string
@param props.position: string, 'first', 'middle', or 'last' to determine margins
*/
export default function FilterMenu({ filter_type, position }) {
  // Determine margins based on position
  const getMarginStyle = () => {
    switch(position) {
      case 'first':
        return { marginLeft: '1rem', marginRight: '0.5rem' };
      case 'last':
        return { marginRight: '1rem', marginLeft: '0.5rem' };
      default: // middle or undefined
        return { marginLeft: '0.5rem', marginRight: '0.5rem' };
    }
  };

  return (
    <div style={{
        display: 'grid',
        gridTemplateRows: 'auto auto',
        gap: '8px',
        width: '100%',
        ...getMarginStyle()
    }}>
      <label htmlFor={`filter-${filter_type}`}>{filter_type}:</label>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '3fr 1fr',
        gap: '8px'
      }}>
        <input
          id={`filter-${filter_type}`}
          type="text"
          placeholder={`Enter ${filter_type.toLowerCase()} to filter...`}
        />
        <button onClick={() => {
          // TODO: Functionality will be implemented later
          console.log(`Filtering by ${filter_type}`);
        }}>
          Filter
        </button>
      </div>
    </div>
  );
}