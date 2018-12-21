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
import NavigateableComponent from '../../../components/NavigateableComponent';
import styles from '../../../../styles/styles';
import {
  DecimalInput,
  TextArea,
  DateInput,
  Picker,
  Switch,
} from '../../../../common';
import { language } from '../../../../config'
import required from '../../../../common/validation/required';

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
        fullTank: true,
        odometer: '',
        price: '',
        liters: '',
        total: '',
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

  validateRefuelling = refuelling => {
    const { isValid, failures } = required(refuelling, [
      'date',
      'fuel',
      'odometer',
      'price',
      'liters',
      'total',
    ]);

    if (!isValid) {
      Toast.show({
        text: `Please fill the following fields: ${failures.join(', ')}`,
        duration: 5000,
      });
    }
    return isValid;
  }

  processRefuelling = refuelling => ({
    ...refuelling,
    odometer: this.odometerRef.getRawValue(),
    price: this.priceRef.getRawValue(),
    liters: this.litersRef.getRawValue(),
    total: this.totalRef.getRawValue(),
  });

  save = async () => {
    const { refuelling } = this.state;
    if (!this.validateRefuelling(refuelling)) return;

    try {
      await this.refuellingsRef.add({
        ...this.processRefuelling(refuelling),
      });
      this.goBack();
    } catch (err) {
      console.warn(err);
    }
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
            <DecimalInput
              onChangeText={this.updateField('odometer')}
              value={refuelling.odometer}
              label="Odometer"
              precision={0}
              delimiter=" "
              innerRef={ref => this.odometerRef = ref}
            />
            <DecimalInput
              onChangeText={this.updateField('price')}
              value={refuelling.price}
              label="Fuel Price"
              precision={3}
              innerRef={ref => this.priceRef = ref}
            />
            <DecimalInput
              onChangeText={this.updateField('liters')}
              value={refuelling.liters}
              label="Liters"
              innerRef={ref => this.litersRef = ref}
            />
            <DecimalInput
              onChangeText={this.updateField('total')}
              value={refuelling.total}
              label="Total Value"
              innerRef={ref => this.totalRef = ref}
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
