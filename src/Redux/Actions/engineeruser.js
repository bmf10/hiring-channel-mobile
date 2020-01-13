import Axios from "axios";

let ip = "192.168.6.140"

export const getEngineerProfile = (headers) => {
  return {
    type: "GET_ENGINEER_PROFILE",
    payload: Axios.get("http://"+ip+":8000/engineeruser/", {headers: headers})
  };
}

export const updateEngineerProfile = (headers, data) => {
  return {
    type: "UPDATE_ENGINEER_PROFILE",
    payload: Axios.patch("http://"+ip+":8000/engineeruser/", null, {
      headers: headers,
      params: data
    })
  };
}

export const getSkillEngineer = (headers) => {
  return {
    type: "GET_SKILL_ENGINEER",
    payload: Axios.get("http://"+ip+":8000/engineeruser/skill/", {headers: headers})
  };
}

export const addSkillEngineer = (headers, data) => {
  return {
    type: "ADD_SKILL_ENGINEER",
    payload: Axios.post("http://"+ip+":8000/engineeruser/skill/", data, {headers: headers})
  };
}

export const deleteSkillEngineer = (id, headers) => {
  return {
    type: "DELETE_SKILL_ENGINEER",
    payload: Axios.delete("http://"+ip+":8000/engineeruser/skill/" + id, {headers: headers})
  }
}

export const getProjectEngineer = (headers) => {
  return {
    type: "GET_PROJECT_ENGINEER",
    payload: Axios.get("http://"+ip+":8000/engineeruser/project", {headers: headers})
  };
}

export const getRequestProject = (headers) => {
  return {
    type: "GET_REQUEST_PROJECT",
    payload: Axios.get("http://"+ip+":8000/engineeruser/request", {headers: headers})
  }
}

export const executeRequestProject = (headers, params) => {
  return {
    type: "EXECUTE_REQUEST",
    payload: Axios.patch("http://"+ip+":8000/engineeruser/request", null, {
      headers: headers,
      params: params
    })
  }
}