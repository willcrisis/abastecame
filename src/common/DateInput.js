import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class DateInput extends Component {
  state = {
    isModalOpen: false,
  };

  toggleModal = isModalOpen => this.setState({ isModalOpen });
  onDateChange = date => {
    this.props.onDateChange(date);
    this.toggleModal(false);
  }

  render() {
    const { isModalOpen } = this.state;
    const { label, value } = this.props;
    const displayDate = value ? value.toDateString() : '';
    return (
      <View>
        <Text>{label}</Text>
        <TouchableOpacity onPress={() => this.toggleModal(true)}>
          <Text>{displayDate}</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={isModalOpen}
          onCancel={() => this.toggleModal(false)}
          onConfirm={this.onDateChange}
        />
      </View>
    )
  }
}
