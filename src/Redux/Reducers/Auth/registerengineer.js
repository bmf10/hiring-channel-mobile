const initialState = {
    RegisterEngineerData: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false
  }
  
  const registerEngineerReduces = (prevState = initialState, action) => {
    switch (action.type) {
      case "REGISTER_ENGINEER_PENDING":
        return {
          ...prevState,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "REGISTER_ENGINEER_REJECTED":
        return {
          ...prevState,
          isPending: false,
          isRejected: true
        };
      case "REGISTER_ENGINEER_FULFILLED":
        return {
          ...prevState,
          isPending: false,
          isFulfilled: true,
          RegisterEngineerData: action.payload.data
        };
      default:
        return prevState;
    }
  }
  
  export default registerEngineerReduces;