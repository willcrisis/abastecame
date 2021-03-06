import React from 'react';
import TextInput from './TextInput';

const NumberInput = (props) => (
  <TextInput
    {...props}
    mask="only-numbers"
  />
);

export default NumberInput;
