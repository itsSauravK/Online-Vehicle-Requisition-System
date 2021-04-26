import axios from 'axios';
import { enqueueSnackbar } from '../alert/alert.actions';

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
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ADMIN_GET_USERS_REQUEST,
  ADMIN_GET_USERS_SUCCESS,
  ADMIN_GET_USERS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
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

    dispatch(
      enqueueSnackbar({
        message: 'Please check your inbox for verification',
        options: { variant: 'info' },
      })
    );
  } catch (error) {
    const errorMsg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: REGISTER_FAIL,
      payload: errorMsg,
    });

    dispatch(
      enqueueSnackbar({
        message: errorMsg,
        options: { variant: 'error' },
      })
    );
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

    dispatch(
      enqueueSnackbar({
        message: errorMsg,
        options: { variant: 'error' },
      })
    );
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
};

export const verifyAccount = (verificationToken) => async (dispatch) => {
  try {
    dispatch({ type: VERIFY_REQUEST });

    await axios.put(`/api/users/verify/${verificationToken}`);

    dispatch({ type: VERIFY_SUCCESS });

    dispatch(
      enqueueSnackbar({
        message: 'Your email has been verified. Please log in.',
        options: { variant: 'success' },
      })
    );
  } catch (error) {
    const errorMsg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: VERIFY_FAIL,
      payload: errorMsg,
    });

    dispatch(
      enqueueSnackbar({
        message: errorMsg,
        options: { variant: 'error' },
      })
    );
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios.put('/api/users/forgot-password', { email }, config);

    dispatch({ type: FORGOT_PASSWORD_SUCCESS });

    dispatch(
      enqueueSnackbar({
        message: 'An email with password reset link has been sent!',
        options: { variant: 'success' },
      })
    );
  } catch (error) {
    const errorMsg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: errorMsg,
    });

    dispatch(
      enqueueSnackbar({
        message: errorMsg,
        options: { variant: 'error' },
      })
    );
  }
};

export const getAllUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_GET_USERS_REQUEST });

    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.get('/api/users/', config);

    dispatch({ type: ADMIN_GET_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resetPassword = (password, resetToken) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `/api/users/reset-password/${resetToken}`,
      { password },
      config
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS });

    dispatch(
      enqueueSnackbar({
        message: 'Your password has been changed',
        options: { variant: 'success' },
      })
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const errorMsg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: errorMsg,
    });

    dispatch(
      enqueueSnackbar({
        message: errorMsg,
        options: { variant: 'error' },
      })
    );
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/profile`, formData, config);

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });

    dispatch(
      enqueueSnackbar({
        message: 'Profile updated!',
        options: { variant: 'success' },
      })
    );
  } catch (error) {
    const errorMsg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: errorMsg,
    });

    dispatch(
      enqueueSnackbar({
        message: errorMsg,
        options: { variant: 'error' },
      })
    );
  }
};

export const updateUser = (updatedUser) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/users/${updatedUser._id}`,
      updatedUser,
      config
    );

    dispatch({ type: USER_UPDATE_SUCCESS });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });

    dispatch(
      enqueueSnackbar({
        message: 'Successfully updated user!',
        options: { variant: 'success' },
      })
    );
  } catch (error) {
    const errorMsg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: USER_UPDATE_FAIL,
      payload: errorMsg,
    });

    dispatch(
      enqueueSnackbar({
        message: errorMsg,
        options: { variant: 'error' },
      })
    );
  }
};
