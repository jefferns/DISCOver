import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { addTracksToPlaylist, createPlaylist, getMe, getRecommendations } from '../extras/api';
import Player from './Player';
import List from './List';
import './discovery.css';
import { isNone, pruneTrack } from '../extras/helpers';
import Banner from './Banner';
import SettingsPanel from './Settings/SettingsPanel';
import CreatePlaylistModal from './CreatePlaylistModal';


const Discovery = ({
  currentTrack,
  navigate, 
  page, 
  recommendations,
  seeds, 
  settings,
  setCurrentTrack,
  setRecommendations,
  setSettings,
  setShowSettings,
  showSettings,
}) => {
  const [matches, setMatches] = useState([]);
  const [showCreationModal, setShowCreationModal] = useState(false);
  const [playlistURL, setPlaylistURL] = useState('');
  const [index, setIndex] = useState(0);

  const addToMatches = useCallback((track) => {
    const prunedTrack = pruneTrack(track);
    const clone = [prunedTrack, ...matches];
    setMatches(clone);
  }, [matches])

  const handleClick = () => {
    setShowCreationModal(true);
  };

  const handleCopy = useCallback(() => {
    if(!playlistURL) return;
    navigator.clipboard.writeText(playlistURL);
    alert('Copied the text: ' + playlistURL);
  }, [playlistURL]);

  useEffect(() => {
    // if not saving matches, don't load from local storage
    if (!settings.saveMatches) {
      localStorage.clear('matches');
      return setMatches(_ => []);
    }
    const storedMatches = localStorage.getItem('matches');
    if (isNone(storedMatches)) return;
    const matchList = JSON.parse(storedMatches);
    setMatches(_ => matchList);
  }, [settings.saveMatches]);


  const clearMatches = useCallback(() => {
    localStorage.removeItem('matches');
    setMatches([]);
    setPlaylistURL('');
  }, []);

  const getSeedsFromMatches = useCallback(() => {
    const count = Math.min(matches.length, 5);
    const newSeeds = [];
    for (let i = 0; i < count; i++) {
      newSeeds.push(matches[i]);
    }
    return newSeeds;
  }, [matches]);

  const refreshReccomendations = useCallback(() => {
    if (!matches) return;
    const newSeeds = matches.length
      ? getSeedsFromMatches()
      : seeds;
    getRecommendations(newSeeds, 'track')
    .then(response => response.json())
    .then(response => {
      let tracks = response.tracks.filter((track) => !!track.preview_url?.length);
      setRecommendations(tracks);
      setCurrentTrack(tracks[0]);
    });
  }, [getSeedsFromMatches, matches, seeds, setCurrentTrack, setRecommendations]);

  useEffect(() => {
    // save matches every time you like a new song
    if (!matches.length || !settings.saveMatches) return;
    localStorage.setItem('matches', JSON.stringify(matches));
  }, [matches, matches.length, settings.saveMatches]);

  useLayoutEffect(() => {
    if (!recommendations[index]) return;
    setCurrentTrack(recommendations[index]);
  }, [index, recommendations, setCurrentTrack]);

  return (
    <>
      <CreatePlaylistModal
        matches={matches}
        setPlaylistURL={setPlaylistURL}
        setShowCreationModal={setShowCreationModal}
        show={showCreationModal}
      />
      <Banner 
        navigate={navigate}
        page={page}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />
      <SettingsPanel
        show={showSettings}
        settings={settings}
        setSettings={setSettings}
        setShowSettings={setShowSettings}
      />
      <div className="discovery-wrapper">
        <div className="discovery-container" id="discovery-container">
          <div className="left">
            {currentTrack && <Player
              addToMatches={addToMatches}
              index={index}
              reccomendations={recommendations}
              refreshReccomendations={refreshReccomendations}
              settings={settings}
              setSettings={setSettings}
              setIndex={setIndex}
              track={currentTrack}
            />}
          </div>
          <div className="right">
            <List
              title={'Matches'}
              items={matches}
              show={true}
              listClass={'matches'}
            />
            {matches.length > 0
              ? <div className='matches-btns-wrapper'>
                <button className="btn export" onClick={handleClick}>
                  <div className="text-wrapper">
                    <div className="export-text">
                      Export Playlist 
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{'margin':'auto', 'marginLeft':'0'}} width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                      <path d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3" />
                    </svg>
                  </div>
                </button>
                {playlistURL &&
                  <button className="btn copy" onClick={handleCopy}>
                    <div className="text-wrapper">
                      <div className="export-text">
                        Copy Link
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                      </svg>
                    </div>
                  </button>
                }
                {matches.length && 
                  <button className="btn clear"onClick={clearMatches}>
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                    </svg>
                  </button>
                }
              </div>
              : null
            }
          </div>
        </div>
      </div>
    </>
  );
}
 
export default Discovery;