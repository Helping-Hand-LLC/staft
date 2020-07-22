import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AlertType } from '../actions/alerts';

export const Alerts = ({ alerts }) => {
  const alertTypeToColorScheme = alertType => {
    switch (alertType) {
      case AlertType.SUCCESS:
        return 'bg-green-100 text-green-700';
      case AlertType.WARNING:
        return 'bg-orange-100 text-orange-700';
      case AlertType.INFO:
        return 'bg-indigo-100 text-indigo-700';
      case AlertType.ERROR:
      default:
        return 'bg-red-100 text-red-700';
    }
  };

  return alerts === null || alerts.length <= 0 ? null : (
    <ul
      className='flex flex-col justify-between fixed left-0 right-0 w-5/6 mx-auto z-20'
      style={{ top: '10px' }}
    >
      {alerts.map(alert => {
        const { id, msg, alertType } = alert;
        return (
          <li
            key={id}
            className={`${alertTypeToColorScheme(
              alertType
            )} flex justify-between items-center p-2 rounded my-1`}
          >
            <div className='flex items-center'>
              <h4 className='text-lg font-medium mr-2'>{alertType}:</h4>
              <p className='text-sm font-light'>{msg}</p>
            </div>
            {/* <button
              type='button'
              style={{ outline: 'none' }}
              onClick={() => removeAlert(id)}
            >
              <CloseIcon />
            </button> */}
          </li>
        );
      })}
    </ul>
  );
};

Alerts.propTypes = {
  alerts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      msg: PropTypes.string.isRequired,
      alertType: PropTypes.oneOf(Object.values(AlertType)).isRequired
    })
  ).isRequired
};

const mapStateToProps = state => ({
  alerts: state.alerts
});

// TODO: removeAlert via close icon
// const mapDispatchToProps = {}

export default connect(mapStateToProps)(Alerts);
