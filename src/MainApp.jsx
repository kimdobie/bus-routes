/* eslint-disable react/prop-types */
import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './components/App';

const MainApp = () => {
  return (
    <BrowserRouter>
      <div className='app'>
        <Switch>
          <Route exact path='/' component={App} />
          <Route
            path='/route/:route/direction/:direction'
            component={props => {
              return (
                <App
                  route={props.match.params.route}
                  direction={props.match.params.direction}
                />
              );
            }}
          />
          <Route
            path='/route/:route'
            component={props => {
              return <App route={props.match.params.route} />;
            }}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default MainApp;
