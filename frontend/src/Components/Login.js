import React, { Component } from 'react';
class Login extends Component {
  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  state = {
    email: '',
    password: '',
  };

  render() {
    const { email, password } = this.state;
    console.log(email, password);

    return (
      <form action='/login' method='POST'>
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
