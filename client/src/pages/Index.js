import React from 'react';

import { ButtonLink } from '../lib/Button';

import ManInSuitImg from '../images/hunters-race-MYbhN8KaaEc-unsplash.jpg';

export default function Index() {
  return (
    <div
      className='h-screen'
      style={{
        backgroundImage: `url(${ManInSuitImg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}
    >
      <div
        className='h-screen flex flex-col justify-between text-center py-8'
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <section>
          <h1 className='uppercase text-3xl font-normal my-2 text-white'>
            Staft
          </h1>
          <p className='font-light text-white text-lg italic'>
            Bringing people together, better.
          </p>
        </section>
        <section className='h-32 w-5/6 mx-auto flex flex-col justify-center'>
          <ButtonLink to='/org/create' textTransform='uppercase' extras='my-4'>
            Create an organization
          </ButtonLink>
          <div className='flex justify-between'>
            <ButtonLink
              to='/register'
              bgColor='bg-white'
              textColor='text-blue-900'
              textTransform='uppercase'
              extras='flex-1 mr-1'
            >
              I'm a Guest
            </ButtonLink>
            <ButtonLink
              to='/login'
              bgColor='bg-white'
              textColor='text-blue-900'
              textTransform='uppercase'
              extras='flex-1 mr-1'
            >
              Log In
            </ButtonLink>
          </div>
        </section>
      </div>
    </div>
  );
}
