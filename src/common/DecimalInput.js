import React from 'react';
import TextInput from './TextInput';

const DecimalInput = ({precision = 2, separator = '.', delimiter = ',', ...props}) => (
  <TextInput
    {...props}
    mask="money"
    options={{
      separator,
      delimiter,
      unit: '',
      precision,
    }}
  />
);

export default DecimalInput;
