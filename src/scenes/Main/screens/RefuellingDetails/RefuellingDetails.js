import React from 'react';
import { View } from 'react-native';
import {
  Container,
  Content,
  Icon,
  Text,
} from 'native-base';
import { Odometer, FuelName } from '../../../components';
import CalendarDay from './components/CalendarDay';
import ValueCard from './components/ValueCard';
import styles from './RefuellingDetails.styles';

export const ROUTE_NAME = 'RefuellingDetails';

const RefuellingDetails = ({
  navigation: {
    getParam
  },
}) => {
  const refuelling = getParam('refuelling');
  return (
    <Container>
      <Content padder>
        <View style={styles.row}>
          <CalendarDay
            date={refuelling.date}
            style={styles.calendar}
          />
          <View style={[styles.viewContainer, styles.odometerContainer]}>
            <Odometer
              value={refuelling.odometer}
            />
            <FuelName
              fuel={refuelling.fuel}
              style={styles.fuelName}
            />
          </View>
          <View style={styles.viewContainer}>
            { refuelling.fullTank
              ? <Icon type="Entypo" name="check" style={styles.fullTankIconCheck} />
              : <Icon type="Entypo" name="cross" style={styles.fullTankIconCross} />
            }
            <Text>Full Tank</Text>
          </View>
        </View>
        <View style={styles.row}>
            <ValueCard
              label="Performance"
              value={`${refuelling.distancePerLiter.toFixed(2)} Km/l`}
              icon="car"
            />
        </View>
        <View style={styles.row}>
            <ValueCard
              label="Distance"
              value={`${refuelling.distance} Km`}
              icon="car"
            />
            <Text> </Text>
            <ValueCard
              label="Average Daily Distance"
              value={`${refuelling.dailyDistance.toFixed(2)} Km`}
              icon="car"
            />
        </View>
        <View style={styles.row}>
            <ValueCard
              label="Fuel Price"
              value={`R$ ${refuelling.price.toFixed(3)}`}
              icon="cash"
            />
            <Text> </Text>
            <ValueCard
              label="Liters"
              value={refuelling.liters.toFixed(2)}
              icon="battery-full"
            />
        </View>
        <View style={styles.row}>
            <ValueCard
              label="Total Value"
              value={`R$ ${refuelling.total.toFixed(2)}`}
              icon="cash"
            />
            <Text> </Text>
            <ValueCard
              label="Cost Per Km"
              value={`R$ ${refuelling.costPerKm.toFixed(2)}`}
              icon="cash"
            />
        </View>
        <View style={styles.row}>
            <ValueCard
              label="Notes"
              value={refuelling.notes}
              icon="clipboard"
              renderAsText
            />
        </View>
      </Content>
    </Container>
  )
};

RefuellingDetails.navigationOptions = {
  title: 'Details',
};

export default RefuellingDetails;
