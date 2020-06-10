import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import _ from 'lodash';

const defaultProps = {
  display: 'inline-block',
  bgColor: 'bg-primary',
  textColor: 'text-newwhite',
  borderRadius: 'rounded',
  fontSize: 'text-base',
  fontWeight: 'font-normal',
  textTransform: 'normal-case',
  padding: 'py-2 px-4'
  // no default margin
  // no default flex
};

const propTypes = {
  display: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  borderRadius: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  textTransform: PropTypes.string,
  margin: PropTypes.string,
  flex: PropTypes.string
};

export function Button(props) {
  return (
    <button className={Object.values(_.omit(props, ['children'])).join(' ')}>
      {props.children}
    </button>
  );
}

export function ButtonLink(props) {
  return (
    <Link
      to={props.to}
      className={Object.values(_.omit(props, ['to', 'children'])).join(' ')}
    >
      {props.children}
    </Link>
  );
}

export function Outlined(props) {
  return (
    <button className='bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded'>
      Button
    </button>
  );
}

Button.defaultProps = defaultProps;
Button.propTypes = propTypes;
ButtonLink.defaultProps = defaultProps;
ButtonLink.propTypes = propTypes;
Outlined.defaultProps = defaultProps;
Outlined.propTypes = propTypes;
