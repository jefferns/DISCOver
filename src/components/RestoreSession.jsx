import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../extras/helpers";

const RestoreSession = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token === 'undefined') navigate('/login');
    if (isTokenExpired()) navigate('/login');
    navigate('/dashboard');
  }, [navigate]);
  return ( <></> );
}
 
export default RestoreSession;