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
  return(
    <>
      {show
      ? <div className="list-container">
          <h3>{title}: </h3>
          <div className='list-body'>
            {items.length ?
              items.map(recommendation => <ListItem data={recommendation} key={recommendation.id}/>)
              : <p>No matches yet</p>
            }
          </div>
        </div>
      : null
      }
    </>
  )
}
 
export default List;