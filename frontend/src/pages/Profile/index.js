import React from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiEdit } from 'react-icons/fi';
import Header from '../Header';

import './styles.css';

export default function Profile() {
  return(
    <div>
      <Header />
      <div className="profile-container">
        <div className="content">
          <section>
            <h1>Hello user name. How are your doing today?</h1>
            <p>Full name</p>
            <p>Email address</p>
            <p>Member since date</p>
          </section>

          <section>
            <Link to="/" className="button">
              <FiEye size={25} className="button-icon" />
              <span>See Diary entries</span>
            </Link>
            <Link to="/" className="button">
              <FiEdit size={25} className="button-icon" />
              <span>Create new entry</span>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}