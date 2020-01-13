const initialState = {
    companyUserData: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false
  }
  
  const companyUserReduces = (prevState = initialState, action) => {
    switch (action.type) {
      case "GET_COMPANY_PROFILE_PENDING":
        return {
          ...prevState,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "GET_COMPANY_PROFILE_REJECTED":
        return {
          ...prevState,
          isPending: false,
          isRejected: true
        };
      case "GET_COMPANY_PROFILE_FULFILLED":
        return {
          ...prevState,
          isPending: false,
          isFulfilled: true,
          companyUserData: action.payload.data
        };
      default:
        return prevState;
    }
  }
  
  export default companyUserReduces;