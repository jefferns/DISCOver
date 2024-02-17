import React, { useCallback, useEffect, useState } from 'react';
import SeedSearchBar from './SeedSearchBar';
import './seedingSelect.css';
import { debounce } from '../extras/hooks';
import { searchSpotify } from '../extras/api';
import Options from './Options';

const SeedingSelect = ({setShowSearch, seedType}) => {
  const [searchText, setSearchText] = useState('');
  // const [showSearch, setShowSearch] = useState(false);
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

  useEffect(() => {
    if(!searchText.length) return;
    debounce(handleSearch(searchText));
  }, [searchText, handleSearch]);

  return (
    <div className="seeding-select">
      <SeedSearchBar 
        seedType={seedType}
        handleChange={setSearchText}
      />
      { !!songs &&
        <Options
          onClick={() => setShowSearch(false)}
          options={songs}
        />
      }
    </div>
  );
}
 
export default SeedingSelect;