import React from 'react';
import TextInput from './TextInput';

const DecimalInput = ({precision = 2, ...props}) => (
  <TextInput
    {...props}
    mask="money"
    options={{
      separator: '.',
      delimiter: ',',
      unit: '',
      precision,
    }}
  />
);

export default DecimalInput;
