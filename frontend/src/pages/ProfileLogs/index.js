import React from 'react';
import Header from '../Header';

import './styles.css';

export default function () {
  return (
    <div>
      <Header />
      <div className="profile-logs-container">
        <div className="content">
          <h1>Diary Logs:</h1>
          <ul>
            <li>
              <h2>Log date</h2>
              <section>
                <p>Calorie Intake:<span>value</span></p>
                <p>Exercise Time:value</p>
                <p>Mood:value</p>
              </section>
              <section>
                <p>Vitamin Taken:value</p>
                <p>Energy Level:value</p>
                <p>Sleep Quality:value</p>
              </section>
            </li>
          </ul>

        </div>
      </div>
    </div>
  );
}