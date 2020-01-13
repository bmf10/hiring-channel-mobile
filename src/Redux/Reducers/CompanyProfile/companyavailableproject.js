const initialState = {
    companyAvailableProjectData: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false
  }
  
  const companyAvailableProjectReduces = (prevState = initialState, action) => {
    switch (action.type) {
      case "GET_AVAILABLE_PROJECT_PENDING":
        return {
          ...prevState,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "GET_AVAILABLE_PROJECT_REJECTED":
        return {
          ...prevState,
          isPending: false,
          isRejected: true
        };
      case "GET_AVAILABLE_PROJECT_FULFILLED":
        return {
          ...prevState,
          isPending: false,
          isFulfilled: true,
          companyAvailableProjectData: action.payload.data
        };
      default:
        return prevState;
    }
  }
  
  export default companyAvailableProjectReduces;