import './style.scss';
import React, {memo} from 'react';
import AppBar from '@material-ui/core/AppBar';
import gifSVG from '../../../../resources/svg/gif.svg'; 

function Home() {
  return (
    <AppBar className="app-header" position="fixed">
      <img className="header-logo" src={gifSVG} alt="GIF" width="60px"/>
    </AppBar>
  )
}

export default memo(Home);