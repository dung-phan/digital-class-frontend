import React, { Component } from 'react';
import Form from './Form';
import { connect } from 'react-redux';
import { signup } from '../actions/signup';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
class SignUp extends Component {
  state = { email: '', password: '' };

  handleSubmit = event => {
    event.preventDefault();
    this.props.signup(this.state.email, this.state.password);
    this.props.history.push('/login');
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    return (
      <div>
        <NavBar />
        <div className='ui middle aligned center aligned grid'>
          <div className='column' style={{ maxWidth: 450 }}>
            <h2 className='content'>Sign up for a new account</h2>
          </div>
        </div>
        <Form
          values={this.state}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />

        <div className='ui middle aligned center aligned grid'>
          <div className='column' style={{ maxWidth: 450 }}>
            <div className='ui message'>
              <i className='icon help'></i> Already have an account?{' '}
              <Link to='/login'>Login here</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { signup }
)(SignUp);
