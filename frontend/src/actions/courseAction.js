import axios from "axios";
import { ALL_COURSES, CREATE_COURSE, CURRENT_COURSE, DELETE_COURSE, LOGS_ERROR, SET_LOADING, UPDATE_COURSE } from "./types";

const config = {
  headers : {
    "Content-Type" : "application/json"
  }
}

export const getCourses = (bootcampId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/bootcamps/${bootcampId}/courses`);

    dispatch({
      type: ALL_COURSES,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
}

export const getCourse = (bootcampId, courseId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/bootcamps/${bootcampId}/courses/${courseId}`);

    dispatch({
      type: CURRENT_COURSE,
      payload: res.data
    })
  } catch (err) {
    console.error(err);
  }
}

export const createCourse = (bootcampId, courseDetails) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/v1/bootcamps/${bootcampId}/courses`, courseDetails, config);

    dispatch({
      type: CREATE_COURSE,
      payload: res.data
    })
  } catch (err) {
    console.error(err);
  }
}

export const updateCourse = (bootcampId, courseId, courseDetails) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/v1/bootcamps/${bootcampId}/courses/${courseId}`, courseDetails, config);

    dispatch({
      type: UPDATE_COURSE,
      payload: res.data
    })
  } catch (err) {
    console.error(err);
  }
}

export const deleteCourse = (bootcampId, courseId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/bootcamps/${bootcampId}/courses/${courseId}`);

    dispatch({
      type: DELETE_COURSE,
      payload: courseId
    })
  } catch (err) {
    console.error(err);
  }
}

export const setLoding = () => {
  return {
    type: SET_LOADING
  }
}