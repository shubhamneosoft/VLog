import {ADD_VISITOR, REMOVE_VISITOR} from './../types';

const INITIAL_STATE = {
  visitors: [],
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_VISITOR:
      // let visitorsData = action.data;
      // console.log('payload : ', visitorsData, state);
      let arr = state.visitors;
      arr.push(action.data);

      return {
        ...state,
        visitors: arr,
      };

    case REMOVE_VISITOR:
      return {
        ...state,
      };

    default:
      return state;
  }
};
