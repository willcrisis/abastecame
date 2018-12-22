import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days'
import NavigationService from '../../services/Navigation';
import firebase from '../../firebase'

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

// Some notes about this function:
// 1. If I have a full tank and consume some fuel, the next refuelling's liters
//    amount is how many fuel I consumed on the refuelling IF I have a new full tank.
// 2. If a refuelling doesn't have a full tank, I can't determine how many liters
//    were consumed because the next refuelling's liters amount doesn't reflect the
//    reality of consumed liters
// 3. If a refuelling's next refuelling doesn't have a full tank, I can't determine
//    the amount of consumed liters because it will be lesser than the real amount of
//    consumed liters
// 4. The cost per Km considers the amount of consumed liters (the next refuelling's
//    liters amount) to show the real cost for the current refuelling
const doCalcsOnRefuellings = (acc, refuelling, index, array) => {
  const nextRefuelling = array[index - 1];

  let extendedData;
  if (nextRefuelling) {
    const distance = nextRefuelling.odometer - refuelling.odometer;
    const days = differenceInCalendarDays(nextRefuelling.date, refuelling.date);
    const dailyDistance = distance / days;

    let distancePerLiter = 0;
    let costPerKm = 0;
    if (refuelling.fullTank && nextRefuelling.fullTank) {
      distancePerLiter = distance / nextRefuelling.liters;
      costPerKm = (nextRefuelling.liters * refuelling.price) / distance;
    }

    extendedData = {
      distance,
      dailyDistance: dailyDistance,
      distancePerLiter: distancePerLiter,
      costPerKm: costPerKm,
    }
  } else {
    extendedData = {
      distance: 0,
      dailyDistance: 0,
      distancePerLiter: 0,
      costPerKm: 0,
    }
  }

  return [
    ...acc,
    {
      ...refuelling,
      ...extendedData,
    }
  ]
};

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

    this.unsubscribeRefuellings = this.refuellingsRef.onSnapshot(snapshot => {
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

      refuellings.sort((a, b) => b.odometer - a.odometer);
      refuellings = refuellings.reduce(doCalcsOnRefuellings, []);

      this.setState({
        refuellings,
        loadingRefuellings: false,
      });
    }, err => console.warn(err));
  }

  componentWillUnmount() {
    this.unsubscribeVehicle();
    this.unsubscribeRefuellings();
  }

  goTo = (routeName, params) => {
    switch (routeName) {
      case ADD_REFUELLING_ROUTE:
        return NavigationService.navigate(routeName, {
          saveRefuelling: this.saveRefuelling,
        });
      case REFUELLING_LIST_ROUTE:
        return NavigationService.navigate(routeName);
      case REFUELLING_DETAILS_ROUTE:
        return NavigationService.navigate(routeName, params);
      default:
        return;
    }
  }

  saveRefuelling = async (refuelling) => {
    await this.refuellingsRef.add(refuelling);
    this.goTo(REFUELLING_LIST_ROUTE);
  }

  render() {
    const { loadingRefuellings, loadingVehicle, refuellings } = this.state;
    return (
      <RefuellingStack
        ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef)}
        screenProps={{
          loading: loadingRefuellings || loadingVehicle,
          refuellings,
          goToDetails: refuelling => this.goTo(REFUELLING_DETAILS_ROUTE, { refuelling }),
          goToAddRefuelling: () => this.goTo(ADD_REFUELLING_ROUTE),
        }}
      />
    );
  }
}

export default Main;
