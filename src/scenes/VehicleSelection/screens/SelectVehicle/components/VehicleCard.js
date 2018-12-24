import React, { Component } from 'react';
import { Image } from 'react-native';
import {
  Text,
  Body,
  Card,
  CardItem,
} from 'native-base';
import ImagePlaceholder from './ImagePlaceholder';
import styles from './VehicleCard.styles';

const VehicleCard = ({
  vehicle: {
    name,
    manufacturer,
    model,
    imageUrl,
  },
  onPress
}) => (
  <Card>
    <CardItem button onPress={onPress} cardBody style={styles.cardImage}>
      {imageUrl
        ? <Image source={{ uri: imageUrl }} style={styles.image} />
        : <ImagePlaceholder />
      }

    </CardItem>
    <CardItem button onPress={onPress}>
      <Body>
        <Text>
          {name}
        </Text>
        <Text note>
          {manufacturer} {model}
        </Text>
      </Body>
    </CardItem>
  </Card>
);

export default VehicleCard;
