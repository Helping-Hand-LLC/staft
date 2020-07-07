import React from 'react';
import { Link } from 'react-router-dom';
import { INDEX_PATH } from '../constants/paths';

export default function NotFound() {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibold mb-2'>404: Not Found</h1>
      <p className='text-sm font-light'>
        The page you requested could not be found. Return to the{' '}
        <Link
          to={INDEX_PATH}
          className='text-teal-500 hover:text-teal-300 hover:underline'
        >
          homepage
        </Link>{' '}
        and login or register to continue.
      </p>
    </div>
  );
}
