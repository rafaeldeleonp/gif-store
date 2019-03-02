import React, { lazy, memo, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import CircularLoader from '../../components/CircularProgress';
import Footer from './layout/Footer';
import Header from './layout/Header';

// tslint:disable variable-name
const Home = lazy(() => import('../Home'));

function Root(props) {
  const { match: { path } } = props;

  return (
    <div className="app">
      <Header />
      <div className="app-body">
        <Suspense fallback={<CircularLoader />}>
          <Switch>
            <Route exact path={`${path}`} component={Home} />
          </Switch>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

export default memo(Root);
