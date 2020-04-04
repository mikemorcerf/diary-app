import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';

import logoImg from '../../assets/lightLogo.png';

import './styles.css';

export default function Register() {
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

        <form>
          <input placeholder="First Name" />
          <input placeholder="Last Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          <button className="button" type="submit" >Register</button>
        </form>
      </div>
    </div>
  );
}