import './style.scss';
import React, {memo} from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';

function CircularLoader({loading}) {
  if (!loading) {
    return null;
  }
  return (
    <Fade
      in={loading}
    >
      <CircularProgress
        className="circular-loader"
      />
    </Fade>
  );
}

CircularLoader.propTypes = {
  loading: PropTypes.bool,
}

CircularLoader.defaultProps = {
  loading: false,
}

export default memo(CircularLoader);
