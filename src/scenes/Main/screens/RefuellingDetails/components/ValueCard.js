import React from 'react';
import { View } from 'react-native';
import {
  Text,
  Left,
  Icon,
  H1,
} from 'native-base';
import styles from './ValueCard.styles';

const ValueCard = ({ value, label, icon, style, renderAsText }) => (
  <View style={[styles.container, style]}>
    <View style={styles.titleContainer}>
      <Text style={[styles.title, styles.label]}>{label}</Text>
      <Icon name={icon} style={styles.title} />
    </View>
    <Left>
      {renderAsText
        ? <Text>{value}</Text>
        : <H1>{value}</H1>
      }
    </Left>
  </View>
);

export default ValueCard;
