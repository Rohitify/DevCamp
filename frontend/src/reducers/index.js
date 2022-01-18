import { combineReducers } from 'redux';
import authReducer from './authReducer';
import bootcampReducer from './bootcampReducer';
import courseReducer from './courseReducer';
import reviewReducer from './reviewReducer';
import userReducer from './userReducer';

export default combineReducers({
  auth: authReducer,
  bootcamps: bootcampReducer,
  courses: courseReducer,
  reviews: reviewReducer,
  users: userReducer
});