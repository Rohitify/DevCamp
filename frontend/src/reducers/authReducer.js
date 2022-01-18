import { LOGS_ERROR, SET_LOADING } from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  user: null,
  loading: false,
  error: null
}

export default (state = initialState, action) => {
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
        error: action.payload
      }
    default:
      return state;
  }
}