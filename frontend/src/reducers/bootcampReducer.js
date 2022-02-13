import { ALL_BOOTCAMPS, CREATE_BOOTCAMP, CURRENT_BOOTCAMP, DELETE_BOOTCAMP, LOGS_ERROR, SET_LOADING } from "../actions/types";

const initialState = {
  bootcamps : [],
  current : null,
  filtered : null,
  loading: false,
  error : null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case ALL_BOOTCAMPS:
      return {
        ...state,
        bootcamps: action.payload.data,
        loading: false
      }
    case CREATE_BOOTCAMP:
    case DELETE_BOOTCAMP:
    case CURRENT_BOOTCAMP: {
      return {
        ...state,
        current: action.payload.data,
        loading: false
      }
    }
    case SET_LOADING: 
      return {
        ...state,
        loading: true
      }
    case LOGS_ERROR:
      // console.error(action.payload);
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}