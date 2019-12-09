const axios = require('axios');
const fs = require('fs');
const path = require('path');
const MetroTransit = require('../../../server/service/MetroTransit');

describe('MetroTransit Service tests', () => {
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

  const metroTransit = new MetroTransit(false);
  const metroTransitMock = new MetroTransit(true);
  beforeEach(() => {
    axios.setError('');
  });
  /* ************ Routes ***************** */
  test('Routes', done => {
    metroTransit.routes(response => {
      expect(response).toEqual(JSON.parse(routes));
      expect(metroTransit.mock).toEqual(false);
      done();
    });
  });
  test('Routes - mocking', done => {
    metroTransitMock.routes(response => {
      expect(response).toEqual(JSON.parse(routes));
      expect(metroTransitMock.mock).toEqual(true);
      done();
    });
  });
  test('Routes error', done => {
    axios.setError('Error');
    metroTransit.routes(response => {
      expect(response).toBeInstanceOf(Error);
      done();
    });
  });
  /* ************ DIRECTIONS ***************** */
  test('Directions', done => {
    metroTransit.directions('1', response => {
      expect(response).toEqual(JSON.parse(directions));
      done();
    });
  });
  test('Directions - mocking', done => {
    metroTransitMock.directions('1', response => {
      expect(response).toEqual(JSON.parse(directions));
      done();
    });
  });
  test('Directions - empty route', done => {
    metroTransit.directions('', response => {
      expect(response).toEqual([]);
      done();
    });
  });
  test('Directions error', done => {
    axios.setError('Error');
    metroTransit.directions('1', response => {
      expect(response).toBeInstanceOf(Error);
      done();
    });
  });

  /* ************ Stops ***************** */
  test('Stops', done => {
    metroTransit.stops('1', '1', response => {
      expect(response).toEqual(JSON.parse(stops));
      done();
    });
  });
  test('Stops - mocking', done => {
    metroTransitMock.stops('1', '1', response => {
      expect(response).toEqual(JSON.parse(stops));
      done();
    });
  });
  test('Stops - empty stop', done => {
    metroTransit.stops('1', '', response => {
      expect(response).toEqual([]);
      done();
    });
  });
  test('Stops error', done => {
    axios.setError('Error');
    metroTransit.stops('1', '1', response => {
      expect(response).toBeInstanceOf(Error);
      done();
    });
  });
});
