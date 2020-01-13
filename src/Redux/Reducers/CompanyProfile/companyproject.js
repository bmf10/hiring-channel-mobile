const initialState = {
    companyProjectData: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false
  }
  
  const companyProjectReduces = (prevState = initialState, action) => {
    switch (action.type) {
      case "GET_PROJECT_COMPANY_PENDING":
        return {
          ...prevState,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "GET_PROJECT_COMPANY_REJECTED":
        return {
          ...prevState,
          isPending: false,
          isRejected: true
        };
      case "GET_PROJECT_COMPANY_FULFILLED":
        return {
          ...prevState,
          isPending: false,
          isFulfilled: true,
          companyProjectData: action.payload.data
        };
      default:
        return prevState;
    }
  }
  
  export default companyProjectReduces;