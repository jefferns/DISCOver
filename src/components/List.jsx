import React from 'react';
import ListItem from './ListItem';
import './list.css';


const List = ({
  title,
  items,
  show
}) => {
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