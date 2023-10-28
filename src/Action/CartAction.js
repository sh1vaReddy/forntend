import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../Constants/CartConstants";
import axios from "axios";

export const addItemsCart = (id, quantity) => async (dispatch, getState) => {
    const data = await axios.get(`/api/v1/product/${id}`);
    const productData = data.data.product;

    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: productData._id,
        name: productData.name,
        price: productData.price,
        image: productData.image,
        stock: productData.stock,
        quantity,
      },
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  } 

  export const removeItemsCart  = (id) => async (dispatch,getState) =>
  {


    dispatch({
      type:REMOVE_CART_ITEM,
      payload:id,
    })
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  }


  export const saveShippingInfo = (data) => (dispatch) => {
    dispatch({
      type: SAVE_SHIPPING_INFO,
      payload:data,
    });
    localStorage.setItem("shippinginfo", JSON.stringify(data));
  };
  