import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import Schedule from './Schedule';
import DirectMessages from './DirectMessages';
import Calendar from './Calendar';
import Team from './Team';
import Help from './Help';

export default function DMenuItem({ handleClick }) {
  let { menuItem } = useParams();

  switch (menuItem) {
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
    default:
      return <Schedule handleClick={handleClick} />;
  }
}

DMenuItem.propTypes = {
  handleClick: PropTypes.func.isRequired
};
