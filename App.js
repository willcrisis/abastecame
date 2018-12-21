import React from 'react';
import { AsyncStorage } from 'react-native';
import { Root, Spinner } from 'native-base';

import MainScene from './src/scenes/Main';
import SelectVehicleStack from './src/scenes/VehicleSelection';

export default class App extends React.Component {
  state = {
    loading: true,
    selectedVehicle: '',
  };

  async componentDidMount() {
    // await AsyncStorage.removeItem('vehicleKey');
    const selectedVehicle = await AsyncStorage.getItem('vehicleKey');
    this.setState({
      selectedVehicle,
      loading: false,
    });
  }

  onSelectVehicle = (selectedVehicle) => {
    this.setState({
      selectedVehicle,
    }, async () => {
      await AsyncStorage.setItem('vehicleKey', selectedVehicle)
    });
  };

  render() {
    const {
      loading,
      selectedVehicle,
    } = this.state;

    if (loading)
      return (
        <Spinner />
      );

    if (!selectedVehicle)
      return (
        <Root>
          <SelectVehicleStack screenProps={{onSelectVehicle: this.onSelectVehicle}} />
        </Root>
      );

    return (
      <Root>
        <MainScene vehicleKey={selectedVehicle} />
      </Root>
    );
  }
}
