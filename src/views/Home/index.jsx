import React, {memo, useEffect, useState} from 'react';
import CircularProgress from '../../components/CircularProgress';

const LIMIT = 100;
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

function Home() {
  const [gifs, setGifs] = useState(INITIAL_STATE);

  const fetchData = () => {
    setGifs({
      ...INITIAL_STATE,
      isFetching: true,
    })

    fetch(`${URL}/trending?api_key=${API_KEY}&limit=${LIMIT}`).then((response) => {
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <CircularProgress loading={gifs.isFetching}/>
    </React.Fragment>
  )
}

export default memo(Home);