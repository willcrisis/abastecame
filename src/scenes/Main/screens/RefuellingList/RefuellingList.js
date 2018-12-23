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
  reload,
  isReloading,
  goToAddRefuelling,
  goToDetails,
} }) => (
    <Container>
      <FlatList
        data={refuellings}
        renderItem={({ item }) => (
          <ListItem key={item.id} button>
            <RefuellingLine refuelling={item} onPress={goToDetails} />
          </ListItem>
        )}
        refreshing={isReloading}
        onRefresh={reload}
      />
      <Fab onPress={goToAddRefuelling}>
        <Icon name="add" />
      </Fab>
    </Container>
  );

RefuellingList.navigationOptions = {
  title: 'Refuellings'
};

export default RefuellingList;
