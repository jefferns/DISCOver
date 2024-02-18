import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import './addSeedButton.css';
import SeedingSelect from './SeedingSelect';


const AddSeedButton = ({
  seedType,
  seeds,
  setSeeds,
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (seedType.includes('top')){
      setShow(false);
    } else if (seeds.length < 5) {
      setShow(true);
    }
  }, [seeds, seedType]);


  const addSeed = useCallback((seed) => {
    setSeeds([...seeds, seed]);
  }, [seeds, setSeeds]);


  return (
    show &&
    <div className="add-seed-item">
    { showSearch
      ? <SeedingSelect
        addSeed={addSeed}
        seedType={seedType}
        setShowSearch={setShowSearch}
      />
      : <button type="button" className="add-seed-item" onClick={() => setShowSearch(true)}>
        + 
      </button>
    }
    </div>
   );
}
 
export default AddSeedButton;