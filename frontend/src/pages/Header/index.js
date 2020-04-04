import React from 'react';
import { Link } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/lightLogo.png';

export default function Header() {
  return (
    <div className="header-container">
      <header>
        <div className="content">
          <Link to="/profile">
            <img src={logoImg} className="logo-header" alt="Diary App logo" />
          </Link>
        </div>

        <div className="header-button-section">
          <Link className="header-button" to="/">
            Diary
          </Link>

          <Link className="header-button" to="/">
            New log
          </Link>

          <button className="log-out-button" type="button">
            <FiPower size={45} className="pinkColor" />
          </button>
        </div>
      </header>
    </div>
  );
}