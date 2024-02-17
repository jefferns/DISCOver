import React from "react";
import './removeSeed.css';


const RemoveSeed = ({
  handleRemove,
  id,
  isDragging,
}) => {
  const xstyling = isDragging ? {color: 'white'} : {};
  const buttonStyling = isDragging 
    ? {backgroundColor: 'rgb(247, 107, 107)'}
    : {};

  return ( 
    <div
      className="remove-seed"
      id='remove'
      style={buttonStyling}
      onClick={() => handleRemove(id)}
    >
      <div className="xout" style={xstyling}>
        x
      </div>
    </div>
  );
};
 
export default RemoveSeed;