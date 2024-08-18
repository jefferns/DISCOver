import { getRedirectURL, getToken } from './helpers';

const URL = 'https://api.spotify.com/v1';
const API_URL = 'https://accounts.spotify.com/api';
const redirect_URI = getRedirectURL();

const apiGet = async (path, options = {}) => {
  const token = getToken();
  const response = await fetch(URL + path, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      ...options,
    }
  });

  if (response.status === 401) {
    window.location.replace('')
  };
  return response;
};

const apiPut = async (path, body = '', options = {}) => {
  const token = getToken();
  const response = await fetch(URL + path, {
    method: 'PUT',
    body: body,
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      ...options,
    }
  });
  // if (response.status === 401) {
  //   refreshToken();
  // };
  return response;
};

const apiPost = async (path, body = '', options = {}) => {
  const token = getToken();
  const response = await fetch(URL + path, {
    method: 'POST',
    body: body,
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      ...options,
    }
  });
  // if (response.status === 401) {
  //   refreshToken();
  // };
  return response;
};

export const getApiKey = () => {
  return process.env.REACT_APP_SPOTIFY_API_KEY;
};

export const getClientId = () => {
  return process.env.REACT_APP_CLIENT_ID;
};

export const getAvailableDevices = async () => {
  //https://developer.spotify.com/documentation/web-api/reference/#/operations/get-a-users-available-devices
  return apiGet('/me/player/devices');
};

export const transferPlayback = async (device_id) => {
  //https://developer.spotify.com/documentation/web-api/reference/#/operations/transfer-a-users-playback
  return apiPut('/me/player',  `{"device_ids":["${device_id}"]}`);
};

export const searchSpotify = async (type, query, limit=10) => {
  //https://developer.spotify.com/documentation/web-api/reference/#/operations/search
  return apiGet(`/search?type=${type}&query=${query}&limit=${limit}`);
};

export const getTopItems = async (type, time_range='medium_term', limit=5) => {
  //https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-top-artists-and-tracks
  // type === 'artists' | 'tracks'
  // time_range === 'short_term' | 'medium_term' | 'long_term'
  const response = await apiGet(`/me/top/${type}?limit=${limit}&time_range=${time_range}`);
  return response;
};

export const getMe = async () => {
  //https://developer.spotify.com/documentation/web-api/reference/#/operations/get-current-users-profile
  return apiGet('/me');
};

export const getRecommendations = async (seeds, type) => {
  // True if 'tracks' in seed type. This means [seeds] contains track items
  const tracks = type.indexOf('track') > -1;
  let query_url = '';
  tracks 
    ? query_url = 'seed_tracks='
    : query_url = 'seed_artists=';
  // append seed id to query url
  seeds.forEach(seed => query_url = query_url.concat(seed.id + ','));
  // remove trailing ','
  query_url = query_url.slice(0, -1);
  query_url += '&limit=100';
  return apiGet(`/recommendations?${query_url}`);
};

export const createPlaylist = async (
  user_id,
  name,
  is_public=false,
  is_collaborative=false,
  description='test description'
) => {
  const body = `{
    "name":"${name}",
    "collaborative":${is_collaborative},
    "public":${is_public},
    "description":"${description}"
  }`;
  return apiPost(`/users/${user_id}/playlists`, body);
};

export const addTracksToPlaylist = async (playlist_id, uris) => {
  let body_uris = '';
  uris.forEach(uri => body_uris += `"${uri}",`);

  return apiPost(
    `/playlists/${playlist_id}/tracks`,
   `{"uris":[${body_uris.substring(0, body_uris.length - 1)}]}`
  );
};

export const getAuthUrl = () => {
  const scopes = [
    'playlist-modify-public',
    'playlist-modify-private',
    'user-top-read',
  ];
  const clientId = getClientId();
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirect_URI}&scope=${scopes.join('%20')}&response_type=code&show_dialog=true`;
  return authUrl; 
};

export const fetchAccessTokens = async (code) => {
  if(!code) return console.error('Error when fetching Access Token. No code provided.');
  const clientId = getClientId();
  const key = getApiKey();

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", redirect_URI);
  const response = await fetch(API_URL + '/token', {
    method: 'POST',
    body: params,
    headers: {
      'Authorization': 'Basic ' + window.btoa(clientId + ':' + key),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response;
};

export const refreshToken = async (token) => {
  const clientId = getClientId();
  const key = getApiKey();

  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: token,
    client_id: clientId
  });

  const response = await fetch(API_URL + '/token', {
    method: 'POST',
    body: params,
    headers: {
      'Authorization': 'Basic ' + window.btoa(clientId + ':' + key),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  if (response.status !== 200) {
    console.error('Error refreshing Access Token: ', response);
    return;
  }
  window.localStorage.setItem('DISCOvery_token', response.access_token);
  window.localStorage.setItem('expires_in', response.expires_in);
  window.localStorage.setItem('refresh_token', response.refresh_token);
};

export const loadToken = async (code) => {
  fetchAccessTokens(code)
  .then(response => response.json())
  .then(response => {
    if(!response.access_token) return response;
    const expiresTime = Date.now() + response.expires_in * 1000;
    window.localStorage.setItem('expires_time', expiresTime);
    window.localStorage.setItem('DISCOvery_token', response.access_token);
    window.localStorage.setItem('refresh_token', response.refresh_token);
    return response;
  });
};