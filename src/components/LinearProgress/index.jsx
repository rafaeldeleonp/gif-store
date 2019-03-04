import './style.scss';
import React, {memo} from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fade from '@material-ui/core/Fade';

function LinearLoader({loading}) {
  if (!loading) {
    return null;
  }
  
  return (
    <Fade
      in={loading}
    >
      <LinearProgress
        className="linear-loader"
      />
    </Fade>
  );
}

LinearLoader.propTypes = {
  loading: PropTypes.bool,
}

LinearLoader.defaultProps = {
  loading: false,
}

export default memo(LinearLoader);
