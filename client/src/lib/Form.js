import React from 'react';

function LoginForm() {
  return (
    <div class='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col'>
      <div class='mb-4'>
        <label
          class='block text-grey-darker text-sm font-bold mb-2'
          for='username'
        >
          Username
        </label>
        <input
          class='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker'
          id='username'
          type='text'
          placeholder='Username'
        />
      </div>
      <div class='mb-6'>
        <label
          class='block text-grey-darker text-sm font-bold mb-2'
          for='password'
        >
          Password
        </label>
        <input
          class='shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3'
          id='password'
          type='password'
          placeholder='******************'
        />
        <p class='text-red text-xs italic'>Please choose a password.</p>
      </div>
      <div class='flex items-center justify-between'>
        <button
          class='bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded'
          type='button'
        >
          Sign In
        </button>
        <a
          class='inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker'
          href='#'
        >
          Forgot Password?
        </a>
      </div>
    </div>
  );
}

function FormGrid() {
  return (
    <div class='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2'>
      <div class='-mx-3 md:flex mb-6'>
        <div class='md:w-1/2 px-3 mb-6 md:mb-0'>
          <label
            class='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2'
            for='grid-first-name'
          >
            First Name
          </label>
          <input
            class='appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3'
            id='grid-first-name'
            type='text'
            placeholder='Jane'
          />
          <p class='text-red text-xs italic'>Please fill out this field.</p>
        </div>
        <div class='md:w-1/2 px-3'>
          <label
            class='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2'
            for='grid-last-name'
          >
            Last Name
          </label>
          <input
            class='appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4'
            id='grid-last-name'
            type='text'
            placeholder='Doe'
          />
        </div>
      </div>
      <div class='-mx-3 md:flex mb-6'>
        <div class='md:w-full px-3'>
          <label
            class='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2'
            for='grid-password'
          >
            Password
          </label>
          <input
            class='appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3'
            id='grid-password'
            type='password'
            placeholder='******************'
          />
          <p class='text-grey-dark text-xs italic'>
            Make it as long and as crazy as you'd like
          </p>
        </div>
      </div>
      <div class='-mx-3 md:flex mb-2'>
        <div class='md:w-1/2 px-3 mb-6 md:mb-0'>
          <label
            class='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2'
            for='grid-city'
          >
            City
          </label>
          <input
            class='appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4'
            id='grid-city'
            type='text'
            placeholder='Albuquerque'
          />
        </div>
        <div class='md:w-1/2 px-3'>
          <label
            class='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2'
            for='grid-state'
          >
            State
          </label>
          <div class='relative'>
            <select
              class='block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded'
              id='grid-state'
            >
              <option>New Mexico</option>
              <option>Missouri</option>
              <option>Texas</option>
            </select>
            <div class='pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker'>
              <svg
                class='h-4 w-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
              </svg>
            </div>
          </div>
        </div>
        <div class='md:w-1/2 px-3'>
          <label
            class='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2'
            for='grid-zip'
          >
            Zip
          </label>
          <input
            class='appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4'
            id='grid-zip'
            type='text'
            placeholder='90210'
          />
        </div>
      </div>
    </div>
  );
}

module.exports = {
  LoginForm,
  FormGrid
};
