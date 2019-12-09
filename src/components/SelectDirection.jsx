import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

const axios = require('axios');

class SelectDirection extends React.Component {
  constructor(props) {
    super(props);
    const { direction, route } = this.props;
    this.state = {
      direction, // id of a route
      directions: [], // array of route objects
      route
    };
    this.getDirections = this.getDirections.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getDirections();
  }

  getDirections() {
    const { route } = this.state;
    if (route === '') {
      this.setState({ directions: [] });
      return;
    }
    axios
      .get(`/api/Directions/${route}`)
      .then(directions => {
        this.setState({ directions: directions.data });
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log('There was an issue getting directions:', error);
      });
  }

  setOptions() {
    const { directions } = this.state;
    return directions.map(directionObj => {
      return (
        <option value={directionObj.Value} key={directionObj.Value}>
          {directionObj.Text}
        </option>
      );
    });
  }

  handleChange(event) {
    const { setDirection } = this.props;
    const newDirection = event.target.value;
    this.setState({ direction: newDirection });
    setDirection(newDirection);
  }

  render() {
    const { direction } = this.state;
    return (
      <Form>
        <Form.Group controlId='formDirection'>
          <Form.Label>Direction:</Form.Label>
          <Form.Control
            as='select'
            value={direction}
            onChange={this.handleChange}
          >
            <option value=''>Select a direction</option>
            {this.setOptions()}
          </Form.Control>
        </Form.Group>
      </Form>
    );
  }
}
export default SelectDirection;

SelectDirection.propTypes = {
  direction: PropTypes.string,
  route: PropTypes.string,
  setDirection: PropTypes.func
};
SelectDirection.defaultProps = {
  direction: '',
  route: '',
  setDirection: () => {}
};
