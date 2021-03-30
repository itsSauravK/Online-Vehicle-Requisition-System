import axios from 'axios';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  VERIFY_FAIL,
} from './user.types';

export const registerUser = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    dispatch({ type: REGISTER_REQUEST });

    const { data } = await axios.post('/api/users/register', formData, config);

    dispatch({ type: REGISTER_SUCCESS, payload: data });
  } catch (error) {
    const errorMsg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: REGISTER_FAIL,
      payload: errorMsg,
    });
  }
};

export const loginUser = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await axios.post('/api/users/login', formData, config);

    dispatch({ type: LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const errorMsg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: LOGIN_FAIL,
      payload: errorMsg,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: LOGOUT });
};

export const verifyAccount = (verificationToken) => async (dispatch) => {
  try {
    dispatch({ type: VERIFY_REQUEST });

    const { data } = await axios.put(`/api/users/verify/${verificationToken}`);

    dispatch({ type: VERIFY_SUCCESS });
  } catch (error) {
    const errorMsg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: VERIFY_FAIL,
      payload: errorMsg,
    });
  }
};
