import React, { Component } from 'react';
import { Input, Label, Item } from 'native-base';

export default class NumberInput extends Component {

  processValue = value => {
    const { onChangeText } = this.props;
    onChangeText(value.replace(/\D/g, ''));
  };

  render() {
    const { value, label } = this.props;
    return (
      <Item floatingLabel>
        <Label>{label}</Label>
        <Input
          onChangeText={this.processValue}
          value={value}
          keyboardType="number-pad"
        />
      </Item>
    )
  }
}
