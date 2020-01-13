const initialState = {
    engineerProjectData: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false
  }
  
  const engineerProjectReduces = (prevState = initialState, action) => {
    switch (action.type) {
      case "GET_PROJECT_ENGINEER_PENDING":
        return {
          ...prevState,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "GET_PROJECT_ENGINEER_REJECTED":
        return {
          ...prevState,
          isPending: false,
          isRejected: true
        };
      case "GET_PROJECT_ENGINEER_FULFILLED":
        return {
          ...prevState,
          isPending: false,
          isFulfilled: true,
          engineerProjectData: action.payload.data
        };
      default:
        return prevState;
    }
  }
  
  export default engineerProjectReduces;