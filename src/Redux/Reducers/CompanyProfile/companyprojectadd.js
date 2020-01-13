const initialState = {
    companyProjectAddData: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false
  }
  
  const addProjectCompanyReduces = (prevState = initialState, action) => {
    switch (action.type) {
      case "ADD_PROJECT_COMPANY_PENDING":
        return {
          ...prevState,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "ADD_PROJECT_COMPANY_REJECTED":
        return {
          ...prevState,
          isPending: false,
          isRejected: true
        };
      case "ADD_PROJECT_COMPANY_FULFILLED":
        return {
          ...prevState,
          isPending: false,
          isFulfilled: true,
          companyProjectAddData: action.payload.data
        };
      default:
        return prevState;
    }
  }
  
  export default addProjectCompanyReduces;