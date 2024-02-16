import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import './addSeedButton.css';
import SeedingSelect from './SeedingSelect';


const AddSeedButton = ({
  seedType,
  seeds,
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

  // useEffect(() => {
  //   if (seedType.includes('top')){
  //     console.info('settings false');
  //     setShowSearch(false);
  //   }
  // }, [seedType]);

  return (
    show &&
    <div className="add-seed-item">
    { showSearch
      // ? <></>
      ? <SeedingSelect
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