import React from 'react';
import { View } from 'react-native';
import format from '../../../../../common/dateFns/format';
import {
  Text,
} from 'native-base';
import Odometer from './Odometer';

import style from './RefuellingLine.style';

const RefuellingLine = ({ refuelling: {
  odometer,
  date,
  distancePerLiter,
  total,
} }) => (
    <View style={style.container}>
      <View style={style.line}>
        <Odometer value={odometer} style={style.left}></Odometer>
        <Text>{format(date)}</Text>
      </View>
      <View style={style.line}>
        <Text style={[style.left, style.subtext]}>{distancePerLiter ? `${distancePerLiter} Km/l` : '' }</Text>
        <Text style={style.subtext}>R$ {total.toFixed(2)}</Text>
      </View>
    </View>
  );

export default RefuellingLine;
