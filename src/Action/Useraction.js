import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCESS,
  CLEAR_ERROR,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCESS,
  LOAD_USER_FAIL,LOGOT_SUCESS,LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCESS,
  UPDATE_PASSWORD_FAIL,
} from "../Constants/Userconstnts";
import axios from "axios";

//Login user
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/Login`,
      { email, password },
      config
    );
    dispatch({type:LOGIN_SUCESS,payload:data.user})
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

//Registion user
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({type:REGISTER_USER_REQUEST});
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const {data}=await axios.post(`/api/v1/register`,userData,config);
    dispatch({type:REGISTER_USER_SUCESS,payload:data.user})
  
  } catch (error) {
    dispatch({
      type:REGISTER_USER_FAIL,
      payload:error.response.data.message,

    })
   
  }
};
//loaduser
export const loaduser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.get(
      `/api/v1/me`,
      { },
      config
    );
    dispatch({type:LOAD_USER_SUCESS,payload:data.user})
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

//Logout
export const logout= () => async (dispatch) => {
  try {

     await axios.get( `/api/v1/logout`);
    dispatch({type:LOGOT_SUCESS})
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL , payload: error.response.data.message });
  }
};

export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
  };

//Update profile
export const updateprofile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    // Correct the Content-Type header in the headers object
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.put(`/api/v1/me/update`, userData, config);
    dispatch({ type: UPDATE_PROFILE_SUCESS, payload: data.sucess});
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Update Password
export const updatepassword = (password) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    // Correct the Content-Type header in the headers object
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/v1/password/update`, password, config);
    dispatch({ type: UPDATE_PASSWORD_SUCESS, payload: data.sucess});
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};
  