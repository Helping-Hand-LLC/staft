import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import Activity from './Activity';
import Schedule from './Schedule';
import DirectMessages from './DirectMessages';
import Calendar from './Calendar';
import Team from './Team';
import Help from './Help';
import Profile from './Profile';

export default function DMenuItem({ handleClick }) {
  let { menuItem } = useParams();

  switch (menuItem) {
    case 'activity':
      return <Activity handleClick={handleClick} />;
    case 'schedule':
      return <Schedule handleClick={handleClick} />;
    case 'messages':
      return <DirectMessages handleClick={handleClick} />;
    case 'calendar':
      return <Calendar handleClick={handleClick} />;
    case 'team':
      return <Team handleClick={handleClick} />;
    case 'help':
      return <Help handleClick={handleClick} />;
    case 'profile':
      return <Profile handleClick={handleClick} />;
    default:
      return <Activity handleClick={handleClick} />;
  }
}

DMenuItem.propTypes = {
  handleClick: PropTypes.func.isRequired
};
