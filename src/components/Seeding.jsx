import { useCallback, useEffect, useState } from 'react';
import { getTopItems } from '../extras/api';
import { getRecommendations } from '../extras/api';
import AddSeedButton from './AddSeedButton';
import SeedItem from './SeedItem';
import './seeding.css';
import GoButton from './GoButton';
import SeedTypeSelector from './SeedTypeSelector';


const Seeding = ({
  displayRecs,
  seeds,
  seedType,
  setSeeds,
  settings,
  setSeedType,
  setDiscoveryMode,
  setCurrentTrack, 
  setDisplayingRecs, 
  setRecommendations 
}) => {
  // const [searchResults, setSearchResults] = useState([]);
  const [loadingRecs, setLoadingRecs] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleChange = event => {
    setSeeds([]);
    setRecommendations([]);
    setSeedType(event.target.value);
  };

  const loadRecommendations = useCallback(() => {
    if(!seeds.length) return;
    setLoadingRecs(true);
    getRecommendations(seeds, seedType)
    .then(response => response.json())
    .then(response => {
      setLoadingRecs(false);
      let tracks = response.tracks.filter((track) => !!track.preview_url?.length);
      setRecommendations(tracks);
      setCurrentTrack(tracks[0]);
      setDisplayingRecs(true);
      setHasLoaded(true);
    });
  }, [
    seedType, 
    seeds,
    setCurrentTrack,
    setDisplayingRecs,
    setHasLoaded,
    setRecommendations
  ]);

  const handleRemove = (id) => {
    setSeeds(seeds.filter((seed) => seed.id !== id) || []);
    if (!seeds.length) setDisplayingRecs(false);
  };

  const seedWithTopItems = useCallback(() => {
    const type = seedType.substring(4);
    getTopItems(type, settings.time_range)
    .then(response => response.json())
    .then(response => {
      if(!response.items) return; 
      setSeeds(response.items);
    });
  }, [seedType, setSeeds, settings.time_range]);

  useEffect(() => {
    if(!seedType.includes('top')) return;
    seedWithTopItems();
  }, [seedWithTopItems, seedType, settings]);

  useEffect(() => {
    if (loadingRecs || hasLoaded) return;
    if (!seeds.length) return;
    loadRecommendations();
  }, [
    hasLoaded, 
    loadingRecs,
    loadRecommendations,
    seeds, 
    seedType,
  ]);

  const Seeds = seeds.map((seed) => {
    return <SeedItem
      id={seed.id}
      key={seed.id}
      seed={seed}
      handleRemove={handleRemove}
      type={seedType}
    />
  });

  return (
    <>
      <div className='seeding-container'>
        <SeedTypeSelector
          handleChange={handleChange}
          seedType={seedType}
        />
  
        <div className="seeds">
          {Seeds}
        </div>

        <AddSeedButton
          seedType={seedType}
          seeds={seeds}
          setSeeds={setSeeds}
        />
        {displayRecs ?
          <GoButton setDiscoveryMode={setDiscoveryMode}/>
          : null
        }        
      </div>
    </>
  );
};

export default Seeding;