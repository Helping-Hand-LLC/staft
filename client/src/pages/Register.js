import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePhoneChange(e) {
    setPhone(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handlePasswordConfirmChange(e) {
    setPasswordConfirm(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('form submitted');
    // TODO: axios request to backend
  }

  return (
    <div className='h-screen p-3'>
      <div
        className='flex flex-col rounded content-wrapper'
        style={{ height: '95%' }}
      >
        <section className='bg-secondary p-8 rounded-t' id='display'>
          <h2 className='font-hairline text-4xl'>
            <span className='font-bold'>Sign up</span> with email and phone
            number
          </h2>
        </section>
        <section className='flex-1'>
          <form
            className='h-full flex flex-col justify-evenly items-center'
            action='/register'
            method='POST'
            onSubmit={handleSubmit}
          >
            <input
              className='register-input'
              type='email'
              name='email'
              id='email'
              placeholder='Email'
              value={email}
              onChange={handleEmailChange}
            />
            <input
              className='register-input'
              type='tel'
              name='phone'
              id='phone'
              placeholder='Phone Number'
              value={phone}
              onChange={handlePhoneChange}
            />
            <input
              className='register-input'
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              value={password}
              onChange={handlePasswordChange}
            />
            <input
              className='register-input'
              type='password'
              name='passwordConfirm'
              id='passwordConfirm'
              placeholder='Confirm Password'
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
            />
            <button
              className='bg-primary text-newwhite uppercase text-base font-normal w-4/5 mx-auto my-2 px-0 py-3 block rounded border-none outline-none'
              type='submit'
            >
              Sign Up
            </button>
          </form>
        </section>
      </div>
      <small className='block text-center'>
        <Link to='/login'>Already have an account? Sign In</Link>
      </small>
    </div>
  );
}

export default Register;
