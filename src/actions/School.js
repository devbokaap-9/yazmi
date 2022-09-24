import {
    GET_SCHOOLS_DATA,
    DELETE_SCHOOL_DATA,
    SAVE_SCHOOLS_DATA,
    SCHOOL_USER_DATA,
    DELETE_SCHOOL_USER_DATA,
    GET_SINGLE_SCHOOL_DATA,
    UPDATE_SCHOOL_DATA,
    SINGLE_SCHOOL_USER_DATA,
    SCHOOL_INVITED_USER_DATA,
    GET_ERRORS
} from "../Constants";
import axios from 'axios';
import {BASE_URL} from '../Constants';
import authHeader from "../utils/AuthHeader";
import {Authorization} from "../utils/CheckAuthorization";

// get All Schools data
export const getSchoolsData = () => (dispatch) => {
    axios
    .get(BASE_URL+'/schools/',{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : GET_SCHOOLS_DATA,
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
        else{
            if(error && error.response && error.response.status){
                Authorization(error.response.status,dispatch)
            }
        }
    })
};

// delete single school data
export const deleteSchoolData = (id) => (dispatch) => {
    axios
    .delete(BASE_URL+`/schools/${id}`,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200 || response.status === 204){
            dispatch({
                type : DELETE_SCHOOL_DATA,
                payload : response
            })
            dispatch(getSchoolsData())
        }
    })
    .catch(error => {
        if(error && error.response && (error.response.status === 400 || error.response.status === 500)){
            dispatch({
                type:GET_ERRORS,
                payload : error.response
            })
        }
        else{
            Authorization(error && error.response && error.response.status,dispatch)
        }
    })
};

//add school data
export const addSchoolData = (schoolData) => (dispatch) => {
    axios
    .post(BASE_URL+'/schools/',schoolData,{
        headers : authHeader()
    })
    .then(response => {
        if(response.status === 201){
            dispatch({
                type : SAVE_SCHOOLS_DATA,
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
        else{
            Authorization(error && error.response && error.response.status,dispatch)
        }
    })
}; 

// school user
export const schoolUserData = (id) => (dispatch) => {
    axios
    .get(BASE_URL+`/schools/${id}/users?membership=PERMANENT`,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200 ){
            dispatch({
                type : SCHOOL_USER_DATA,
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
        else{
            Authorization(error && error.response && error.response.status,dispatch)
        }
    })
}; 

// school invited user
export const schoolInvitedUserData = (id) => (dispatch) => {
    axios
    .get(BASE_URL+`/schools/${id}/users?membership=INVITED`,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200 ){
            dispatch({
                type : SCHOOL_INVITED_USER_DATA,
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
        else{
            Authorization(error && error.response && error.response.status,dispatch)
        }
    })
}; 

// delete single school data
export const getSingleSchoolUser = (id) => (dispatch) => {;
    axios
    .get(BASE_URL+`/schools/${id.schoolId}/users/${id.userId}/`,{
        headers : authHeader(),
    })
    .then(response => {
        if( response.status === 200){
            dispatch({
                type : SINGLE_SCHOOL_USER_DATA,
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
        else{
            Authorization(error && error.response && error.response.status,dispatch)
        }
    })
};

// delete single school data
export const deleteSchoolUser = (id) => (dispatch) => {
    axios
    .delete(BASE_URL+`/schools/${id.schoolId}/users/${id.userId}/`,{
        headers : authHeader(),
    })
    .then(response => {
        if( response.status === 204){
            dispatch({
                type : DELETE_SCHOOL_USER_DATA,
                payload : response
            })
            dispatch(schoolUserData(id.schoolId))
        }
    })
    .catch(error => {
        if(error && error.response && (error.response.status === 500 || error.response.status === 400)){
            dispatch({
                type: GET_ERRORS,
                payload : error.response
            })
        }
        else{
            Authorization(error && error.response && error.response.status,dispatch)
        }
    })
};

// get Single School data
export const getSingleSchoolData = (id) => (dispatch) => {
    axios
    .get(BASE_URL+`/schools/${id}`,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : GET_SINGLE_SCHOOL_DATA,
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
        else{
            Authorization(error && error.response && error.response.status,dispatch)
        }
    })
};

//update school data
export const updateSchoolData = (data) => (dispatch) => {
    axios
    .put(BASE_URL+`/schools/${data.id}/`,data,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : UPDATE_SCHOOL_DATA,
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
        else{
            Authorization(error && error.response && error.response.status,dispatch)
        }
    })
};

