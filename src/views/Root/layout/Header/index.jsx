import './style.scss';
import React, {memo} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Logo from '../../../../resources/svg/logo.svg';

function Header() {
  return (
    <AppBar className="app-header" position="fixed">
      <Toolbar>
        <img className="header-logo" src={Logo} alt="GIF" width="120px" />
      </Toolbar>
    </AppBar>
  )
}

export default memo(Header);