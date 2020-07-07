import React from 'react';
import PropTypes from 'prop-types';

export default function ProgressIndicator({ currentStep }) {
  const steps = [false, false, false, false];
  for (let i = 0; i < currentStep; i++) {
    steps[i] = true;
  }

  const stepToBg = step => (step ? 'bg-teal-300' : 'bg-gray-400');
  const indexToMargin = key =>
    key === 0 ? 'mr-1' : key === 3 ? 'ml-1' : 'mx-1';

  return (
    <ul className='bg-white w-full h-2 mb-2 flex justify-between items-start absolute top-0 left-0'>
      {steps.map((s, i) => (
        <li
          key={i}
          className={`${stepToBg(s)} flex-1 h-full ${indexToMargin(i)}`}
        ></li>
      ))}
    </ul>
  );
}

ProgressIndicator.propTypes = {
  currentStep: PropTypes.number.isRequired
};
