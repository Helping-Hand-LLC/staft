import React from 'react';

import { Button, ButtonLink } from '../lib/Button';

import ManInSuitImg from '../images/hunters-race-MYbhN8KaaEc-unsplash.jpg';

function Index() {
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
          <h1 className='uppercase text-3xl font-normal my-2 text-newwhite'>
            Staft
          </h1>
          <p className='font-light text-newwhite text-lg italic'>
            Bringing people together, better.
          </p>
        </section>
        <section className='h-32 w-5/6 mx-auto flex flex-col justify-center'>
          <Button
            bgColor='bg-secondary'
            textTransform='uppercase'
            fontSize='text-sm'
            margin='my-4'
          >
            Create an organization
          </Button>
          <div className='flex justify-between'>
            <ButtonLink
              to='/register'
              bgColor='bg-newwhite'
              textColor='text-primary'
              textTransform='uppercase'
              fontSize='text-sm'
              flex='flex-1'
              margin='mr-1'
            >
              I'm a Guest
            </ButtonLink>
            <ButtonLink
              to='/login'
              bgColor='bg-newwhite'
              textColor='text-primary'
              textTransform='uppercase'
              fontSize='text-sm'
              flex='flex-1'
              margin='ml-1'
            >
              Log In
            </ButtonLink>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Index;
