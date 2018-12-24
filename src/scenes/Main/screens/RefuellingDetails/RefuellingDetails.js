import React from 'react';
import { View } from 'react-native';
import {
  Container,
  Content,
  Icon,
  Text,
} from 'native-base';
import I18n from '../../../../i18n';
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
            <Text>{I18n.t('refuelling.fullTank')}</Text>
          </View>
        </View>
        <View style={styles.row}>
            <ValueCard
              label={I18n.t('refuelling.performance')}
              value={`${refuelling.distancePerLiter.toFixed(2)} Km/l`}
              icon="car"
            />
        </View>
        <View style={styles.row}>
            <ValueCard
              label={I18n.t('refuelling.distance')}
              value={`${refuelling.distance} Km`}
              icon="car"
            />
            <Text> </Text>
            <ValueCard
              label={I18n.t('refuelling.averageDailyDistance')}
              value={`${refuelling.dailyDistance.toFixed(2)} Km`}
              icon="car"
            />
        </View>
        <View style={styles.row}>
            <ValueCard
              label={I18n.t('refuelling.price')}
              value={`R$ ${refuelling.price.toFixed(3)}`}
              icon="cash"
            />
            <Text> </Text>
            <ValueCard
              label={I18n.t('refuelling.liters')}
              value={refuelling.liters.toFixed(2)}
              icon="battery-full"
            />
        </View>
        <View style={styles.row}>
            <ValueCard
              label={I18n.t('refuelling.total')}
              value={`R$ ${refuelling.total.toFixed(2)}`}
              icon="cash"
            />
            <Text> </Text>
            <ValueCard
              label={I18n.t('refuelling.costPerKm')}
              value={`R$ ${refuelling.costPerKm.toFixed(2)}`}
              icon="cash"
            />
        </View>
        <View style={styles.row}>
            <ValueCard
              label={I18n.t('refuelling.notes')}
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
  title: I18n.t('screenTitles.refuellingDetails'),
};

export default RefuellingDetails;
