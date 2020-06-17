import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import Schedule from './Schedule';
import DirectMessages from './DirectMessages';

export default function DMenuItem({ handleClick }) {
  let { menuItem } = useParams();

  switch (menuItem) {
    case 'schedule':
      return <Schedule handleClick={handleClick} />;
    case 'messages':
      return <DirectMessages handleClick={handleClick} />;
  }
}

DMenuItem.propTypes = {
  handleClick: PropTypes.func.isRequired
};
