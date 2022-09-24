import {
    GET_ROLES_DATA,GET_ERRORS,DELETE_ROLE_DATA,CREATE_ROLE_DATA,EDIT_ROLE_DATA,GET_SINGLE_ROLE_DATA,
    GET_ROLES_DATA_LEVEL_WISE,
    GET_SIDEBAR_ROLES_DATA,
    GET_PERMISSIONS_DATA
} from "../Constants";

import axios from 'axios';
import {BASE_URL} from '../Constants';
import authHeader from "../utils/AuthHeader";
import {Authorization} from "../utils/CheckAuthorization";
import {getProfileDetails} from "./Auth";

// get All Role data
export const getRolesData = (flag=true) => (dispatch) => {
    axios
    .get(BASE_URL+'/roles/?group_by='+flag,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : GET_ROLES_DATA,
                payload : response.data
            })
        }
    })
    .catch(error => {
        if(error.response && error.response.status && error.response.status === 400){
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

// get All Role  data levelwise
export const getRolesDataLevelWise = (level) => (dispatch) => {
    axios
    .get(BASE_URL+'/roles/?level='+level,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : GET_ROLES_DATA_LEVEL_WISE,
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

// get All Role data for sidebar
export const getRolesDataForSidebar = () => (dispatch) => {
    axios
    .get(BASE_URL+'/roles/',{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : GET_SIDEBAR_ROLES_DATA,
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


// get single role data
export const getSingleRoleData = (id) => (dispatch) => {
    axios
    .get(BASE_URL+`/roles/${id}`,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : GET_SINGLE_ROLE_DATA,
                payload : response.data
            })
        }
    })
    .catch(error => {
        if(error.response && error.response.status && error.response.status === 400){
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

// create role
export const createRoleData = (data) => (dispatch) => {
    axios
    .post(BASE_URL+`/roles/`,data,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 201){
            dispatch({
                type : CREATE_ROLE_DATA,
                payload : response.data
            })
            dispatch(getRolesDataForSidebar())
            let user_data = JSON.parse(decodeURIComponent(localStorage.getItem('user_data')));
            let token = user_data.key
            dispatch(getProfileDetails(token))
        }
    })
    .catch(error => {
        if(error.response && error.response.status && error.response.status === 400){
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

// edit role
export const editRoleData = (data) => (dispatch) => {
    axios
    .put(BASE_URL+`/roles/${data.id}/`,data,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : EDIT_ROLE_DATA,
                payload : response.data
            })
            dispatch(getRolesDataForSidebar())
            let user_data = JSON.parse(decodeURIComponent(localStorage.getItem('user_data')));
            let token = user_data.key
            dispatch(getProfileDetails(token))
        }
    })
    .catch(error => {
        if(error.response && error.response.status && error.response.status === 400){
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

// delete single role data
export const deleteRoleData = (id,flag) => (dispatch) => {
    axios
    .delete(BASE_URL+`/roles/${id}/`,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 204){
            dispatch({
                type : DELETE_ROLE_DATA,
                payload : response
            })
            dispatch(getRolesData(flag))
            dispatch(getRolesDataForSidebar())
        }
    })
    .catch(error => {
        if(error.response && error.response.status && error.response.status === 400){
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

//get permissions
export const getPermissions = () => (dispatch) => {
    axios
    .get(BASE_URL+'/permissions/',{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : GET_PERMISSIONS_DATA,
                payload : response.data
            })
        }
    })
    .catch(error => {
        if(error.response && error.response.status && error.response.status === 400){
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