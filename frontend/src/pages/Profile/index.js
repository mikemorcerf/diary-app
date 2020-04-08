import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiEye, FiEdit } from 'react-icons/fi';
import Header from '../../components/Header';
import moment from 'moment';

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
      }).then(response => {
        setId(response.data.id);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setCreatedAt(response.data.createdAt);
      });
    } catch (err) {
      history.push('/');
    }
  }, [authorizationToken, history]);

  return(
    <div>
      <Header />
      <div className="profile-container">
        <div className="content">
          <section>
            <h1>Hello {firstName}. How are you doing today?</h1>
            <p>{firstName} {lastName}</p>
            <p>Your id: {id}</p>
            <p>Email address: {email}</p>
            <p>Member since {moment(createdAt).format('MMMM Do YYYY')}</p>
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