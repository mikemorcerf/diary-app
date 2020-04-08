import React from 'react';
import Header from '../../components/Header';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';

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
                <p>Calorie Intake: value</p>
                <p>Exercise Time: value</p>
                <p>Mood: value</p>
              </section>
              <section>
                <p>Vitamin Taken: value</p>
                <p>Energy Level: value</p>
                <p>Sleep Quality: value</p>
              </section>
              <button type="button">
                <FiEdit2 size={20} />
              </button>
              <button type="button">
                <FiTrash2 size={20} />
              </button>
            </li>




            <li>
              <h2>Log date</h2>
              <section>
                <p>Calorie Intake: value</p>
                <p>Exercise Time: value</p>
                <p>Mood: value</p>
              </section>
              <section>
                <p>Vitamin Taken: value</p>
                <p>Energy Level: value</p>
                <p>Sleep Quality: value</p>
              </section>
            </li>            <li>
              <h2>Log date</h2>
              <section>
                <p>Calorie Intake: value</p>
                <p>Exercise Time: value</p>
                <p>Mood: value</p>
              </section>
              <section>
                <p>Vitamin Taken: value</p>
                <p>Energy Level: value</p>
                <p>Sleep Quality: value</p>
              </section>
            </li>            <li>
              <h2>Log date</h2>
              <section>
                <p>Calorie Intake: value</p>
                <p>Exercise Time: value</p>
                <p>Mood: value</p>
              </section>
              <section>
                <p>Vitamin Taken: value</p>
                <p>Energy Level: value</p>
                <p>Sleep Quality: value</p>
              </section>
            </li>            <li>
              <h2>Log date</h2>
              <section>
                <p>Calorie Intake: value</p>
                <p>Exercise Time: value</p>
                <p>Mood: value</p>
              </section>
              <section>
                <p>Vitamin Taken: value</p>
                <p>Energy Level: value</p>
                <p>Sleep Quality: value</p>
              </section>
            </li>
          </ul>

        </div>
      </div>
    </div>
  );
}