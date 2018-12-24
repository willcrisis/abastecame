import React from 'react';
import { FlatList } from 'react-native';
import {
  Container,
  Spinner,
  Fab,
  Icon,
} from 'native-base';
import I18n from '../../../../i18n';
import NavigateableComponent from '../../../components/NavigateableComponent';
import VehicleCard from '../../components/VehicleCard';
import { ROUTE_NAME as NEW_VEHICLE_ROUTE } from '../NewVehicle/NewVehicle';

export const ROUTE_NAME = 'SelectVehicle';

const SelectVehicle = ({ screenProps: {
  loading,
  reload,
  vehicles,
  onSelectVehicle,
  goToNewVehicle
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
