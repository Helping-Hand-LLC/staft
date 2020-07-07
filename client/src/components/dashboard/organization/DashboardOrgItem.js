import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import {
  // D_ORG_POSTS_PATH,
  D_ORG_EVENTS_PATH,
  D_ORG_CHANNELS_PATH,
  D_ORG_WORKERS_PATH,
  D_ORG_SETTINGS_PATH
} from '../../../constants/paths';

// import OrgPosts from './Posts';
import OrgEvents from './Events';
import OrgChannels from './Channels';
import OrgWorkers from './Workers';
import OrgSettings from './Settings';

export default function DashboardOrgItem({ isOpen, handleClick }) {
  let { orgItem } = useParams();

  switch (orgItem) {
    // case D_ORG_POSTS_PATH:
    //   return <OrgPosts handleClick={handleClick} />;
    case D_ORG_EVENTS_PATH:
      return <OrgEvents isOpen={isOpen} handleClick={handleClick} />;
    case D_ORG_CHANNELS_PATH:
      return <OrgChannels handleClick={handleClick} />;
    case D_ORG_WORKERS_PATH:
      return <OrgWorkers handleClick={handleClick} />;
    case D_ORG_SETTINGS_PATH:
      return <OrgSettings handleClick={handleClick} />;
    default:
      return <OrgEvents handleClick={handleClick} />;
  }
}

DashboardOrgItem.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};
