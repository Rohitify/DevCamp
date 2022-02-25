import axios from "axios";
import { ALL_REVIEWS, CREATE_REVIEW, CURRENT_REVIEW, DELETE_REVIEW, LOGS_ERROR, SET_LOADING, SET_REVIEW_LOADING, UPDATE_REVIEW } from "./types";

const config = {
  headers : {
    "Content-Type" : "application/json"
  }
}

export const getReviews = (bootcampId = null, userId = null) => async (dispatch) => {
  try {
    dispatch(setLoading());
    let res;
    if(userId === null && bootcampId !== null){
      res = await axios.get(`/api/v1/bootcamps/${bootcampId}/reviews`);
    } else{
      res = await axios.get(`/api/v1/reviews?user=${userId}`);
    }

    dispatch({
      type: ALL_REVIEWS,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
}

export const getReview = (reviewId) => async (dispatch) => {
  try {
    setLoading();
    const res = await axios.get(`/api/v1/reviews/${reviewId}`);

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

export const updateReview = (reviewId, reviewDetails) => async (dispatch) => {
  try {
    setLoading();
    const res = await axios.put(`/api/v1/reviews/${reviewId}`, reviewDetails, config);

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

export const setLoading = () => {
  return ({
    type: SET_REVIEW_LOADING
  })
}