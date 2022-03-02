import { LOGS_ERROR, SET_LOADING } from "../actions/types";

const initialState = {
  users : [],
  current : null,
  // filtered : null,
  loading: false,
  error : null
};

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_LOADING: 
      return {
        ...state,
        loading: true
      }
    case LOGS_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    default:
      return state;
  }
}

export default userReducer;