import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import Schedule from '../components/Schedule';
import DirectMessages from '../components/DirectMessages';

function DashboardMenuItem(props) {
  let { menuItem } = useParams();

  switch (menuItem) {
    case 'schedule':
      return <Schedule handleClick={props.handleClick} />;
    case 'messages':
      return <DirectMessages handleClick={props.handleClick} />;
  }
}

export default DashboardMenuItem;

DashboardMenuItem.propTypes = {
  handleClick: PropTypes.func.isRequired
};
