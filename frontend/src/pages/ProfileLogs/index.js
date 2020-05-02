import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';

import Emoji from '../../components/Emoji';
import ApiAuthorization from '../../services/ApiAuthorization';
import api from '../../services/api';

import './styles.css';

export default function ProfileLogs() {
  const [pagePagination, setPage] = useState(1);
  const [logs, setLogs] = useState([]);
  const [numLogs, setNumLogs] = useState(0);
  const [hasMoreLogs, setHasMoreLogs] = useState(true);
  const [allowFetch, setAllowFetch] = useState(false);
  const [moodFilter, setMoodFilter] = useState('');
  const [exerciseTimeFilter, setExerciseTimeFilter] = useState('');
  const [vitaminTakenFilter, setVitaminTakenFilter] = useState('');
  const [energyLevelFilter, setEnergyLevelFilter] = useState('');
  const [sleepQualityFilter, setSleepQualityFilter] = useState('');
  const [calorieIntakeFilter, setCalorieIntakeFilter] = useState('');

  const history = useHistory();

  useEffect(()=>{
    setPage(1);
    ApiAuthorization();
    api.get('/profile/logs?page=1').then((response)=>{
      setPage(2);
      setLogs(response.data);
      setNumLogs(response.headers['x-total-count']);
      setAllowFetch(true);
    }).catch((err)=>{
      alert(`Please log in to access this page: ${JSON.stringify(err)}`);
      history.push('/');
    });
  },[history]);

  async function fetchMoreListItems() {
    if(allowFetch && hasMoreLogs){
      setAllowFetch(false);
      ApiAuthorization();
      await api.get(`/profile/logs?page=${pagePagination}${moodFilter}${exerciseTimeFilter}${vitaminTakenFilter}${energyLevelFilter}${sleepQualityFilter}${calorieIntakeFilter}`).then((response)=>{
        //If all items are loaded, do not fetch items anymore
        if(response.data.length==0){
          setHasMoreLogs(false);
        } else {
          setPage(pagePagination+1);
          setLogs([ ...logs, ...response.data]);
          setNumLogs(response.headers['x-total-count']);
        }
      }).catch((err)=>{
        alert(`Please log in to access this page: ${JSON.stringify(err)}`);
        history.push('/');
      });
      setAllowFetch(true);
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

  async function handleFilterChange({ title='', check='', filterType='', filter='' }) {
    setAllowFetch(false);
    setPage(1);
    setLogs([]);
    setNumLogs(0);
    setHasMoreLogs(true);
    setAllowFetch(true);

    switch(check) {
      case true:
        switch(title) {
          case 'mood':
            setMoodFilter(`&moodFilter=${filter}`);
            break;
          case 'exercise':
            setExerciseTimeFilter(`&exerciseTimeFilterType=${filterType}&exerciseTimeFilter=${filter}`);
            break;
          case 'vitamin':
            setVitaminTakenFilter(`&vitaminTakenFilter=${filter}`);
            break;
          case 'energy':
            setEnergyLevelFilter(`&energyLevelFilterType=${filterType}&energyLevelFilter=${filter}`);
            break;
          case 'sleep':
            setSleepQualityFilter(`&sleepQualityFilterType=${filterType}&sleepQualityFilter=${filter}`);
            break;
          case 'calorie':
            setCalorieIntakeFilter(`&calorieIntakeFilterType=${filterType}&calorieIntakeFilter=${filter}`);
            break;
          default:
        }
        break;


        
      case false:
        switch(title) {
          case 'mood':
            setMoodFilter('');
            break;
          case 'exercise':
            setExerciseTimeFilter('');
            break;
          case 'vitamin':
            setVitaminTakenFilter('');
            break;
          case 'energy':
            setEnergyLevelFilter('');
            break;
          case 'sleep':
            setSleepQualityFilter('');
            break;
          case 'calorie':
            setCalorieIntakeFilter('');
            break;
          default:
            
        }
        break;
      default:
        break;
    }
    setAllowFetch(true);
  }

  function missingInputAlert(){
    alert('Please fill in input fields for this filter in order to use it');
  }

  function untoggleCheckbox(checkboxId) {
    if(document.getElementById(checkboxId).checked==true){
      setAllowFetch(false);
      document.getElementById(checkboxId).checked = false;
      
      switch(checkboxId) {
        case 'calorie-intake-checkbox':
          handleFilterChange({ title:'calorie', check:false });
          break;
        case 'exercise-time-checkbox':
          handleFilterChange({ title:'exercise', check:false });
          break;
        case 'sleep-quality-checkbox':
          handleFilterChange({ title:'sleep', check:false });
          break;
        case 'vitamin-taken-checkbox':
          handleFilterChange({ title:'vitamin', check:false });
          break;
        case 'mood-checkbox':
          handleFilterChange({ title:'mood', check:false });
          break;
        case 'energy-level-checkbox':
          handleFilterChange({ title:'energy', check:false });
          break;
        default:
          break;
      }
    }
  }

  return (
    <div>
      <Header />
      <div className="profile-logs-container">
        <div className="content">
          <h1>Filters:</h1>
          <div className="filter-box">
            <form className="filter-form">
              <section className="filter-group-one">
                <div className="filter-item-calorie-intake">
                  <span className="filter-tag">Calorie Intake</span>
                  <input type="checkbox" id="calorie-intake-checkbox" onChange={e => {
                    if(document.getElementById('calorie-intake-text').value==''){
                      untoggleCheckbox('calorie-intake-checkbox');
                      missingInputAlert();
                    } else if((document.getElementById('calorie-intake-text').value<0.1)||(document.getElementById('calorie-intake-text').value>35000.0)){
                      untoggleCheckbox('calorie-intake-checkbox');
                      document.getElementById('calorie-intake-text').value = 0;
                      alert('You must choose a value between 0.1 and 35,000.0');
                    } else {
                    handleFilterChange({
                      title: 'calorie',
                      check: document.getElementById('calorie-intake-checkbox').checked,
                      filter: document.getElementById('calorie-intake-text').value,
                      filterType: document.getElementById('calorie-intake-dropdown').value
                  })}}}/>
                  <select id="calorie-intake-dropdown" onChange={e => untoggleCheckbox('calorie-intake-checkbox')}>
                    <option value="lte">Less than or equal</option>
                    <option value="gte">Greater than or equal</option>
                  </select>
                  <input type="number" id="calorie-intake-text" min="0.1" max="35000.0" onChange={e => untoggleCheckbox('calorie-intake-checkbox')} />
                </div>
                <div className="filter-item-exercise-time">
                  <span className="filter-tag">Exercise Time (hours - minutes)</span>
                  <input type="checkbox" id="exercise-time-checkbox" onChange={e => {
                  if(document.getElementById('exercise-time-hour-text').value=='' ||
                     document.getElementById('exercise-time-minute-text').value==''){
                    untoggleCheckbox('exercise-time-checkbox');
                    missingInputAlert();
                  } else if(document.getElementById('exercise-time-hour-text').value<0 || document.getElementById('exercise-time-hour-text').value>23){
                    document.getElementById('exercise-time-hour-text').value = 0;
                    untoggleCheckbox('exercise-time-checkbox');
                    alert("invalid hour value");
                  } else if(document.getElementById('exercise-time-minute-text').value<0 || document.getElementById('exercise-time-minute-text').value>59){
                    document.getElementById('exercise-time-minute-text').value = 0;
                    untoggleCheckbox('exercise-time-checkbox');
                    alert("invalid minute value");
                  } else {
                    handleFilterChange({
                      title: 'exercise',
                      check: document.getElementById('exercise-time-checkbox').checked,
                      filter: (parseFloat(document.getElementById('exercise-time-hour-text').value) + parseFloat(document.getElementById('exercise-time-minute-text').value/60) ),
                      filterType: document.getElementById('exercise-time-dropdown').value
                    })
                  }}}/>
                  <select id="exercise-time-dropdown" onChange={e => untoggleCheckbox('exercise-time-checkbox')} >
                    <option value="lte">Less than or equal</option>
                    <option value="gte">Greater than or equal</option>
                  </select>
                  <input type="number" id="exercise-time-hour-text" min="0" max="23" onChange={e => untoggleCheckbox('exercise-time-checkbox')} />
                  <input type="number" id="exercise-time-minute-text" min="0" max="59" onChange={e => untoggleCheckbox('exercise-time-checkbox')} />
                </div>
                <div className="filter-item-sleep-quality">
                  <span className="filter-tag">Sleep Quality</span>
                  <input type="checkbox" id="sleep-quality-checkbox" onChange={e => 
                    handleFilterChange({
                      title: 'sleep',
                      check: document.getElementById('sleep-quality-checkbox').checked,
                      filterType: 'lte',
                      filter: document.getElementById('sleep-quality-range').value
                    })
                  }/>
                  <input type="range" className="range-slide" id="sleep-quality-range" min="1" max="5" onChange={e => untoggleCheckbox('sleep-quality-checkbox')} />
                </div>
              </section>
              <section className="filter-group-two">
                <div className="filter-item-vitamin-taken">
                  <span className="filter-tag">Vitamin Taken?</span>
                  <input type="checkbox" id="vitamin-taken-checkbox" onChange={e => 
                    handleFilterChange({
                      title: 'vitamin',
                      check: document.getElementById('vitamin-taken-checkbox').checked,
                      filter: document.getElementById('vitamin-taken-dropdown').value
                    })
                  }/>
                  <select id="vitamin-taken-dropdown" onChange={e => untoggleCheckbox('vitamin-taken-checkbox')} >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div className="filter-item-mood">
                  <span className="filter-tag">Mood</span>
                  <input type="checkbox" id="mood-checkbox" onChange={e => 
                    handleFilterChange({
                      title: 'mood',
                      check: document.getElementById('mood-checkbox').checked,
                      filter: document.getElementById('mood-dropdown').value
                    })
                  }/>
                  <select id="mood-dropdown" onChange={e => untoggleCheckbox('mood-checkbox')} > 
                    <option value="happy">Happy</option>
                    <option value="calm">Calm</option>
                    <option value="sad">Sad</option>
                    <option value="annoyed">Annoyed</option>
                  </select>
                </div>
                <div className="filter-item-energy-level">
                  <span className="filter-tag">Energy Level</span>
                  <input type="checkbox" id="energy-level-checkbox" onChange={e => 
                    handleFilterChange({
                      title: 'energy',
                      check: document.getElementById('energy-level-checkbox').checked,
                      filterType: 'lte',
                      filter: document.getElementById('energy-level-range').value
                    })
                  }/>
                  <input type="range" className="range-slide" id="energy-level-range" min="1" max="5" onChange={e => untoggleCheckbox('energy-level-checkbox')} />
                </div>
              </section>
            </form>
          </div>
          <h1>Total Results: {numLogs}</h1>
            <InfiniteScroll
                pageStart={0}
                element={'ul'}
                loadMore={allowFetch ? fetchMoreListItems : ()=>({})}
                hasMore={true}
                loader={hasMoreLogs ? <div className="loader" key={'loader-key'}>Loading ...</div> : <div className="loader" key={'loader-key'}>All items were loaded</div>}
                useWindow={true}
                threshold={5}
            >
              {logs.map(log => (
                <li key={log.id}>
                  <h2>{moment(log.createdAt).format('MMMM Do YYYY')}</h2>
                  <section>
                    <p>Calorie Intake: {log.calorieIntake}</p>
                    <p>Exercise Time: {Math.floor(log.exerciseTime)} hours and {Math.floor((log.exerciseTime%1)*60)} minutes</p>
                    <p>Mood: {log.mood} <Emoji symbol={log.mood} label={log.mood}/></p>
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
        </div>
      </div>
    </div>
  );
}