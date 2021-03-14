import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    axios
      .post('/login', { email: email, password: password })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  state = {
    email: '',
    password: '',
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className='row'>
        <div className='col col-md-8 col-lg-6 col-xl-5 mx-auto'>
          <h1 className='mb-4'>Login Form</h1>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor='email'>Enter Email</label>
            <input
              className='form-control'
              onChange={this.onChangeHandler}
              type='text'
              name='email'
              autoComplete='false'
              value={email}
            />
            <label htmlFor='email'>Enter Password</label>
            <input
              className='form-control mb-3'
              onChange={this.onChangeHandler}
              type='password'
              name='password'
              autoComplete='false'
              value={password}
            />
            <button className='btn btn-primary btn-block w-100' type='submit'>
              login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
