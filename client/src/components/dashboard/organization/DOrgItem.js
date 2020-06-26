import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

// import OrgPosts from './Posts';
import OrgEvents from './Events';
import OrgDirectMessages from './DirectMessages';
import OrgMembers from './Members';
import OrgSettings from './Settings';

export default function DOrgItem({ handleClick }) {
  let { orgItem } = useParams();

  switch (orgItem) {
    // case 'posts':
    //   return <OrgPosts handleClick={handleClick} />;
    case 'events':
      return <OrgEvents handleClick={handleClick} />;
    case 'messages':
      return <OrgDirectMessages handleClick={handleClick} />;
    case 'members':
      return <OrgMembers handleClick={handleClick} />;
    case 'settings':
      return <OrgSettings handleClick={handleClick} />;
    default:
      return <OrgEvents handleClick={handleClick} />;
  }
}

DOrgItem.propTypes = {
  handleClick: PropTypes.func.isRequired
};
