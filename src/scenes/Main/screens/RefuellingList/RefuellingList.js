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

export const ROUTE_NAME = 'RefuellingList';

const RefuellingList = ({ screenProps: { refuellings, loading, goToAddRefuelling } }) => (
  loading ? (
    <Spinner />
  ) : (
      <Container>
        <Content>
          <List>
            {refuellings.map(refuelling => (
              <ListItem key={refuelling.id}>
                <Text>{refuelling.odometer}</Text>
              </ListItem>
            ))}
          </List>
        </Content>
        <Fab onPress={goToAddRefuelling}>
          <Icon name="add" />
        </Fab>
      </Container>
    )
);

RefuellingList.navigationOptions = {
  title: 'Refuellings'
};

export default RefuellingList;
