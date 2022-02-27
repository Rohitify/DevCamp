import axios from "axios";
import { CLEAR_ERRORS, LOAD_USER, LOGIN_SUCCESS, LOGOUT, LOGS_ERROR, REGISTER_SUCCESS, SET_LOADING, UPDATE_DETAILS, UPDATE_PASSWORD } from "./types";

const config = {
  headers : {
    "Content-Type" : "application/json"
  }
}

// Load User 
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(setLoding());
    const res = await axios.get(`/api/v1/auth/me`);
    dispatch({
      type: LOAD_USER,
      payload: res.data
    });
  } catch (err) {
    // console.log(err);
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data.error
    });
  }
}

// Login User 
export const login = (loginInfo) => async (dispatch) => {
  try {
    dispatch(setLoding());
    
    const res = await axios.post(`/api/v1/auth/login`, loginInfo, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    
    if(res?.data?.success === true) dispatch(loadUser());
    
  } catch (err) {
    console.log("err", err.response.data.error);
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data.error
    });
  }
}

// Register User 
export const register = (registerInfo) => async(dispatch) => {
  try {
    dispatch(setLoding());

    const res = await axios.post(`/api/v1/auth/register`, registerInfo, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    if(res?.data?.success === true) dispatch(loadUser());
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data.error
    });
  }
}

// Logout 
export const logout = () => async(dispatch) => { 
  try {
    dispatch(setLoding());
    await axios.get("/api/v1/auth/logout");
    dispatch({
      type: LOGOUT
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data.error
    });
  }
}

export const updateDetails = (userDetails) => async (dispatch) => {
  try {
    dispatch(setLoding());
    const res = await axios.put(`/api/v1/auth/updatedetails`, userDetails, config);
    dispatch({
      type: UPDATE_DETAILS,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
}

export const updatePassword = (passwordDetails) => async (dispatch) => {
  try {
    dispatch(setLoding());
    const res = await axios.put(`/api/v1/auth/updatepassword`, passwordDetails, config);
    dispatch({
      type: UPDATE_PASSWORD,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
}

// Clear Errors 
export const clearError = () => {
  return {
    type: CLEAR_ERRORS
  }
}

export const setLoding = () => {
  return {
    type: SET_LOADING
  }
}