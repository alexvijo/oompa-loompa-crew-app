import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { reduxReducers } from './reducers/index';
import { reduxMiddleware } from './utilities/middleware';
import lscache from './utilities/lscache';

import Base from './components/base/index';
import MainPage from './pages/main-page/index';
import DetailPage from './pages/detail-page/index';

// Remove expired items from localStorage
lscache.flushExpired();

// Get state from localStorage
const storagedState = (() => {
  try {
    const serializedState = localStorage.getItem('lscache-state');
    if (serializedState === null) {
      return undefined;
    }
    const jsonState = JSON.parse(serializedState);
    jsonState.rootReducer.searchTerm = ''; // Reset the input search term.
    return jsonState;
  } catch (err) {
    return undefined;
  }
})();

storagedState !== undefined
  ? console.log('oompaLoopas in persistedState', storagedState.rootReducer.oompaLoompas.length)
  : console.log('no oompaLoompas stored yet!');

// Override initial state if 'persistedState' exists
const store = reduxMiddleware.createStore(reduxReducers, storagedState);

// Save data to localStorage each time store changes (1 day expiration)
store.subscribe(() => {
  lscache.set('state', store.getState(), 60 * 24);
});


if ( process.env.NODE_ENV !== 'production' ) {
  window.React = React;
}

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ reduxMiddleware.history }>
      <Route exact path="/" component={ Base }>
        <IndexRoute component={ MainPage } />
        <Route path='/:id' component={ DetailPage } />
        <Route path="*" component={ MainPage } />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);