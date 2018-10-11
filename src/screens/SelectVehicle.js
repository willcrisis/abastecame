import React from 'react';
import { AsyncStorage } from 'react-native';
import {
  Container,
  Content,
  Spinner,
} from 'native-base';
import firebase from 'react-native-firebase';
import NavigateableComponent from './NavigateableComponent';
import VehicleCard from '../components/VehicleCard';
import { ROUTE_NAME as NEW_VEHICLE_ROUTE } from './NewVehicle';
import { ROUTE_NAME as REFUELLING_LIST_ROUTE } from './RefuellingList';

export const ROUTE_NAME = 'SelectVehicle';

export default class SelectVehicle extends NavigateableComponent {
  static navigationOptions = {
    title: 'Vehicles'
  };

  constructor() {
    super();
    this.vehiclesRef = firebase
      .firestore()
      .collection('vehicles')
      .where('users.3eqzPiYvwYNHvQLHIm2BaO7jUTs1', '==', true);

    this.state = {
      vehicles: [],
      loading: true,
    }
  }

  componentDidMount() {
    this.unsubscribeVehicles = this.vehiclesRef.onSnapshot(snapshot => {
      const vehicles = [];
      snapshot.forEach(vehicleRef => {
        vehicles.push({
            ...vehicleRef.data(),
            id: vehicleRef.id,
          }
        )
      });

      this.setState({
        vehicles,
        loading: false,
      });
    }, err => console.warn(err));
  }

  componentWillUnmount() {
    this.unsubscribeVehicles();
  }

  selectVehicle = async (key) => {
    const { onSelectVehicle } = this.props.screenProps;
    onSelectVehicle(key);
  };

  render() {
    const {
      loading,
      vehicles,
    } = this.state;

    if (loading) {
      return (
        <Spinner/>
      )
    }

    return (
      <Container>
        <Content>
          {vehicles.map(vehicle => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onPress={() => this.selectVehicle(vehicle.id)}
            />
          ))}
          <VehicleCard
            key="add-new"
            icon="plus"
            vehicle={{ name: 'Add New Vehicle' }}
            onPress={() => this.goTo(NEW_VEHICLE_ROUTE)}
          />
        </Content>
      </Container>
    )
  }
}
