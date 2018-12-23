import React from 'react';
import { Text } from 'native-base';
import firebase from '../../../firebase';
import { language } from '../../../config';

const FuelName = ({ fuel, ...rest }) => {
  const fuels = firebase.fuels();
  const currFuel = fuels.find(({ key }) => key === fuel);
  return (
    <Text {...rest}>
      {currFuel.translations[language] || currFuel.translations.en}
    </Text>
  )
};

export default FuelName;
