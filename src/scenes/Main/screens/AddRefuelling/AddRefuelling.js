import React, { Component } from 'react';
import { Toast } from 'native-base';
import I18n from '../../../../i18n';
import AddRefuellingForm from './AddRefuellingForm';
import required from '../../../../common/validation/required';

export const ROUTE_NAME = 'AddRefuelling';

export default class AddRefuelling extends Component {
  static navigationOptions = {
    title: I18n.t('screenTitles.newRefuelling'),
  };

  state = {
    refuelling: {
      fuel: 'diesel',
      date: new Date(),
      fullTank: true,
      odometer: '',
      price: '',
      liters: '',
      total: '',
      notes: '',
    },
  };

  updateField = field => value => this.setState(({ refuelling }) => {
    const newRefuelling = {
      ...refuelling,
      [field]: value,
    };

    const { liters, price, total } = newRefuelling;

    let calculatedValue = {};
    if (field !== 'total' && (price && liters)) {
      calculatedValue = {
        total: price * liters,
      };
    };

    return {
      refuelling: {
        ...newRefuelling,
        ...calculatedValue,
      }
    };
  });

  validateRefuelling = refuelling => {
    const { isValid, failures } = required(refuelling, [
      'date',
      'fuel',
      'odometer',
      'price',
      'liters',
      'total',
    ]);

    if (!isValid) {
      Toast.show({
        text: I18n.t('refuelling.required', failures.map(field => I18n.t(`refuelling.${field}`)).join(', ')),
        duration: 5000,
      });
    }
    return isValid;
  }

  processRefuelling = refuelling => ({
    ...refuelling,
    odometer: this.odometerRef.getRawValue(),
    price: this.priceRef.getRawValue(),
    liters: this.litersRef.getRawValue(),
    total: this.totalRef.getRawValue(),
  });

  save = async () => {
    const { refuelling } = this.state;
    if (!this.validateRefuelling(refuelling)) return;
    const saveRefuelling = this.props.navigation.getParam('saveRefuelling');
    saveRefuelling(this.processRefuelling(refuelling));
  };

  setRef = (refName, ref) => {
    this[refName] = ref;
  }

  render() {
    const { refuelling } = this.state;

    return (
      <AddRefuellingForm
        {...this.props}
        updateField={this.updateField}
        refuelling={refuelling}
        save={this.save}
        setRef={this.setRef}
      />
    )
  }
}
