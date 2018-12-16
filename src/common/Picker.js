import React from 'react';
import { View, Text, Picker as NativePicker } from 'react-native';

const Picker = ({ label, list, ...rest }) => (
  <View>
    <Text>{label}</Text>
    <NativePicker {...rest}>
      {list.map(({label, value}) => (
        <NativePicker.Item label={label} value={value} key={value} />
      ))}
    </NativePicker>
  </View>
);

export default Picker;
