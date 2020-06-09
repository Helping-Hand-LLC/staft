import React from 'react';

function Active() {
  return (
    <li class='mr-3'>
      <a
        class='inline-block border border-blue rounded py-1 px-3 bg-blue text-white'
        href='#'
      >
        Active Pill
      </a>
    </li>
  );
}

function Inactive() {
  return (
    <li class='mr-3'>
      <a
        class='inline-block border border-white rounded hover:border-grey-lighter text-blue hover:bg-grey-lighter py-1 px-3'
        href='#'
      >
        Pill
      </a>
    </li>
  );
}

function Disabled() {
  return (
    <li class='mr-3'>
      <a
        class='inline-block py-1 px-3 text-grey-light cursor-not-allowed'
        href='#'
      >
        Disabled Pill
      </a>
    </li>
  );
}

module.exports = {
  Active,
  Inactive,
  Disabled
};
