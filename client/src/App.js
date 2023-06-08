
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginPage } from './components/Pages/LoginPage';
import { SignupPage } from './components/Pages/SignupPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { HomePage } from './components/Pages/HomePage';
import axios from 'axios';

function App() {
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      axios
        .get('/user', {
          headers: {
            Authorization: token
          }
        })
        .then(response => {
          setUser(response.data.user);
        })
        .catch(error => {
          console.error(error);
          // Handle error
        });
    }
  }, [token]);

  const handleLogin = (token, username) => {
    setToken(token);
    setUser({ username });
  };

  const handleLogout = () => {
    setToken('');
    setUser(null);
  };


  return (
    
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<SignupPage onSignup={handleLogin} />} />

          <Route
            path="/"
            element={
              !token ? (
                <>
                  <LoginPage onLogin={handleLogin} />
                </>
              ) : (
                <>
                  <header className="header">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                      <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                          <button onClick={handleLogout} className="btn btn-outline-primary">Logout</button>
                        </li>
                      </ul>
                    </nav>
                  </header>
                  <Routes>
                  <Route path="/" element={<HomePage username={user?.username}/>} // Pass the logged-in username as the `name` prop
/>
                  </Routes>
                </>
              )
            }
          />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
