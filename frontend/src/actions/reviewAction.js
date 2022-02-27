import axios from "axios";
import { ALL_REVIEWS, CREATE_REVIEW, CURRENT_REVIEW, DELETE_REVIEW, LOGS_ERROR, SET_LOADING, SET_REVIEW_LOADING, UPDATE_REVIEW } from "./types";

const config = {
  headers : {
    "Content-Type" : "application/json"
  }
}

export const getReviews = (bootcampId = null, userId = null) => async (dispatch) => {
  try {
    dispatch(setReviewLoading());
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
    dispatch(setReviewLoading());
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
    dispatch(setReviewLoading());
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
    dispatch(setReviewLoading());
    const res = await axios.put(`/api/v1/reviews/${reviewId}`, reviewDetails, config);

    dispatch({
      type: UPDATE_REVIEW,
      payload: res.data
    })
  } catch (err) {
    console.error(err);
  }
}

export const deleteReview = (reviewId) => async (dispatch) => {
  try {
    dispatch(setReviewLoading());
    await axios.delete(`/api/v1/reviews/${reviewId}`);

    dispatch({
      type: DELETE_REVIEW,
      payload: reviewId
    })
  } catch (err) {
    console.error(err);
  }
}

export const setReviewLoading = () => {
  return ({
    type: SET_REVIEW_LOADING
  })
}