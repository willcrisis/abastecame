import React, { Component } from 'react';
import { TextInput as NativeTextInput, View, Text } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Label } from 'native-base';

export default class TextInput extends Component {

  processValue = value => {
    const { onChangeText } = this.props;
    onChangeText(value.replace(/\D/g, ''));
  };

  render() {
    const { label, mask, ...rest } = this.props;
    return (
      <View>
        <Text>{label}</Text>
        {mask
          ? <TextInputMask
              type={mask}
              {...rest}
            />
          : <NativeTextInput {...rest} />
        }
      </View>
    )
  }
}
