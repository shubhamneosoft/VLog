import {NEWS} from '../types';

export const getNews = () => {
  return (dispatch) => {
    dispatch({
      type: NEWS.REQUEST,
    });
    fetch(
      'https://newsapi.org/v2/everything?q=bitcoin&from=2020-04-01&sortBy=publishedAy&apiKey=1848b5465b1449d78d10c2991b1bea98',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('news : ', responseJson);
        if (responseJson.status == 'ok') {
          dispatch({
            type: NEWS.SUCCESS,
            data: responseJson.articles,
          });
        } else {
          dispatch({
            type: NEWS.FAIL,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: NEWS.FAIL,
        });
      });
  };
};
