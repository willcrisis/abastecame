import React from 'react';
import VehicleCard from './VehicleCard';

import renderer from 'react-test-renderer';

const vehicle = {
  id: 'vehicle-id',
  name: 'Vehicle Name',
  manufacturer: 'Manufacturer',
  model: 'Vehicle Model'
};

it('renders without crashing', () => {
  const rendered = renderer.create(<VehicleCard vehicle={vehicle} />).toJSON();
  expect(rendered).toBeTruthy();
});
