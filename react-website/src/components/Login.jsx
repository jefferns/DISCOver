import React from 'react';
const queryString = require('query-string');


const client_id = '534b84117d9849018758b2f1688ea8fa';
const client_secret = 'db82f0dfeddc47eb9b498e653bd6426b';
const redirect_URI = 'http://localhost:3000';
const scopes = [
  'streaming',
  'playlist-modify-public',
  'playlist-modify-private',
  'user-library-modify',
  'user-modify-playback-state',
  'user-top-read',
  'user-read-email',
  'user-read-playback-state',
  'user-read-private',
  'user-read-currently-playing',
];
const API_URL = 'https://accounts.spotify.com/api';
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_URI}&scope=${scopes.join('%20')}&response_type=code&show_dialog=true`;


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


export const fetchAccessTokens = async (code) => {
  if(!code) return;
  const data = {
    code: code,
    redirect_uri: redirect_URI,
    grant_type: 'authorization_code',
  }
  const response = await fetch(API_URL + '/token', {
    method: 'POST',
    body: queryString.stringify(data),
    headers: {
      'Authorization': 'Basic ' + window.btoa(client_id + ':' + client_secret),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  return response;
}


export default function Login() {
  const handleLogin = () => {
    window.location = AUTH_URL;
  };

  return (
    <div>
      <img src="logo_transparent.png" style={{height: '100px'}}/>
      <h1>Welcome!</h1>
      <button className='btn' type='button' onClick={ handleLogin }>
        Log in with Spotify
      </button>
    </div>
  )
}
