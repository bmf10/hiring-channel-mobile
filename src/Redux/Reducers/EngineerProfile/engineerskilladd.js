const initialState = {
    engineerSkillAddData: [],
    isPending: false,
    isRejected: false,
    isFulfilled: false
  }
  
  const addSkillEngineerReduces = (prevState = initialState, action) => {
    switch (action.type) {
      case "ADD_SKILL_ENGINEER_PENDING":
        return {
          ...prevState,
          isPending: true,
          isRejected: false,
          isFulfilled: false
        };
      case "ADD_SKILL_ENGINEER_REJECTED":
        return {
          ...prevState,
          isPending: false,
          isRejected: true
        };
      case "ADD_SKILL_ENGINEER_FULFILLED":
        return {
          ...prevState,
          isPending: false,
          isFulfilled: true,
          engineerSkillAddData: action.payload.data
        };
      default:
        return prevState;
    }
  }
  
  export default addSkillEngineerReduces;