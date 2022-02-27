import { ALL_COURSES, CREATE_COURSE, CURRENT_COURSE, DELETE_COURSE, LOGS_ERROR, SET_COURSES_LOADING, UPDATE_COURSE } from "../actions/types";

const initialState = {
  courses : [],
  current : null,
  loading: false,
  error : null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case ALL_COURSES:
      return {
        ...state,
        courses: action.payload.data,
        current : null,
        loading: false
      }
    case CURRENT_COURSE:
    case CREATE_COURSE:
    case UPDATE_COURSE:
      return {
        ...state,
        current: action.payload.data,
        loading: false
      }
    case DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter(course => course._id !== action.payload),
        current: null,
        loading: false
      }
    case SET_COURSES_LOADING: 
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