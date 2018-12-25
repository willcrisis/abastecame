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
import {
  DecimalInput,
  TextArea,
  DateInput,
  Switch,
} from '../../../../common';
import { FuelPicker } from '../../../components';

const AddRefuellingForm = ({
  refuelling,
  fuels,
  updateField,
  save,
  setRef,
  isSaving,
}) => (
    <Container>
      <Content padder>
        <Form style={styles.form}>
          <DateInput
            value={refuelling.date}
            label={I18n.t('refuelling.date')}
            onDateChange={updateField('date')}
          />
          <FuelPicker
            label={I18n.t('refuelling.fuel')}
            selectedValue={refuelling.fuel}
            onValueChange={updateField('fuel')}
            data={fuels}
          />
          <Switch
            label={I18n.t('refuelling.fullTank')}
            value={refuelling.fullTank}
            onValueChange={() => updateField('fullTank')(!refuelling.fullTank)}
          />
          <DecimalInput
            onChangeText={updateField('odometer')}
            value={refuelling.odometer}
            label={I18n.t('refuelling.odometer')}
            precision={0}
            delimiter=" "
            innerRef={ref => setRef('odometerRef', ref)}
          />
          <DecimalInput
            onChangeText={updateField('price')}
            value={refuelling.price}
            label={I18n.t('refuelling.price')}
            precision={3}
            innerRef={ref => setRef('priceRef', ref)}
          />
          <DecimalInput
            onChangeText={updateField('liters')}
            value={refuelling.liters}
            label={I18n.t('refuelling.liters')}
            innerRef={ref => setRef('litersRef', ref)}
          />
          <DecimalInput
            onChangeText={updateField('total')}
            value={refuelling.total}
            label={I18n.t('refuelling.total')}
            innerRef={ref => setRef('totalRef', ref)}
          />
          <TextArea
            onChangeText={updateField('notes')}
            value={refuelling.notes}
            label={I18n.t('refuelling.notes')}
          />
        </Form>
        <Button onPress={save} full disabled={isSaving}>
          <Text>{I18n.t('actions.save')}</Text>
        </Button>
      </Content>
    </Container>
  );

export default AddRefuellingForm;
