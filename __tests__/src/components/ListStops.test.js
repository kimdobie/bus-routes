import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ListStops from '../../../src/components/ListStops';

const fs = require('fs');
const path = require('path');
const axios = require('axios');

configure({ adapter: new Adapter() });

jest.mock('axios');

describe('App tests', () => {
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

  test('Snapshot test without routes or directions', async () => {
    // eslint-disable-next-line react/jsx-filename-extension
    const listStops = await shallow(<ListStops />);
    expect(listStops.state().stops).toEqual([]);
    expect(listStops.find('li')).toHaveLength(0);
    expect(listStops).toMatchSnapshot();
  });

  test('Snapshot test with routes and directions', async () => {
    const listStops = await shallow(<ListStops route='123' direction='456' />);

    expect(listStops.state().stops).not.toEqual([]);
    const numStops = JSON.parse(stops).length;
    expect(listStops.find('li')).toHaveLength(numStops);

    expect(listStops).toMatchSnapshot();
  });
});
