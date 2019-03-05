import './style.scss';
import React, {memo} from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function Thumbnail(props) {
  return (
    <Grid className="thumbnail" item xs={12} onClick={props.onClick}>
      <Paper className="thumbnail-paper" elevation={4}>
        <img className="thumbnail-img" src={props.url} alt="GIF" />
        <Grid className="thumbnail-info" container direction="row">
          <Grid item xs={12}>
            <Typography className="thumbnail-title" variant="subtitle2">
              {props.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className="thumbnail-username" variant="body2">
              {props.username}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className="thumbnail-date" variant="caption">
              {props.date}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

Thumbnail.propTypes = {
  style: PropTypes.object.isRequired,
  title: PropTypes.string,
  username: PropTypes.string,
  date: PropTypes.string,
  url: PropTypes.string,
}

export default memo(Thumbnail);