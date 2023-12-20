import React, { useEffect } from 'react';
import { useState } from 'react';
import { Container, InputGroup, FormControl } from 'react-bootstrap';
import './addSeedButton.css';
import SeedSearchBar from './SeedSearchBar';



const AddSeedButton = ({
  category,
  handleSearch,
  seeds
}) => {
  
  const [showSearch, setShowSearch] = useState(false);
  const show = seeds.length < 5;

  useEffect(() => {
    setShowSearch(false);
  }, [seeds]);

  return (
    show &&
    <div className="add-seed-item">
    { showSearch
      ? <SeedSearchBar 
        category={category}
        handleSearch={handleSearch}
        setShowSearch={setShowSearch}
      />
      : <button className="add-seed-item" onClick={() => setShowSearch(true)}>
        + 
      </button>
    }
    </div>
   );
}
 
export default AddSeedButton;