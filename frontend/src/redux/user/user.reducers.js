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

export const userRegisterReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_REQUEST:
      return { loading: true };
    case REGISTER_SUCCESS:
      return { loading: false, user: payload };
    case REGISTER_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_REQUEST:
      return { loading: true };
    case LOGIN_SUCCESS:
      return { loading: false, user: payload };
    case LOGIN_FAIL:
      return { loading: false, error: payload };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userVerifyReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case VERIFY_REQUEST:
      return { loading: true };
    case VERIFY_SUCCESS:
      return { loading: false, success: true };
    case VERIFY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ADMIN_GET_USERS_REQUEST:
      return { loading: true };
    case ADMIN_GET_USERS_SUCCESS:
      return { loading: false, users: action.payload };
    case ADMIN_GET_USERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { userDetails: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, userDetails: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { userDetails: {} };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userDetails: action.payload };
    case UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return { user: {} };
    default:
      return state;
  }
};
