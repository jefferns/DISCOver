import { useNavigate } from 'react-router-dom';
import './goButton.css';

const GoButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/discovery');
  };

  return (
    <div className="go-wrapper">
      <button type="button" className='btn' onClick={handleClick}>
        Let's Go &#10148;
      </button>
    </div>
  );
}
 
export default GoButton;