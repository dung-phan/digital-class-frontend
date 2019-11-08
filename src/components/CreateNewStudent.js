import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addStudent } from '../actions/students';

class CreateNewStudent extends Component {
  state = {
    name: '',
    photo: ''
  };
  handleChange = event => {
    //hey it's gotta be arrow function here
    this.setState({ [event.target.name]: event.target.value }); //use event.target.name as an attribute so you can reuse it multiple times
  };

  handleSubmit = event => {
    event.preventDefault();

    this.setState({
      name: '',
      photo: ''
    });
    console.log('what is batchid', this.props.batchId);
    const { batchId } = this.props;
    this.props.addStudent(batchId, this.state);
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:{' '}
            <input
              type='text'
              name='name'
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>{' '}
          <label>
            <br />
            Profile:{' '}
            <input
              type='text'
              name='photo'
              value={this.state.photo}
              onChange={this.handleChange}
            />
          </label>{' '}
          <input type='submit' value='Submit' />
        </form>
      </div>
    );
  }
}
export default connect(
  null,
  { addStudent }
)(CreateNewStudent);
