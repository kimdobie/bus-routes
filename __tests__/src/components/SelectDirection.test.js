import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SelectDirection from '../../../src/components/SelectDirection';

const fs = require('fs');
const path = require('path');
const axios = require('axios');

const { axe, toHaveNoViolations } = require('jest-axe');

expect.extend(toHaveNoViolations);

configure({ adapter: new Adapter() });

jest.mock('axios');

describe('Select Direction tests', () => {
  const routes = fs.readFileSync(
    path.join(__dirname, '../../../__fixtures__/routes.json')
  );
  const directions = fs.readFileSync(
    path.join(__dirname, '../../../__fixtures__/directions.json')
  );
  const stops = fs.readFileSync(
    path.join(__dirname, '../../../__fixtures__/stops.json')
  );
  axios.setRoutes(JSON.parse(routes));
  axios.setDirections(JSON.parse(directions));
  axios.setStops(JSON.parse(stops));

  test('Snapshot test without params', async () => {
    // eslint-disable-next-line react/jsx-filename-extension
    const selectDirection = await shallow(<SelectDirection />);
    expect(selectDirection.find('option')).toHaveLength(1);
    expect(selectDirection).toMatchSnapshot();
  });
  test('Snapshot test with params', async () => {
    const selectDirection = await shallow(
      <SelectDirection route='123' direction='456' />
    );
    expect(selectDirection.find('option')).toHaveLength(
      JSON.parse(directions).length + 1
    );
    expect(selectDirection).toMatchSnapshot();
  });
  test('Accessibility check', async () => {
    const wrapper = await mount(
      <SelectDirection route='123' direction='456' />
    );
    const results = await axe(wrapper.getDOMNode());
    // console.log('Axe violations', results.violations);
    expect(results).toHaveNoViolations();
  });

  test('Select direction', async () => {
    const selectDirection = await shallow(<SelectDirection route='123' />);
    expect(selectDirection.state().direction).toEqual('');
    expect(selectDirection.find('FormControl').prop('value')).toEqual('');
    const mockEvent = {
      target: {
        value: '789'
      }
    };
    selectDirection.instance().handleChange(mockEvent);
    expect(selectDirection.state().direction).toEqual('789');
    expect(selectDirection.find('FormControl').prop('value')).toEqual('789');
  });

  test('Change direction to ""', async () => {
    const selectDirection = await shallow(
      <SelectDirection route='123' direction='789' />
    );
    expect(selectDirection.state().direction).toEqual('789');
    expect(selectDirection.state().directions).toHaveLength(
      JSON.parse(directions).length
    );
    expect(selectDirection.find('FormControl').prop('value')).toEqual('789');

    const mockEvent = {
      target: {
        value: ''
      }
    };
    selectDirection.instance().handleChange(mockEvent);
    expect(selectDirection.state().direction).toEqual('');
    expect(selectDirection.find('FormControl').prop('value')).toEqual('');
  });
  test('Direction set but route missing from props', async () => {
    const selectDirection = await shallow(<SelectDirection direction='456' />);
    expect(selectDirection.state().directions).toEqual([]);
  });
});
