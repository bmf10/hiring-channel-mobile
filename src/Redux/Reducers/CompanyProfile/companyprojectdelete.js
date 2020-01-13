const initialState = {
    companyProjectDeleteData: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false
  }
  
  const deleteProjectEngineerReduces = (prevState = initialState, action) => {
    switch (action.type) {
      case "DELETE_PROJECT_COMPANY_PENDING":
        return {
          ...prevState,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "DELETE_PROJECT_COMPANY_REJECTED":
        return {
          ...prevState,
          isPending: false,
          isRejected: true
        };
      case "DELETE_PROJECT_COMPANY_FULFILLED":
        return {
          ...prevState,
          isPending: false,
          isFulfilled: true,
          companyProjectDeleteData: action.payload.data
        };
      default:
        return prevState;
    }
  }
  
  export default deleteProjectEngineerReduces;