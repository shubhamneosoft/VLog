import {NEWS} from './../types';

const INITIAL_STATE = {
  news: [],
  isLoading: false,
  error: '',
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEWS.REQUEST:
      return {
        ...state,
        isLoading: true,
        error: '',
      };

    case NEWS.SUCCESS:
      return {
        ...state,
        isLoading: false,
        news: action.data,
        error: '',
      };

    case NEWS.FAIL:
      return {
        ...state,
        isLoading: false,
        error: 'Something went wrong. Please try later.',
      };

    default:
      return state;
  }
};
