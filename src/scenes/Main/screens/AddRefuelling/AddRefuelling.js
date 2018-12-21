import React from 'react';
import { Toast } from 'native-base';
import AddRefuellingForm from './AddRefuellingForm';
import NavigateableComponent from '../../../components/NavigateableComponent';
import required from '../../../../common/validation/required';

export const ROUTE_NAME = 'AddRefuelling';

export default class AddRefuelling extends NavigateableComponent {
  static navigationOptions = {
    title: 'New Refuelling'
  };

  constructor(props) {
    super(props);

    this.state = {
      refuelling: {
        fuel: 'diesel',
        date: new Date(),
        fullTank: true,
        odometer: '',
        price: '',
        liters: '',
        total: '',
        notes: '',
      }
    };
  }

  updateField = field => value => this.setState(({ refuelling }) => ({
    refuelling: {
      ...refuelling,
      [field]: value,
    }
  }));

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
        text: `Please fill the following fields: ${failures.join(', ')}`,
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
    this.props.screenProps.saveRefuelling(this.processRefuelling(refuelling));
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
