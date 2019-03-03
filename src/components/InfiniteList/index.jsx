import './style.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {InfiniteLoader, List} from 'react-virtualized';

class InfiniteList extends React.Component {
  render() {
    const props = this.props;

    debugger;

    return (
      <InfiniteLoader
        isRowLoaded={props.isRowLoaded}
        loadMoreRows={props.loadMoreRows}
        rowCount={props.rowCount}
      >
        {({onRowsRendered, registerChild}) => {
          return (
            <List
              className="infinite-list"
              ref={registerChild}
              width={1500}
              height={props.rowHeight * props.rowCount}
              rowHeight={props.rowHeight}
              rowCount={props.rowCount}
              rowRenderer={props.rowRenderer}
              onRowsRenderd={onRowsRendered}
            />
          )
        }}
      </InfiniteLoader >
    )
  }
}

InfiniteList.propTypes = {
  rowHeight: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
  rowRenderer: PropTypes.func.isRequired,
  loadMoreRows: PropTypes.func.isRequired,
}

export default InfiniteList;