import React, {useEffect} from 'react';
import './seedItem.css';
import RemoveSeed from './RemoveSeed';


const SeedItem = ({id, seed, handleRemove, type}) => {
  const imgSource = type.includes('artist')
    ? seed.images[1].url
    : seed.album.images[1].url;

  const artistName = type.includes('artist')
    ? seed.name
    : seed.artists[0].name

  return ( 
    <div className="seed-item" id={id}>
      <div className="album-art">
        <img alt='album art unavailable' src={imgSource}></img>
      </div>
      {type.includes('artist')
        ? <div className="seed-text">
            <div className="song-artist">
              {artistName}
            </div>
          </div>
        : <div className="seed-text">
          <div className="song-name">
            {seed.name}
          </div>
          <div className="song-artist">
            {artistName}
          </div>
        </div>
      }

      <RemoveSeed
        handleRemove={handleRemove}
        id={id}
      />
    </div>
   );
}
 
export default SeedItem;