import { ALL_BOOTCAMPS, BOOTCAMPS_CLEAR_ERRORS, BOOTCAMPS_ERROR, CREATE_BOOTCAMP, CURRENT_BOOTCAMP, DELETE_BOOTCAMP, SET_BOOTCAMPS_LOADING, UPDATE_BOOTCAMP, UPDATE_BOOTCAMP_IMG } from "../actions/types";

const initialState = {
  bootcamps : [],
  current : null,
  filtered : null,
  loading: false,
  error : null
};

const bootcampReducer = (state = initialState, action) => {
  switch(action.type) {
    case ALL_BOOTCAMPS:
      return {
        ...state,
        bootcamps: action.payload.data,
        current : null,
        loading: false,
        error : null
      }
    case CREATE_BOOTCAMP:
      return {
        ...state,
        current: action.payload.data,
        bootcamps: [ action.payload.data, ...state.bootcamps ],
        loading: false
      }
    case UPDATE_BOOTCAMP:
      return {
        ...state,
        current: action.payload.data,
        bootcamps: state.bootcamps.map(bootcamp => 
          bootcamp._id === action.payload.data._id ? action.payload.data : bootcamp
        ),
        loading: false
      }
    case UPDATE_BOOTCAMP_IMG:
      return {
        ...state,
        current: { ...state.current, photo : action.payload.data },
        loading: false
      }
    case CURRENT_BOOTCAMP:
      return {
        ...state,
        current: action.payload.data,
        loading: false
      }
    case DELETE_BOOTCAMP:
      return {
        ...state,
        bootcamps: state.bootcamps.filter(bootcamp => bootcamp._id !== action.payload),
        loading: false
      }
    case SET_BOOTCAMPS_LOADING: 
      return {
        ...state,
        loading: true
      }
    case BOOTCAMPS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case BOOTCAMPS_CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
}

export default bootcampReducer;