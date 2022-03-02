import axios from "axios";
import { setAlert } from "./alertAction";
import { ALL_REVIEWS, CREATE_REVIEW, CURRENT_REVIEW, DELETE_REVIEW, REVIEWS_CLEAR_ERRORS, REVIEWS_ERROR, SET_REVIEW_LOADING, UPDATE_REVIEW } from "./types";

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
    dispatch({
      type: REVIEWS_ERROR,
      payload: err.response.data.error
    });
    dispatch(setAlert(err.response.data.error, "danger", 5000));
		dispatch(reviewsClearError());
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
    dispatch({
      type: REVIEWS_ERROR,
      payload: err.response.data.error
    });
    dispatch(setAlert(err.response.data.error, "danger", 5000));
		dispatch(reviewsClearError());
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
    if(res.data?.success){
      dispatch(setAlert(`${res.data?.data?.title} Review Added Successfully`, "success", 5000));
      return true;
    }
  } catch (err) {
    dispatch({
      type: REVIEWS_ERROR,
      payload: err.response.data.error
    });
    dispatch(setAlert(err.response.data.error, "danger", 5000));
		dispatch(reviewsClearError());
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
    if(res.data?.success){
      dispatch(setAlert(`${res.data?.data?.title} Review Updated Successfully`, "success", 5000));
      return true;
    }
  } catch (err) {
    dispatch({
      type: REVIEWS_ERROR,
      payload: err.response.data.error
    });
    dispatch(setAlert(err.response.data.error, "danger", 5000));
		dispatch(reviewsClearError());
  }
}

export const deleteReview = (reviewId) => async (dispatch) => {
  try {
    dispatch(setReviewLoading());
    const res = await axios.delete(`/api/v1/reviews/${reviewId}`);

    dispatch({
      type: DELETE_REVIEW,
      payload: reviewId
    })
    if(res.data?.success){
      dispatch(setAlert(`Review Deleted Successfully`, "success", 5000));
    }
  } catch (err) {
    dispatch({
      type: REVIEWS_ERROR,
      payload: err.response.data.error
    });
    dispatch(setAlert(err.response.data.error, "danger", 5000));
		dispatch(reviewsClearError());
  }
}

export const setReviewLoading = () => {
  return ({
    type: SET_REVIEW_LOADING
  })
}

// Clear Errors 
export const reviewsClearError = () => {
  return {
    type: REVIEWS_CLEAR_ERRORS
  }
}