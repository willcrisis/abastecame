import React from 'react';
import { Picker } from '../../../common';
import firebase from '../../../firebase';
import I18n from '../../../i18n';

const currentLangage = I18n.getCurrentLanguage();

const FuelPicker = ({ data, ...props }) => {
  let fuels = firebase.fuels();
  if (data) {
    fuels = fuels.filter(fuel => data.includes(fuel.key))
  }

  return (
    <Picker
      {...props}
      data={fuels.map(fuel => ({
        ...fuel,
        label: fuel.translations[currentLangage] || fuel.translations.en
      }))}
    />
  );
};

export default FuelPicker;
