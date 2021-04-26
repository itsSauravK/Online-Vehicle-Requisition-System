import { combineReducers } from 'redux';
import {
  userRegisterReducer,
  userLoginReducer,
  userVerifyReducer,
  userListReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from './user/user.reducers';

import {
  orderCreateReducer,
  orderListMyReducer,
  orderDetailsReducer,
  orderListReducer,
  orderPayReducer,
  orderDispatchReducer,
  shippingAddressReducer,
} from './order/order.reducers';

import alert from './alert/alert.reducers';

export default combineReducers({
  alert,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userVerify: userVerifyReducer,
  userList: userListReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateProfileReducer,
  userEdit: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderListMy: orderListMyReducer,
  orderDetails: orderDetailsReducer,
  orderList: orderListReducer,
  orderPay: orderPayReducer,
  orderDispatch: orderDispatchReducer,
  shippingAddress: shippingAddressReducer,
});
