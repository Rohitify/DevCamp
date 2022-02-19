import { CLEAR_ERRORS, LOAD_USER, LOGIN_SUCCESS, LOGOUT, LOGS_ERROR, REGISTER_SUCCESS, SET_LOADING, UPDATE_DETAILS, UPDATE_PASSWORD } from "../actions/types";

const initialState = {
  // token: localStorage.getItem("token") || null,
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null
}

export default (state = initialState, action) => {
  switch(action.type) {
    case LOAD_USER:
    case UPDATE_DETAILS:
      return {
        ...state,
        user: action.payload.data,
        loading: false
      }
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case UPDATE_PASSWORD:
      // localStorage.setItem("token", action.payload.token)
      return {
        ...state,
        // token: action.payload.token,
        isAuthenticated: true,
        loading: false
      }
    case LOGOUT:
      // localStorage.removeItem("token");
      return {
        ...state,
        // token: null,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null
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
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
}