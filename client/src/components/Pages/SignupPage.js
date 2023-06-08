import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import waveImage from './img/download.png';

export const SignupPage = ({ onSignup }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();

    axios.post('//localhost:8001/signup', {
      username,
      email,
      password
    })
      .then((response) => {
        toast.success('Signup successful');
        onSignup();
      })
      .catch((error) => {
        console.error(error);
        toast.error('Signup failed');
      });
  };

  return (
    <div className="container">
      <img className="wave" src={waveImage} alt="Wave" />
      <h5 className="text-center">let's go</h5>
      <form onSubmit={handleSignup}>
        <div className="img"></div>
        <div className="form-group">
          Username:
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          Email:
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          Choose Password:
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-success">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
