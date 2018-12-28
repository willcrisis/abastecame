import React, { Component } from 'react';
import { Toast } from 'native-base';
import NewVehicleForm from './NewVehicleForm';
import I18n from '../../../../i18n';
import required from '../../../../common/validation/required';

export const ROUTE_NAME = 'NewVehicle';

export default class NewVehicle extends Component {
  static navigationOptions = {
    title: I18n.t('screenTitles.newVehicle')
  };

  state = {
    vehicle: {
      name: '',
      manufacturer: '',
      model: '',
      fuels: [],
    },
    isSaving: false,
  };

  updateField = field => value => this.setState(({ vehicle }) => ({
    vehicle: {
      ...vehicle,
      [field]: value,
    }
  }));

  validateVehicle = vehicle => {
    const { isValid, failures } = required(vehicle, [
      'name',
      'model',
      'manufacturer',
    ]);

    if (!isValid) {
      Toast.show({
        text: I18n.t('validate.required', failures.map(field => I18n.t(`vehicle.${field}`)).join(', ')),
        duration: 5000,
      });
    }
    return isValid;
  }

  save = () => {
    this.setState({ isSaving: true }, async () => {
      const { vehicle } = this.state;
      if (!this.validateVehicle(vehicle)) {
        this.setState({ isSaving: false });
        return;
      };
      const saveVehicle = this.props.navigation.getParam('saveVehicle');
      await saveVehicle(vehicle, () => this.setState({ isSaving: false }));
    });
  };

  render() {
    const { vehicle, isSaving } = this.state;
    return (
      <NewVehicleForm
        vehicle={vehicle}
        updateField={this.updateField}
        save={this.save}
        isSaving={isSaving}
      />
    )
  }
}
