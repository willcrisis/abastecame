import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import format from './dateFns/format';
import I18n from '../i18n';
import textInputStyle from './TextInput.styles';
import labelStyle from './Label.styles';

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
    const displayDate = value ? format(value) : '';
    return (
      <View>
        <Text style={labelStyle}>{label}</Text>
        <TouchableOpacity onPress={() => this.toggleModal(true)}>
          <Text style={textInputStyle}>{displayDate}</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={isModalOpen}
          onCancel={() => this.toggleModal(false)}
          onConfirm={this.onDateChange}
          cancelTextIOS={I18n.t('actions.cancel')}
          confirmTextIOS={I18n.t('actions.confirm')}
          titleIOS={I18n.t('dateInput.title')}
          locale={I18n.getCurrentLanguage()}
        />
      </View>
    )
  }
}
