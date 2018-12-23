import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  Text,
} from 'native-base';
import format from '../../../../../common/dateFns/format';
import Odometer from '../../../../components/Odometer/Odometer';

import style from './RefuellingLine.style';

const RefuellingLine = ({
  refuelling,
  onPress,
}) => (
    <TouchableOpacity
      onPress={() => onPress(refuelling)}
      style={style.left}
    >
      <View>
        <View style={style.line}>
          <Odometer value={refuelling.odometer} style={style.left}></Odometer>
          <Text>{format(refuelling.date)}</Text>
        </View>
        <View style={style.line}>
          <Text style={[style.left, style.subtext]}>
            {refuelling.distancePerLiter ? `${refuelling.distancePerLiter.toFixed(2)} Km/l` : ''}
          </Text>
          <Text style={style.subtext}>
            R$ {refuelling.total.toFixed(2)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

export default RefuellingLine;
