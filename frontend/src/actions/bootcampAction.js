import axios from "axios";
import { ALL_BOOTCAMPS, CREATE_BOOTCAMP, CURRENT_BOOTCAMP, DELETE_BOOTCAMP, LOGS_ERROR, SET_LOADING, UPDATE_BOOTCAMP } from "./types";

const config = {
  headers : {
    "Content-Type" : "application/json"
  }
}

export const getBootcamps = (q = "/") => async(dispatch) => {
  try {
    const res = await axios.get(`/api/v1/bootcamps${q}`);

    dispatch({
      type: ALL_BOOTCAMPS,
      payload: res.data
    })
  
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data.error
    });
  }
}

export const getBootcampsInRadius = (pincode, distance) => async(dispatch) => {
  try {
    const res = await axios.get(`/api/v1/bootcamps/radius/${pincode}/${distance}`);

    dispatch({
      type: ALL_BOOTCAMPS,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
}

export const getBootcamp = (bootcampId) => async(dispatch) => {
  try {
    const res = await axios.get(`/api/v1/bootcamps/${bootcampId}`);

    dispatch({
      type: CURRENT_BOOTCAMP,
      payload: res.data.data
    });
  } catch (err) {
    console.error(err);
  }
}

export const createBootcamp = (bootcampDetails) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/v1/bootcamps`, bootcampDetails, config);
    dispatch({
      type: CREATE_BOOTCAMP,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
}

export const updateBootcamp = (bootcampId, bootcampDetails) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/v1/bootcamps/${bootcampId}`, bootcampDetails, config);
    dispatch({
      type: UPDATE_BOOTCAMP,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
}

export const deleteBootcamp = (bootcampId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/bootcamps/${bootcampId}`);
    console.log(res.data);
    dispatch({
      type: DELETE_BOOTCAMP,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
}

export const setLoding = () => {
  return {
    type: SET_LOADING
  }
}

export const currentBootcampNull = dispatch => () => {
  dispatch({
    type: CURRENT_BOOTCAMP,
    payload: null
  });
}