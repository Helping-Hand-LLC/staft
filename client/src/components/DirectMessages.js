import React from 'react';
import PropTypes from 'prop-types';

import DashboardHeader from './DashboardHeader';

function DirectMessages(props) {
  return (
    <>
      <DashboardHeader title='Messages' handleClick={props.handleClick} />
      <div>DMs</div>
    </>
  );
}

export default DirectMessages;

DirectMessages.propTypes = {
  handleClick: PropTypes.func.isRequired
};
