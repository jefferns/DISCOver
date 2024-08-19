import React from 'react';
import ListItem from './ListItem';
import './list.css';


const List = ({
  listClass,
  title,
  items,
  show,
}) => {
  return(
    <>
      {show &&
        <div className={`list-container ${listClass}`}>
          <h3>{title}: </h3>
          <div className='list-body'>
            {items.length > 0 
              ? items.map(item => <ListItem id={item.id} name={item.artists[0]?.name} title={item?.name} key={item.id}/>)
              : <p>No matches yet</p>
            }
          </div>
        </div>
      }
    </>
  )
}
 
export default List;