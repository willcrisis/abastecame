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
    this.storageRef = firebase.storage;
    const currentUser = firebase.currentUser();
    this.userRef = firebase.firestore.doc(`users/${currentUser.uid}`);
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser = async () => {
    const userSnap = await this.userRef.get();
    const userData = userSnap.data();
    this.loadVehicles(userData.vehicles)
  }

  loadVehicles = (refs) => {
    this.setState({ loadingVehicles: true }, async () => {
      let vehicles = await Promise.all(refs.map(async (vehicleID) => {
        const snapshot = await firebase.firestore.doc(`vehicles/${vehicleID}`).get();
        const imageUrl = await this.loadImage(snapshot.id);
        return {
          ...snapshot.data(),
          key: snapshot.id,
          imageUrl,
        };
      }));

      this.setState({
        vehicles,
        loadingVehicles: false,
      });
    })
  }

  loadImage = async (key) => {
    const image = this.storageRef.ref(`${key}.jpg`);
    try {
      const imageUrl = await image.getDownloadURL();
      return imageUrl;
    } catch(err) {
      if (err.code !== 'storage/object-not-found') console.warn(err);
      return null;
    }
  };

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
