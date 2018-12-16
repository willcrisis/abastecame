import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import textInputStyle from './TextInput.styles';
import labelStyle from './Label.styles';

class Picker extends Component {
  state = {
    selectedItem: { label: 'Select one...' },
  };

  componentDidMount() {
    const { data, selectedValue } = this.props;
    const listItem = data.find(({ key }) => key === selectedValue);
    this.setState(({ selectedItem }) => ({
      selectedItem: listItem || selectedItem,
    }));
  }

  onChange = (selectedItem) => {
    this.setState({ selectedItem });
    this.props.onValueChange(selectedItem.key);
  }

  render() {
    const { label, data } = this.props;
    const { selectedItem } = this.state;
    return (
      <View>
        <Text style={labelStyle}>{label}</Text>
        <ModalSelector
          data={data}
          onChange={this.onChange}
        >
          <Text style={textInputStyle}>{selectedItem.label}</Text>
        </ModalSelector>
      </View>
    )
  }
}

export default Picker;
