import React from 'react';
import {
  Container,
  Content,
  Text,
  Spinner,
  List,
  ListItem,
  Fab,
  Icon,
} from 'native-base';
import NavigateableComponent from '../../../components/NavigateableComponent';
import { ROUTE_NAME as ADD_REFUELLING_ROUTE } from '../AddRefuelling/AddRefuelling';

export const ROUTE_NAME = 'RefuellingList';

export default class RefuellingList extends NavigateableComponent {
  static navigationOptions = {
    title: 'Refuellings'
  };

  onAddRefuelling = () => {
    const { vehicleKey } = this.props.screenProps;
    this.goTo(ADD_REFUELLING_ROUTE, { vehicleKey });
  }

  render() {
    const { refuellings, loading } = this.props.screenProps;

    if (loading) {
      return (
        <Spinner />
      )
    }

    return (
      <Container>
        <Content>
          {(!refuellings.length) && (
            <Text>No refuellings found for this vehicle</Text>
          )}
          {refuellings.length && (
            <List>
              {refuellings.map(refuelling => (
                <ListItem key={refuelling.id}>
                  <Text>{refuelling.odometer}</Text>
                </ListItem>
              ))}
            </List>
          )}
        </Content>
        <Fab onPress={this.onAddRefuelling}>
          <Icon name="add" />
        </Fab>
      </Container>
    )
  }
}
