import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginRequest = () => ({
  type: LOGIN_REQUEST
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error
});

export const loginAction = (email, password, role) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await axios.post(`${import.meta.env.VITE_URL_BLANJA}/login`, {
        email,
        password,
        role,
      });
      if (response.status === 200) {
        const { token, refreshToken } = response.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        dispatch(loginSuccess(response.data));
        alert('Login success!');
      } else {
        dispatch(loginFailure('Login failed. Please try again.'));
        alert('Your Email & Password is false. Please try again.');
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
      alert('Your Email & Password is false. Please try again.');
    }
  };
};
