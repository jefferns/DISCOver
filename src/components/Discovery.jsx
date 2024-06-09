import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { addTracksToPlaylist, createPlaylist, getMe } from '../extras/api';
import Player from './Player';
import List from './List';
import './discovery.css';
import { isNone, pruneTrack } from '../extras/helpers';
import Banner from './Banner';
import SettingsPanel from './Settings/SettingsPanel';


const Discovery = ({
  currentTrack,
  recommendations,
  settings,
  setCurrentTrack,
  setSettings,
  setShowSettings,
  showSettings,
}) => {
  const [matches, setMatches] = useState([]);
  const [playlistURL, setPlaylistURL] = useState('');
  const [index, setIndex] = useState(0);

  const addToMatches = useCallback((track) => {
    const prunedTrack = pruneTrack(track);
    const clone = [prunedTrack, ...matches];
    setMatches(clone);
  }, [matches])

  const addMatchesToPlaylist = (id) => {
    let uris = []
    matches.forEach((song) => {
      uris.push(song.uri)
    })
    addTracksToPlaylist(id, uris);
  };

  const handleClick = () => {
    getMe()
    .then(response => response.json())
    .then(response => {
      const id = response.id;

      // create playlist
      createPlaylist(id, 'DISCOvery')
      .then(response => response.json())
      .then(response => {
        let playlist_id = response.id;
        if(!playlist_id) return;
        if(!matches) return;
        // add each song to the new playlist
        addMatchesToPlaylist(playlist_id);
        setPlaylistURL(response.external_urls.spotify);
        alert('Successfully exported playlist!');
      });
    });
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

  useEffect(() => {
    // save matches every time you like a new song
    if (!matches.length || !settings.saveMatches) return;
    localStorage.setItem('matches', JSON.stringify(matches));
  }, [matches.length, settings.saveMatches]);

  useLayoutEffect(() => {
    setCurrentTrack(recommendations[index]);
  }, [index, recommendations, setCurrentTrack]);

  return (
    <>
      <Banner 
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
        <div className="discovery-container">
          <div className="left">
            <Player
              addToMatches={addToMatches}
              track={currentTrack}
              settings={settings}
              setSettings={setSettings}
              setIndex={setIndex}
            />
          </div>
          <div className="right">
            <List
              title={'Matches'}
              items={matches}
              show={true}
            />
            {matches.length > 0
              ? <div className='export-btns-wrapper'>
                <button className="export-btn" onClick={handleClick}>
                  <div className="text-wrapper">
                    <div className="export-text">
                      Export Playlist 
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{'margin':'auto', 'marginLeft':'0'}} width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                      <path d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3" />
                    </svg>
                  </div>
                </button>
                {playlistURL &&
                  <button className="copy-btn" onClick={handleCopy}>
                    <div className="text-wrapper">
                      <div className="export-text">
                        Copy Link
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                      </svg>
                    </div>
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