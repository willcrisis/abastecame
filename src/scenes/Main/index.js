import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import NavigationService from '../../services/Navigation';
import firebase from '../../firebase';
import { getRefuelings } from '../../models/refuelling';

import DashboardScreen, { ROUTE_NAME as DASHBOARD_ROUTE } from './screens/Dashboard/Dashboard';
import RefuellingListScreen, { ROUTE_NAME as REFUELLING_LIST_ROUTE } from './screens/RefuellingList/RefuellingList';
import AddRefuellingScreen, { ROUTE_NAME as ADD_REFUELLING_ROUTE } from './screens/AddRefuelling/AddRefuelling';
import RefuellingDetailsScreen, { ROUTE_NAME as REFUELLING_DETAILS_ROUTE } from './screens/RefuellingDetails/RefuellingDetails';

const RefuellingStack = createStackNavigator(
  {
    [DASHBOARD_ROUTE]: DashboardScreen,
    [REFUELLING_LIST_ROUTE]: RefuellingListScreen,
    [ADD_REFUELLING_ROUTE]: AddRefuellingScreen,
    [REFUELLING_DETAILS_ROUTE]: RefuellingDetailsScreen,
  },
  {
    initialRouteName: DASHBOARD_ROUTE,
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
    this.loadVehicle();
    this.loadRefuellings();
  }

  componentWillUnmount() {
    this.unsubscribeVehicle();
    this.unsubscribeRefuellings();
  }

  loadVehicle = () => {
    if (this.unsubscribeVehicle) {
      this.unsubscribeVehicle();
    }
    this.setState({ loadingVehicle: true }, () => {
      this.unsubscribeVehicle = this.vehicleRef.onSnapshot(async (snapshot) => {
        const imageUrl = await firebase.loadImage(snapshot.id);
        this.setState({
          vehicle: {
            ...snapshot.data(),
            key: snapshot.id,
            imageUrl,
          },
          loadingVehicle: false,
        });
      }, err => console.warn(err));
    });
  }

  loadRefuellings = async () => {
    if (this.unsubscribeRefuellings) {
      this.unsubscribeRefuellings();
    }
    this.setState({ loadingRefuellings: true }, async () => {
      this.unsubscribeRefuellings = this.refuellingsRef.orderBy('odometer', 'desc').onSnapshot(snapshot => {
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
          fuels: this.state.vehicle.fuels,
        };
        break;
      case REFUELLING_LIST_ROUTE:
        const { loadingRefuellings, refuellings } = this.state;
        allowNavigation = true;
        defaultParams = {
          refuellings,
          reload: this.loadRefuellings,
          isReloading: loadingRefuellings,
          goToDetails: refuelling => this.goTo(REFUELLING_DETAILS_ROUTE, { refuelling }),
          goToAddRefuelling: () => this.goTo(ADD_REFUELLING_ROUTE),
        };
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

  saveRefuelling = async (refuelling, callback) => {
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
    callback();
    this.goTo(REFUELLING_DETAILS_ROUTE, { refuelling: processedRefuelling }, true);
  }

  render() {
    const { vehicle, refuellings } = this.state;
    return (
      <RefuellingStack
        ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef)}
        screenProps={{
          vehicle,
          refuellings,
          goToRefuellingList: () => this.goTo(REFUELLING_LIST_ROUTE),
          goToAddRefuelling: () => this.goTo(ADD_REFUELLING_ROUTE),
        }}
      />
    );
  }
}

export default Main;
