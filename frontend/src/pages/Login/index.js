import React from 'react';
import { FiCornerRightUp } from 'react-icons/fi'

import './styles.css';

import welcomeImg from '../../assets/welcome.png';
import logoImg from '../../assets/logo.png';

export default function Login () {
  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImg} className="logo-size" alt="Diary App logo" />
        <form>
          <h1>Hello there. Log in here:</h1>

          <input placeholder="Your email" />
          <input placeholder="password" />
          <button className="button" type="submit">Open diary</button>

          <a href="/register">
            <FiCornerRightUp size={16} className="pinkColor" />
            Don't have an account? Sign up
          </a>
        </form>
      </section>

      <img src={welcomeImg} className="image-size" alt="Welcome to Diary App" />
    </div>
  );
}