import React from 'react';
import './seedItem.css';
import RemoveSeed from './RemoveSeed';


const SeedItem = ({id, seed, handleRemove, type}) => {

  const imgSource = type.includes('artist')
    ? seed.images[1].url
    : seed.album.images[1].url;

  const artistName = type.includes('artist')
    ? seed.name
    : seed.artists[0].name;

  return ( 
    <div className="seed-item" id={id} >
      <div className="album-art">
        <img alt='album art unavailable' src={imgSource}></img>
      </div>
      <div className="seed-text">
        {type.includes('artist')
          ? <div className="song-main"> {artistName} </div>
          : <>
            <div className="song-main"> {seed.name} </div>
            <div className="song-secondary"> {artistName} </div>
          </>
        }
      </div>
      <RemoveSeed
        handleRemove={handleRemove}
        id={id}
      />
    </div>
   );
}
 
export default SeedItem;