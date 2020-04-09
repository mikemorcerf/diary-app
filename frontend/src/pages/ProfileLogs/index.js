import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';
import moment from 'moment';
import useInfiniteScroll from '../../components/useInfiniteScroll';
import api from '../../services/api';

import './styles.css';

export default function ProfileLogs() {
  const [page, setPage] = useState(1);
  const [logs, setLogs] = useState([]);
  const [numLogs, setNumLogs] = useState(0)
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);
  const [filters, setFilters] = useState('');

  const history = useHistory();

  useEffect(()=>{
    api.get(`/profile/logs?page=${page}`).then((response)=>{
      setPage(page+1);
      setLogs(response.data);
      console.log(response.headers['x-total-count']);
    }).catch((err)=>{
      alert(`Please log in to access this page: ${JSON.stringify(err.response.data.error)}`);
      history.push('/');
    });
  },[]);

  async function fetchMoreListItems() {
    await api.get(`/profile/logs?page=${page}${filters}`).then((response)=>{
      setLogs([...logs, response.data]);
      setIsFetching(false);
      setPage(page+1);
    }).catch((err)=>{
      console.log(err);
      setIsFetching(false);
    });
  }

  return (
    <div>
      <Header />
      <div className="profile-logs-container">
        <div className="content">
          <h1>Diary Logs: {numLogs} total</h1>
          <ul>
            {logs.map(log => (
              <li key={log.id}>
                  <h2>{moment(log.createdAt).format('MMMM Do YYYY')}</h2>
                  <section>
                    <p>Calorie Intake: {log.calorieIntake}</p>
                    <p>Exercise Time: {log.exerciseTime}</p>
                    <p>Mood: {log.mood}</p>
                  </section>
                  <section>
                    <p>Vitamin Taken: {log.vitaminTaken}</p>
                    <p>Energy Level: {log.energyLevel}</p>
                    <p>Sleep Quality: {log.sleepQuality}</p>
                  </section>
                  <button type="button">
                    <FiEdit2 size={20} />
                  </button>
                  <button type="button">
                    <FiTrash2 size={20} />
                  </button>
                </li>
            ))}
          </ul>
          {isFetching && 'Fetching more list items...'}
        </div>
      </div>
    </div>
  );
}