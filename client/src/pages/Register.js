import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { LOGIN_PATH } from '../constants/paths';

import CloseIcon from '@material-ui/icons/Close';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PhoneIcon from '@material-ui/icons/Phone';
import LockIcon from '@material-ui/icons/Lock';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import { Button } from '../lib/Button';
import { BackButtonPush } from '../lib/BackButton';

export default function Register() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleEmailChange = e => setEmail(e.target.value);
  const handlePhoneChange = e => setPhone(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);
  const handlePasswordConfirmChange = e => setPasswordConfirm(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    console.log('form submitted');
  };

  return (
    <div className='h-screen flex flex-col p-4 md:p-6 lg:p-8'>
      <section className='mb-2'>
        <BackButtonPush path='/'>
          <CloseIcon />
        </BackButtonPush>
      </section>
      <section>
        <h2 className='text-center font-bold text-xl mb-2 md:text-2xl'>
          Create New Credentials
        </h2>
        <p className='text-center font-light text-sm md:text-base'>
          Please enter your email, phone, and a new secure password.
        </p>
      </section>
      <form
        className='text-center flex flex-col justify-between flex-1 pt-12'
        onSubmit={handleSubmit}
      >
        <section className='px-6'>
          <label
            htmlFor='email'
            className='border-b border-gray-400 py-2 flex items-center md:w-1/2 mx-auto lg:w-2/5'
          >
            <div className='inline-block border-r border-gray-400 text-gray-500 px-2 py-0'>
              <AlternateEmailIcon fontSize='small' />
            </div>
            <input
              className='placeholder-gray-400 p-2 outline-none flex-1'
              type='email'
              name='email'
              id='email'
              placeholder='Email'
              value={email}
              onChange={handleEmailChange}
            />
          </label>
          <br />
          <label
            htmlFor='phone'
            className='border-b border-gray-400 py-2 flex items-center md:w-1/2 mx-auto lg:w-2/5'
          >
            <div className='inline-block border-r border-gray-400 text-gray-500 px-2 py-0'>
              <PhoneIcon fontSize='small' />
            </div>
            <input
              className='placeholder-gray-400 p-2 outline-none flex-1'
              type='tel'
              name='phone'
              id='phone'
              placeholder='Phone Number'
              value={phone}
              onChange={handlePhoneChange}
            />
          </label>
          <br />
          <label
            htmlFor='password'
            className='border-b border-gray-400 py-2 flex items-center md:w-1/2 mx-auto lg:w-2/5'
          >
            <div className='inline-block border-r border-gray-400 text-gray-500 px-2 py-0'>
              <LockIcon fontSize='small' />
            </div>
            <input
              className='placeholder-gray-400 p-2 outline-none flex-1'
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <br />
          <label
            htmlFor='passwordConfirm'
            className='border-b border-gray-400 py-2 flex items-center md:w-1/2 mx-auto lg:w-2/5'
          >
            <div className='inline-block border-r border-gray-400 text-gray-500 px-2 py-0'>
              <LockIcon fontSize='small' />
            </div>
            <input
              className='placeholder-gray-400 p-2 outline-none flex-1'
              type='password'
              name='passwordConfirm'
              id='passwordConfirm'
              placeholder='Confirm Password'
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
            />
          </label>
          <p className='mt-6 block text-center text-xs font-light text-teal-500 hover:text-teal-300 md:text-sm'>
            <Link to={LOGIN_PATH}>Already have an account? Sign in.</Link>
          </p>
        </section>
        <section>
          <small className='block mb-4 font-light md:mb-6'>
            By using Staft, you agree to our{' '}
            <Link
              to={history.location.pathname}
              className='text-teal-500 hover:text-teal-300'
            >
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link
              to={history.location.pathname}
              className='text-teal-500 hover:text-teal-300'
            >
              Terms
            </Link>
          </small>
          <Button
            type='submit'
            display='block'
            fontWeight='font-semibold'
            textTransform='uppercase'
            extras='w-full relative md:w-3/4 md:mx-auto lg:w-1/2'
          >
            Sign Up
            <KeyboardArrowRightIcon
              style={{
                position: 'absolute',
                top: '50%',
                right: '0.5rem',
                transform: 'translate(0, -50%)'
              }}
            />
          </Button>
        </section>
      </form>
    </div>
  );
}
