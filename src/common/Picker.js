import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import I18n from '../i18n';
import textInputStyle from './TextInput.styles';
import labelStyle from './Label.styles';

const defaultItem = { key: 'DEFAULT_ITEM', label: I18n.t('picker.initialValue') };

class Picker extends Component {
  state = {
    selectedItem: this.props.multiple
      ? [defaultItem]
      : defaultItem,
  };

  componentDidMount() {
    const { data, selectedValue, multiple } = this.props;
    if (selectedValue) {
      const listItem = multiple
        ? data.findAll(({ key }) => selectedValue.includes(key))
        : data.find(({ key }) => key === selectedValue);
      this.setState(({ selectedItem }) => ({
        selectedItem: listItem || selectedItem,
      }));
    }
  }

  onChange = (newItem) => {
    const { multiple, onValueChange = () => null } = this.props;
    this.setState(({ selectedItem }) => {
      if (multiple) {
        const selectedItemKeys = selectedItem.map(({ key }) => key);
        const isRemovingItem = selectedItemKeys.includes(newItem.key);
        const newState = isRemovingItem
          ? selectedItem.filter(({ key }) => key !== newItem.key)
          : [
            ...selectedItem.filter(({ key }) => key !== 'DEFAULT_ITEM'),
            newItem,
          ];
        onValueChange(newState.map(({ key }) => key));
        return {
          selectedItem: newState.length
            ? newState
            : [defaultItem],
        };
      }
      onValueChange(newItem.key);
      return {
        selectedItem: newItem,
      };
    });
  }

  render() {
    const { label, data, multiple } = this.props;
    const { selectedItem } = this.state;
    return (
      <View>
        <Text style={labelStyle}>{label}</Text>
        <ModalSelector
          data={data}
          onChange={this.onChange}
          cancelText={I18n.t('actions.cancel')}
        >
          <Text style={textInputStyle}>
            {multiple
              ? selectedItem.map(({ label }) => label).join(', ')
              : selectedItem.label
            }
          </Text>
        </ModalSelector>
      </View>
    )
  }
}

export default Picker;
