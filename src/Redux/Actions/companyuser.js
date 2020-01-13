import Axios from "axios";

let ip = "192.168.6.140"

export const getCompanyProfile = (headers) => {
  return {
    type: "GET_COMPANY_PROFILE",
    payload: Axios.get("http://"+ip+":8000/companyuser/", {headers: headers})
  };
}

export const updateCompanyProfile = (headers, data) => {
  return {
    type: "UPDATE_COMPANY_PROFILE",
    payload: Axios.patch("http://"+ip+":8000/companyuser/", null, {
      headers: headers,
      params: data
    })
  };
}

export const getProjectCompany = (headers) => {
  return {
    type: "GET_PROJECT_COMPANY",
    payload: Axios.get("http://"+ip+":8000/companyuser/project/", {headers: headers})
  }
}

export const addProjectCompany = (headers, data)=>{
  return {
    type: "ADD_PROJECT_COMPANY",
    payload: Axios.post("http://"+ip+":8000/companyuser/project/", data, {headers: headers})
  };
}

export const deleteProjectCompany = (id, headers)=>{
  return{
    type: "DELETE_PROJECT_COMPANY",
    payload: Axios.delete("http://"+ip+":8000/companyuser/project/"+ id, {headers: headers})
  }
}

export const getAvailableProject = (headers)=>{
  return {
    type: "GET_AVAILABLE_PROJECT",
    payload: Axios.get("http://"+ip+":8000/companyuser/projectlist", {headers: headers})
  }
}

export const sendRequestData = (headers,data) =>{
  return {
    type: "SEND_REQUEST",
    payload: Axios.post("http://"+ip+":8000/companyuser/projectrequest",data, {headers: headers})
  }
}

export const finishProjectData = (headers, params)=>{
  return {
    type: "FINISH_PROJECT",
    payload: Axios.patch("http://"+ip+":8000/companyuser/projectfinish",null, {
      headers: headers, params: params
    })
  }
}