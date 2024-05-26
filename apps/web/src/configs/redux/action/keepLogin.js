import axios from "axios";

export const USER_REQUEST = "USER_REQUEST";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_FAILURE = "USER_FAILURE";

export const userRequest = () => ({
  type: USER_REQUEST,
});
export const userSuccess = () => ({
  type: USER_SUCCESS,
});
export const userFailure = () => ({
  type: USER_FAILURE,
});

export const keepLoginAction = () => {
  return async (dispatch) => {
    dispatch(userRequest());
    try {
      const response = await axios.get("http://localhost:3000/v1/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(userSuccess(response.data));
    } catch (error) {
      dispatch(userFailure(error.message));
    }
  };
};
