import React from "react";
import './removeSeed.css';


const RemoveSeed = ({
  handleRemove,
  id,
}) => {

  return ( 
    <div
      className="remove-seed"
      id='remove'
      onClick={() => handleRemove(id)}
    >
      <div className="xout">
        x
      </div>
    </div>
  );
};
 
export default RemoveSeed;