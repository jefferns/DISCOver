import React, { useCallback, useEffect, useState } from 'react';
import SeedSearchBar from './SeedSearchBar';
import './seedingSelect.css';
import { searchSpotify } from '../extras/api';
import Options from './Options';
import { debounce } from '../extras/helpers';

const SeedingSelect = ({setShowSearch, seedType, addSeed}) => {
  const [searchText, setSearchText] = useState('');
  const debouncedSetText = debounce(setSearchText);
  const [songs, setSongs] = useState([]);

  const handleSearch = useCallback(() => {
    searchSpotify(seedType, searchText, 5)
    .then(response => response.json())
    .then(response => {
      let results = [];
      if(seedType === 'track') results = response.tracks.items;
      else if(seedType === 'artist') results = response.artists.items;
      setSongs(results);
    })
  }, [seedType, searchText, setSongs]);

  const handleClick = e => {
    const result = songs.find(song => song.name === e.target.value);
    addSeed(result);
    setShowSearch(false);
  };

  useEffect(() => {
    if(!searchText.length) return;
    handleSearch(searchText);
  }, [searchText, handleSearch]);

  return (
    <div className="seeding-select">
      <SeedSearchBar 
        seedType={seedType}
        handleChange={debouncedSetText}
      />
      { !!songs &&
        <Options
          onClick={handleClick}
          options={songs}
        />
      }
    </div>
  );
}
 
export default SeedingSelect;