import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';

import api from '../../services/api';
import ApiAuthorization from '../../services/api';

import logoImg from '../../assets/lightLogo.png';

import './styles.css';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  async function handleRegister(event) {
    event.preventDefault();
    const data = {
      firstName,
      lastName,
      email,
      password,
    };

    await api.post('register', data)
      .then(async()=>{
        await api.post('authenticate', { email, password })
        .then((response) => {
          localStorage.setItem('AuthorizationToken',`Bearer ${response.data.token}`);
          ApiAuthorization();
          history.push('/profile');
        })
        .catch((err)=>{
          alert(`Error authenticating: ${JSON.stringify(err.response.data.error)}`);
          history.push('/');
        });
      })
      .catch((err)=>{
        alert(`Error signing up: ${JSON.stringify(err.response.data.error)}`);
    });
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} className="logo-size" alt="Diary App logo" />
          <h1>Register:</h1>
          <p>Sign up to start keeping records of your days</p>

          <Link className="bottom-link" to="/">
            <FiChevronLeft size={16} className="pinkColor" />
            Already registered? Go back to Sign in page
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="First Name"
            value={firstName}
            onChange={event => setFirstName(event.target.value)}
          />
          <input
            placeholder="Last Name"
            value={lastName}
            onChange={event => setLastName(event.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <button className="button" type="submit" >Register</button>
        </form>
      </div>
    </div>
  );
}