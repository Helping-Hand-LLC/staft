import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { REGISTER_PATH } from '../constants/paths';

import CloseIcon from '@material-ui/icons/Close';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LockIcon from '@material-ui/icons/Lock';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import { Button } from '../lib/Button';
import BackButton from '../lib/BackButton';

export default function Login() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = e => setEmail(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    console.log('form submitted');
  };

  return (
    <div className='h-screen flex flex-col p-4 md:p-6 lg:p-8'>
      <section className='mb-2'>
        <BackButton>
          <CloseIcon />
        </BackButton>
      </section>
      <section>
        <h2 className='text-center font-bold text-xl mb-2 md:text-2xl'>
          Enter Credentials
        </h2>
        <p className='text-center font-light text-sm md:text-base'>
          Please login with email and password to continue.
        </p>
      </section>
      <form
        className='text-center flex-1 flex flex-col justify-between pt-12'
        onSubmit={handleSubmit}
      >
        <section className='px-6'>
          <label
            htmlFor='email'
            className='border-b border-gray-400 inline-block py-2 flex items-center md:w-1/2 mx-auto lg:w-2/5'
          >
            <div className='inline-block border-r border-gray-400 text-gray-500 px-2 py-0'>
              <AlternateEmailIcon fontSize='small' />
            </div>
            <input
              className='placeholder-gray-400 p-2 outline-none'
              type='email'
              name='email'
              id='email'
              placeholder='Email Address'
              value={email}
              onChange={handleEmailChange}
            />
          </label>
          <br />
          <label
            htmlFor='password'
            className='border-b border-gray-400 inline-block py-2 flex items-center md:w-1/2 mx-auto lg:w-2/5'
          >
            <div className='inline-block border-r border-gray-400 text-gray-500 px-2 py-0'>
              <LockIcon fontSize='small' />
            </div>
            <input
              className='placeholder-gray-400 p-2 outline-none'
              type='password'
              name='password'
              id='password'
              placeholder='Password'
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <div className='mt-6 flex justify-center'>
            <p className='text-xs font-light mx-1 md:text-sm'>
              <Link
                to={history.location.pathname}
                className='hover:underline text-teal-500 hover:text-teal-300'
              >
                Forgot Password?
              </Link>{' '}
              or{' '}
              <Link
                to={REGISTER_PATH}
                className='hover:underline text-teal-500 hover:text-teal-300'
              >
                Create an Account
              </Link>
            </p>
          </div>
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
            Sign In
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
