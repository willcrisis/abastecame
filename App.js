import React from 'react';
import { AsyncStorage } from 'react-native';
import { Root, Spinner } from 'native-base';
import { GoogleSignin } from 'react-native-google-signin';
import MainScene from './src/scenes/Main';
import SelectVehicleScene from './src/scenes/VehicleSelection';
import LoginScene from './src/scenes/Login';

import firebase from './src/firebase';

export default class App extends React.Component {
  state = {
    loading: true,
    selectedVehicle: '',
    user: null,
  };

  async componentDidMount() {
    GoogleSignin.configure();
    firebase.init();
    // firebase.auth.signOut();
    this.unsubscribeAuth = firebase.auth.onAuthStateChanged(async (user) => {
      let selectedVehicle = '';
      if (user) {
        firebase.initData();
        selectedVehicle = await AsyncStorage.getItem('vehicleKey');
      } else {
        firebase.stopData();
        await AsyncStorage.removeItem('vehicleKey');
      }
      this.setState({
        loading: false,
        selectedVehicle,
        user,
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribeAuth();
    firebase.destroy();
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
      user,
    } = this.state;

    if (loading)
      return (
        <Spinner />
      );

    if (!user)
        return (
          <Root>
            <LoginScene />
          </Root>
        )

    if (!selectedVehicle)
      return (
        <Root>
          <SelectVehicleScene onSelectVehicle={this.onSelectVehicle} />
        </Root>
      );

    return (
      <Root>
        <MainScene vehicleKey={selectedVehicle} />
      </Root>
    );
  }
}
