import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { Form } from 'react-bootstrap';
import moment from 'moment';

import api from '../../services/api';
import ApiAuthorization from '../../services/ApiAuthorization';

import Emoji from '../../components/Emoji';

import './styles.css';

export default class EditLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: '',
      exerciseTime: 0,
      vitaminTaken: false,
      energyLevel: 0,
      sleepQuality: 0,
      calorieIntake: 0.0,
      createdAt: ''
    };
  }

  componentDidMount () {
    const { logId } = this.props.match.params;
    ApiAuthorization();
    api.get(`/profile/logs/${logId}`).then((response)=>{
      this.setState({
        mood: response.data.mood,
        exerciseTime: response.data.exerciseTime,
        vitaminTaken: response.data.vitaminTaken,
        energyLevel: response.data.energyLevel,
        sleepQuality: response.data.sleepQuality,
        calorieIntake: response.data.calorieIntake,
        createdAt: response.data.createdAt
      });
    }).catch((err)=>{
      console.log(err);
    });
  }


  render() {
      return(
        <div>
          <Header />
          <div className="new-log-container">
            <div className="content">
              <h1>What would you like to change on record from {moment(this.state.createdAt).format('MMMM Do YYYY')}</h1>
              <Form className="form-content">
                <div className="time-input-one label-box">
                  <div className="label">Hours exercising:</div>
                  <input label="Exercise" type="number" className="input-field" min="0" max="23" defaultValue={parseInt(this.state.exerciseTime)} />
                </div>
                <div className="time-input-two label-box">
                  <div className="label">Minutes exercising:</div>
                  <input type="number" min="0" max="59" className="input-field" defaultValue={parseInt((this.state.exerciseTime%1)*60)} />
                </div>
                <div className="calory-input label-box">
                  <div className="label">Calorie Intake:</div>
                  <input type="number" min="0.1" max="35000.0" className="input-field" defaultValue={this.state.calorieIntake} />
                </div>
                <div className="vitamin-input label-box">
                  <div className="label">Vitamin Taken?</div>
                  <Form.Check type="switch" className="input-field" id="vitamin-switch" style={{marginTop:'10px'}} label="" defaultValue={this.state.vitaminTaken ? true : false} />
                </div>
                <div className="energy-input label-box">
                  <div className="label">Energy level:</div>
                  <Form.Control id="energy-range" className="input-field" style={{border:'none', marginTop:'15px'}} type="range" custom min={1} max={5} defaultValue={this.state.energyLevel} />
                </div>
                <div className="sleep-input label-box">
                  <div className="label">Sleep quality:</div>
                  <Form.Control id="sleep-range" className="input-field" style={{border:'none', marginTop:'15px'}} type="range" custom min={1} max={5} defaultValue={this.state.sleepQuality} />
                </div>
                <div className="mood-input label-box">
                  <div className="label">Mood <Emoji symbol={this.state.mood} label={this.state.mood}/></div>
                  <Form.Control as="select" className="input-field" custom defaultValue={this.state.mood} >
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
      )
    }
}
