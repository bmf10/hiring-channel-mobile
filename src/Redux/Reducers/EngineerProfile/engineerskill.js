const initialState = {
  engineerSkillData: [],
  isPending: false,
  isRejected: false,
  isFulfilled: false
}

const engineerSkillReduces = (prevState = initialState, action) => {
  switch (action.type) {
    case "GET_SKILL_ENGINEER_PENDING":
      return {
        ...prevState,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "GET_SKILL_ENGINEER_REJECTED":
      return {
        ...prevState,
        isPending: false,
        isRejected: true
      };
    case "GET_SKILL_ENGINEER_FULFILLED":
      return {
        ...prevState,
        isPending: false,
        isFulfilled: true,
        engineerSkillData: action.payload.data
      };
    default:
      return prevState;
  }
}

export default engineerSkillReduces;