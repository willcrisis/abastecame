import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import NavigationService from '../../services/Navigation';
import firebase from '../../firebase';
import { getRefuelings } from '../../models/refuelling';

import RefuellingListScreen, { ROUTE_NAME as REFUELLING_LIST_ROUTE } from './screens/RefuellingList/RefuellingList';
import AddRefuellingScreen, { ROUTE_NAME as ADD_REFUELLING_ROUTE } from './screens/AddRefuelling/AddRefuelling';
import RefuellingDetailsScreen, { ROUTE_NAME as REFUELLING_DETAILS_ROUTE } from './screens/RefuellingDetails/RefuellingDetails';

const RefuellingStack = createStackNavigator(
  {
    [REFUELLING_LIST_ROUTE]: RefuellingListScreen,
    [ADD_REFUELLING_ROUTE]: AddRefuellingScreen,
    [REFUELLING_DETAILS_ROUTE]: RefuellingDetailsScreen,
  },
  {
    initialRouteName: REFUELLING_LIST_ROUTE,
  }
);

class Main extends Component {
  state = {
    vehicle: {},
    refuellings: [],
    loadingVehicle: true,
    loadingRefuellings: true,
  }

  constructor(props) {
    super(props);
    const { vehicleKey } = this.props;

    this.vehicleRef = firebase.firestore.doc(`vehicles/${vehicleKey}`);
    this.refuellingsRef = this.vehicleRef.collection('refuellings');
  }

  componentDidMount() {
    this.unsubscribeVehicle = this.vehicleRef.onSnapshot(snapshot => {
      this.setState({
        vehicle: snapshot.data(),
        loadingVehicle: false,
      });
    }, err => console.warn(err));

    this.loadRefuellings();
  }

  componentWillUnmount() {
    this.unsubscribeVehicle();
    this.unsubscribeRefuellings();
  }

  loadRefuellings = async () => {
    this.setState({ loadingRefuellings: true }, async () => {
      const snapshot = await this.refuellingsRef.orderBy('odometer', 'desc').get();
      if (snapshot.empty) {
        this.setState({
          loadingRefuellings: false,
        });
        return;
      }
      let refuellings = [];

      snapshot.forEach(refuellingRef => {
        refuellings.push({
          ...refuellingRef.data(),
          key: refuellingRef.id,
        });
      });

      refuellings = getRefuelings(refuellings);

      this.setState({
        refuellings,
        loadingRefuellings: false,
      });
    });
  }

  goTo = (routeName, params, replace) => {
    let allowNavigation = false;
    let defaultParams;

    switch (routeName) {
      case ADD_REFUELLING_ROUTE:
        allowNavigation = true;
        defaultParams = {
          saveRefuelling: this.saveRefuelling,
        };
        break;
      case REFUELLING_LIST_ROUTE:
        allowNavigation = true;
        break;
      case REFUELLING_DETAILS_ROUTE:
        allowNavigation = true;
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

  saveRefuelling = async (refuelling) => {
    const newRefuellingRef = await this.refuellingsRef.add(refuelling);
    const refuellingSnapshot = await newRefuellingRef.get();
    const newRefuelling = {
      ...refuellingSnapshot.data(),
      key: refuellingSnapshot.id,
    };
    const refuellings = getRefuelings([
      newRefuelling,
      ...this.state.refuellings
    ]);
    this.setState({ refuellings });
    const processedRefuelling = refuellings.find(({ key }) => key === newRefuelling.key);

    this.goTo(REFUELLING_DETAILS_ROUTE, { refuelling: processedRefuelling }, true);
  }

  render() {
    const { loadingRefuellings, refuellings } = this.state;
    return (
      <RefuellingStack
        ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef)}
        screenProps={{
          refuellings,
          reload: this.loadRefuellings,
          isReloading: loadingRefuellings,
          goToDetails: refuelling => this.goTo(REFUELLING_DETAILS_ROUTE, { refuelling }),
          goToAddRefuelling: () => this.goTo(ADD_REFUELLING_ROUTE),
        }}
      />
    );
  }
}

export default Main;
