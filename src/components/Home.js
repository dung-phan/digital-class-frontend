import React, { Component } from 'react';
import './Home.css';
import NavBar from './NavBar';
export default class Home extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <h1>
          Evaluation tool for teachers
          <div class='ui mini icon input'>
            <input
              type='text'
              placeholder='Search classes, students...'
              style={{ fontSize: 20, width: 500, fontWeight: 200 }}
            />
            <i className='search icon' style={{ fontSize: 20 }}></i>
          </div>
        </h1>
        <br />
      </div>
    );
  }
}
