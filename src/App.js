import { useState } from 'react';
import './App.css';
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import Discovery from './components/Discovery';

const emptyTrack = {
  preview_url: '',
  name: '',
  album: { images: [{url:''}]},
  artists: [{name:''}]
};

const defaultSettings = {
  time_range: 'medium_term',   //'short_term' | 'medium_term' | 'long_term'
  volume: '30',
  saveMatches: true,
};

function App() {
  const [page, setPage] = useState('login');
  const [seeds, setSeeds] = useState([]);
  const [seedType, setSeedType] = useState('track');
  const [displayRecs, setDisplayingRecs] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(emptyTrack);
  const [settings, setSettings] = useState(defaultSettings);

  return (
    // My fun custom "router" to deal with Github's static pages
    <div className='App'>
      {
        page === 'dashboard' &&
        <Dashboard
          displayRecs={displayRecs}
          navigate={setPage}
          recommendations={recommendations}
          seeds={seeds}
          seedType={seedType}
          setCurrentTrack={setCurrentTrack}
          setDisplayingRecs={setDisplayingRecs}
          setRecommendations={setRecommendations}
          setSeedType={setSeedType}
          setSeeds={setSeeds}
          setSettings={setSettings}
          setShowSettings={setShowSettings}
          settings={settings}
          showSettings={showSettings}
        />
      }
      {
        page === 'login' && <Login navigate={setPage}/>
      }
      {
        page === 'discovery' && 
        <Discovery
          currentTrack={currentTrack}
          navigate={setPage}
          page={page}
          recommendations={recommendations}
          seeds={seeds}
          setCurrentTrack={setCurrentTrack}
          setRecommendations={setRecommendations}
          setSettings={setSettings}
          setShowSettings={setShowSettings}
          settings={settings}
          showSettings={showSettings}
        />
      }
   </div>
  );
}

export default App;
