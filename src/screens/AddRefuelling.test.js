import React from 'react';
import AddRefuelling from './AddRefuelling';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<AddRefuelling />).toJSON();
  expect(rendered).toBeTruthy();
});
