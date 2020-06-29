import React from 'react';
import PropTypes from 'prop-types';

function Badge({ type, text }) {
  let bgColor;

  switch (type) {
    case 'danger':
      bgColor = 'bg-red-100';
      break;
    case 'success':
      bgColor = 'bg-green-200';
      break;
    default:
      bgColor = 'bg-orange-100';
  }

  return (
    <span
      className={`inline-block ${bgColor} text-black rounded-full px-3 py-1 text-xs font-bold uppercase flex justify-center items-center`}
    >
      {text}
    </span>
  );
}

Badge.propTypes = {
  type: PropTypes.oneOf(['danger', 'success']).isRequired,
  text: PropTypes.string.isRequired
};

export default Badge;
