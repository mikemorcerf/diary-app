import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';

import './styles.css';

export default function NewLog() {
  return(
    <div>
      <Header />
      <div className="new-log-container">
        <div className="content">
        <h1>How are you doing today?</h1>
          <form>
            <section>
              <p>Full name</p>
              <p>Email address</p>
              <p>Member since date</p>
            </section>
            <section>
              <Link to="/profile/logs" className="button">
                <span>See Diary entries</span>
              </Link>
              <Link to="/profile/logs/new" className="button">
                <span>Create new entry</span>
              </Link>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
}