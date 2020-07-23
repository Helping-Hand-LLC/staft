import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {
  LOGIN_PATH,
  REGISTER_PATH,
  CREATE_ORG_PATH,
  DASHBOARD_PATH
} from '../constants/paths';
import { connect } from 'react-redux';

import Spinner from '../lib/Spinner';
import { ButtonLink } from '../lib/Button';

import ManInSuitImg from '../assets/hunters-race-MYbhN8KaaEc-unsplash.jpg';

function Index({ auth }) {
  return auth.token ? (
    <Redirect to={DASHBOARD_PATH} />
  ) : (
    <>
      <Spinner show={auth.isLoading} isWhite />
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
            <h1 className='uppercase text-3xl font-normal my-2 text-white md:text-4xl'>
              Staft
            </h1>
            <p className='font-light text-white text-lg italic md:text-xl'>
              Bringing people together, better.
            </p>
          </section>
          <section className='h-32 w-5/6 mx-auto flex flex-col justify-center md:w-2/3 lg:w-1/2'>
            <ButtonLink
              to={CREATE_ORG_PATH}
              textTransform='uppercase'
              extras='my-4'
            >
              Create an organization
            </ButtonLink>
            <div className='flex justify-between'>
              <ButtonLink
                to={REGISTER_PATH}
                bgColor='bg-white'
                textColor='text-blue-900'
                textTransform='uppercase'
                extras='flex-1 mr-1 md:mr-2'
              >
                I'm a Guest
              </ButtonLink>
              <ButtonLink
                to={LOGIN_PATH}
                bgColor='bg-white'
                textColor='text-blue-900'
                textTransform='uppercase'
                extras='flex-1'
              >
                Log In
              </ButtonLink>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

Index.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Index);
