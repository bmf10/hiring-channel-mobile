const initialState = {
    sendRequestData: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false
  }
  
  const sendRequestReduces = (prevState = initialState, action) => {
    switch (action.type) {
      case "SEND_REQUEST_PENDING":
        return {
          ...prevState,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "SEND_REQUEST_REJECTED":
        return {
          ...prevState,
          isPending: false,
          isRejected: true
        };
      case "SEND_REQUEST_FULFILLED":
        return {
          ...prevState,
          isPending: false,
          isFulfilled: true,
          sendRequestData: action.payload.data
        };
      default:
        return prevState;
    }
  }
  
  export default sendRequestReduces;