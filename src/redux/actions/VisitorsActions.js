import {ADD_VISITOR, REMOVE_VISITOR} from './../types';

let dummyData = {name: 'Shubham', id: 1};

export const addVisitor = (data) => {
  return (dispatch) => {
    dispatch({
      type: ADD_VISITOR,
      data: data,
    });
  };
};

export const removeVisitor = (visitorId = 1) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_VISITOR,
      payload: {id: visitorId},
    });
  };
};
