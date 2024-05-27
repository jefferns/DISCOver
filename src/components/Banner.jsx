import React from 'react';
import './banner.css';
import { useNavigate , useLocation } from 'react-router-dom';


const Banner = ({
  showSettings,
  setShowSettings
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const showBackArrow = pathname === '/discovery';

  const handleBack = () => {
    navigate('/dashboard');
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  }

  return (
    <div className="banner">
      <div className="banner-buttons" id='settings'>
        {showBackArrow &&
          <div className='banner-btn' onClick={handleBack} id='back'>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <line x1="5" y1="12" x2="19" y2="12" />
              <line x1="5" y1="12" x2="11" y2="18" />
              <line x1="5" y1="12" x2="11" y2="6" />
            </svg>
          </div>
        }
        <div className='banner-btn' onClick={toggleSettings}>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
      </div>
    </div>
  );
}
 
export default Banner;