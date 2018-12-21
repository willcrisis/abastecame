import { createStackNavigator } from 'react-navigation';
import SelectVehicleScreen, { ROUTE_NAME as SELECT_VEHICLE_ROUTE } from './screens/SelectVehicle/SelectVehicle';
import NewVehicleScreen, { ROUTE_NAME as NEW_VEHICLE_ROUTE } from './screens/NewVehicle/NewVehicle';

const SelectVehicleStack = createStackNavigator(
  {
    [SELECT_VEHICLE_ROUTE]: SelectVehicleScreen,
    [NEW_VEHICLE_ROUTE]: NewVehicleScreen,
  },
  {
    initialRouteName: SELECT_VEHICLE_ROUTE,
  }
);

export default SelectVehicleStack;
