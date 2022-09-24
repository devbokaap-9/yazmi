import {
    GET_ERRORS,
    LOGIN_SUCCESS,
    RESET_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_SUCCESS,
    UPDATE_PROFILE_DATA,
    TOASTER_HIDE_SHOW,
} from "../Constants";
import axios from 'axios';
import {BASE_URL} from '../Constants';
import authHeader from "../utils/AuthHeader";
import {Authorization} from "../utils/CheckAuthorization";

//login API --> /rest-auth/login/
export const loginAPI = (loginData) => (dispatch) => {
    axios
    .post(BASE_URL+'/rest-auth/login/',loginData)
    .then(response => {
        if(response.status === 200){
            //localStorage.setItem('user_data',response.data.key)
            dispatch(getProfileDetails(response.data.key))
        }
    })
    .catch(error => {
        if(error && error.response && error.response.status === 400){
            dispatch({
                type:GET_ERRORS,
                payload : error.response.data
            })
        }   
    })
};

//call immediate after login API to get profile details --> /me/
export const getProfileDetails = (token) => (dispatch) => {
    axios
    .get(BASE_URL+'/me/',{
        headers : {Authorization : 'token ' + token},
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : LOGIN_SUCCESS,
                payload : response.data
            })
        }
    })
    .catch(error => {
        if(error && error.response && error.response.status === 400){
            dispatch({
                type: GET_ERRORS,
                payload : error.response.data
            })
        }
    })
};

//Password change API --> /rest-auth/password-change/
export const resetPasswordAPI = (data,token) => (dispatch) => {
    axios
    .post(BASE_URL+'/rest-auth/password-change/',data,{
        headers : {Authorization : 'token ' + token},
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : RESET_PASSWORD_SUCCESS,
                payload : response.data
            })
        }
    })
    .catch(error => {
        if(error && error.response && error.response.status === 400){
            dispatch({
                type:GET_ERRORS,
                payload : error.response.data
            })
        }   
    })
};


//Password reset API for forget password--> /rest-auth/password-reset/
export const forgotPasswordAPI = (data) => (dispatch) => {
    axios
    .post(BASE_URL+'/rest-auth/password-reset/',data)
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : FORGOT_PASSWORD_SUCCESS,
                payload : response.data
            })
        }
    })
    .catch(error => {
        if(error && error.response && (error.response.status === 400 || error.response.status === 401)){
            dispatch({
                type:'GET_ERRORS',
                payload : error.response.data
            })
        }  
    })
};

export const removeForgotPasswordRes = () => (dispatch) => {
    dispatch({
        type : FORGOT_PASSWORD_SUCCESS,
        payload : ''
    })
};

//Logout API --> /rest-auth/logout/
export const logoutAPI = () => (dispatch) => {
    axios
    .post(BASE_URL+'/rest-auth/logout/',{},{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            localStorage.removeItem('user_data')
            localStorage.removeItem('user_permissions')
            localStorage.removeItem('last_log_in_as')
            // localStorage.removeItem('username')
            window.location.href = '/'
        }
        
    })
    .catch(error => {
        Authorization(error && error.response && error.response.status,dispatch)
    })
};

//update profile API
export const updateProfileData = (token,profileId,data) => (dispatch) => {
    axios
    .patch(BASE_URL+`/profiles/${profileId}/`,data,{
        headers : {Authorization : 'token ' + token},
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : UPDATE_PROFILE_DATA,
                payload : response.data
            })
            dispatch(getProfileDetails(token))
        }
    })
    .catch(error => {
        Authorization(error && error.response && error.response.status,dispatch)
    })
};

export const showToaster = () => (dispatch) => {
    dispatch({
        type : TOASTER_HIDE_SHOW,
        payload : true
    })
};

export const hideToaster = () => (dispatch) => {
    dispatch({
        type : TOASTER_HIDE_SHOW,
        payload : false
    })
};


