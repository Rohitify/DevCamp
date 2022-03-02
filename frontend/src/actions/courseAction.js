import axios from "axios";
import { setAlert } from "./alertAction";
import { ALL_COURSES, CREATE_COURSE, CURRENT_COURSE, DELETE_COURSE, SET_COURSES_LOADING, UPDATE_COURSE, COURSES_ERROR, COURSES_CLEAR_ERRORS } from "./types";

const config = {
  headers : {
    "Content-Type" : "application/json"
  }
}

export const getCourses = (bootcampId) => async (dispatch) => {
  try {
    dispatch(setCoursesLoding());
    const res = await axios.get(`/api/v1/bootcamps/${bootcampId}/courses`);

    dispatch({
      type: ALL_COURSES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: COURSES_ERROR,
      payload: err.response.data.error
    });
    dispatch(setAlert(err.response.data.error, "danger", 5000));
		dispatch(coursesClearError());
  }
}

export const getCourse = (bootcampId, courseId) => async (dispatch) => {
  try {
    dispatch(setCoursesLoding());

    const res = await axios.get(`/api/v1/bootcamps/${bootcampId}/courses/${courseId}`);

    dispatch({
      type: CURRENT_COURSE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: COURSES_ERROR,
      payload: err.response.data.error
    });
    dispatch(setAlert(err.response.data.error, "danger", 5000));
		dispatch(coursesClearError());
  }
}

export const createCourse = (bootcampId, courseDetails) => async (dispatch) => {
  try {
    dispatch(setCoursesLoding());

    const res = await axios.post(`/api/v1/bootcamps/${bootcampId}/courses`, courseDetails, config);

    dispatch({
      type: CREATE_COURSE,
      payload: res.data
    })
    if(res.data?.success){
      dispatch(setAlert(`${res.data.data.title} Created Successfully`, "success", 5000));
      return true;
    }
  } catch (err) {
    dispatch({
      type: COURSES_ERROR,
      payload: err.response.data.error
    });
    dispatch(setAlert(err.response.data.error, "danger", 5000));
		dispatch(coursesClearError());
  }
}

export const updateCourse = (bootcampId, courseId, courseDetails) => async (dispatch) => {
  try {
    dispatch(setCoursesLoding());

    const res = await axios.put(`/api/v1/bootcamps/${bootcampId}/courses/${courseId}`, courseDetails, config);

    dispatch({
      type: UPDATE_COURSE,
      payload: res.data
    })
    if(res.data?.success){
      dispatch(setAlert(`${res.data.data.title} Updated Successfully`, "success", 5000));
      return true;
    }
  } catch (err) {
    dispatch({
      type: COURSES_ERROR,
      payload: err.response.data.error
    });
    dispatch(setAlert(err.response.data.error, "danger", 5000));
		dispatch(coursesClearError());
  }
}

export const deleteCourse = (bootcampId, courseId) => async (dispatch) => {
  try {
    dispatch(setCoursesLoding());
    
    const res = await axios.delete(`/api/v1/bootcamps/${bootcampId}/courses/${courseId}`);

    dispatch({
      type: DELETE_COURSE,
      payload: courseId
    })
    res.data?.success && dispatch(setAlert(`Course Deleted Successfully`, "success", 5000));
  } catch (err) {
    dispatch({
      type: COURSES_ERROR,
      payload: err.response.data.error
    });
    dispatch(setAlert(err.response.data.error, "danger", 5000));
		dispatch(coursesClearError());
  }
}

export const setCoursesLoding = () => {
  return {
    type: SET_COURSES_LOADING
  }
}

// Clear Errors 
export const coursesClearError = () => {
  return {
    type: COURSES_CLEAR_ERRORS
  }
}