import React from 'react';
import { getAuthUrl } from '../extras/api';


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





export default function Login() {
  const handleLogin = () => {
    const url = getAuthUrl();
    window.location = url;
  };

  return (
    <div>
      <img alt="DISCOvery logo" src="logo_transparent.png" style={{height: '100px'}}/>
      <h1>Welcome!</h1>
      <button className='btn' type='button' onClick={ handleLogin }>
        Log in with Spotify
      </button>
    </div>
  )
}
