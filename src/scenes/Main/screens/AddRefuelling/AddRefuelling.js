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
      fuel: '',
      date: new Date(),
      fullTank: true,
      odometer: '',
      price: '',
      liters: '',
      total: '',
      notes: '',
    },
    isSaving: false,
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

  save = () => {
    this.setState({ isSaving: true }, async () => {
      const { refuelling } = this.state;
      if (!this.validateRefuelling(refuelling)) {
        this.setState({ isSaving: false });
        return;
      };
      const saveRefuelling = this.props.navigation.getParam('saveRefuelling');
      await saveRefuelling(this.processRefuelling(refuelling), () => {
        this.setState({ isSaving: false });
      });
    });
  };

  setRef = (refName, ref) => {
    this[refName] = ref;
  }

  render() {
    const { refuelling, isSaving } = this.state;
    const { navigation: { getParam } } = this.props;

    return (
      <AddRefuellingForm
        {...this.props}
        fuels={getParam('fuels')}
        updateField={this.updateField}
        refuelling={refuelling}
        save={this.save}
        setRef={this.setRef}
        isSaving={isSaving}
      />
    )
  }
}
