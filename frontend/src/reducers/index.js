import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import bootcampReducer from './bootcampReducer';
import courseReducer from './courseReducer';
import reviewReducer from './reviewReducer';
import userReducer from './userReducer';

export default combineReducers({
  auth: authReducer,
  bootcamp: bootcampReducer,
  course: courseReducer,
  review: reviewReducer,
  user: userReducer,
  alerts : alertReducer
});