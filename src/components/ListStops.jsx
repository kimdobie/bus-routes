import React from 'react';
import PropTypes from 'prop-types';

const axios = require('axios');
// import Form from 'react-bootstrap/Form';

class ListStops extends React.Component {
  constructor(props) {
    super(props);
    // const { route } = this.props;
    this.state = {
      stops: [] // array of route objects
    };
    this.setListItems = this.setListItems.bind(this);
    this.getStops = this.getStops.bind(this);
    this.getStops();
  }

  getStops() {
    const { route, direction } = this.props;
    if (route === '' || direction === '') {
      this.setState({ stops: [] });
      return;
    }
    axios
      .get(`/api/Stops/${route}/${direction}`)
      .then(routes => {
        this.setState({ stops: routes.data });
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log('There was an issue getting stops: ', error);
      });
  }

  setListItems() {
    const { stops } = this.state;
    return stops.map(stopObj => {
      return <li key={stopObj.Value}>{stopObj.Text}</li>;
    });
  }

  render() {
    // const { stops } = this.state;
    return (
      <div>
        <h2>Stop:</h2>
        <ul>{this.setListItems()}</ul>
      </div>
    );
  }
}
export default ListStops;

ListStops.propTypes = {
  route: PropTypes.string,
  direction: PropTypes.string
};
ListStops.defaultProps = {
  route: '',
  direction: ''
};
