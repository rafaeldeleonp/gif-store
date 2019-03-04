import './style.scss';
import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import classnames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '../Button';
import CloseSVG from '../../resources/svg/close.svg';


const ESCAPE = 'Escape';

function Modal(props) {
  const content = props.body ? props.body : props.children;
  const cls = classnames('modal-dialog', {
    'back-drop': props.show,
  });

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
  })

  const removeListener = () => {
    window.removeEventListener('keyup', handleKeyUp);
  }

  const handleKeyUp = (e) => {
    const {onClose} = props;

    if (e.code === ESCAPE || e.keyCode === 27) {
      e.preventDefault();
      onClose();
      removeListener();
    }
  }

  return (
    <Grid
      className={cls}
      container
      style={{
        transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
      }}
    >
      <Grid className="modal-content">
        <Grid className="modal-header" container alignItems="center">
          <Grid item xs={11}>
            <Typography className="modal-title" variant="h6">
              {props.title}
            </Typography>
          </Grid>
          <Button className="close-btn" onClick={props.onClose}>
            <SVG src={CloseSVG} />
          </Button>
        </Grid>

        <Grid className="modal-body" container>
          {props.show && content}
        </Grid>

        <Grid className="modal-footer" container justify="center" alignItems="center">
          {props.footer}
        </Grid>
      </Grid>
    </Grid>
  )
}

Modal.propTypes = {
  show: PropTypes.bool,
  title: PropTypes.string.isRequired,
  body: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  footer: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  onClose: PropTypes.func.isRequired,
}

Modal.defaultProps = {
  show: false,
}

export default memo(Modal);