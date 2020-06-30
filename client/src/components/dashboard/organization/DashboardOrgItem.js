import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

// import OrgPosts from './Posts';
import OrgEvents from './Events';
import OrgChannels from './Channels';
import OrgMembers from './Members';
import OrgSettings from './Settings';

export default function DashboardOrgItem({ handleClick }) {
  let { orgItem } = useParams();

  switch (orgItem) {
    // case 'posts':
    //   return <OrgPosts handleClick={handleClick} />;
    case 'events':
      return <OrgEvents handleClick={handleClick} />;
    case 'channels':
      return <OrgChannels handleClick={handleClick} />;
    case 'members':
      return <OrgMembers handleClick={handleClick} />;
    case 'settings':
      return <OrgSettings handleClick={handleClick} />;
    default:
      return <OrgEvents handleClick={handleClick} />;
  }
}

DashboardOrgItem.propTypes = {
  handleClick: PropTypes.func.isRequired
};