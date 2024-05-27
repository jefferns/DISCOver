import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const AccessToken = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    localStorage.setItem('access_code', code);
    navigate('/dashboard');
  }, [navigate, searchParams]);
  return ( <></> );
}
 
export default AccessToken;