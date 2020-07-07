import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import {
  // D_ACTIVITY_PATH,
  D_SCHEDULE_PATH,
  D_MESSAGES_PATH,
  D_CALENDAR_PATH,
  D_TEAM_PATH,
  D_HELP_PATH,
  D_PROFILE_PATH
} from '../../constants/paths';

// import Activity from './Activity';
import Schedule from './Schedule';
import DirectMessages from './DirectMessages';
import Calendar from './Calendar';
import Team from './Team';
import Help from './Help';
import Profile from './Profile';

export default function DashboardMenuItem({ isOpen, handleClick }) {
  let { menuItem } = useParams();

  switch (menuItem) {
    // case D_ACTIVITY_PATH:
    //   return <Activity handleClick={handleClick} />;
    case D_SCHEDULE_PATH:
      return <Schedule isOpen={isOpen} handleClick={handleClick} />;
    case D_MESSAGES_PATH:
      return <DirectMessages handleClick={handleClick} />;
    case D_CALENDAR_PATH:
      return <Calendar isOpen={isOpen} handleClick={handleClick} />;
    case D_TEAM_PATH:
      return <Team handleClick={handleClick} />;
    case D_HELP_PATH:
      return <Help handleClick={handleClick} />;
    case D_PROFILE_PATH:
      return <Profile handleClick={handleClick} />;
    default:
      return <Schedule isOpen={isOpen} handleClick={handleClick} />;
  }
}

DashboardMenuItem.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};
