import {
    GET_FEDERAL_DATA,
    SINGLE_FEDERAL_DATA,
    SINGLE_FEDERAL_SINGLE_DATA,
    GET_ERRORS,
    DELETE_FEDERAL_SINGLE_DATA,
    SINGLE_INVITED_FEDERAL_DATA
} from "../Constants";
import axios from 'axios';
import {BASE_URL} from '../Constants';
import authHeader from "../utils/AuthHeader";
import {Authorization} from "../utils/CheckAuthorization";

// get All Federal data
export const getFederalData = () => (dispatch) => {
    axios
    .get(BASE_URL+'/federals/',{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : GET_FEDERAL_DATA,
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

// get Single fedaral all --membership permenant
export const getSingleFederalData = (id) => (dispatch) => {
    axios
    .get(BASE_URL+`/federals/${id}/users?membership=PERMANENT`,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : SINGLE_FEDERAL_DATA,
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

// get Single fedaral all --membership invited
export const getSingleFederalInvitedData = (id) => (dispatch) => {
    axios
    .get(BASE_URL+`/federals/${id}/users?membership=INVITED`,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : SINGLE_INVITED_FEDERAL_DATA,
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

// get Single fedaral Single user
export const getSingleFederalUserData = (id,FederalId) => (dispatch) => {
    axios
    .get(BASE_URL+`/federals/${FederalId}/users/${id}/`,{
        headers : authHeader(),
    })
    .then(response => { 
        if(response.status === 200){
            dispatch({
                type : SINGLE_FEDERAL_SINGLE_DATA,
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

// Delete Single fedaral Single user
export const deleteSingleUserData = (id,FederalId) => (dispatch) => {
    axios
    .delete(BASE_URL+`/federals/${FederalId}/users/${id}/`,{
        headers : authHeader(),
    })
    .then(response => { 
        if(response.status === 204){
            dispatch({
                type : DELETE_FEDERAL_SINGLE_DATA,
                payload : response
            })
            dispatch(getSingleFederalData(FederalId))
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

