// To see all Material UI Button props, go to https://material-ui.com/api/button/.
// Material UI Button demo https://material-ui.com/api/button/.

import './style.scss';
import React, {memo} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import classnames from 'classnames';

const PRIMARY = 'primary';
const SECONDARY = 'secondary';
const DEFAULT = 'default';
const CONTAINED = 'contained';
const MEDIUM = 'medium';

function OwnButton(props) {
  let cls = null;

  if (props.color === DEFAULT) {
    cls = SECONDARY;
  } else {
    cls = props.color;
  }

  return (
    <Button
      className={classnames('btn', `btn-${cls}`, props.className, {'is-disabled': props.disabled})}
      type={props.type}
      color={props.color}
      variant={props.variant}
      size={props.size}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
}

OwnButton.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'secondary', 'default', 'inherit']),
  variant: PropTypes.oneOf(['contained', 'text', 'flat', 'outlined', 'raised', 'fab', 'extendedFab']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  onClick: PropTypes.func,
}

OwnButton.defaultProps = {
  className: '',
  type: '',
  color: PRIMARY,
  variant: CONTAINED,
  size: MEDIUM,
  disabled: false,
}

export default memo(OwnButton);
