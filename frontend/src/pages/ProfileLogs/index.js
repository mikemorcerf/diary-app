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
    history.push(`/profile/logs/update/${id}`);
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
          <h1>Filters:</h1>
          <div className="filter-box">
            <form action="" className="filter-form">
              <section className="filter-group-one">
                <div className="filter-item-calorie-intake">
                  <span className="filter-tag">Calorie Intake</span>
                  <input type="checkbox" id="calorie-intake-checkbox" />
                  <select id="calorie-intake-dropdown">
                    <option value="lte">Less than or equal</option>
                    <option value="gte">Greater than or equal</option>
                  </select>
                  <input type="text" id="calorie-intake-text" />
                </div>
                <div className="filter-item-exercise-time">
                  <span className="filter-tag">Exercise Time (hours - minutes)</span>
                  <input type="checkbox" id="exercise-time-checkbox" />
                  <select id="exercise-time-dropdown">
                    <option value="lte">Less than or equal</option>
                    <option value="gte">Greater than or equal</option>
                  </select>
                  <input type="text" id="exercise-time-hour-text" min="0" max="23" />
                  <input type="text" id="exercise-time-minute-text" min="0" max="59" />
                </div>
                <div className="filter-item-sleep-quality">
                  <span className="filter-tag">Sleep Quality</span>
                  <input type="checkbox" id="sleep-quality-checkbox" />
                  <input type="range" className="range-slide" id="sleep-quality-range" min="1" max="5" />
                </div>
              </section>
              <section className="filter-group-two">
                <div className="filter-item-vitamin-taken">
                  <span className="filter-tag">Vitamin Taken?</span>
                  <input type="checkbox" id="vitamin-taken-checkbox" />
                  <select id="vitamin-taken-dropdown">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div className="filter-item-mood">
                  <span className="filter-tag">Mood</span>
                  <input type="checkbox" id="mood-checkbox" />
                  <select id="mood-dropdown">
                    <option value="happy">Happy</option>
                    <option value="calm">Calm</option>
                    <option value="sad">Sad</option>
                    <option value="annoyed">Annoyed</option>
                  </select>
                </div>
                <div className="filter-item-energy-level">
                  <span className="filter-tag">Energy Level</span>
                  <input type="checkbox" id="energy-level-checkbox" />
                  <input type="range" className="range-slide" id="energy-level-range" min="1" max="5" />
                </div>
              </section>
            </form>
          </div>
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
                    <p>Exercise Time: {Math.floor(log.exerciseTime)} hours and {Math.floor((log.exerciseTime%1)*60)} minutes</p>
                    <p>Mood: {log.mood}</p>
                  </section>
                  <section>
                    <p>Vitamin Taken: {log.vitaminTaken ? 'yes' : 'no'}</p>
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