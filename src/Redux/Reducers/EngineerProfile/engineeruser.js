const initialState = {
  engineerUserData: [],
  isPending: false,
  isRejected: false,
  isFulfilled: false
}

const engineerUserReduces = (prevState = initialState, action) => {
  switch (action.type) {
    case "GET_ENGINEER_PROFILE_PENDING":
      return {
        ...prevState,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "GET_ENGINEER_PROFILE_REJECTED":
      return {
        ...prevState,
        isPending: false,
        isRejected: true
      };
    case "GET_ENGINEER_PROFILE_FULFILLED":
      return {
        ...prevState,
        isPending: false,
        isFulfilled: true,
        engineerUserData: action.payload.data
      };
    default:
      return prevState;
  }
}

export default engineerUserReduces;