import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/A_WebVersion.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('form submitted');
  }

  return (
    <div className='h-screen flex flex-col'>
      <section className='pt-6 pb-3'>
        <img className='block mx-auto h-img' src={logo} alt='staft logo' />
        <h6 className='text-center text-sm font-light uppercase'>Staft</h6>
      </section>
      <section className='rounded-lg shadow-top p-6 text-center flex-1'>
        <h2 className='text-secondary text-3xl font-normal mb-px tracking-tight'>
          Welcome,
        </h2>
        <p className='text-secondary text-base font-normal mb-6'>
          Please login to continue.
        </p>
        <form action='/users/login' method='POST' onSubmit={handleSubmit}>
          <input
            className='login-input placeholder-primary rounded-t-md'
            type='email'
            name='email'
            id='email'
            placeholder='Email'
            value={email}
            onChange={handleEmailChange}
          />
          <input
            className='login-input placeholder-primary rounded-b-md'
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            className='bg-secondary w-full my-4 mx-auto py-4 px-0 text-newwhite text-base border-0 rounded'
            type='submit'
          >
            Sign In
          </button>
        </form>
        <p className='mb-4 mx-0'>
          <Link to='/forgot'>Forgot Password?</Link>
        </p>
        <small>
          <Link to='/register'>Create an Account</Link>
        </small>
      </section>
    </div>
  );
}

export default Login;
