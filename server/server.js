const express = require('express');
const path = require('path');
const fs = require('fs');
const os = require('os');

const MetroTransit = require('./service/MetroTransit');

const app = express();
const port = 8080;

const metroTransit = new MetroTransit();

app.get('/api', (req, res) => {
  res.json({ message: 'hello api' }).end();
});
app.get('/api/Routes', (req, res) => {
  metroTransit.routes(routes => {
    res.json(routes);
  });
});
app.get('/api/Directions/:route', (req, res) => {
  metroTransit.directions(req.params.route, directions => {
    res.json(directions);
  });
});
app.get('/api/Stops/:route/:direction', (req, res) => {
  metroTransit.stops(req.params.route, req.params.direction, stops => {
    res.json(stops);
  });
});
app.get('/version', (req, res) => {
  let packageJSON = fs.readFileSync(path.join(__dirname, '../package.json'));
  packageJSON = JSON.parse(packageJSON);
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const node = {
    name: packageJSON.name,
    version: packageJSON.version,
    description: packageJSON.description,
    node: process.version,
    hostname: os.hostname(),
    ip
  };
  res.json(node).end();
});
app.get('/route/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
app.use(express.static('public'));

if (process.env.NODE_ENV !== 'test') {
  // eslint-disable-next-line no-console
  app.listen(port, () => console.log(`App listening on port ${port}!`));
}

module.exports = app;
