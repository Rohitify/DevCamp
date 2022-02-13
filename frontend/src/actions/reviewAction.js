import axios from "axios";
import { ALL_REVIEWS, CREATE_REVIEW, CURRENT_REVIEW, DELETE_REVIEW, LOGS_ERROR, SET_LOADING, UPDATE_REVIEW } from "./types";

const config = {
  headers : {
    "Content-Type" : "application/json"
  }
}

export const getReviews = (bootcampId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/bootcamps/${bootcampId}/reviews`);

    dispatch({
      type: ALL_REVIEWS,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
}

export const getReview = (bootcampId, reviewId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/bootcamps/${bootcampId}/reviews/${reviewId}`);

    dispatch({
      type: CURRENT_REVIEW,
      payload: res.data
    })
  } catch (err) {
    console.error(err);
  }
}

export const createReview = (bootcampId, reviewDetails) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/v1/bootcamps/${bootcampId}/reviews`, reviewDetails, config);

    dispatch({
      type: CREATE_REVIEW,
      payload: res.data
    })
  } catch (err) {
    console.error(err);
  }
}

export const updateReview = (bootcampId, reviewId, reviewDetails) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/v1/bootcamps/${bootcampId}/reviews/${reviewId}`, reviewDetails, config);

    dispatch({
      type: UPDATE_REVIEW,
      payload: res.data
    })
  } catch (err) {
    console.error(err);
  }
}

export const deleteReview = (bootcampId, reviewId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/bootcamps/${bootcampId}/reviews/${reviewId}`);

    dispatch({
      type: DELETE_REVIEW,
      payload: res.data
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