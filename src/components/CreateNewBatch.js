import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createBatch } from '../actions/batches';

class CreateNewBatch extends Component {
  state = {
    batchNumber: '',
    startDate: '',
    endDate: ''
  };
  handleChange = event => {
    //hey it's gotta be arrow function here
    this.setState({ [event.target.name]: event.target.value }); //use event.target.name as an attribute so you can reuse it multiple times
  };

  handleSubmit = event => {
    event.preventDefault();
    // console.log('click handle submit works');
    this.props.createBatch(this.state);
    console.log('check what is state before setState', this.state);
    //set the form field to be empty again
    this.setState({
      batchNumber: '',
      startDate: '',
      endDate: ''
    });
    console.log('check what is state after setState', this.state);
  };
  render() {
    //const isEnabled = this.state.name.length > 0;
    return (
      <div>
        {/* create a form here */}
        <form onSubmit={this.handleSubmit}>
          <label>
            Batch Number:{' '}
            <input
              type='text'
              name='batchNumber'
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>{' '}
          <label>
            <br />
            Start Date:{' '}
            <input
              type='text'
              name='startDate'
              value={this.state.startDate}
              onChange={this.handleChange}
            />
          </label>{' '}
          <label>
            <br />
            End Date:
            <input
              type='text'
              name='endDate'
              value={this.state.endDate}
              onChange={this.handleChange}
            />
          </label>
          <input type='submit' value='Submit' />
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { createBatch }
)(CreateNewBatch);
