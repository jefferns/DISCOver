import React from 'react';
import './seedingSelect.css';

const SeedingSelect = ({options, handleChange, selected}) => {
  return (
    <div className="seeding-select">
      <select value={selected} onChange={handleChange}>
        <option key='default' value='default' disabled={true}> Choose an option </option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}
 
export default SeedingSelect;