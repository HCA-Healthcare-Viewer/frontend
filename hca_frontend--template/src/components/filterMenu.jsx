// leaving this blank for now, work on once Josh is done with data stuff
import React from 'react';

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
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: '5px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        ...getMarginStyle()
    }}>
      <label style={{
        gridColumn: '1/4',
        gridRow: '1/2',
        marginLeft: '0.25rem',
      }}htmlFor={`filter-${filter_type}`}>{filter_type}:</label>
        <input
          id={`filter-${filter_type}`}
          type="text"
          placeholder={`Enter ${filter_type.toLowerCase()} to filter...`}
          style={{
            gridRow: '2/3',
            gridColumn: '1/4',
            marginLeft: '0.1rem',
            marginRight: '0.25rem',
            marginBottom: '0.1rem',
          }}
        />
        <button onClick={() => {
          // TODO: Functionality will be implemented later
          console.log(`Filtering by ${filter_type}`);
        }}
        style={{
          gridColumn: '4/5',
          gridRow: '2/3',
          marginRight: '0.1rem',
          marginBottom: '0.1rem',
          boxShadow: '0 2px 3px rgba(0, 0, 0, 0.1)'
        }}>
          Filter
        </button>
      </div>
  );
}