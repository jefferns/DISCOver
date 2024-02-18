import './App.css';
import Login from './components/Login'
import Dashboard from './components/Dashboard';
// import Discovery from './components/Discovery';
import { useEffect, useState } from 'react';
import { loadToken } from './extras/api';
import { getAccessCode } from './extras/helpers';



function App() {
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (window.localStorage.getItem('DISCOvery_token')) {
      setShowLogin(false);
    } else {
      const code = getAccessCode();
      if(!code) return;
      loadToken(code).then((res) => {
        if (!res?.error) setShowLogin(false);
      });
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
