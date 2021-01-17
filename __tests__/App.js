import 'react-native';
import React from 'react';
import App from '../App.tsx';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { isExportDeclaration } from 'typescript';

it('renders correctly', () => {
  renderer.create(<App />);
});

it('parsing state correctly', () => {

});
