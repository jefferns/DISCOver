import React, { useCallback, useEffect } from "react";
import './removeSeed.css';


const RemoveSeed = ({
  handleRemove,
  id
}) => {

  const handleMouseDown = useCallback(() => {

  }, []);

  useEffect(() => {
    // document.getElementById('album-art').addEventListener('dragstart', handleMouseDown);
    document.getElementById('remove').addEventListener('dragstart', handleMouseDown);

    return () => {

    };
  }, []);

  return ( 
    <div className="remove-seed" id='remove' onClick={() => handleRemove(id)}>
      <div className="xout">
        x
      </div>
    </div>
  );
};
 
export default RemoveSeed;