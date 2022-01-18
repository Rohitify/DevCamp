import axios from "axios";
import { LOGS_ERROR, SET_LOADING } from "./types";

// Load User 

// Login User 
export const login = (loginInfo) => async (dispatch) => {
  try {
    setLoding();
    console.log(loginInfo);
    const config = {
      headers : {
        "Content-Type" : "application/json"
      }
    }
    const res = await axios.post(`/api/v1/auth/login`, loginInfo, config);
    console.log(res.data);
    dispatch({
      
    });
    
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response
    });
  }
}

// Register User 

// Logout 

// Clear Errors 

export const setLoding = () => {
  return {
    type: SET_LOADING
  }
}