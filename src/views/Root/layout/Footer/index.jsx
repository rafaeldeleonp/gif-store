import React, {memo} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './style.scss';

function Footer() {
  return (
    <div className="app-footer">
      <Paper className="footer-container">
        <Grid className="footer-grid" container={true} direction="row" alignItems="center" justify="center">
          <Typography className="copyright" variant="body1">
            &copy; 2019 Rafael De Leon.
          </Typography>
        </Grid>
      </Paper>
    </div>
  );
}

export default memo(Footer);
