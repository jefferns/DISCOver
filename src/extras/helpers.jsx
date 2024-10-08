import { useEffect, useRef } from "react";

export const getToken = () => {
  const token = window.localStorage.getItem('DISCOvery_token');
  if (!token) {
    alert('Session expired: Try reloading or clearing cache');
    console.error('No token found!');
    localStorage.clear();
    return '';
  }
  return token;
};

export function useTraceUpdate(props) {
  // https://stackoverflow.com/questions/41004631/trace-why-a-react-component-is-re-rendering
  const prev = useRef(props);
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0) {
      console.log('Changed props:', changedProps);
    }
    prev.current = props;
  });
}

export const isSome = (option) => {
  if (
    option ||
    typeof option === String ||
    typeof option === Number ||
    typeof option === Boolean
  ) return true;
  return false;
};

export const isNone = (option) => {
  if (isSome(option)) return false;
  return true;
};

export const getRedirectURL = () => {
  const hostname = window.location.hostname;
  if (hostname.includes('localhost')) return 'http://localhost:3000';
  return 'https://jefferis.dev';
};

export function debounce(cb, delay = 1000) {
  let timeout

  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      cb(...args)
    }, delay)
  }
};

export const getAccessCode = () => {
  const code = localStorage.getItem('code');
  if (!code) console.error('Access Code not found!');
  return code;
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

export const pruneTrack = (track) => {
  const { artists, id, name, uri } = track;
  return { artists, id, name, uri };
};

export const isTokenExpired = () => {
  const now = Date.now();
  const expiredTime = localStorage.getItem('expires_time');
  if (!expiredTime) return true;
  if (now > expiredTime) return true;
  return false;
};

export const clearURLParams = () => {
  window.history.pushState({}, document.title, window.location.pathname);
};

export const wait = t => new Promise((resolve, reject) => setTimeout(resolve, t))