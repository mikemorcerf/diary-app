import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import { Form } from 'react-bootstrap';
import Emoji from '../../components/Emoji';

import api from '../../services/api';
import ApiAuthorization from '../../services/ApiAuthorization';

import './styles.css';

export default function NewLog() {
  const [hoursExercising, setHoursExercising] = useState(0);
  const [minutesExercising, setMinutesExercising] = useState(0);
  const [calorieIntake, setCalorieIntake] = useState(0.0);
  const [energyLevel, setEnergyLevel] = useState(3);
  const [sleepQuality, setSleepQuality] = useState(3);
  const [vitaminTaken, setVitaminTaken] = useState(false);
  const [mood, setMood] = useState('happy');

  const history = useHistory();

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const hours = Number(hoursExercising);
    const minutes = ((minutesExercising)/60.0).toFixed(2);
    const exerciseTime = hours + Number(minutes);

    const data = {
      exerciseTime,
      calorieIntake: Number(calorieIntake),
      energyLevel,
      mood,
      vitaminTaken,
      sleepQuality,
    }

    ApiAuthorization();
    api.post('/profile/logs', data).then((response)=>{
      history.push('/profile/logs');
    }).catch((err)=>{
      alert(JSON.stringify(err.response.data.error));
    });
  },[calorieIntake, energyLevel, history, hoursExercising, minutesExercising, mood, sleepQuality, vitaminTaken]);

  return(
    <div>
      <Header />
      <div className="new-log-container">
        <div className="content">
          <h1>How are you doing today?</h1>
          <Form onSubmit={handleSubmit} className="form-content">
            <div className="time-input-one label-box">
              <div className="label">Hours exercising:</div>
              <input label="Exercise" type="number" className="input-field" onChange={event => setHoursExercising(event.target.value)} defaultValue={0} min="0" max="23" />
            </div>
            <div className="time-input-two label-box">
              <div className="label">Minutes exercising:</div>
              <input type="number" min="1" max="59" onChange={event => setMinutesExercising(event.target.value)} defaultValue={0} className="input-field"/>
            </div>
            <div className="calory-input label-box">
              <div className="label">Calorie Intake:</div>
              <input type="number" min="1" max="35000" onChange={event => setCalorieIntake(event.target.value)} defaultValue={0} className="input-field" />
            </div>
            <div className="vitamin-input label-box">
              <div className="label">Vitamin Taken?</div>
              <Form.Check type="switch" className="input-field" onChange={event => setVitaminTaken(!vitaminTaken)} checked={vitaminTaken} id="vitamin-switch" style={{marginTop:'10px'}} label="" />
            </div>
            <div className="energy-input label-box">
              <div className="label">Energy level:</div>
              <Form.Control id="energy-range" onChange={event => setEnergyLevel(event.target.value)} className="input-field" style={{border:'none', marginTop:'15px'}} type="range" custom min={1} max={5} />
            </div>
            <div className="sleep-input label-box">
              <div className="label">Sleep quality:</div>
              <Form.Control id="sleep-range" onChange={event => setSleepQuality(event.target.value)} className="input-field" style={{border:'none', marginTop:'15px'}} type="range" custom min={1} max={5} />
            </div>
            <div className="mood-input label-box">
              <div className="label">Mood <Emoji symbol={mood} label={mood} /></div>
              <Form.Control as="select" onChange={event => setMood(event.target.value)} className="input-field" custom>
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
  );
}