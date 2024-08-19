import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessCode, isTokenExpired } from "../extras/helpers";

const RestoreSession = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Hacky fix to use Spotify's RedirectURI with React HashRouter
    const { origin, search } =  window.location;
    const index = search.indexOf('=');
    let code = getAccessCode();
    if (index >= 0) {
      code = search.substring(index + 1);
      localStorage.setItem('code', code);
    };
    if (!code) window.location.replace(origin + '/#/login');
    if (isTokenExpired()) window.location.replace(origin + '/#/login');
    window.location.replace(origin + '/#/dashboard');
  }, [navigate]);
  return ( <></> );
}
 
export default RestoreSession;