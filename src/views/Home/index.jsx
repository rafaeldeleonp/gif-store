import './style.scss';
import React, {memo, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import withWidth from '@material-ui/core/withWidth';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '../../components/CircularProgress';
import Thumbnail from '../../components/Thumbnail';
import SearchInput from '../../components/SearchInput';
import InfiniteList from '../../components/InfiniteList';
import LightBox from '../../components/LightBox';
import {isMobileSize, numberWithCommas, formatSearch} from '../../utils';

const LIMIT = 50;
const URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
const INITIAL_STATE = {
  data: [],
  meta: {},
  pagination: {
    count: 0,
    offset: 0,
    total_count: 0,
  },
  skip: 0,
  isFetching: false,
}

function Home(props) {
  const [gifs, setGifs] = useState(INITIAL_STATE);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [itemIndex, setItemIndex] = useState(0);
  const total = gifs.pagination.total_count;

  useEffect(() => {
    setGifs({
      ...INITIAL_STATE,
      isFetching: true,
    });

    fetchData();
  }, [search]);

  const fetchData = (limit = LIMIT, offset = 0) => {
    fetch(`${URL}/search?q=${formatSearch(search)}&api_key=${API_KEY}&limit=${limit}&offset=${offset}`).then((response) => {
      if (response.status !== 200) {
        console.log('Error fething gifs. Status Code: ' + response.status);
        return;
      }

      response.json().then(function (data) {
        setGifs({
          ...data,
          data: gifs.data.concat(data.data),
          skip: offset,
          isFetching: false,
        });
      });
    }).catch((err) => {
      setGifs({...gifs});
      console.log('Fetch Error', err);
    });
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  }

  const handleClick = (index) => {
    setItemIndex(index);
    setOpen(true);
  }

  const handleClose = (e) => {
    setOpen(false);
  }

  const getDisplayName = (gif) => {
    return gif.user ? gif.user.display_name : '';
  }

  const getCorrectImageSize = (images, animated = false) => {
    const {width} = props;
    const isMobileWidth = isMobileSize(width);
    let url = "";

    if (isMobileWidth) {
      if (animated) url = images.fixed_height.url;
      else url = images.fixed_height_still.url;
    } else if (!isMobileWidth) {
      if (animated) url = images.original.url;
      else url = images.original_still.url;
    }

    return url;
  }

  const loadMoreRows = ({startIndex, stopIndex}) => {
    const limit = stopIndex - startIndex;
    const offset = gifs.skip + gifs.pagination.count;

    return fetchData(limit, offset);
  }

  const isRowLoaded = ({index}) => {
    return !!gifs.data[index];
  }

  const rowRenderer = ({key, index, style}) => {
    if (gifs.data.length > 0 && gifs.data[index]) {
      const gif = gifs.data[index];

      const username = getDisplayName(gif);
      const date = gif.trending_datetime ? gif.trending_datetime : '';
      const url = getCorrectImageSize(gif.images);

      return (
        <Thumbnail
          style={style}
          key={key}
          title={gif.title}
          username={username}
          date={distanceInWordsToNow(date, {addSuffix: false})}
          url={url}
          onClick={() => handleClick(index)}
        />
      )
    }
  }

  console.log("DATA", gifs.data);

  return (
    <div className="home">
      <CircularProgress loading={gifs.isFetching} />
      <Grid className="search-container" container direction="column" alignItems="center" justify="center">
        <SearchInput
          value={search}
          onChange={handleChange}
        />
        {total > 0 &&
          <Typography className="search-results" variant="caption">
            {`About ${numberWithCommas(total)} results`}
          </Typography>
        }
      </Grid>
      <Grid className="thumbnails-list-container" container justify="center" >
        <Grid className="thumbnails-list-wrapper" item xs={12} sm={10} lg={8}>
          <InfiniteList
            data={gifs.data}
            rowHeight={150}
            rowCount={gifs.pagination.total_count}
            minimumBatchSize={LIMIT}
            rowRenderer={rowRenderer}
            isRowLoaded={isRowLoaded}
            loadMoreRows={loadMoreRows}
          />
        </Grid>
      </Grid>
      <LightBox
        show={open}
        index={itemIndex}
        slides={
          gifs.data.map((gif) => {
            return {
              title: gif.title,
              url: getCorrectImageSize(gif.images, true),
              displayName: getDisplayName(gif),
            }
          })
        }
        onClose={handleClose}
      >
      </LightBox>
    </div >
  )
}

Home.propTypes = {
  width: PropTypes.string.isRequired,
}

export default withWidth()(memo(Home));