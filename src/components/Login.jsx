import React, { useEffect } from 'react';
import { getAuthUrl } from '../extras/api';
import './login.css';
import { clearURLParams, getAccessCode, isTokenExpired } from '../extras/helpers';


// export const fetchAccessTokens = async () => {
//   const data = { grant_type: 'client_credentials' }
//   const response = await fetch(API_URL + '/token', {
//     method: 'POST',
//     body: queryString.stringify(data),
//     headers: {
//       'Authorization': 'Basic ' + window.btoa(client_id + ':' + client_secret),
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//   })
//   return response;
// }





export default function Login({navigate}) {  
  const handleLogin = () => {
    const url = getAuthUrl();
    window.location = url;
  };

  useEffect(() => {
    // Hacky fix to use Spotify's RedirectURI with React HashRouter
    const { search } =  window.location;
    const index = search.indexOf('=');
    let code = getAccessCode();
    if (index >= 0) {
      code = search.substring(index + 1);
      localStorage.setItem('code', code);
      clearURLParams();
    };
    if (code) navigate('dashboard');
  }, [navigate]);

  return (
    <div className="welcome">
      <div className='content'>
        <img alt="DISCOvery logo" src="logo_transparent.png" style={{height: '350px'}}/>
        <h1>Welcome!</h1>
        <button className='btn' type='button' onClick={ handleLogin }>
          Log in with Spotify
        </button>
      </div>
    </div>
  )
}
