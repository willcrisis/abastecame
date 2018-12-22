import React from 'react';
import { FlatList } from 'react-native';
import {
  Container,
  Content,
  Spinner,
  ListItem,
  Fab,
  Icon,
} from 'native-base';
import RefuellingLine from './components/RefuellingLine';

export const ROUTE_NAME = 'RefuellingList';

const RefuellingList = ({ screenProps: {
  refuellings,
  loading,
  goToAddRefuelling,
  goToDetails,
} }) => (
  loading ? (
    <Spinner />
  ) : (
      <Container>
        <Content>
          <FlatList
            data={refuellings}
            renderItem={({ item }) => (
              <ListItem key={item.id} button>
                <RefuellingLine refuelling={item} onPress={goToDetails} />
              </ListItem>
            )}
          />
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
