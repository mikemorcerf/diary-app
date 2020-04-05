import React from 'react';
import Header from '../Header';
import { Form } from 'react-bootstrap';

import './styles.css';

export default function EditLog() {
  return(
    <div>
      <Header />
      <div className="edit-log-container">
        <div className="content">
        <h1>Would you like to edit the entry from DATETIME?</h1>
          <Form>
            <div className="form-content">
              <section>
                <span className="time">
                  <input label="Exercise" type="number" placeholder="Hours exercising" min="0" max="23" />
                  <input type="number" placeholder="Minutes exercising" min="0" max="59" />
                </span>
                <input type="number" placeholder="Calory Intake" min="0.1" max="35000.0" />
                <div className="pick-attribute">
                  Vitamin Taken? <Form.Check type="switch" className="vitamin-switch-class" id="vitamin-switch" label="" />
                </div>
              </section>
              <section>
                <div className="pick-attribute">
                  <Form.Group controlId="energy-range" className="range-class" >
                    <Form.Label style={{minWidth:'160px', marginRight:'15px', top:'100px'}} >Energy level:</Form.Label>
                    <Form.Control style={{paddingBottom:'14px', border:'none'}} type="range" custom min={1} max={5} />
                  </Form.Group>
                </div>
                <div className="pick-attribute">
                  <Form.Group controlId="sleep-range" className="range-class" >
                    <Form.Label style={{minWidth:'160px', marginRight:'15px', top:'100px'}} >Sleep quality:</Form.Label>
                    <Form.Control style={{paddingBottom:'14px', border:'none'}} type="range" custom min={1} max={5} />
                  </Form.Group>
                </div>
                <div className="pick-attribute">
                  <Form.Group controlId="mood-select" className="range-class">
                    <Form.Label>Mood</Form.Label>
                    <Form.Control as="select" style={{position:'relative', bottom:'5px', border:'none', maxWidth:'150px'}} custom>
                      <option>Happy 😄</option>
                      <option>Calm 😊</option>
                      <option>Sad 😔</option>
                      <option>Annoyed 😤</option>
                    </Form.Control>
                  </Form.Group>
                </div>
              </section>
            </div>
            <button className="button" type="submit" >Save</button>
          </Form>
        </div>
      </div>
    </div>
  );
}