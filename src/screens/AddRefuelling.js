import React from 'react';
import {
  Container,
  Content,
  Text,
  Form,
  Spinner,
  Button,
  Toast,
} from 'native-base';
import firebase from 'react-native-firebase';
import NavigateableComponent from './NavigateableComponent';
import styles from '../styles/styles';
import {
  NumberInput,
  DecimalInput,
  TextArea,
  DateInput,
  Picker,
  Switch,
} from '../common';
import { language } from '../config'

export const ROUTE_NAME = 'AddRefuelling';

export default class AddRefuelling extends NavigateableComponent {
  static navigationOptions = {
    title: 'New Refuelling'
  };

  constructor(props) {
    super(props);

    this.firestore = firebase.firestore();

    const vehicleKey = this.getParam('vehicleKey');
    this.refuellingsRef = this.firestore.collection(`vehicles/${vehicleKey}/refuellings`);
    this.fuelsRef = this.firestore.collection('fuels');

    this.state = {
      fuels: [],
      loading: true,
      refuelling: {
        fuel: 'diesel',
        date: new Date(),
        fullTank: false,
        odometer: '0',
        price: '0',
        liters: '0',
        total: '0',
        notes: '',
      }
    };
  }

  componentDidMount() {
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
        loading: false,
      })
    }, err => console.warn(err));
  }

  componentWillUnmount() {
    this.unsubscribeFuels();
  }

  updateField = field => value => this.setState(({ refuelling }) => ({
    refuelling: {
      ...refuelling,
      [field]: value,
    }
  }));

  save = async () => {
    const { refuelling } = this.state;
    console.warn(refuelling);
    // if (refuelling) { // TODO validate data
    //   try {
    //     await this.refuellingsRef.add({
    //       ...refuelling,
    //     });
    //     this.goBack();
    //   } catch (err) {
    //     console.warn(err);
    //   }
    // } else {
    //   Toast.show({text: 'Please fill all fields.'})
    // }
  };

  render() {
    const { refuelling, fuels, loading } = this.state;

    if (loading) {
      return (
        <Spinner />
      )
    }

    return (
      <Container>
        <Content padder>
          <Form style={styles.form}>
            <DateInput
              value={refuelling.date}
              label="Date"
              onDateChange={this.updateField('date')}
            />
            <Picker
              label="Fuel"
              selectedValue={refuelling.fuel}
              onValueChange={this.updateField('fuel')}
              data={fuels}
            />
            <Switch
              label="Full Tank"
              value={refuelling.fullTank}
              onValueChange={() => this.updateField('fullTank')(!refuelling.fullTank)}
            />
            <NumberInput
              onChangeText={this.updateField('odometer')}
              value={refuelling.odometer}
              label="Odometer"
            />
            <DecimalInput
              onChangeText={this.updateField('price')}
              value={refuelling.price}
              label="Fuel Price"
              precision={3}
            />
            <DecimalInput
              onChangeText={this.updateField('liters')}
              value={refuelling.liters}
              label="Liters"
            />
            <DecimalInput
              onChangeText={this.updateField('total')}
              value={refuelling.total}
              label="Total Value"
            />
            <TextArea
              onChangeText={this.updateField('notes')}
              value={refuelling.notes}
              label="Notes"
            />
          </Form>
          <Button onPress={this.save} full>
            <Text>
              Save
            </Text>
          </Button>
        </Content>
      </Container>
    )
  }
}
