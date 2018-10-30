import React from 'react';
import TextInput from './TextInput';

const DecimalInput = ({numberOfLines = 5, ...props}) => (
  <TextInput
    {...props}
    multiline={true}
    numberOfLines={numberOfLines}
  />
);

export default DecimalInput;
