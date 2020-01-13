import { combineReducers } from "redux";

import engineerUser from "./EngineerProfile/engineeruser";
import engineerSkill from "./EngineerProfile/engineerskill";
import engineerUpdate from "./EngineerProfile/engineerupdate";
import engineerAddSkill from "./EngineerProfile/engineerskilladd";
import engineerDeleteSkill from "./EngineerProfile/engineerskilldelete";
import engineerProject from "./EngineerProfile/engineerproject";
import engineerRequest from "./EngineerProfile/engineerrequest";
import executeRequest from "./EngineerProfile/executerequest";

import companyUser from "./CompanyProfile/companyuser";
import companyUpdate from "./CompanyProfile/companyupdate";
import companyProject from "./CompanyProfile/companyproject";
import companyAddProject from "./CompanyProfile/companyprojectadd";
import companyDeleteProject from "./CompanyProfile/companyprojectdelete";
import companyAvailableProject from "./CompanyProfile/companyavailableproject";
import sendRequest from "./CompanyProfile/sendrequest";
import finishProject from "./CompanyProfile/companyprojectfinish";
import search from "./search";

import loginUser from "./Auth/login"
import registerCompany from "./Auth/registercompany";
import registerEngineer from "./Auth/registerengineer";

const reducers = combineReducers({
  engineerUser,
  engineerSkill,
  engineerUpdate,
  engineerAddSkill,
  engineerDeleteSkill,
  engineerProject,
  engineerRequest,
  executeRequest,

  companyUser,
  companyUpdate,
  companyProject,
  companyAddProject,
  companyDeleteProject,
  companyAvailableProject,
  sendRequest,
  finishProject,

  search,

  loginUser,
  registerCompany,
  registerEngineer

});

export default reducers;
