const initialState = {
    requestEngineerData: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false
  }
  
  const requestEngineerReduces = (prevState = initialState, action) => {
    switch (action.type) {
      case "GET_REQUEST_PROJECT_PENDING":
        return {
          ...prevState,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "GET_REQUEST_PROJECT_REJECTED":
        return {
          ...prevState,
          isPending: false,
          isRejected: true
        };
      case "GET_REQUEST_PROJECT_FULFILLED":
        return {
          ...prevState,
          isPending: false,
          isFulfilled: true,
          requestEngineerData: action.payload.data
        };
      default:
        return prevState;
    }
  }
  
  export default requestEngineerReduces;