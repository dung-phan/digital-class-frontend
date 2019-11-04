import React, { Component } from 'react';
import Form from './Form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../actions/login';
import NavBar from './NavBar';
class Login extends Component {
  state = { email: '', password: '' };

  handleSubmit = event => {
    event.preventDefault();

    this.props.login(this.state.email, this.state.password);
    this.props.history.push('/lobby');
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
          <div className='column' style={{ maxWidth: '450x' }}>
            <h2 className='content'>Sign in to your account</h2>
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
              <i className='icon help'></i> New to us?{' '}
              <Link to='/signup'>Sign up here</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { login }
)(Login);
