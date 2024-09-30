import { useCallback, useEffect, useRef, useState } from 'react';
import './settingsPanel.css';
import { AdvancedSettings } from './AdvancedSettings';
import TimeFrame from './TimeFrame';
import SaveMatches from './SaveMatches';
import { ADVANCED_SETTINGS_FLAG } from '../../extras/flags';


const SettingsPanel = ({settings, show, setSettings, setShowSettings}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const ref = useRef(null);
  useEffect(() => {
    // Close Panel on click outside panel
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowSettings(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [ setShowSettings ]);

  const handleVolumeChange = useCallback((event) => {
    setSettings({...settings, volume:event.target.value});
  }, [setSettings, settings]);

  const handleTimeChange = useCallback((event) => {
    setSettings({...settings, time_range: event.target.value});
  }, [setSettings, settings]);

  const toggleAdvanced = useCallback(() => {
    setShowAdvanced(!showAdvanced);
  }, [showAdvanced]);

  const toggleSaveMatches = useCallback(() => {
    const saveBefore = settings.saveMatches;
    setSettings({...settings, saveMatches: !saveBefore});
  }, [settings, setSettings]);

  return show &&
    <div ref={ref} className='settings-panel'>
      <TimeFrame handleTimeChange={handleTimeChange} value={settings.time_range}/>
      <SaveMatches checked={settings.saveMatches} toggleChecked={toggleSaveMatches}/>
      <div className='setting-option' id='volume'>
        <label>Volume: </label>
        <input
          className='slider'
          id='volume'
          type='range'
          min='0'
          max='100'
          step='1'
          value={ settings.volume }
          onChange={ handleVolumeChange }
        />
        <input
          type='text'
          id='volume-num'
          value={ Math.trunc(settings.volume )}
          onChange={ handleVolumeChange }
        />
      </div>
      { ADVANCED_SETTINGS_FLAG && showAdvanced && <AdvancedSettings/> }
      
      <button onClick={toggleAdvanced}>{showAdvanced ? "Less" : "Advanced"}</button>
    </div>
}
 
export default SettingsPanel;