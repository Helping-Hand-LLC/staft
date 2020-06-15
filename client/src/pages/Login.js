import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../lib/Button';

// import logo from '../images/A_WebVersion.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = e => setEmail(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);

  function handleSubmit(e) {
    e.preventDefault();
    console.log('form submitted');
    // TODO: axios request to backend
  }

  return (
    <div className='h-screen flex flex-col'>
      {/* TODO: close icon */}
      <section>
        {/* <img
          className='block mx-auto'
          style={{ height: '200px' }}
          src={logo}
          alt='staft logo'
        /> */}
        <h2 className='text-center font-bold'>Enter Credentials</h2>
        <p className='text-center font-light text-sm'>
          Please login with email and password to continue.
        </p>
      </section>
      {/* REVIEW: need action attr? */}
      <form
        action='/login'
        method='POST'
        className='text-center flex-1 flex flex-col justify-between'
        onSubmit={handleSubmit}
      >
        <section>
          <label htmlFor='email' className='border-b border-gray-300'>
            {/* TODO: @ icon */}
            <input
              className='placeholder-gray-300'
              type='email'
              name='email'
              id='email'
              placeholder='Email Address'
              value={email}
              onChange={handleEmailChange}
            />
          </label>
          <label htmlFor='password' className='border-b border-gray-300'>
            {/* TODO: * icon */}
            <input
              className='placeholder-gray-300'
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
        </section>
        <section>
          <small className='block'>
            By using Staft, you agree to our{' '}
            <Link to='#' className='text-teal-500 hover:text-teal-300'>
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link to='#' className='text-teal-500 hover:text-teal-300'>
              Terms
            </Link>
          </small>
          <Button
            type='submit'
            display='block'
            bgColor='bg-teal-500 hover:bg-teal-300'
            fontSize='text-sm'
            textTransform='uppercase'
          >
            Sign In
            {/* TODO: right arrow icon */}
          </Button>
          {/* <button
              className='bg-secondary w-full my-4 mx-auto py-4 px-0 text-newwhite text-base border-0 rounded'
              type='submit'
            >
              Sign In
            </button> */}
          {/* <p className='mb-4 mx-0'>
              <Link to='/forgot'>Forgot Password?</Link>
            </p>
            <small>
              <Link to='/register'>Create an Account</Link>
            </small> */}
        </section>
      </form>
    </div>
  );
}

export default Login;
