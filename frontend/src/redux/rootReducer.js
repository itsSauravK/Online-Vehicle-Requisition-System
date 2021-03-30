import { combineReducers } from 'redux';
import {
  userRegisterReducer,
  userLoginReducer,
  userVerifyReducer,
} from './user/user.reducers';

export default combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userVerify: userVerifyReducer,
});
