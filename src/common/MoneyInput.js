import React from 'react';
import TextInput from './TextInput';

const MoneyInput = (props) => (
  <TextInput
    {...props}
    mask="money"
  />
);

export default MoneyInput;
