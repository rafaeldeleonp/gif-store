import './style.scss';
import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {DebounceInput} from 'react-debounce-input';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import SearchSVG from '../../resources/svg/search.svg';

function SearchInput(props) {
  return (
    <Grid className="search-wrapper" item xs={12} sm={10} lg={6}>
      <img className="search-icon" src={SearchSVG} alt="Search" width="18px" />
      <DebounceInput
        type="text"
        className="search-input"
        placeholder={props.placeholder}
        minLength={props.minLength}
        debounceTimeout={props.timeout}
        value={props.value}
        element={InputBase}
        onChange={props.onChange}
      />
    </Grid>
  )
}

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  minLength: PropTypes.number,
  timeout: PropTypes.number,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

SearchInput.defaultProps = {
  placeholder: 'Search...',
  minLength: 3,
  timeout: 500,
}

export default memo(SearchInput);