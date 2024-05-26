import { USER_FAILURE, USER_REQUEST, USER_SUCCESS } from "../action/keepLogin";

const initialState = {
  loading: false,
  user: [],
  error: null,
};

const keepLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };
    case USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default keepLoginReducer;
