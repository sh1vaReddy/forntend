import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCESS,
  CLEAR_ERROR,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCESS,
} from "../Constants/Contants";
import axios from "axios";

export const getproduct = (keyword="",curentPage=1,price=[0,2500],category) => async (dispatch) => {
  try {
    dispatch({
      type: ALL_PRODUCT_REQUEST,
    });
    let link=`/api/v1/product?keyword=${keyword}&page=${curentPage}&price[gte]=${price[0]}&price[lt]=${price[1]}`

    if(category)
    {
       link=`/api/v1/product?keyword=${keyword}&page=${curentPage}&price[gte]=${price[0]}&price[lt]=${price[1]}&category=${category}`
    }
    const { data } = await axios.get(link);
    dispatch({
      type: ALL_PRODUCT_SUCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getproductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCESS,
      payload: data.product,
      
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
