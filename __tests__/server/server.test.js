const request = require('supertest');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const app = require('../../server/server');

describe('API endpoints for server', () => {
  const routes = fs.readFileSync(
    path.join(__dirname, '../../__fixtures__/routes.json')
  );
  const directions = fs.readFileSync(
    path.join(__dirname, '../../__fixtures__/directions.json')
  );
  const stops = fs.readFileSync(
    path.join(__dirname, '../../__fixtures__/stops.json')
  );
  axios.setRoutes(JSON.parse(routes));
  axios.setDirections(JSON.parse(directions));
  axios.setStops(JSON.parse(stops));

  beforeEach(() => {
    axios.setError('');
  });

  afterAll(() => {
    app.close();
  });

  /* *************** Test api *************** */
  test('Test api endpont', done => {
    request(app)
      .get('/api')
      .then(response => {
        expect(response.body).toEqual({
          message: 'hello api'
        });
        done();
      });
  });
  /* *************** Routes *************** */
  test('Routes api endpoint', done => {
    request(app)
      .get('/api/Routes')
      .then(response => {
        expect(response.body).toEqual(JSON.parse(routes));
        done();
      });
  });
  /* *************** Directions *************** */
  test('Directions api endpoint', done => {
    request(app)
      .get('/api/Directions/1')
      .then(response => {
        expect(response.body).toEqual(JSON.parse(directions));
        done();
      });
  });

  /* *************** Stops *************** */
  test('Stops api endpoint', done => {
    request(app)
      .get('/api/Stops/1/1')
      .then(response => {
        expect(response.body).toEqual(JSON.parse(stops));
        done();
      });
  });
  /* *************** Version *************** */
  test('Version api endpoint', done => {
    const packageFile = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../../package.json'))
    );

    request(app)
      .get('/version')
      .then(response => {
        expect(response.body.version).toEqual(packageFile.version);
        expect(response.body.name).toEqual(packageFile.name);
        expect(response.body.description).toEqual(packageFile.description);
        done();
      });
  });
  /* *************** Version *************** */
  test('homepage', done => {
    const homePage = fs.readFileSync(
      path.join(__dirname, '../../public/index.html'),
      'utf8'
    );
    request(app)
      .get('/route/123')
      .then(response => {
        expect(response.text).toEqual(homePage);
        done();
      });
  });
});
