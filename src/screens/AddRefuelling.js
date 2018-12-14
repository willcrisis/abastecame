import React from 'react';
import {
  Container,
  Content,
  Text,
  Form,
  Item,
  Label,
  Button,
  Toast,
  Picker,
  ListItem,
  CheckBox,
  Body,
} from 'native-base';
import firebase from 'react-native-firebase';
import NavigateableComponent from './NavigateableComponent';
import styles from '../styles/styles';
import {
  NumberInput,
  DecimalInput,
  TextArea,
  DateInput,
} from '../common';

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

    this.state = {
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
    const { refuelling } = this.state;
    return (
      <Container>
        <Content padder>
          <Form style={styles.form}>
            <DateInput
              value={refuelling.date}
              label="Date"
              onDateChange={this.updateField('date')}
            />
            <Item>
              <Label>Fuel</Label>
              <Picker
                selectedValue={refuelling.fuel}
                onValueChange={this.updateField('fuel')}
              >
                <Picker.Item label="Diesel" value="diesel" />
                <Picker.Item label="Ethanol" value="ethanol" />
                <Picker.Item label="Premium Ethanol" value="premiumEthanol" />
                <Picker.Item label="Gasoline" value="gasoline" />
                <Picker.Item label="Premium Gasoline" value="premiumGasoline" />
                <Picker.Item label="Compressed Natural Gas" value="gnv" />
              </Picker>
            </Item>
            <ListItem>
              <CheckBox
                checked={refuelling.fullTank}
                onPress={() => this.updateField('fullTank')(!refuelling.fullTank)}
              />
              <Body>
                <Text>Full Tank</Text>
              </Body>
            </ListItem>
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
