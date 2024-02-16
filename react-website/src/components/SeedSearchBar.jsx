import React, { useState } from "react";
import './seedSearchBar.css';


const SeedSearchBar = ({
  seedType,
  handleChange,
}) => {
  return ( 
    <div className="seed-search-bar">
      <input
        onChange={(e) => handleChange(e.target.value)}
        placeholder={`Search for ${seedType}`}
      >
      </input>
    </div>
   );
}
 
export default SeedSearchBar;