import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days'
import NavigationService from '../../services/Navigation';
import { language } from '../../config';

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
  state = {
    vehicle: {},
    refuellings: [],
    fuels: [],
    loadingVehicle: true,
    loadingRefuellings: true,
    loadingFuels: true,
  }

  constructor(props) {
    super(props);
    const { vehicleKey } = this.props;

    const firestore = firebase.firestore();

    this.vehicleRef = firestore.doc(`vehicles/${vehicleKey}`);
    this.refuellingsRef = this.vehicleRef.collection('refuellings');
    this.fuelsRef = firestore.collection('fuels');
  }

  componentDidMount() {
    this.unsubscribeVehicle = this.vehicleRef.onSnapshot(snapshot => {
      this.setState({
        vehicle: snapshot.data(),
        loadingVehicle: false,
      });
    }, err => console.warn(err));

    this.unsubscribeRefuellings = this.refuellingsRef.onSnapshot(snapshot => {
      if (snapshot.empty) {
        this.setState({
          loadingRefuellings: false,
        });
        return;
      }
      const refuellings = [];

      snapshot.forEach(refuellingRef => {
        refuellings.push({
          ...refuellingRef.data(),
          id: refuellingRef.id,
        });
      });

      this.setState({
        refuellings: [...refuellings].sort((a, b) => b.odometer - a.odometer),
        loadingRefuellings: false,
      });
    }, err => console.warn(err));

    this.unsubscribeFuels = this.fuelsRef.onSnapshot(snapshot => {
      const fuels = [];

      snapshot.forEach(fuelRef => {
        const data = fuelRef.data();
        fuels.push({
          label: data[language] || data.en,
          key: fuelRef.id,
        });
      });

      this.setState({
        fuels,
        loadingFuels: false,
      });
    }, err => console.warn(err));
  }

  componentWillUnmount() {
    this.unsubscribeVehicle();
    this.unsubscribeRefuellings();
    this.unsubscribeFuels();
  }

  goTo = (routeName) => {
    const { fuels } = this.state;
    switch (routeName) {
      case ADD_REFUELLING_ROUTE:
        return NavigationService.navigate(routeName, {
          fuels,
          saveRefuelling: this.saveRefuelling,
        });
      case REFUELLING_LIST_ROUTE:
        return NavigationService.navigate(routeName);
      default:
        return;
    }
  }

  saveRefuelling = async (refuelling) => {
    await this.refuellingsRef.add(refuelling);

    const updatedPreviousRefuelling = this.calculatePreviousRefuelling(refuelling);
    if (updatedPreviousRefuelling) {
      await this.refuellingsRef.doc(updatedPreviousRefuelling.id).update(updatedPreviousRefuelling)
    }

    this.goTo(REFUELLING_LIST_ROUTE);
  }

  calculatePreviousRefuelling = (refuelling) => {
    const { refuellings } = this.state;
    const previousRefuelling = refuellings.find(({ odometer }) => odometer < refuelling.odometer);
    if (!previousRefuelling) return null;

    const distance = refuelling.odometer - previousRefuelling.odometer;
    const days = differenceInCalendarDays(refuelling.date, previousRefuelling.date);
    return {
      ...previousRefuelling,
      distance,
      dailyDistance: distance / days,
      distancePerLiter: distance / refuelling.liters,
      pricePerDistance: previousRefuelling.total / distance,
    };
  }

  render() {
    const { loadingRefuellings, loadingVehicle, loadingFuels, refuellings } = this.state;
    return (
      <RefuellingStack
        ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef)}
        screenProps={{
          loading: loadingRefuellings || loadingVehicle || loadingFuels,
          refuellings,
          goToAddRefuelling: () => this.goTo(ADD_REFUELLING_ROUTE),
        }}
      />
    );
  }
}

export default Main;
