import React from 'react';
import PropTypes from 'prop-types';

import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

import { Button } from '../../lib/Button';

export function PrevButton({ currentStep, prev }) {
  const arrowStyles =
    currentStep === 4
      ? {
          position: 'absolute',
          top: '50%',
          left: '0.5rem',
          transform: 'translate(0, -50%)'
        }
      : {};

  return currentStep > 1 ? (
    <Button
      display='block'
      bgColor='bg-blue-300 hover:bg-blue-100'
      fontWeight='font-semibold'
      textTransform='uppercase'
      extras={`relative ${
        currentStep === 4
          ? 'w-full md:w-3/4 md:mx-auto lg:w-1/2'
          : 'flex-1 flex'
      } ${currentStep === 4 ? 'mr-0 mb-1' : 'mr-1 md:mr-2'}`}
      onClick={prev}
    >
      <span className='flex-1 order-2'>Prev</span>
      <KeyboardArrowLeftIcon style={arrowStyles} />
    </Button>
  ) : null;
}

export function NextButton({ currentStep, next }) {
  const arrowStyles =
    currentStep === 1
      ? {
          position: 'absolute',
          top: '50%',
          right: '0.5rem',
          transform: 'translate(0, -50%)'
        }
      : {};

  return currentStep < 4 ? (
    <Button
      display='block'
      fontWeight='font-semibold'
      textTransform='uppercase'
      extras={`relative ${
        currentStep === 1
          ? 'w-full md:w-3/4 md:mx-auto lg:w-1/2'
          : 'flex-1 flex'
      }`}
      onClick={next}
    >
      <span className='flex-1'>Next</span>
      <KeyboardArrowRightIcon style={arrowStyles} />
    </Button>
  ) : null;
}

export function FinishButton({ currentStep }) {
  return currentStep < 4 ? null : (
    <Button
      type='submit'
      display='block'
      fontWeight='font-semibold'
      textTransform='uppercase'
      extras={`relative ${
        currentStep === 4 ? 'w-full md:w-3/4 md:mx-auto lg:w-1/2' : 'flex-1'
      }`}
    >
      Finish
      <KeyboardArrowRightIcon
        style={{
          position: 'absolute',
          top: '50%',
          right: '0.5rem',
          transform: 'translate(0, -50%)'
        }}
      />
    </Button>
  );
}

PrevButton.propTypes = {
  currentStep: PropTypes.number.isRequired,
  prev: PropTypes.func.isRequired
};
NextButton.propTypes = {
  currentStep: PropTypes.number.isRequired,
  next: PropTypes.func.isRequired
};
FinishButton.propTypes = {
  currentStep: PropTypes.number.isRequired
};
