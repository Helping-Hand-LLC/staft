import React from 'react';
import { AlertType } from '../actions/alerts';
// TODO: removeAlert via close icon
import { useSelector } from 'react-redux';

export default function Alerts() {
  const alerts = useSelector(state => state.alerts);

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
            <p className='text-xs md:text-sm font-light'>{msg}</p>
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
}
