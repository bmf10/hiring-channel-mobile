const initialState = {
    executeRequestData: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false
  }
  
  const executeRequestReduces = (prevState = initialState, action) => {
    switch (action.type) {
      case "EXECUTE_REQUEST_PENDING":
        return {
          ...prevState,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "EXECUTE_REQUEST_REJECTED":
        return {
          ...prevState,
          isPending: false,
          isRejected: true
        };
      case "EXECUTE_REQUEST_FULFILLED":
        return {
          ...prevState,
          isPending: false,
          isFulfilled: true,
          executeRequestData: action.payload.data
        };
      default:
        return prevState;
    }
  }
  
  export default executeRequestReduces;