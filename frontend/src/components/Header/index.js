import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/lightLogo.png';


export default function Header() {

  const history = useHistory();

  function handleLogOut(event) {
    event.preventDefault();
    delete api.defaults.headers.common["Authorization"];
    localStorage.clear();
    history.push('/');
  }

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
            <button className="log-out-button" type="button" onClick={handleLogOut} >
              <FiPower size={45} className="pinkColor" />
            </button>
          </div>
        </section>
    </div>
  );
}