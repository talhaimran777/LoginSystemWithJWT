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
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='email'>Enter Email</label>
        <input
          onChange={this.onChangeHandler}
          type='text'
          name='email'
          autoComplete='false'
          value={email}
        />

        <br />
        <label htmlFor='email'>Enter Password</label>
        <input
          onChange={this.onChangeHandler}
          type='password'
          name='password'
          autoComplete='false'
          value={password}
        />
        <br />
        <button type='submit'>Login</button>
      </form>
    );
  }
}

export default Login;
