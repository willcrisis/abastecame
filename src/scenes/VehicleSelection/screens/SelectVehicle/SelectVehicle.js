import React from 'react';
import { FlatList } from 'react-native';
import {
  Container,
  Spinner,
  Fab,
  Icon,
} from 'native-base';
import I18n from '../../../../i18n';
import VehicleCard from './components/VehicleCard';

export const ROUTE_NAME = 'SelectVehicle';

const SelectVehicle = ({ screenProps: {
  loading,
  reload,
  vehicles,
  onSelectVehicle,
  goToNewVehicle,
  loadImage,
} }) => (
  <Container>
    <FlatList
      data={vehicles}
      renderItem={({ item }) => (
        <VehicleCard
          key={item.key}
          vehicle={item}
          onPress={() => onSelectVehicle(item.key)}
        />
      )}
      refreshing={loading}
      onRefresh={reload}
    />
    <Fab onPress={goToNewVehicle}>
      <Icon name="add" />
    </Fab>
  </Container>
);

SelectVehicle.navigationOptions = {
  title: I18n.t('screenTitles.selectVehicle'),
};

export default SelectVehicle;
