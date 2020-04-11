import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';
import ApiAuthorization from '../../services/ApiAuthorization';
import api from '../../services/api';

import './styles.css';

export default function ProfileLogs() {
  const [page, setPage] = useState(1);
  const [logs, setLogs] = useState([]);
  const [numLogs, setNumLogs] = useState(0);
  const [filters, setFilters] = useState('');
  const [hasMoreLogs, setHasMoreLogs] = useState(true);
  const [allowFetch, setAllowFetch] = useState(false);

  const history = useHistory();

  useEffect(()=>{
    setPage(1);
    ApiAuthorization();
    api.get(`/profile/logs?page=${page}`).then((response)=>{
      setPage(page+1);
      setLogs(response.data);
      setNumLogs(response.headers['x-total-count']);
      setAllowFetch(true);
    }).catch((err)=>{
      alert(`Please log in to access this page: ${JSON.stringify(err.response.data.error)}`);
      history.push('/');
    });
  },[]);

  async function fetchMoreListItems() {
    if(allowFetch){
      //If all items are loaded, do not fetch items anymore
      if((!hasMoreLogs)||(numLogs>0 && numLogs==logs.length)) {
        if(hasMoreLogs) { 
          setHasMoreLogs(false);
        };
        return;
      }
      ApiAuthorization();
      await api.get(`/profile/logs?page=${page}${filters}`).then((response)=>{
        //Extra measurement to make sure db will not be requested if there's no more data in db
        if(response.data.length==0){
          setHasMoreLogs(false);
        }
        setPage(page+1);
        setLogs([ ...logs, ...response.data]);
        if(numLogs===0 || numLogs==logs.length){
          setHasMoreLogs(false);
        }
      }).catch((err)=>{
        alert(`Please log in to access this page: ${JSON.stringify(err.response.data.error)}`);
        history.push('/');
      });
    }
  }

  async function handleEditLog(id) {
    console.log(hasMoreLogs);
  }

  async function handleDeleteLog(id) {
    await api.delete(`/profile/logs/${id}`).then(() => {
      setNumLogs(numLogs-1);
      setLogs(logs.filter((log)=>(log.id!==id)));
    }).catch((err)=>{
      console.log(err);
    });
  }

  return (
    <div>
      <Header />
      <div className="profile-logs-container">
        <div className="content">
          <h1>Diary Logs: {numLogs} total</h1>
          <ul>
            <InfiniteScroll
                pageStart={page}
                loadMore={fetchMoreListItems}
                hasMore={hasMoreLogs}
                loader={hasMoreLogs ? <div className="loader" key={'loader-key'}>Loading ...</div> : ''}
                useWindow={true}
                threshold={5}
            >
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
                  <button type="button" onClick={() => handleEditLog(log.id)}>
                    <FiEdit2 size={20} />
                  </button>
                  <button type="button" onClick={() => handleDeleteLog(log.id)}>
                    <FiTrash2 size={20} />
                  </button>
                </li>
              ))}
            </InfiniteScroll>
          </ul>
        </div>
      </div>
    </div>
  );
}