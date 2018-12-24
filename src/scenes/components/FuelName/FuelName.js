import React from 'react';
import { Text } from 'native-base';
import firebase from '../../../firebase';
import I18n from '../../../i18n';

const currentLangage = I18n.getCurrentLanguage();

const FuelName = ({ fuel, ...rest }) => {
  const fuels = firebase.fuels();
  const currFuel = fuels.find(({ key }) => key === fuel);
  return (
    <Text {...rest}>
      {currFuel.translations[currentLangage] || currFuel.translations.en}
    </Text>
  )
};

export default FuelName;
