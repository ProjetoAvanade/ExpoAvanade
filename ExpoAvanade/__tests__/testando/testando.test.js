import React from 'react';
import renderer from 'react-test-renderer';

import Testando from '../../src/screens/testando';

it('renders correctly', () => {
  const tree = renderer.create(<Testando />).toJSON();
  expect(tree).toMatchSnapshot();
});