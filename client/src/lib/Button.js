import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import _ from 'lodash';

const DEFAULT_PROPS = {
  bgColor: 'bg-teal-500 hover:bg-teal-300',
  textColor: 'text-white',
  borderRadius: 'rounded',
  fontSize: 'text-sm',
  fontWeight: 'font-normal',
  textTransform: 'normal-case',
  padding: 'py-2 px-4',
  extras: ''
};

const PROP_TYPES = {
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  borderRadius: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  textTransform: PropTypes.string,
  padding: PropTypes.string,
  extras: PropTypes.string
};

export function Button(props) {
  const ignore = ['style', 'children', 'type', 'onClick'];

  return (
    <button
      type='button'
      className={Object.values(_.omit(props, ignore)).join(' ')}
      onClick={props.onClick}
      style={{ ...props.style, outline: 'none' }}
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
      style={{ ...props.style, outline: 'none' }}
    >
      {props.children}
    </Link>
  );
}

export function Outlined(props) {
  const ignore = ['style', 'children', 'type', 'onClick'];

  return (
    <button
      type='button'
      className={Object.values(_.omit(props, ignore)).join(' ')}
      onClick={props.onClick}
      style={{ ...props.style, outline: 'none' }}
    >
      {props.children}
    </button>
  );
}

Button.defaultProps = DEFAULT_PROPS;
Button.propTypes = {
  ...PROP_TYPES,
  onClick: PropTypes.func
};
ButtonLink.defaultProps = DEFAULT_PROPS;
ButtonLink.propTypes = PROP_TYPES;
Outlined.defaultProps = {
  ...DEFAULT_PROPS,
  bgColor: 'bg-transparent hover:bg-blue-500',
  textColor: 'text-blue-500 hover:text-white',
  fontWeight: 'font-semibold',
  border: 'border border-blue-500 hover:border-transparent'
};
Outlined.propTypes = {
  ...PROP_TYPES,
  border: PropTypes.string,
  onClick: PropTypes.func
};
