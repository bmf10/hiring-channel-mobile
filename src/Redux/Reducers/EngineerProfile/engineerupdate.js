const initialState = {
    engineerUpdateData: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false
  }
  
  const engineerUpdateUserReduces = (prevState = initialState, action) => {
    switch (action.type) {
      case "UPDATE_ENGINEER_PROFILE_PENDING":
        return {
          ...prevState,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "UPDATE_ENGINEER_PROFILE_REJECTED":
        return {
          ...prevState,
          isPending: false,
          isRejected: true
        };
      case "UPDATE_ENGINEER_PROFILE_FULFILLED":
        return {
          ...prevState,
          isPending: false,
          isFulfilled: true,
          engineerUpdateData: action.payload.data
        };
      default:
        return prevState;
    }
  }
  
  export default engineerUpdateUserReduces;