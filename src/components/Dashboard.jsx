import React, { useCallback, useEffect } from 'react';
import Seeding from './Seeding';
import List from './List';
import Banner from './Banner';
import SettingsPanel from './Settings/SettingsPanel';
import './dashboard.css';
import { clearLocalStorage, getAccessCode, isTokenExpired } from '../extras/helpers';
import { useNavigate } from 'react-router-dom';
import { loadToken, refreshToken } from '../extras/api';


export default function Dashboard({
  displayRecs, 
  recommendations,
  seeds,
  seedType, 
  setCurrentTrack, 
  setDisplayingRecs,
  setRecommendations,
  setSeedType, 
  setSeeds, 
  setSettings,
  setShowSettings, 
  settings,
  showSettings,
}) {
  const navigate = useNavigate();

  const getTokens = useCallback(() => {
    const code = getAccessCode();
    if (!code) return navigate('/login');
    try {
      loadToken(code);
    } catch (error) {
      console.error('Error fetching access token: ', error);
      clearLocalStorage();
      return navigate('/login');
    };
  }, [navigate]);

  const handleRefreshToken = useCallback(() => {
    const refresh = localStorage.getItem('refresh_token');
    if (refresh === "undefined") {
      console.error('Error: Refresh Token not found in Storage');
      clearLocalStorage();
      navigate('/login');
    };
    try {
      refreshToken(refresh);
    } catch (error) {
      console.error('Error fetching access token: ', error);
    };
  }, [navigate]);

  useEffect(()=>{
    // Do we have a token? If not, get them
    const token = localStorage.getItem('DISCOvery_token');
    if (!token) return getTokens();

    // We have a token, is it expired?
    const expired = isTokenExpired();
    if (expired) {
      // if it's expired, refresh it
      handleRefreshToken();
    }
  }, [getTokens, handleRefreshToken, navigate]);

  useEffect(()=>{
    if(!recommendations.length) setDisplayingRecs(false);
  }, [setDisplayingRecs, recommendations]);


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
      <div className="dashboard-container">
        <div className='upper-dash'>
          <Seeding
            displayRecs={displayRecs}
            seeds={seeds}
            settings={settings}
            seedType={seedType}
            setSeeds={setSeeds}
            setSeedType={setSeedType}
            setCurrentTrack={setCurrentTrack}
            setDisplayingRecs={setDisplayingRecs}
            setRecommendations={setRecommendations}
          />
          <List
            title={'Recommendations'}
            items={recommendations}
            show={displayRecs}
            listClass={'dash-list'}
          />
        </div>
      </div>
    </>
  );
}