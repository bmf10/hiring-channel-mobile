import Axios from "axios";

let ip = "192.168.6.140"

export const searchGetData = (headers, params) => {
  return {
    type: "GET_SEARCH",
    payload: Axios.get("http://"+ip+":8000/engineer/", {headers: headers, params: params})
  };
}