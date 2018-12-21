import React from 'react';
import SelectVehicle from './SelectVehicle';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<SelectVehicle />).toJSON();
  expect(rendered).toBeTruthy();
});
