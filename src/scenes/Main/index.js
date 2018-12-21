import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';

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
    const { vehicleKey } = this.props.screenProps;
    this.refuellingsRef = firebase
      .firestore()
      .collection(`vehicles/${vehicleKey}/refuellings`);

    this.state = {
      refuellings: [],
      loading: true,
    }
  }

  componentDidMount() {
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
  }

  componentWillUnmount() {
    this.unsubscribeRefuellings();
  }

  render() {
    const { loading, refuellings } = this.state;
    return (
      <RefuellingStack
        screenProps={{ loading, refuellings }}
      />
    );
  }
}

export default Main;
