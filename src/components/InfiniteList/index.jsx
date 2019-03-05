import './style.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {WindowScroller, InfiniteLoader, AutoSizer, List} from 'react-virtualized';

class InfiniteList extends React.Component {
  render() {
    return (
      <WindowScroller>
        {({height, isScrolling, registerChild, onChildScroll, scrollTop}) => (
          <InfiniteLoader
            isRowLoaded={this.props.isRowLoaded}
            loadMoreRows={this.props.loadMoreRows}
            rowCount={this.props.rowCount}
            minimumBatchSize={this.props.minimumBatchSize}
          >
            {({onRowsRendered, registerChild}) => (
              <AutoSizer disableHeight>
                {({width}) => {
                  return <List
                    className="infinite-list"
                    autoHeight
                    ref={registerChild}
                    width={width}
                    height={height}
                    rowHeight={this.props.rowHeight}
                    rowCount={this.props.rowCount}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    scrollTop={scrollTop}
                    rowRenderer={this.props.rowRenderer}
                    onRowsRendered={onRowsRendered}
                  />;
                }}
              </AutoSizer>
            )}
          </InfiniteLoader>
        )}
      </WindowScroller>
    )
  }
}

InfiniteList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowHeight: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
  minimumBatchSize: PropTypes.number.isRequired,
  rowRenderer: PropTypes.func.isRequired,
  loadMoreRows: PropTypes.func.isRequired,
}

export default InfiniteList;