import {
    GET_REGIONS_DATA,SAVE_REGIONS_DATA,GET_REGION_DATA,DELETE_REGION_DATA,UPDATE_REGION_DATA,GET_ERRORS,SINGLE_REGION_USERS_DATA,SINGLE_DATA_FOR_REGION_USER,SINGLE_DELETE_FOR_REGION_USER,SINGLE_INVITED_REGION_USERS_DATA
} from "../Constants";
import axios from 'axios';
import {BASE_URL} from '../Constants';
import authHeader from "../utils/AuthHeader";
import {Authorization} from "../utils/CheckAuthorization";

// get All region data
export const getRegionsData = () => (dispatch) => {
    axios
    .get(BASE_URL+'/regions/',{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : GET_REGIONS_DATA,
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
            Authorization(error && error.response && error.response.statuss,dispatch)
        }
    })
};

// post region data
export const postRegionData = (regiondata) => (dispatch) => {
    axios
    .post(BASE_URL+'/regions/',regiondata,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 201){
            response.data.statusCode = response.status
            dispatch({
                type : SAVE_REGIONS_DATA,
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
            Authorization(error && error.response && error.response.status,dispatch)
        }
    })
};

// get single region data
export const getSingleRegionData = (id) => (dispatch) => {
    axios
    .get(BASE_URL+`/regions/${id}`,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : GET_REGION_DATA,
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
            Authorization(error && error.response && error.response.status,dispatch)
        }
    })
};

// delete data
export const DeleteRegionData = (id) => (dispatch) => {
    axios
    .delete(BASE_URL+`/regions/${id}/`,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200 || response.status === 204){
            dispatch({
                type : DELETE_REGION_DATA,
                payload : response
            })
            dispatch(getRegionsData())
        }
    })
    .catch(error => {
        if(error && error.response && (error.response.status === 500 || error.response.status === 500)){
            dispatch({
                type: GET_ERRORS,
                payload : error.response
            })
            dispatch(getRegionsData())
        }
        else{
            Authorization(error && error.response && error.response.status,dispatch)
        }
    })
};

// Update data
export const UpdateRegionData = (data) => (dispatch) => {
    axios
    .put(BASE_URL+`/regions/${data.id}/`,data,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : UPDATE_REGION_DATA,
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

// get single region user 
export const getSingleRegionUser = (id) => (dispatch) => {
    axios
    .get(BASE_URL+`/regions/${id}/users?membership=PERMANENT`,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : SINGLE_REGION_USERS_DATA,
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
            Authorization(error && error.response && error.response.status,dispatch)
        }
    })
};

// get Single fedaral all --membership invited
export const getSingleRegionInvitedData = (id) => (dispatch) => {
    axios
    .get(BASE_URL+`/regions/${id}/users?membership=INVITED`,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : SINGLE_INVITED_REGION_USERS_DATA,
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
            Authorization(error && error.response && error.response.status,dispatch)
        }
    })
};

// get single region single user
export const singleDataForRegionUser = (id) => (dispatch) => {
    axios
    .get(BASE_URL+`/regions/${id.regionId}/users/${id.userId}/`,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : SINGLE_DATA_FOR_REGION_USER,
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
            Authorization(error && error.response && error.response.status,dispatch)
        }
    })
};

// get single region single user
export const singleDeleteForRegionUser = (id) => (dispatch) => {
    axios
    .delete(BASE_URL+`/regions/${id.regionId}/users/${id.userId}/`,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 204){
            dispatch({
                type : SINGLE_DELETE_FOR_REGION_USER,
                payload : response
            })
            dispatch(getSingleRegionUser(id.regionId))
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
            if(error.response){
                Authorization(error && error.response && error.response.status,dispatch)
            }
        }
    })
};