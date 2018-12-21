import React from 'react';
import {
  Container,
  Content,
  Text,
  Form,
  Spinner,
  Button,
} from 'native-base';
import styles from '../../../../styles/styles';
import {
  DecimalInput,
  TextArea,
  DateInput,
  Picker,
  Switch,
} from '../../../../common';

const AddRefuellingForm = ({
  refuelling,
  updateField,
  save,
  setRef,
  fuels,
}) => (
    (
      <Container>
        <Content padder>
          <Form style={styles.form}>
            <DateInput
              value={refuelling.date}
              label="Date"
              onDateChange={updateField('date')}
            />
            <Picker
              label="Fuel"
              selectedValue={refuelling.fuel}
              onValueChange={updateField('fuel')}
              data={fuels}
            />
            <Switch
              label="Full Tank"
              value={refuelling.fullTank}
              onValueChange={() => updateField('fullTank')(!refuelling.fullTank)}
            />
            <DecimalInput
              onChangeText={updateField('odometer')}
              value={refuelling.odometer}
              label="Odometer"
              precision={0}
              delimiter=" "
              innerRef={ref => setRef('odometerRef', ref)}
            />
            <DecimalInput
              onChangeText={updateField('price')}
              value={refuelling.price}
              label="Fuel Price"
              precision={3}
              innerRef={ref => setRef('priceRef', ref)}
            />
            <DecimalInput
              onChangeText={updateField('liters')}
              value={refuelling.liters}
              label="Liters"
              innerRef={ref => setRef('litersRef', ref)}
            />
            <DecimalInput
              onChangeText={updateField('total')}
              value={refuelling.total}
              label="Total Value"
              innerRef={ref => setRef('totalRef', ref)}
            />
            <TextArea
              onChangeText={updateField('notes')}
              value={refuelling.notes}
              label="Notes"
            />
          </Form>
          <Button onPress={save} full>
            <Text>
              Save
            </Text>
          </Button>
        </Content>
      </Container>
    )
  );

export default AddRefuellingForm;
