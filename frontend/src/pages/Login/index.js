import React from 'react';

import './styles.css';

import welcomeImg from '../../assets/welcome.png';
import logoImg from '../../assets/logo.png';

export default function Login () {
  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImg} alt="Diary App logo" />
      </section>

      <form>
        <h1>Hello, log in here:</h1>

        <input placeholder="Your email" />
        <input placeholder="password" />
        <button type="submit">Open diary</button>

        <a href="/register">Don't have an account? Sign up :)</a>
      </form>

      <img src={welcomeImg} alt="Welcome to Diary App" />
    </div>
  );
}