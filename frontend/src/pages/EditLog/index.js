import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { Form } from 'react-bootstrap';

import api from '../../services/api';
import ApiAuthorization from '../../services/ApiAuthorization';

import Emoji from '../../components/Emoji';

import './styles.css';

export default function EditLog() {
  const [moodFilter, setMoodFilter] = useState('');
  const [exerciseTimeFilter, setExerciseTimeFilter] = useState('');
  const [vitaminTakenFilter, setVitaminTakenFilter] = useState('');
  const [energyLevelFilter, setEnergyLevelFilter] = useState('');
  const [sleepQualityFilter, setSleepQualityFilter] = useState('');
  const [calorieIntakeFilter, setCalorieIntakeFilter] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  useEffect(() => {
    ApiAuthorization();

  }, []);

  return(
    <div>
      <Header />
      <div className="new-log-container">
        <div className="content">
          <h1>What would you like to change on record from DATEEEEEE</h1>
          <Form className="form-content">
            <div className="time-input-one label-box">
              <div className="label">Hours exercising:</div>
              <input label="Exercise" type="number" className="input-field" min="0" max="23" />
            </div>
            <div className="time-input-two label-box">
              <div className="label">Minutes exercising:</div>
              <input type="number" min="0" max="59" className="input-field"/>
            </div>
            <div className="calory-input label-box">
              <div className="label">Calory Intake:</div>
              <input type="number" min="0.1" max="35000.0" className="input-field" />
            </div>
            <div className="vitamin-input label-box">
              <div className="label">Vitamin Taken?</div>
              <Form.Check type="switch" className="input-field" id="vitamin-switch" style={{marginTop:'10px'}} label="" />
            </div>
            <div className="energy-input label-box">
              <div className="label">Energy level:</div>
              <Form.Control id="energy-range" className="input-field" style={{border:'none', marginTop:'15px'}} type="range" custom min={1} max={5} />
            </div>
            <div className="sleep-input label-box">
              <div className="label">Sleep quality:</div>
              <Form.Control id="sleep-range" className="input-field" style={{border:'none', marginTop:'15px'}} type="range" custom min={1} max={5} />
            </div>
            <div className="mood-input label-box">
              <div className="label">Mood <Emoji symbol="😄" label="happy"/></div>
              <Form.Control as="select" className="input-field" custom>
                <option>Happy</option>
                <option>Calm</option>
                <option>Sad</option>
                <option>Annoyed</option>
              </Form.Control>
            </div>
            <button className="button" type="submit" >Save</button>
          </Form>
        </div>
      </div>
    </div>
  );
}