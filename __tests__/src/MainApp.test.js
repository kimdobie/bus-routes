import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MainApp from '../../src/MainApp';

configure({ adapter: new Adapter() });

jest.mock('axios');

describe('Main App tests', () => {
  test('Snapshot test', async () => {
    // eslint-disable-next-line react/jsx-filename-extension
    const index = await shallow(<MainApp />);

    expect(index).toMatchSnapshot();
  });
});
// See https://medium.com/@antonybudianto/react-router-testing-with-jest-and-enzyme-17294fefd303
