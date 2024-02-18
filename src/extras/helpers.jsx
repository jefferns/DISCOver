import { useEffect, useRef } from "react";

export const getToken = () => {
  const token = window.localStorage.getItem('DISCOvery_token');
  if (!token) {
    console.error('No token found!');
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
}

export function debounce(cb, delay = 1000) {
  let timeout

  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      cb(...args)
    }, delay)
  }
}
