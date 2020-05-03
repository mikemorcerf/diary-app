import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import { Form } from 'react-bootstrap';
import moment from 'moment';

import api from '../../services/api';
import ApiAuthorization from '../../services/ApiAuthorization';

import Emoji from '../../components/Emoji';

import './styles.css';

export default function EditLog({ match }) {
  const [logDataRetrievedFromServer, setLogDataRetrievedFromServer] = useState(false);
  const [logId, setLogId] = useState('');
  const [hoursExercising, setHoursExercising] = useState(0);
  const [minutesExercising, setMinutesExercising] = useState(0);

  const [mood, setMood] = useState('');
  const [exerciseTime, setExerciseTime] = useState(0.0);
  const [vitaminTaken, setVitaminTaken] = useState(false);
  const [energyLevel, setEnergyLevel] = useState(0);
  const [sleepQuality, setSleepQuality] = useState(0);
  const [calorieIntake, setCalorieIntake] = useState(0.0);
  const [createdAt, setCreatedAt] = useState('');

  const history = useHistory();

  useEffect(()=>{
    setLogId(match.params.logId);
    if(logId){
      ApiAuthorization();
      api.get(`/profile/logs/${logId}`).then((response)=>{
        setMood(response.data.mood);
        setExerciseTime(response.data.exerciseTime);
        setVitaminTaken(response.data.vitaminTaken);
        setEnergyLevel(response.data.energyLevel);
        setSleepQuality(response.data.sleepQuality);
        setCalorieIntake(response.data.calorieIntake);
        setCreatedAt(response.data.createdAt);
        setLogDataRetrievedFromServer(true);
      }).catch((err)=>{
        console.log(err);
      });
    }
  },[logId, match.params.logId]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const hours = Number(hoursExercising);
    const minutes = ((minutesExercising)/60.0).toFixed(2);
    setExerciseTime(hours + Number(minutes));

    const data = {
      exerciseTime,
      calorieIntake: Number(calorieIntake),
      energyLevel,
      mood,
      vitaminTaken,
      sleepQuality,
    }

    ApiAuthorization();
    api.put(`/profile/logs/${logId}`, data).then(()=>{
      alert('You successfully updated your log');
      history.push('/profile/logs');
    }).catch((err)=>{
      alert(JSON.stringify(err.response.data.error));
    });
  },[calorieIntake, energyLevel, exerciseTime, history, hoursExercising, logId, minutesExercising, mood, sleepQuality, vitaminTaken]);

  return(logDataRetrievedFromServer && (
    <div>
      <Header />
      <div className="new-log-container">
        <div className="content">
          <h1>What would you like to change on record from {moment(createdAt).format('MMMM Do YYYY')}</h1>
          <Form className="form-content" onSubmit={handleSubmit}>
            <div className="time-input-one label-box">
              <div className="label">Hours exercising:</div>
              <input label="Exercise" type="number" onChange={event => setHoursExercising(event.target.value)} className="input-field" min="0" max="23" defaultValue={parseInt(exerciseTime)} />
            </div>
            <div className="time-input-two label-box">
              <div className="label">Minutes exercising:</div>
              <input type="number" min="0" max="59" onChange={event => setMinutesExercising(event.target.value)} className="input-field" defaultValue={parseInt((exerciseTime%1)*60)} />
            </div>
            <div className="calory-input label-box">
              <div className="label">Calorie Intake:</div>
              <input type="number" min="0" max="35000" onChange={event => setCalorieIntake(event.target.value)} className="input-field" defaultValue={calorieIntake} />
            </div>
            <div className="vitamin-input label-box">
              <div className="label">Vitamin Taken?</div>
              <Form.Check type="switch" onChange={event => setVitaminTaken(!vitaminTaken)} className="input-field" id="vitamin-switch" style={{marginTop:'10px'}} label="" checked={vitaminTaken} />
            </div>
            <div className="energy-input label-box">
              <div className="label">Energy level:</div>
              <Form.Control id="energy-range" onChange={event => setEnergyLevel(event.target.value)} className="input-field" style={{border:'none', marginTop:'15px'}} type="range" custom min={1} max={5} defaultValue={energyLevel} />
            </div>
            <div className="sleep-input label-box">
              <div className="label">Sleep quality:</div>
              <Form.Control id="sleep-range" onChange={event => setSleepQuality(event.target.value)} className="input-field" style={{border:'none', marginTop:'15px'}} type="range" custom min={1} max={5} defaultValue={sleepQuality} />
            </div>
            <div className="mood-input label-box">
              <div className="label">Mood <Emoji symbol={mood} label={mood}/></div>
              <Form.Control as="select" onChange={event => setMood(event.target.value)} className="input-field" custom defaultValue={mood} >
                <option>happy</option>
                <option>calm</option>
                <option>sad</option>
                <option>annoyed</option>
              </Form.Control>
            </div>
            <button className="button" type="submit" >Save</button>
          </Form>
        </div>
      </div>
    </div>
  ))
}
