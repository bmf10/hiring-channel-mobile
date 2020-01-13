const initialState = {
    engineerSkillDeleteData: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false
  }
  
  const deleteSkillEngineerReduces = (prevState = initialState, action) => {
    switch (action.type) {
      case "DELETE_SKILL_ENGINEER_PENDING":
        return {
          ...prevState,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "DELETE_SKILL_ENGINEER_REJECTED":
        return {
          ...prevState,
          isPending: false,
          isRejected: true
        };
      case "DELETE_SKILL_ENGINEER_FULFILLED":
        return {
          ...prevState,
          isPending: false,
          isFulfilled: true,
          engineerSkillDeleteData: action.payload.data
        };
      default:
        return prevState;
    }
  }
  
  export default deleteSkillEngineerReduces;