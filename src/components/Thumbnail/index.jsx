import './style.scss';
import React, {memo} from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function Thumbnail(props) {
  return (
    <Grid className="thumbnail" item xs={12} md={6} lg={4} style={props.style} onClick={props.onClick}>
      <Card className="thumbnail-card">
        <img className="thumbnail-img" src={props.url} alt="GIF" />
        <Grid className="thumbnail-info" container direction="row">
          <Grid item xs={12}>
            <Typography className="thumbnail-title" variant="h6">
              {props.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className="thumbnail-username" variant="subtitle1">
              {props.username}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className="thumbnail-date" variant="subtitle1">
              {props.date}
            </Typography>
          </Grid>
        </Grid>
      </Card>
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