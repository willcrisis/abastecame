import React from 'react';
import { FlatList, View } from 'react-native';
import {
  Container,
  Content,
  Fab,
  Icon,
  Text,
} from 'native-base';
import I18n from '../../../../i18n';
import VehicleCard from './components/VehicleCard';
import styles from './SelectVehicle.styles';

export const ROUTE_NAME = 'SelectVehicle';

const SelectVehicle = ({ screenProps: {
  loading,
  reload,
  vehicles,
  onSelectVehicle,
  goToNewVehicle,
} }) => (
    <Container>
      {vehicles.length ? (
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
        ) : (
          <View style={styles.container}>
            <Icon type="Entypo" name="emoji-sad" />
            <Text style={styles.noVehiclesText}>{I18n.t('vehicle.noVehicles')}</Text>
          </View>
        )
      }
      <Fab onPress={goToNewVehicle}>
        <Icon name="add" />
      </Fab>
    </Container>
  );

SelectVehicle.navigationOptions = {
  title: I18n.t('screenTitles.selectVehicle'),
};

export default SelectVehicle;
