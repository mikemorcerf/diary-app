import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiEye, FiEdit } from 'react-icons/fi';
import Header from '../Header';

import api from '../../services/api';

import './styles.css';

export default function Profile() {
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  const authorizationToken = localStorage.getItem('token');
  const history = useHistory();

  useEffect(() => {
    try {
      api.get('profile', {
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
        },
      }).then(reponse => {
        
      });
    } catch (err) {
      console.log('authorizationToken');
      alert(authorizationToken);
      history.push('/');
    }
  }, []);

  return(
    <div>
      <Header />
      <div className="profile-container">
        <div className="content">
          <section>
            <h1>Hello user name. How are you doing today?</h1>
            <p>Full name</p>
            <p>Email address</p>
            <p>Member since date</p>
          </section>

          <section>
            <Link to="/profile/logs" className="button">
              <FiEye size={25} className="button-icon" />
              <span>See Diary entries</span>
            </Link>
            <Link to="/profile/logs/new" className="button">
              <FiEdit size={25} className="button-icon" />
              <span>Create new entry</span>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}