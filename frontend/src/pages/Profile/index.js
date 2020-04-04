import React from 'react';
import { Link } from 'react-router-dom';
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
            <p>Sign up to start keeping records of your days</p>

            <Link className="bottom-link" to="/">

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
    </div>
  );
}