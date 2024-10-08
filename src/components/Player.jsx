import React, { useCallback, useEffect, useRef, useState } from 'react';
import './player.css';

function Player({
  addToMatches,
  index,
  reccomendations,
  refreshReccomendations, 
  settings, 
  setSettings,
  setIndex,
  track,
}) {
  const imgRef = useRef(null);
  const wrapperRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({x: 0, y: 0});

  const getRingScale = (deltaX) => {
    const abs = deltaX > 0 ? 1 : -1;
    return Math.trunc(abs * deltaX);
  };

  const handleVolumeChange = (event) => {
    setSettings({...settings, volume:(event.target.volume * 100)});
  };

  const handleMouseDown = useCallback((event) => {
    setIsDragging(true);
    setStartPos({x: event.clientX, y: event.clientY});
  }, [setStartPos, setIsDragging]);

  const handleMouseMove = useCallback((event) => {
    if(!isDragging) return;
    if(!imgRef) return;
    if(!wrapperRef.current) return;

    var deltaX = event.clientX - startPos.x;
    var angle = deltaX / 10;
    angle = angle > 0 ? Math.min(30, angle) : Math.max(-30, angle);
    const scale = getRingScale(deltaX);
    const color = deltaX > 1 ? 'green' : 'red';
    wrapperRef.current.style.boxShadow = `0px 0px ${scale}px ${color}`;
    imgRef.current.style.transform = 'rotateZ(' + angle + 'deg)';
  }, [isDragging, startPos]);

  const handleDrop = useCallback((decision) => {
    if(decision === 'right') addToMatches(track);
    setIndex(prev => prev + 1);
    if (index > reccomendations.length - 5 ) {
      refreshReccomendations();
      setIndex(0);
    };
  }, [track, setIndex, addToMatches, index, reccomendations, refreshReccomendations]);

  const handleMouseUp = useCallback((event) => {
    setIsDragging(false);
    if(imgRef.current.style.transform) imgRef.current.style.removeProperty('transform');
    if(wrapperRef.current.style.boxShadow) wrapperRef.current.style.removeProperty('box-shadow');
    if(Math.abs(event.clientX - startPos.x ) < 50) return;
    const decision = event.clientX - startPos.x > 0 ? 'right' : 'left';
    handleDrop(decision);
  }, [setIsDragging, handleDrop, startPos]);

  useEffect(()=>{
    let player = document.getElementById('player');
    let source = document.getElementById('source');
    source.src = track.preview_url;

    player.load();
    player.play();
  }, [track.preview_url]);

  useEffect(() => {
    // handle volume changes
    let player = document.getElementById('player');
    player.volume = settings.volume / 100;
  }, [settings.volume]);


  useEffect(()=>{
    // Add event listeners for handling drag/tilt animations
    document.getElementById('discovery-container').addEventListener('dragstart', handleMouseDown);
    document.getElementById('discovery-container').addEventListener('dragover', handleMouseMove);
    document.getElementById('discovery-container').addEventListener('dragend', handleMouseUp);

    document.getElementById('discovery-container')?.addEventListener('touchend', handleMouseUp);
    document.getElementById('discovery-container')?.addEventListener('touchmove', handleMouseMove);
    document.getElementById('discovery-container')?.addEventListener('touchstart', handleMouseDown);
    return () => {
      document.getElementById('discovery-container')?.removeEventListener('dragstart', handleMouseDown);
      document.getElementById('discovery-container')?.removeEventListener('dragover', handleMouseMove);
      document.getElementById('discovery-container')?.removeEventListener('dragend', handleMouseUp);

      document.getElementById('discovery-container')?.removeEventListener('touchend', handleMouseUp);
      document.getElementById('discovery-container')?.removeEventListener('touchmove', handleMouseMove);
      document.getElementById('discovery-container')?.removeEventListener('touchstart', handleMouseDown);
    };
  }, [handleMouseUp, handleMouseMove, handleMouseDown]);


  return (
    <div className='player-wrapper' ref={wrapperRef} >
      <div className='player-album'>
        <img
          src={track.album.images[1].url}
          id='album-art'
          alt='Album art not available'
          // draggable='false'
          // style={{'height':'300px', 'width':'300px'}}
          className='album-art'
          ref={imgRef}
        />
      </div>
      <div className='player-info'>
        <div className='player-title'>
          {track.name}
        </div>
        <div className='player-artist'>
          {track.artists[0].name}
        </div>
      </div>
      <audio id='player' autoPlay controls onVolumeChange={handleVolumeChange}>
        <source id='source' src={track.preview_url} type='audio/mpeg' width='250px'/>
      </audio>
    </div>
  );
}

export default Player