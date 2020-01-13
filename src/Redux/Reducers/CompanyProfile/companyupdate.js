const initialState = {
    companyUpdateData: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false
  }
  
  const companyUpdateUserReduces = (prevState = initialState, action) => {
    switch (action.type) {
      case "UPDATE_COMPANY_PROFILE_PENDING":
        return {
          ...prevState,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "UPDATE_COMPANY_PROFILE_REJECTED":
        return {
          ...prevState,
          isPending: false,
          isRejected: true
        };
      case "UPDATE_COMPANY_PROFILE_FULFILLED":
        return {
          ...prevState,
          isPending: false,
          isFulfilled: true,
          companyUpdateData: action.payload.data
        };
      default:
        return prevState;
    }
  }
  
  export default companyUpdateUserReduces;