import Axios from "axios";

let ip = "192.168.6.140"

export const LoginUser = (data) => {
  return {
    type: "LOGIN_USER",
    payload: Axios
      .post("http://"+ip+":8000/auth", data, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  };
}

export const RegisterCompanyAction = (data) => {
  return {
    type: "REGISTER_COMPANY",
    payload: Axios.post('http://'+ip+':8000/auth/company', data)
  }
}

export const RegisterEngineerAction = (data) => {

  return {
    type: "REGISTER_ENGINEER",
    payload: Axios.post('http://'+ip+':8000/auth/engineer', data)
  }
}