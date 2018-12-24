import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import NavigationService from '../../services/Navigation';
import firebase from '../../firebase';
import SelectVehicleScreen, { ROUTE_NAME as SELECT_VEHICLE_ROUTE } from './screens/SelectVehicle/SelectVehicle';
import NewVehicleScreen, { ROUTE_NAME as NEW_VEHICLE_ROUTE } from './screens/NewVehicle/NewVehicle';

const SelectVehicleStack = createStackNavigator(
  {
    [SELECT_VEHICLE_ROUTE]: SelectVehicleScreen,
    [NEW_VEHICLE_ROUTE]: NewVehicleScreen,
  },
  {
    initialRouteName: SELECT_VEHICLE_ROUTE,
  }
);

class VehicleSelection extends Component {
  state = {
    vehicles: [],
    loadingVehicles: true,
  }

  constructor(props) {
    super(props);
    const currentUser = firebase.currentUser();
    this.vehiclesRef = firebase.firestore
      .collection('vehicles')
      .where(`users.${currentUser.uid}`, '==', true);
  }

  componentDidMount() {
    this.loadVehicles();
  }

  loadVehicles = () => {
    this.setState({ loadingVehicles: true }, async () => {
      const snapshot = await this.vehiclesRef.get();
      const vehicles = [];
      snapshot.forEach(vehicleRef => {
        vehicles.push({
          ...vehicleRef.data(),
          key: vehicleRef.id,
        });
      });

      this.setState({
        vehicles,
        loadingVehicles: false,
      });
    })
  }

  saveVehicle = async (vehicle) => {
    await this.vehiclesRef.add({
      ...vehicle,
      users: {
        '3eqzPiYvwYNHvQLHIm2BaO7jUTs1': true,
      },
    });
    NavigationService.goBack();
  };

  goTo = (routeName, params, replace) => {
    let allowNavigation = false;
    let defaultParams;

    switch (routeName) {
      case NEW_VEHICLE_ROUTE:
        allowNavigation = true;
        defaultParams = {
          saveVehicle: this.saveVehicle,
        };
        break;
      default:
        allowNavigation = false;
    }

    if (allowNavigation) {
      if (replace) {
        return NavigationService.replace(routeName, params || defaultParams);
      }
      return NavigationService.navigate(routeName, params || defaultParams);
    }
  }

  render() {
    const { onSelectVehicle } = this.props;
    const { loadingVehicles, vehicles } = this.state;
    return (
      <SelectVehicleStack
        ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef)}
        screenProps={{
          loading: loadingVehicles,
          reload: this.loadVehicles,
          vehicles: vehicles,
          onSelectVehicle,
          goToNewVehicle: () => this.goTo(NEW_VEHICLE_ROUTE),
        }}
      />
    );
  }
}

export default VehicleSelection;
