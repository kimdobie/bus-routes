import React from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';

const axios = require('axios');

class SelectRoute extends React.Component {
  constructor(props) {
    super(props);
    const { route } = this.props;
    this.state = {
      route, // id of a route
      routes: [] // array of route objects
    };
    this.getRoutes = this.getRoutes.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getRoutes();
  }

  componentDidMount() {}

  getRoutes() {
    axios
      .get('/api/Routes')
      .then(routes => {
        this.setState({ routes: routes.data });
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log('There was an issue getting all routes: ', error);
      });
  }

  setOptions() {
    const { routes } = this.state;
    return routes.map(routeObj => {
      return (
        <option value={routeObj.Route} key={routeObj.Route}>
          {routeObj.Route}
          {' - '}
          {routeObj.Description}
        </option>
      );
    });
  }

  handleChange(event) {
    const { setRoute, setDirection } = this.props;
    const newRoute = event.target.value;
    this.setState({ route: newRoute });
    setRoute(newRoute);
    setDirection('');
  }

  render() {
    const { route } = this.state;
    return (
      <Form>
        <Form.Group controlId='formRoute'>
          <Form.Label>Route:</Form.Label>
          <Form.Control as='select' value={route} onChange={this.handleChange}>
            <option value=''>Select a route</option>
            {this.setOptions()}
          </Form.Control>
        </Form.Group>
      </Form>
    );
  }
}
export default SelectRoute;

SelectRoute.propTypes = {
  route: PropTypes.string,
  setRoute: PropTypes.func,
  setDirection: PropTypes.func
};
SelectRoute.defaultProps = {
  route: -1,
  setRoute: () => {},
  setDirection: () => {}
};
