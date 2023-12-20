import React, { useState } from "react";


const SeedSearchBar = ({
  category,
  handleSearch,
  setShowSearch
}) => {
  const [searchInput, setSearchInput] = useState('');

  return ( 
    <div className="seed-search-bar">
      <input
        onChange={event => setSearchInput(event.target.value)}
        onKeyUp={event => {
          if (event.key === 'Enter'){
            handleSearch(searchInput);
            setShowSearch(false);
          }
        }}
        placeholder={`Search for ${category}`}
      >
      </input>
    </div>
   );
}
 
export default SeedSearchBar;