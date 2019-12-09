import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../../../src/components/App';

const axios = require('axios');

const fs = require('fs');
const path = require('path');

configure({ adapter: new Adapter() });

describe('App tests', () => {
  let historyMock = '';
  beforeEach(() => {
    historyMock = { push: jest.fn() };
  });

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

  test('Snapshot without routes or directions', async () => {
    // eslint-disable-next-line react/jsx-filename-extension
    const app = await shallow(<App.WrappedComponent history={historyMock} />);
    expect(app).toMatchSnapshot();
  });
  test('Snapshot with routes', async () => {
    // TODO: This test produces an incorrect snapshot without SelectDirection
    const app = await shallow(
      <App.WrappedComponent history={historyMock} routes='123' />
    );
    expect(app).toMatchSnapshot();
  });
  test('Snapshot with routes and direction', async () => {
    // TODO: This test produces an incorrect snapshot without SelectDirection nor ListStops
    const app = await shallow(
      <App.WrappedComponent
        history={historyMock}
        routes='123'
        direction='456'
      />
    );
    expect(app).toMatchSnapshot();
  });

  test('Set route via props', async () => {
    const app = await shallow(
      <App.WrappedComponent history={historyMock} route='123' />
    );

    expect(app.state().route).toEqual('123');
    expect(app.state().direction).toEqual('');
    expect(app.find('SelectRoute')).toHaveLength(1);
    expect(app.find('SelectDirection')).toHaveLength(1);
    expect(app.find('ListStops')).toHaveLength(0);
  });

  test('Set direction and route via props', async () => {
    const app = await shallow(
      <App.WrappedComponent history={historyMock} route='123' direction='456' />
    );

    expect(app.state().route).toEqual('123');
    expect(app.state().direction).toEqual('456');
    expect(app.find('SelectRoute')).toHaveLength(1);
    expect(app.find('SelectDirection')).toHaveLength(1);
    expect(app.find('ListStops')).toHaveLength(1);
  });

  test('Set only directions via props', async () => {
    const app = await shallow(
      <App.WrappedComponent history={historyMock} direction='456' />
    );

    expect(app.state().route).toEqual('');
    expect(app.state().direction).toEqual('456');
    expect(app.find('SelectRoute')).toHaveLength(1);
    expect(app.find('SelectDirection')).toHaveLength(0);
    expect(app.find('ListStops')).toHaveLength(0);
  });

  test('Set route', async () => {
    const app = await shallow(<App.WrappedComponent history={historyMock} />);

    expect(app.state().route).toEqual('');
    expect(app.state().direction).toEqual('');
    expect(app.find('SelectRoute')).toHaveLength(1);
    expect(app.find('SelectDirection')).toHaveLength(0);
    expect(app.find('ListStops')).toHaveLength(0);

    app.instance().setRoute('123');
    expect(app.state().route).toEqual('123');
    expect(app.state().direction).toEqual('');
    expect(app.find('SelectRoute')).toHaveLength(1);
    expect(app.find('SelectDirection')).toHaveLength(1);
    expect(app.find('ListStops')).toHaveLength(0);
    expect(historyMock.push.mock.calls[0][0]).toEqual('/route/123');
  });

  test('Set directions', async () => {
    const app = await shallow(
      <App.WrappedComponent history={historyMock} route='123' />
    );

    expect(app.state().route).toEqual('123');
    expect(app.state().direction).toEqual('');
    expect(app.find('SelectRoute')).toHaveLength(1);
    expect(app.find('SelectDirection')).toHaveLength(1);
    expect(app.find('ListStops')).toHaveLength(0);

    app.instance().setDirection('456');
    expect(app.state().route).toEqual('123');
    expect(app.state().direction).toEqual('456');
    expect(app.find('SelectRoute')).toHaveLength(1);
    expect(app.find('SelectDirection')).toHaveLength(1);
    expect(app.find('ListStops')).toHaveLength(1);
    expect(historyMock.push.mock.calls[0][0]).toEqual(
      '/route/123/direction/456'
    );
  });

  test('Reset directions to ""', async () => {
    const app = await shallow(
      <App.WrappedComponent history={historyMock} route='123' direction='456' />
    );

    expect(app.state().route).toEqual('123');
    expect(app.state().direction).toEqual('456');

    app.instance().setDirection('');

    expect(app.state().route).toEqual('123');
    expect(app.state().direction).toEqual('');
    expect(app.find('SelectRoute')).toHaveLength(1);
    expect(app.find('SelectDirection')).toHaveLength(1);
    expect(app.find('ListStops')).toHaveLength(0);
    expect(historyMock.push.mock.calls[0][0]).toEqual('/route/123');
  });

  test('Reset route to ""', async () => {
    const app = await shallow(
      <App.WrappedComponent history={historyMock} route='123' direction='456' />
    );

    expect(app.state().route).toEqual('123');
    expect(app.state().direction).toEqual('456');

    app.instance().setRoute('');

    expect(app.state().route).toEqual('');
    expect(app.state().direction).toEqual('');
    expect(app.find('SelectRoute')).toHaveLength(1);
    expect(app.find('SelectDirection')).toHaveLength(0);
    expect(app.find('ListStops')).toHaveLength(0);
    expect(historyMock.push.mock.calls[0][0]).toEqual('/');
  });
});
