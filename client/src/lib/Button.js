import React from 'react';

function Button() {
  return (
    <button class='bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded'>
      Button
    </button>
  );
}

function Outlined() {
  return (
    <button class='bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded'>
      Button
    </button>
  );
}

module.exports = {
  Button,
  Outlined
};
