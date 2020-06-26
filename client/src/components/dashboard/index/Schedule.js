import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
  NavLink,
  Redirect,
  useRouteMatch,
  useParams
} from 'react-router-dom';

import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';

import DHeader from './DHeader';

function Current() {
  return (
    <div className='h-64 flex justify-center items-center text-gray-600'>
      Current Events: Coming Soon...
    </div>
  );
}

function Drafts() {
  return (
    <div className='h-64 flex justify-center items-center text-gray-600'>
      Event Drafts: Coming Soon...
    </div>
  );
}

function DFilter() {
  let { filter } = useParams();

  switch (filter) {
    case 'current':
      return <Current />;
    case 'drafts':
      return <Drafts />;
    default:
      return <Current />;
  }
}

export default function Schedule({ handleClick }) {
  let { url, path } = useRouteMatch();

  return (
    <>
      <DHeader
        title='Schedule'
        handleClick={handleClick}
        secondaryIcon={<ArchiveOutlinedIcon />}
        secondaryPath='/archive'
      />
      {/* tabs */}
      <div className='w-full bg-gray-200 py-2 px-4'>
        <ul className='flex bg-gray-400 rounded p-1'>
          <li className='flex-1 mr-2'>
            <NavLink
              to={`${url}/current`}
              className='block rounded bg-transparent text-teal-500 text-sm font-light text-center'
              activeClassName='bg-white'
            >
              Current
            </NavLink>
          </li>
          <li className='flex-1 mr-2'>
            <NavLink
              to={`${url}/drafts`}
              className='block rounded bg-transparent text-teal-500 text-sm font-light text-center'
              activeClassName='bg-white'
            >
              Drafts
            </NavLink>
          </li>
        </ul>
      </div>
      {/* main */}
      <Switch>
        <Route path={`${path}/:filter`}>
          <DFilter url={url} handleClick={handleClick} />
        </Route>
        {/* go to current for unknown routes */}
        <Route exact path={path}>
          <Redirect to={`${url}/current`} />
        </Route>
      </Switch>
    </>
  );
}

Schedule.propTypes = {
  handleClick: PropTypes.func.isRequired
};
