import './App.css';
import Login from './components/Login'
import Dashboard from './components/Dashboard';
// import Discovery from './components/Discovery';
import { useEffect, useState } from 'react';
import { fetchAccessTokens } from './extras/api';



function App() {
  const [showLogin, setShowLogin] = useState(true);
  // const [discoveryMode, setDiscoveryMode] = useState(false);

  const loadToken = (code) => {
    fetchAccessTokens(code)
    .then(response => response.json())
    .then(response => {
      if(!response.access_token) return;
      window.localStorage.setItem('DISCOvery_token', response.access_token);
      window.localStorage.setItem('expires_in', response.expires_in);
      window.localStorage.setItem('refresh_token', response.refresh_token);
      setShowLogin(false);
    });
  };

  useEffect(() => {
    if (window.localStorage.getItem('DISCOvery_token')) {
      setShowLogin(false);
    } else {
      const queryString = window.location.search;
      if(!queryString) return;
      const urlParams = new URLSearchParams(queryString);
      const code_param = urlParams.get('code');
      if(!code_param) return;
      loadToken(code_param);
    }
  }, []);

  return (
    <div className="App">
      { showLogin
        ? <Login/>
        : <Dashboard/>
      }
    </div>
  );
}

export default App;
