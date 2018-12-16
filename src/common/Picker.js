import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ModalSelector from 'react-native-modal-selector';

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
    const { label, data, selectedValue } = this.props;
    const { selectedItem } = this.state;
    return (
      <View>
        <Text>{label}</Text>
        <ModalSelector
          data={data}
          onChange={this.onChange}
        >
          <Text>{selectedItem.label}</Text>
        </ModalSelector>
      </View>
    )
  }
}

export default Picker;
