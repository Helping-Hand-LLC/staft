import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { singleEventPath } from '../constants/paths';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import StaftIcon from '../assets/A_WebVersion.png';

function EventCard({
  id,
  badge,
  location,
  title,
  creator,
  startDate,
  startTime,
  links
}) {
  const streetSplit = location.formatted_address.indexOf(',');
  const street = location.formatted_address.slice(0, streetSplit);
  const rest = location.formatted_address.slice(streetSplit + 2);

  return (
    <div className='rounded overflow-hidden border border-gray-300 mb-2 shadow'>
      <div className='px-6 mt-4 flex justify-between'>
        <img className='inline-block h-8 w-6' src={StaftIcon} alt='' />
        {badge}
      </div>
      <Link
        to={{
          pathname: singleEventPath(id),
          state: {
            eventLocation: location.name,
            title,
            creator,
            startDate,
            startTime,
            address: { street, rest },
            links
          }
        }}
        className='block px-6 py-2 border-l-4 border-teal-500'
      >
        <h3 className='font-bold text-xl mb-2'>{location.name}</h3>
        <p className='text-gray-700 font-light'>{title}</p>
        <small className='block text-gray-500 text-sm font-light'>
          Creator: {creator}
        </small>
      </Link>
      <div className='px-6 py-2 border-l-4 border-teal-500 flex justify-between items-center'>
        <span className='text-sm'>
          {startDate} • {startTime}
        </span>
        <span>
          <MoreHorizIcon fontSize='large' />
        </span>
      </div>
    </div>
  );
}

EventCard.propTypes = {
  id: PropTypes.string.isRequired,
  badge: PropTypes.element,
  location: PropTypes.object.isRequired,
  title: PropTypes.string,
  creator: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  links: PropTypes.array.isRequired
};

export default EventCard;
