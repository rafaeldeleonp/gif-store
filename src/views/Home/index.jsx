import './style.scss';
import React, {memo, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import withWidth from '@material-ui/core/withWidth';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '../../components/CircularProgress';
import Thumbnail from '../../components/Thumbnail';
import SearchInput from '../../components/SearchInput';
import InfiniteList from '../../components/InfiniteList';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import LeftArrow from '../../resources/svg/left-arrow.svg';
import Play from '../../resources/svg/play.svg';
import RightArrow from '../../resources/svg/right-arrow.svg';
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
  isFetching: false,
}

function Home(props) {
  const [gifs, setGifs] = useState(INITIAL_STATE);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const total = gifs.pagination.total_count;

  useEffect(() => {
    fetchData();
  }, [search]);

  const fetchData = () => {
    setGifs({
      ...INITIAL_STATE,
      isFetching: true,
    })

    fetch(`${URL}/search?q=${formatSearch(search)}&api_key=${API_KEY}&limit=${LIMIT}`).then((response) => {
      if (response.status !== 200) {
        console.log('Error fething gifs. Status Code: ' + response.status);
        return;
      }

      response.json().then(function (data) {
        setGifs({
          ...data,
          isFetching: false,
        });
      });
    }).catch((err) => {
      setGifs(INITIAL_STATE);
      console.log('Fetch Error', err);
    });
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  }

  const handleClick = (e) => {
    setOpen(true);
  }

  const handleClose = (e) => {
    setOpen(false);
  }

  const getCorrectImageSize = (images) => {
    const {width} = props;
    const isMobileWidth = isMobileSize(width);
    const url = isMobileWidth ? images.fixed_height_still.url : images.original_still.url;
    return url;
  }

  const loadMoreRows = ({startIndex, stopIndex}) => {
    debugger;
    setGifs({
      ...INITIAL_STATE,
      isFetching: true,
    })

    return fetchData();
  }

  const isRowLoaded = ({index}) => {
    debugger;
    return index;
  }

  const rowRenderer = ({key, index, style}) => {
    if (gifs.data.length > 0 && gifs.data[index]) {
      const gif = gifs.data[index];

      const username = gif.user ? gif.user.display_name : '';
      const date = gif.trending_datetime ? gif.trending_datetime : '';
      const url = getCorrectImageSize(gif.images);

      return (
        <Thumbnail
          style={style}
          key={gif.id}
          title={gif.title}
          username={username}
          date={distanceInWordsToNow(date, {addSuffix: false})}
          url={url}
          onClick={handleClick}
        />
      )
    }
  }

  return (
    <div className="home">
      <CircularProgress loading={gifs.isFetching} />
      <Grid className="search-container" container direction="column">
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
      <InfiniteList
        data={gifs.data}
        rowHeight={406}
        rowCount={gifs.pagination.total_count}
        rowRenderer={rowRenderer}
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRows}
      />
      <Modal
        show={open}
        title={"Modal"}
        footer={
          <div>
            <Button>
              <SVG src={LeftArrow} />
            </Button>
            <Button>
              <SVG src={Play} />
            </Button>
            <Button>
              <SVG src={RightArrow} />
            </Button>
          </div>
        }
        onClose={handleClose}
      >
        {gifs.data.length > 0 && <img src={gifs.data[0].images.original.url} width="100%" height={!isMobileSize() ? '252px' : '368px'}/>}
      </Modal>
    </div >
  )
}

Home.propTypes = {
  width: PropTypes.string.isRequired,
}

export default withWidth()(memo(Home));