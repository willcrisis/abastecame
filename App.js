import React from 'react';
import { AsyncStorage } from 'react-native';
import { Root, Spinner } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import SelectVehicleScreen, { ROUTE_NAME as SELECT_VEHICLE_ROUTE } from './src/scenes/VehicleSelection/screens/SelectVehicle/SelectVehicle';
import NewVehicleScreen, { ROUTE_NAME as NEW_VEHICLE_ROUTE } from './src/scenes/VehicleSelection/screens/NewVehicle/NewVehicle';
import RefuellingListScreen, { ROUTE_NAME as REFUELLING_LIST_ROUTE } from './src/scenes/Main/screens/RefuellingList/RefuellingList';
import AddRefuellingScreen, { ROUTE_NAME as ADD_REFUELLING_ROUTE } from './src/scenes/Main/screens/AddRefuelling/AddRefuelling';

const SelectVehicleStack = createStackNavigator(
  {
    [SELECT_VEHICLE_ROUTE]: SelectVehicleScreen,
    [NEW_VEHICLE_ROUTE]: NewVehicleScreen,
  },
  {
    initialRouteName: SELECT_VEHICLE_ROUTE,
  }
);

const RefuellingStack = createStackNavigator(
  {
    [REFUELLING_LIST_ROUTE]: RefuellingListScreen,
    [ADD_REFUELLING_ROUTE]: AddRefuellingScreen,
  },
  {
    initialRouteName: REFUELLING_LIST_ROUTE,
  }
);

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
        <RefuellingStack screenProps={{vehicleKey: selectedVehicle}} />
      </Root>
    );
  }
}
