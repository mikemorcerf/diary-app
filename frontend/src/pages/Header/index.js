import React from 'react';
import { Link } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/lightLogo.png';

export default function Header() {
  return (
    <div className="header-container">
        <section className="logo-section">
          <Link to="/profile">
            <img src={logoImg} className="logo-header" alt="Diary App logo" />
          </Link>
        </section>

        <section className="button-section">
          <div>
            <Link className="header-button" to="/profile/logs">
              Diary
            </Link>
          </div>
          <div>
            <Link className="header-button" to="/profile/logs/new">
              New log
            </Link>
          </div>
          <div>
            <button className="log-out-button" type="button">
              <FiPower size={45} className="pinkColor" />
            </button>
          </div>
        </section>
    </div>
  );
}