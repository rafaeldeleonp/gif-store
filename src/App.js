import React, {Suspense, memo} from 'react';
import {Router, Route} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import CircularLoader from './components/CircularProgress';
import Root from './views/Root';

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Suspense fallback={<CircularLoader />}>
        <Route render={({history, location, match}) => (
          <Root history={history} location={location} match={match} />
        )} />
      </Suspense>
    </Router>
  );
}

export default memo(App);
