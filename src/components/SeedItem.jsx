import React, {useCallback, useEffect, useRef, useState} from 'react';
import './seedItem.css';
import RemoveSeed from './RemoveSeed';


const SeedItem = ({id, seed, handleRemove, type}) => {
  const cardRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [resizeWidth, setResizeWidth] = useState(-1);
  const [startPos, setStartPos] = useState({x: 0, y: 0});

  const imgSource = type.includes('artist')
    ? seed.images[1].url
    : seed.album.images[1].url;

  const artistName = type.includes('artist')
    ? seed.name
    : seed.artists[0].name;

  const getCurrentWidth = () => {
    return cardRef.current.getBoundingClientRect().width;
  };
  
  const handleMouseDown = useCallback((event) => {
    setIsDragging(true);
    setStartPos({x: event.clientX, y: event.clientY});
  }, [setIsDragging, setStartPos]);

  const handleMouseMove = useCallback((event) => {
    if (!isDragging) return;
    const deltaX = startPos.x - event.clientX;
    const currentWidth = getCurrentWidth();
    const newWidth = currentWidth - (deltaX / 20);

    // set new width during rise
    setResizeWidth(newWidth);
  }, [startPos, setResizeWidth, isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setStartPos({x: 0, y: 0});
    setResizeWidth(getCurrentWidth());
  }, [setIsDragging, setStartPos]);
  
  
    // useEffect(() => {
    //   document.getElementById(id).addEventListener('mousedown', handleMouseDown);
    //   document.addEventListener('mousemove', handleMouseMove);
    //   document.addEventListener('mouseup', handleMouseUp);
    //   document.addEventListener('mouseout', handleMouseUp);

    //   return () => {
    //     document.getElementById(id)?.removeEventListener('mousedown', handleMouseDown);
    //     document.removeEventListener('mousemove', handleMouseMove);
    //     document.removeEventListener('mouseup', handleMouseUp);
    //     document.removeEventListener('mouseout', handleMouseUp);
    //   };
    // }, [id, handleMouseDown, handleMouseMove, handleMouseUp]);

  const width = isDragging ? {width: resizeWidth} : {};

  return ( 
    <div className="seed-item" id={id} >
      <div className="seed-content" ref={cardRef} style={width}>
        <div className="album-art">
          <img alt='album art unavailable' src={imgSource}></img>
        </div>
        {type.includes('artist')
          ? <div className="seed-text">
              <div className="song-main">
                {artistName}
              </div>
            </div>
          : <div className="seed-text">
            <div className="song-main">
              {seed.name}
            </div>
            <div className="song-secondary">
              {artistName}
            </div>
          </div>
        }
      </div>
      <RemoveSeed
        handleRemove={handleRemove}
        id={id}
        isDragging={isDragging}
      />
    </div>
   );
}
 
export default SeedItem;