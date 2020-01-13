const initialState = {
    RegisterCompanyData: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false
  }
  
  const registerCompanyReduces = (prevState = initialState, action) => {
    switch (action.type) {
      case "REGISTER_COMPANY_PENDING":
        return {
          ...prevState,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "REGISTER_COMPANY_REJECTED":
        return {
          ...prevState,
          isPending: false,
          isRejected: true
        };
      case "REGISTER_COMPANY_FULFILLED":
        return {
          ...prevState,
          isPending: false,
          isFulfilled: true,
          RegisterCompanyData: action.payload.data
        };
      default:
        return prevState;
    }
  }
  
  export default registerCompanyReduces;