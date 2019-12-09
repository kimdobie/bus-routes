import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import SelectRoute from './SelectRoute';
import SelectDirection from './SelectDirection';
import ListStops from './ListStops';

class App extends React.Component {
  constructor(props) {
    super(props);
    const { route, direction } = this.props;
    this.state = {
      route,
      direction
    };
    this.setRoute = this.setRoute.bind(this);
    this.setDirection = this.setDirection.bind(this);
    this.setHistory = this.setHistory.bind(this);
  }

  setRoute(route) {
    this.setState({ route, direction: '' }, () => this.setHistory());
  }

  setDirection(direction) {
    this.setState({ direction }, () => this.setHistory());
  }

  setHistory() {
    const { route, direction } = this.state;
    const { history } = this.props;
    if (route === '') {
      return history.push(`/`);
    }
    if (direction === '') {
      return history.push(`/route/${route}`);
    }
    return history.push(`/route/${route}/direction/${direction}`);
  }

  render() {
    const { route, direction } = this.state;
    return (
      <div>
        <SelectRoute route={route} setRoute={this.setRoute} />
        {route !== '' && (
          <SelectDirection
            direction={direction}
            setDirection={this.setDirection}
            route={route}
            key={`dir-${route}`}
          />
        )}
        {route !== '' && direction !== '' && (
          <ListStops
            direction={direction}
            route={route}
            key={`stop-${route}-${direction}`}
          />
        )}
      </div>
    );
  }
}

// export default App;
export default withRouter(App);

App.propTypes = {
  route: PropTypes.string,
  direction: PropTypes.string,
  history: PropTypes.shape.isRequired
};
App.defaultProps = {
  route: '',
  direction: ''
};
