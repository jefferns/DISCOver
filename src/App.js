import { useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import Discovery from './components/Discovery';
import RestoreSession from './components/RestoreSession';

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
  const [seeds, setSeeds] = useState([]);
  const [seedType, setSeedType] = useState('track');
  const [displayRecs, setDisplayingRecs] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(emptyTrack);
  const [settings, setSettings] = useState(defaultSettings);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/dashboard' element={
            <Dashboard
              displayRecs={displayRecs}
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
          }/>
          <Route exact path='/discovery' element={
            <Discovery
              currentTrack={currentTrack}
              recommendations={recommendations}
              setCurrentTrack={setCurrentTrack}
              setSettings={setSettings}
              setShowSettings={setShowSettings}
              settings={settings}
              showSettings={showSettings}
            />
          }>

          </Route>
          <Route path="*" element={<RestoreSession/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
