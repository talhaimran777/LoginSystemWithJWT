import React, { Component } from 'react';
import axios from 'axios';
class Signup extends Component {
  state = {
    name: '',
    email: 'devtal284@gmail.com',
    password: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;

    axios
      .post('/signup', { name, email, password })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className='row'>
        <div className='col-md-8 col-lg-6 col-xl-5 mx-auto'>
          <h1 className='mb-4'>Signup Form</h1>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor='name'>Enter Name</label>
            <input
              onChange={this.onChange}
              className='form-control'
              type='text'
              name='name'
            />
            <label htmlFor='email'>Enter Email</label>
            <input
              onChange={this.onChange}
              className='form-control'
              type='text'
              name='email'
            />
            <label htmlFor='password'>Enter Password</label>
            <input
              onChange={this.onChange}
              className='form-control mb-3'
              type='password'
              name='password'
            />

            <button className='btn btn-primary d-block w-100'>Signup</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
