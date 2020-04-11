import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiCornerRightUp } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import welcomeImg from '../../assets/welcome.png';
import logoImg from '../../assets/logo.png';

export default function Login () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  
  async function handleLogin(event) {
    event.preventDefault();
    const data = {
      email,
      password
    };

    await api.post('authenticate', data)
      .then((response)=>{
        localStorage.setItem('AuthorizationToken',`Bearer ${response.data.token}`);
        api.defaults.headers.common['Authorization'] = localStorage.getItem('AuthorizationToken');
        history.push('/profile');
      })
      .catch((err)=>{
        alert(`Error logging in: ${JSON.stringify(err.response.data.error)}`);
      });
  }

  return (
    <div>
      <div className="login-container">
        <section className="form">
          <img src={logoImg} className="logo-size" alt="Diary App logo" />
          <form onSubmit={handleLogin}>
            <h1>Hello there. Log in here:</h1>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
            <button className="button" type="submit">Open diary</button>

            <Link className="bottom-link" to="/register">
              <FiCornerRightUp size={16} className="pinkColor" />
              Don't have an account? Sign up
            </Link>
          </form>
        </section>

        <img src={welcomeImg} className="image-size" alt="Welcome to Diary App" />
      </div>
    </div>
  );
}