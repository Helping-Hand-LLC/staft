import React from 'react';
import { Link } from 'react-router-dom';

function Index() {
  return (
    <div className='h-screen flex flex-col justify-between text-center py-8'>
      <section>
        <h1 className='uppercase text-2xl font-normal my-4'>Staft</h1>
        <p className='font-light'>Bringing people together, better</p>
      </section>
      <section>
        <button className='inline-block rounded bg-primary text-newwhite uppercase font-thin text-sm py-2 px-8 my-4'>
          Create an organization
        </button>
        <small className='block'>
          <Link className='underline' to='/login'>
            Log in
          </Link>
        </small>
      </section>
    </div>
  );
}

export default Index;
