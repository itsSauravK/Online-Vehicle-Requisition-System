import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducers from './rootReducer';

const userFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// const billingAddressFromStorage = localStorage.getItem('billingAddress')
//   ? JSON.parse(localStorage.getItem('billingAddress'))
//   : {};

// const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
//   ? JSON.parse(localStorage.getItem('shippingAddress'))
//   : {};

const initialState = {
  userLogin: { user: userFromStorage },
  //   billingAddress: billingAddressFromStorage,
  //   shippingAddress: shippingAddressFromStorage,
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
