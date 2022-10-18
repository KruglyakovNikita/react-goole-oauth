import React, { useEffect } from 'react';
import './App.css';
import jwt_decode from 'jwt-decode';
import { useState } from 'react';
import * as dotenv from 'dotenv';
dotenv.config();

function App() {
  const [user, setUser] = useState({});

  function handleSignOut(e) {
    e.preventDefault();
    setUser({});
    document.getElementById('signInDiv').hidden = false;
  }

  function handleCallbackResponse(response) {
    var userObject = jwt_decode(response.credential);
    setUser(userObject);
    document.getElementById('signInDiv').hidden = true;
  }
  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id: `!!!!!!!!!!!!!!!!!!!!Your google client_id code!!!!!!!!!!!!!!!!!!!!`,
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById('signInDiv'), { theme: 'outline', size: 'large' });

    google.accounts.id.prompt();
  }, []);

  return (
    <div className='App'>
      <div id='signInDiv'></div>
      <div className='container'>
        {Object.keys(user).length !== 0 && <button onClick={e => handleSignOut(e)}>Sign Out</button>}
        {Object.keys(user).length !== 0 && (
          <div>
            <img src={user.picture} alt='your google img'></img>
            <h3>{user.name}</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
