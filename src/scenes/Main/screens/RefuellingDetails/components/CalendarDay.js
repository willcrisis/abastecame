import React from 'react';
import { View } from 'react-native';
import {
  Text,
  H1
} from 'native-base';
import format from '../../../../../common/dateFns/format';
import styles from './CalendarDay.styles';

const CalendarDay = ({ date, style }) => (
  <View style={[styles.container, style]}>
    <Text style={styles.month}>{format(date, 'MMM')}</Text>
    <H1 style={styles.day}>{format(date, 'D')}</H1>
    <Text style={styles.year}>{format(date, 'YYYY')}</Text>
  </View>
);

export default CalendarDay;
