import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';
import NavigationService from '../../services/Navigation';
import { language } from '../../config'

import RefuellingListScreen, { ROUTE_NAME as REFUELLING_LIST_ROUTE } from './screens/RefuellingList/RefuellingList';
import AddRefuellingScreen, { ROUTE_NAME as ADD_REFUELLING_ROUTE } from './screens/AddRefuelling/AddRefuelling';

const RefuellingStack = createStackNavigator(
  {
    [REFUELLING_LIST_ROUTE]: RefuellingListScreen,
    [ADD_REFUELLING_ROUTE]: AddRefuellingScreen,
  },
  {
    initialRouteName: REFUELLING_LIST_ROUTE,
  }
);

class Main extends Component {
  constructor(props) {
    super(props);
    const { vehicleKey } = this.props;

    const firestore = firebase.firestore();

    this.vehicleRef = firestore.doc(`vehicles/${vehicleKey}`);
    this.refuellingsRef = this.vehicleRef.collection('refuellings');
    this.fuelsRef = firestore.collection('fuels');

    this.state = {
      vehicle: {},
      refuellings: [],
      fuels: [],
      loading: true,
    }
  }

  componentDidMount() {
    this.unsubscribeVehicle = this.vehicleRef.onSnapshot(snapshot => {
      this.setState({
        vehicle: snapshot.data(),
      })
    }, err => console.warn(err));

    this.unsubscribeRefuellings = this.refuellingsRef.onSnapshot(snapshot => {
      const refuellings = [];

      snapshot.forEach(refuellingRef => {
        refuellings.push({
          ...refuellingRef.data(),
          id: refuellingRef.id,
        })
      })

      this.setState({
        refuellings,
        loading: false,
      })
    }, err => console.warn(err));

    this.unsubscribeFuels = this.fuelsRef.onSnapshot(snapshot => {
      const fuels = [];

      snapshot.forEach(fuelRef => {
        const data = fuelRef.data();
        fuels.push({
          label: data[language] || data.en,
          key: fuelRef.id,
        })
      })

      this.setState({
        fuels,
      })
    }, err => console.warn(err));
  }

  componentWillUnmount() {
    this.unsubscribeVehicle();
    this.unsubscribeRefuellings();
    this.unsubscribeFuels();
  }

  goTo = (routeName) => {
    switch (routeName) {
      case ADD_REFUELLING_ROUTE:
        return NavigationService.navigate(routeName);
      case REFUELLING_LIST_ROUTE:
        return NavigationService.navigate(routeName);
      default:
        return;
    }
  }

  saveRefuelling = async (refuelling) => {
    await this.refuellingsRef.add(refuelling);
    this.goTo(REFUELLING_LIST_ROUTE);
  }

  render() {
    const { loading, refuellings, fuels } = this.state;
    return (
      <RefuellingStack
        ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef)}
        screenProps={{
          loading,
          refuellings,
          fuels,
          goToAddRefuelling: () => this.goTo(ADD_REFUELLING_ROUTE),
          saveRefuelling: this.saveRefuelling,
        }}
      />
    );
  }
}

export default Main;
