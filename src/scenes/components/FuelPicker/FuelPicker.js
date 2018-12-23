import React from 'react';
import { Picker } from '../../../common';
import firebase from '../../../firebase';
import { language } from '../../../config';

const FuelPicker = (props) => {
  const fuels = firebase.fuels();

  return (
    <Picker
      {...props}
      data={fuels.map(fuel => ({
        ...fuel,
        label: fuel.translations[language] || fuel.translations.en
      }))}
    />
  );
};

export default FuelPicker;
