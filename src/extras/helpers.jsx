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