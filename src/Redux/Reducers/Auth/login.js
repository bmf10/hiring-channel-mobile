const initialState = {
    LoginUserData: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false
  }
  
  const loginUserReduces = (prevState = initialState, action) => {
    switch (action.type) {
      case "LOGIN_USER_PENDING":
        return {
          ...prevState,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "LOGIN_USER_REJECTED":
        return {
          ...prevState,
          isPending: false,
          isRejected: true,
          LoginUserData: action.payload.data
        };
      case "LOGIN_USER_FULFILLED":
        return {
          ...prevState,
          isPending: false,
          isFulfilled: true,
          LoginUserData: action.payload.data
        };
      default:
        return prevState;
    }
  }
  
  export default loginUserReduces;