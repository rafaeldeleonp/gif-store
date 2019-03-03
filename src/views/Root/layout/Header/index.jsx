import './style.scss';
import React, {memo} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import gifSVG from '../../../../resources/svg/gif.svg';

function Header() {
  return (
    <AppBar className="app-header" position="fixed">
      <Toolbar>
        <img className="header-logo" src={gifSVG} alt="GIF" width="60px" />
      </Toolbar>
    </AppBar>
  )
}

export default memo(Header);