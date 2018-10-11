import React from 'react';
import RefuellingList from './RefuellingList';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<RefuellingList />).toJSON();
  expect(rendered).toBeTruthy();
});
