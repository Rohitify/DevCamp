import { ALL_REVIEWS, CREATE_REVIEW, CURRENT_REVIEW, DELETE_REVIEW, LOGS_ERROR, SET_LOADING, SET_REVIEW_LOADING, UPDATE_REVIEW } from "../actions/types";

const initialState = {
  reviews : [],
  current : null,
  loading: false,
  error : null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case ALL_REVIEWS:
      return {
        ...state,
        reviews: action.payload.data,
        current: null,
        loading: false
      }
    case CURRENT_REVIEW:
    case CREATE_REVIEW:
    case UPDATE_REVIEW:
      return {
        ...state,
        current: action.payload.data,
        loading: false
      }
    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter(review => review._id !== action.payload),
        current: null,
        loading: false
      }
    case SET_REVIEW_LOADING:
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