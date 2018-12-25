import React from 'react';
import {
  Container,
  Content,
  Text,
  Form,
  Button,
} from 'native-base';
import I18n from '../../../../i18n';
import styles from '../../../../styles/styles';
import { TextInput } from '../../../../common';
import { FuelPicker } from '../../../components'

const NewVehicleForm = ({
  vehicle,
  updateField,
  save,
  isSaving
}) => (
    <Container>
      <Content padder>
        <Form style={styles.form}>
          <TextInput
            label={I18n.t('vehicle.name')}
            value={vehicle.name}
            onChangeText={updateField('name')}
          />
          <TextInput
            label={I18n.t('vehicle.manufacturer')}
            value={vehicle.manufacturer}
            onChangeText={updateField('manufacturer')}
          />
          <TextInput
            label={I18n.t('vehicle.model')}
            value={vehicle.model}
            onChangeText={updateField('model')}
          />
          <FuelPicker
            label={I18n.t('vehicle.fuels')}
            multiple
            onValueChange={updateField('fuels')}
          />
        </Form>
        <Button onPress={save} full disabled={isSaving}>
          <Text>
            {I18n.t('actions.save')}
        </Text>
        </Button>
      </Content>
    </Container>
  );

export default NewVehicleForm;
