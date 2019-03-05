import './style.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {InfiniteLoader, AutoSizer, List} from 'react-virtualized';

class InfiniteList extends React.Component {
  render() {
    return (
      <InfiniteLoader
        isRowLoaded={this.props.isRowLoaded}
        loadMoreRows={this.props.loadMoreRows}
        rowCount={this.props.rowCount}
        minimumBatchSize={this.props.minimumBatchSize}
      >
        {({onRowsRendered, registerChild}) => (
          <AutoSizer>
            {({width}) => {
              return <List
                className="infinite-list"
                ref={registerChild}
                width={width}
                height={this.props.isMobile ? 452 : 688}
                rowHeight={this.props.rowHeight}
                rowCount={this.props.rowCount}
                rowRenderer={this.props.rowRenderer}
                onRowsRendered={onRowsRendered}
              />;
            }}
          </AutoSizer>
        )}
      </InfiniteLoader>
    )
  }
}

InfiniteList.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  rowHeight: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
  minimumBatchSize: PropTypes.number.isRequired,
  rowRenderer: PropTypes.func.isRequired,
  loadMoreRows: PropTypes.func.isRequired,
}

export default InfiniteList;