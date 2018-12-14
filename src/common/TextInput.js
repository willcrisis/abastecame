import React, { Component } from 'react';
import { TextInput as NativeTextInput, View, Text } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

const TextInput = ({ label, mask, ...rest }) => (
  <View>
    <Text>{label}</Text>
    {mask
      ? <TextInputMask
        type={mask}
        {...rest}
        edi
      />
      : <NativeTextInput {...rest} />
    }
  </View>
)

export default TextInput;
