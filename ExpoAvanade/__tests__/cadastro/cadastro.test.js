import React from 'react';
import renderer from 'react-test-renderer';

import Cadastro from '../../src/screens/cadastro';

it('renders correctly', () => {
  const tree = renderer.create(<Cadastro />).toJSON();
  expect(tree).toMatchSnapshot();
});