import axios from "axios";
import { LOGS_ERROR, SET_LOADING } from "./types";

const config = {
  headers : {
    "Content-Type" : "application/json"
  }
}

export const setLoding = () => {
  return {
    type: SET_LOADING
  }
}