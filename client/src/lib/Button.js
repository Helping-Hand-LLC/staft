import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import _ from 'lodash';

const DEFAULT_PROPS = {
  display: 'inline-block',
  bgColor: 'bg-blue-900 hover:bg-blue-700',
  textColor: 'text-white',
  borderRadius: 'rounded',
  fontSize: 'text-base',
  fontWeight: 'font-normal',
  textTransform: 'normal-case',
  padding: 'py-2 px-4',
  // no default margin
  // no default flex
  extras: ''
};

const PROP_TYPES = {
  display: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  borderRadius: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  textTransform: PropTypes.string,
  padding: PropTypes.string,
  margin: PropTypes.string,
  flex: PropTypes.string,
  extras: PropTypes.string
};

export function Button(props) {
  const ignore = ['style', 'children', 'type', 'onClick'];

  return (
    <button
      className={Object.values(_.omit(props, ignore)).join(' ')}
      onClick={props.onClick}
      style={props.style}
    >
      {props.children}
    </button>
  );
}

export function ButtonLink(props) {
  const ignore = ['style', 'to', 'children'];

  return (
    <Link
      to={props.to}
      className={Object.values(_.omit(props, ignore)).join(' ')}
      style={props.style}
    >
      {props.children}
    </Link>
  );
}

export function Outlined(props) {
  const ignore = ['style', 'children', 'type', 'onClick'];

  return (
    <button
      className={Object.values(_.omit(props, ignore)).join(' ')}
      onClick={props.onClick}
      style={props.style}
    >
      {props.children}
    </button>
  );
}

Button.defaultProps = DEFAULT_PROPS; // no default onClick
Button.propTypes = {
  ...PROP_TYPES,
  onClick: PropTypes.func
};
ButtonLink.defaultProps = DEFAULT_PROPS;
ButtonLink.propTypes = PROP_TYPES;
Outlined.defaultProps = {
  ...DEFAULT_PROPS,
  bgColor: 'bg-transparent hover:bg-blue-900',
  textColor: 'text-blue-900 hover:text-white',
  fontWeight: 'font-semibold',
  border: 'border border-blue-900 hover:border-transparent'
  // no default onClick
};
Outlined.propTypes = {
  ...PROP_TYPES,
  border: PropTypes.string,
  onClick: PropTypes.func
};
