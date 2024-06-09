import React from 'react';
import ListItem from './ListItem';
import './list.css';


const List = ({
  title,
  items,
  show
}) => {
  // const getRecommendations = () => {
  //   if(!seeds.length) return;
  //   getRecommendations(token, seeds, seed_type)
  //   .then(response => response.json())
  //   .then(response => {
  //     let tracks = response.tracks.filter((track) => !!track.preview_url?.length);
  //     setRecommendations(tracks);
  //     setCurrentTrack(tracks[0]);
  //     setDisplayingRecs(true);
  //   });
  // };


  // {displayRecs ? <div style={{flexGrow: '1', maxWidth:'200px'}}/> : null }
  console.info('items', [items, items.length]);
  return(
    <>
      {show &&
        <div className="list-container">
          <h3>{title}: </h3>
          <div className='list-body'>
            {items.length > 0 
              ? items.map(item => <ListItem id={item.id} name={item.artists[0]?.name} title={item?.name}/>)
              : <p>No matches yet</p>
            }
          </div>
        </div>
      }
    </>
  )
}
 
export default List;