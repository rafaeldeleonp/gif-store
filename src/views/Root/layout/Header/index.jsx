import './style.scss';
import React, {memo} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import gifSVG from '../../../../resources/svg/gif.svg';
import SearchSVG from '../../../../resources/svg/search.svg';

function Home() {
  return (
    <AppBar className="app-header" position="fixed">
      <Toolbar>
        <img className="header-logo" src={gifSVG} alt="GIF" width="60px" />
        <div className="search-wrapper">
          <img className="search-icon" src={SearchSVG} alt="Search" width="18px" />
          <InputBase
            className="search-input"
            placeholder="Search..."
          />
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default memo(Home);