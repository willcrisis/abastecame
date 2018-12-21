import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Container,
  Content,
  Text,
  Form,
  Item,
  Input,
  Label,
  Button,
  Toast,
} from 'native-base';
import firebase from 'react-native-firebase';
import NavigateableComponent from '../../../components/NavigateableComponent';
import styles from '../../../../styles/styles';

export const ROUTE_NAME = 'NewVehicle';

const validateVehicle = ({name, manufacturer, model}) => name && manufacturer && model;

export default class NewVehicle extends NavigateableComponent {
  static navigationOptions = {
    title: 'New Vehicle'
  };

  constructor(props) {
    super(props);

    this.firestore = firebase.firestore();

    this.vehiclesRef = this.firestore.collection('vehicles');

    this.state = {
      vehicle: {
        name: '',
        manufacturer: '',
        model: '',
      }
    };
  }

  updateField = (field, value) => this.setState(({ vehicle }) => ({
    vehicle: {
      ...vehicle,
      [field]: value,
    }
  }));

  save = async () => {
    const { vehicle } = this.state;
    if (validateVehicle(vehicle)) {
      try {
        await this.vehiclesRef.add({
          ...vehicle,
          users: {
            '3eqzPiYvwYNHvQLHIm2BaO7jUTs1': true,
          },
        });
        this.goBack();
      } catch (err) {
        console.warn(err);
      }
    } else {
      Toast.show({text: 'Please fill all fields.'})
    }
  };

  render() {
    return (
      <Container>
        <Content padder>
          <Form style={styles.form}>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input onChangeText={value => this.updateField('name', value)}/>
            </Item>
            <Item floatingLabel>
              <Label>Manufacturer</Label>
              <Input onChangeText={value => this.updateField('manufacturer', value)}/>
            </Item>
            <Item floatingLabel>
              <Label>Model</Label>
              <Input onChangeText={value => this.updateField('model', value)}/>
            </Item>
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
