import React from 'react';
import NewVehicle from './NewVehicle';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<NewVehicle />).toJSON();
  expect(rendered).toBeTruthy();
});
