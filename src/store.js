import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productReducers ,productDetailsReducers} from "./Reducers/productreducers";
import {profileReducer, userReucer} from './Reducers/usereducers';
import { cartreducer } from "./Reducers/cartreducers";

const reducer = combineReducers({
  products: productReducers,
  productDetails:productDetailsReducers,
  user:userReucer,
  profile:profileReducer,
  cart:cartreducer,
});




let cartItemsFromLocalStorage = (localStorage.getItem('cartitem'));

if (cartItemsFromLocalStorage) {
  try {
    cartItemsFromLocalStorage = JSON.parse(cartItemsFromLocalStorage);
  } catch (error) {
    console.error('Error parsing cart items from local storage:', error);
    cartItemsFromLocalStorage = [];
  }
} else {
  cartItemsFromLocalStorage = []; 
}

const initialState = {
  cart: {
    cartItems: [],
    shippinginfo: localStorage.getItem("shippinginfo")
    ? JSON.parse(localStorage.getItem("shippinginfo"))
    : {},
  },
};



const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;