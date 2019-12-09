const axios = require('axios');
const fs = require('fs');
const path = require('path');

class MetroTransit {
  constructor(mock) {
    this.url = '';
    // this.mock = mock || process.env.NODE_ENV === 'development'; // Change to a different env variable
    this.mock = mock || process.env.APP_MOCK === 'true';

    if (this.mock === true) {
      // eslint-disable-next-line no-console
      console.warn('This app is currently using mocked files');
    }
  }

  routes(done) {
    if (this.mock) {
      const responseJSON = fs.readFileSync(
        path.join(__dirname, '../../__fixtures__/routes.json')
      );
      return done(JSON.parse(responseJSON));
    }
    return axios
      .get('http://svc.metrotransit.org/NexTrip/Routes?format=json')
      .then(response => {
        done(response.data);
      })
      .catch(error => {
        done(error);
        // eslint-disable-next-line no-console
        console.log('Error getting routes', error);
      });
  }

  directions(route, done) {
    if (route === undefined || route === '') return done([]);

    if (this.mock) {
      const responseJSON = fs.readFileSync(
        path.join(__dirname, '../../__fixtures__/directions.json')
      );
      return done(JSON.parse(responseJSON));
    }

    return axios
      .get(
        `https://svc.metrotransit.org/NexTrip/Directions/${route}?format=json`
      )
      .then(response => {
        done(response.data);
      })
      .catch(error => {
        done(error);
        // eslint-disable-next-line no-console
        console.log('Error getting directions', error);
      });
  }

  stops(route, direction, done) {
    if (
      route === '' ||
      route === undefined ||
      direction === '' ||
      direction === undefined
    ) {
      return done([]);
    }
    if (this.mock) {
      const responseJSON = fs.readFileSync(
        path.join(__dirname, '../../__fixtures__/stops.json')
      );
      return done(JSON.parse(responseJSON));
    }
    return axios
      .get(
        `https://svc.metrotransit.org/NexTrip/Stops/${route}/${direction}?format=json`
      )
      .then(response => {
        done(response.data);
      })
      .catch(error => {
        done(error);
        // eslint-disable-next-line no-console
        console.log('Error getting stops', error);
      });
  }
}

module.exports = MetroTransit;
