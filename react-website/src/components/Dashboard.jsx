import React, { useEffect, useState } from 'react';
import Seeding from './Seeding';
import List from './List';
import Discovery from './Discovery';
import Banner from './Banner';
import SettingsPanel from './Settings/SettingsPanel';
import './dashboard.css';


export default function Dashboard() {
  const [seeds, setSeeds] = useState([]);
  const [seedType, setSeedType] = useState('track');
  const [discoveryMode, setDiscoveryMode] = useState(false);
  const [displayRecs, setDisplayingRecs] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(
    {
      preview_url: '',
      name: '',
      album: { images: [{url:''}]},
      artists: [{name:''}]
    }
  );
  const [settings, setSettings] = useState(
    {
      time_range: 'medium_term',   //'short_term' | 'medium_term' | 'long_term'
      volume: '30',
    }
  );

  useEffect(()=>{
    if(!recommendations.length) setDisplayingRecs(false);
  }, [recommendations]);


  return (
    <>
      <Banner 
        discoveryMode={discoveryMode}
        setDiscoveryMode={setDiscoveryMode}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />
      <SettingsPanel
        show={showSettings}
        settings={settings}
        setSettings={setSettings}
        setShowSettings={setShowSettings}
      />
      {discoveryMode
      ? <Discovery
          currentTrack={currentTrack}
          recommendations={recommendations}
          settings={settings}
          setSettings={setSettings}
          setCurrentTrack={setCurrentTrack}
        />
      : <div className="dashboard-container">
          <div className='upper-dash'>
            <Seeding
              displayRecs={displayRecs}
              seeds={seeds}
              settings={settings}
              seedType={seedType}
              setSeeds={setSeeds}
              setSeedType={setSeedType}
              setDiscoveryMode={setDiscoveryMode}
              setCurrentTrack={setCurrentTrack}
              setDisplayingRecs={setDisplayingRecs}
              setRecommendations={setRecommendations}
            />
            <List
              title={'Recommendations'}
              items={recommendations}
              show={displayRecs}
            />
          </div>
        </div>
      }
    </>
  );
}