import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';

import store from './store';

import Home from './containers/Home';

require('./styles/main.scss');

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/" component={Home} />
            </Switch>
        </div>
      </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);