import axios from "axios";
import { LOGS_ERROR, SET_LOADING } from "./types";

export const setLoding = () => {
  return {
    type: SET_LOADING
  }
}