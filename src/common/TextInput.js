import React, { Component } from 'react';
import { TextInput as NativeTextInput, View, Text } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import textInputStyle from './TextInput.styles';
import labelStyle from './Label.styles';

const TextInput = ({ label, mask, ...rest }) => (
  <View>
    <Text style={labelStyle}>{label}</Text>
    {mask
      ? <TextInputMask
        type={mask}
        {...rest}
        style={textInputStyle}
        underlineColorAndroid="transparent"
      />
      : <NativeTextInput
        {...rest}
        style={textInputStyle}
        underlineColorAndroid="transparent"
      />
    }
  </View>
)

export default TextInput;
