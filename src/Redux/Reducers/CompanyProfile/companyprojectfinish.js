const initialState = {
    finishProjectData: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false
  }
  
  const finishProjectReduces = (prevState = initialState, action) => {
    switch (action.type) {
      case "FINISH_PROJECT_PENDING":
        return {
          ...prevState,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "FINISH_PROJECT_REJECTED":
        return {
          ...prevState,
          isPending: false,
          isRejected: true
        };
      case "FINISH_PROJECT_FULFILLED":
        return {
          ...prevState,
          isPending: false,
          isFulfilled: true,
          finishProjectData: action.payload.data
        };
      default:
        return prevState;
    }
  }
  
  export default finishProjectReduces;