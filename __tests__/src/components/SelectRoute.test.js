import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SelectRoute from '../../../src/components/SelectRoute';

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
    const selectRoute = await shallow(<SelectRoute />);
    expect(selectRoute).toMatchSnapshot();
    expect(selectRoute.find('option')).toHaveLength(
      JSON.parse(routes).length + 1
    );
  });
  test('Snapshot test with params', async () => {
    const selectRoute = await shallow(<SelectRoute route='123' />);
    expect(selectRoute).toMatchSnapshot();
    expect(selectRoute.find('option')).toHaveLength(
      JSON.parse(routes).length + 1
    );
  });
  test('Accessibility check', async () => {
    const wrapper = await mount(<SelectRoute route='123' />);
    const results = await axe(wrapper.getDOMNode());
    // console.log('Axe violations', results.violations);
    expect(results).toHaveNoViolations();
  });

  test('Select route', async () => {
    const selectRoute = await shallow(<SelectRoute route='123' />);
    expect(selectRoute.state().route).toEqual('123');

    const mockEvent = {
      target: {
        value: '789'
      }
    };
    expect(selectRoute.find('FormControl').prop('value')).toEqual('123');
    selectRoute.instance().handleChange(mockEvent);
    expect(selectRoute.state().route).toEqual('789');
    expect(selectRoute.find('FormControl').prop('value')).toEqual('789');
  });

  test('Change route to ""', async () => {
    const selectRoute = await shallow(<SelectRoute route='123' />);
    expect(selectRoute.state().route).toEqual('123');
    expect(selectRoute.state().routes).toHaveLength(JSON.parse(routes).length);
    expect(selectRoute.find('FormControl').prop('value')).toEqual('123');

    const mockEvent = {
      target: {
        value: ''
      }
    };
    selectRoute.instance().handleChange(mockEvent);
    expect(selectRoute.state().route).toEqual('');
    expect(selectRoute.find('FormControl').prop('value')).toEqual('');
  });
});
