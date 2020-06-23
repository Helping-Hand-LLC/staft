import React from 'react';
import PropTypes from 'prop-types';

import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

import { Button } from '../../lib/Button';

export function PrevButton({ currentStep, prev }) {
  return currentStep > 1 ? (
    <Button
      type='button'
      display='block'
      bgColor='bg-teal-500 hover:bg-teal-300'
      fontWeight='font-semibold'
      fontSize='text-sm'
      textTransform='uppercase'
      margin={`${currentStep === 4 ? 'mr-0 mb-1' : 'mr-1'}`}
      extras={`relative ${currentStep === 4 ? 'w-full' : 'flex-1'}`}
      onClick={prev}
    >
      Prev
      <KeyboardArrowLeftIcon
        style={{
          position: 'absolute',
          top: '50%',
          left: '0.5rem',
          transform: 'translate(0, -50%)'
        }}
      />
    </Button>
  ) : null;
}

export function NextButton({ currentStep, next }) {
  return currentStep < 4 ? (
    <Button
      type='button'
      display='block'
      bgColor='bg-teal-500 hover:bg-teal-300'
      fontWeight='font-semibold'
      fontSize='text-sm'
      textTransform='uppercase'
      extras='relative flex-1'
      onClick={next}
    >
      Next
      <KeyboardArrowRightIcon
        style={{
          position: 'absolute',
          top: '50%',
          right: '0.5rem',
          transform: 'translate(0, -50%)'
        }}
      />
    </Button>
  ) : null;
}

export function FinishButton({ currentStep }) {
  return currentStep < 4 ? null : (
    <Button
      type='submit'
      display='block'
      bgColor='bg-teal-500 hover:bg-teal-300'
      fontWeight='font-semibold'
      fontSize='text-sm'
      textTransform='uppercase'
      extras={`relative ${currentStep === 4 ? 'w-full' : 'flex-1'}`}
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
