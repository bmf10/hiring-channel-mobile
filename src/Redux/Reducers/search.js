const initialState = {
    searchData: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false
  }
  
  const searchReduces = (prevState = initialState, action) => {
    switch (action.type) {
      case "GET_SEARCH_PENDING":
        return {
          ...prevState,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "GET_SEARCH_REJECTED":
        return {
          ...prevState,
          isPending: false,
          isRejected: true
        };
      case "GET_SEARCH_FULFILLED":
        return {
          ...prevState,
          isPending: false,
          isFulfilled: true,
          searchData: action.payload.data
        };
      default:
        return prevState;
    }
  }
  
  export default searchReduces;