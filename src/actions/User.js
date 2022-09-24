import {
    GET_USER_DATA,
    SAVE_USER_DATA,
    UPDATE_USER_DATA,
    GET_ERRORS,
    GET_SINGLE_USER_DATA,
    DELETE_SINGLE_USER_DATA,
    USERS_BULK_ACTION,
    FEDERAL_ID,
    GET_SEARCH_USER_DATA,
    UPDATE_SINGLE_USER_PROFILE_DATA,
    DOWNLOAD_DATA,
    ENTITIES_BULK_DELETE
} from "../Constants";
import axios from 'axios';
import {BASE_URL} from '../Constants';
import authHeader from "../utils/AuthHeader";
import {Authorization} from "../utils/CheckAuthorization";
import { getSingleFederalData } from "./Federal";
import { getSingleRegionUser, getRegionsData } from "./Region";
import { getWoredaUser, getWoredasData } from "./Woreda";
import { schoolUserData, getSchoolsData } from "./School";
import fs from 'fs';

// get All profiles data
export const getUsersData = () => (dispatch) => {
    axios
    .get(BASE_URL+'/profiles/?limit=10000&offset=0',{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : GET_USER_DATA,
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

// get single region data
export const getSingleUser = (id) => (dispatch) => {
    axios
    .get(BASE_URL+`/profiles/${id}/`,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : GET_SINGLE_USER_DATA,
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

// delete single region data
export const getDeleteUser = (id) => (dispatch) => {
    axios
    .delete(BASE_URL+`/profiles/${id}/`,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 204){
            dispatch({
                type : DELETE_SINGLE_USER_DATA,
                payload : response
            })
            dispatch(getUsersData())
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

// add profile data
export const addProfileData = (userData,id,paramName) => (dispatch) => {
    let name  = userData.first_name.substring(0,3).toLowerCase();
    let phone_num = userData.phone_number.toString().slice(-6)
    // userData.username = makeid(5)
    // userData.password = userData.username
    userData.username = name+phone_num
    userData.password = name+phone_num
    axios
    .post(BASE_URL+'/profiles/',userData,{
        headers : authHeader()
    })
    .then(response => {
        if(response.status === 201){
            
            if(id !== undefined && id !== 'undefined'){
                if(paramName === "schools"){
                    let data = [{
                        "profile": response.data.id,
                        "school": id
                    }]
                    dispatch(addUserData(data,id,paramName))
                }
                else if(paramName === "woreda"){
                    let data = [{
                        "profile": response.data.id,
                        "woreda": id
                    }]
                    dispatch(addUserData(data,id,'woredas'))
                }
                else if(paramName === "regions"){
                    let data = [{
                        "profile": response.data.id,
                        "region": id
                    }]
                    dispatch(addUserData(data,id,paramName))
                }
                else if(paramName === "federals"){
                    let data = [{
                        "profile": response.data.id,
                        "federal": id
                    }]
                    dispatch(addUserData(data,id,paramName))
                }
            }
        }
    })
    .catch(error => {
        if(error && error.response && error.response.status === 400){
            dispatch({
                type:'GET_ERRORS',
                payload : error.response.data
            })
        }
        else{
            Authorization(error && error.response && error.response.status,dispatch)
        }
    })
};

//call this function after saving profile =>save school user
export const addUserData = (data,id,name) => (dispatch) => {
    axios
    .post(BASE_URL+'/'+name+'/'+id+'/users/',data,{
        headers : authHeader()
    })
    .then(response => {
        if(response.status === 201){
            dispatch({
                type : SAVE_USER_DATA,
                payload : response.data
            })
            dispatch(getUsersData())
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

// update profile data
export const updateProfileData = (userData) => (dispatch) => {
    // userData.username = makeid(5)
    // userData.password = userData.username
    // let name  = userData.first_name.substring(0,2).toLowerCase();
    // let phone_num = userData.phone_number.toString().slice(-6)
    userData.username = userData.username
    userData.password =userData.username
    axios
    .patch(BASE_URL+`/profiles/${userData.id}/`,userData,{
        headers : authHeader()
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : UPDATE_USER_DATA,
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

//random string 
// function makeid(length) {
//     var result           = '';
//     var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     var charactersLength = characters.length;
//     for ( var i = 0; i < length; i++ ) {
//       result += characters.charAt(Math.floor(Math.random() * 
//  charactersLength));
//    }
//    return result;
// }

//bulk action
export const bulkAction = (data,url,id) => (dispatch) => {
    axios
    .post(BASE_URL+`/profiles/bulk_action/`,data,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : USERS_BULK_ACTION,
                payload : response
            })
            if(url === "federal"){
                dispatch(getSingleFederalData(id))
            }
            else if(url === "region"){
                dispatch(getSingleRegionUser(id))
            }
            else if(url === "woreda"){
                dispatch(getWoredaUser(id))
            }
            else if(url === "school"){
                dispatch(schoolUserData(id))
            }
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

export const entityBulkDelete = (entity,data) => (dispatch) => {
    axios
    .post(BASE_URL+`/${entity}/bulk_delete/`,data,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : ENTITIES_BULK_DELETE,
                payload : response
            })
            if(entity === "regions"){
                dispatch(getRegionsData())
            }
            else if(entity === "woredas"){
                dispatch(getWoredasData())
                
            }
            else if(entity === "schools"){
                dispatch(getSchoolsData())
            }
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

//remove bul action
export const removeBulkAction = () => (dispatch) => {
    dispatch({
        type : USERS_BULK_ACTION,
        payload : ''
    })
        
}

//search users data
export const searchUsersData = (searchData) => (dispatch) => {
    axios
    .get(BASE_URL+'/profiles/?search='+searchData,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : GET_SEARCH_USER_DATA,
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


export const updateSingleUser = (id,data) => (dispatch) => {
    axios
    .patch(BASE_URL+`/profiles/${id}/`,data,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : UPDATE_SINGLE_USER_PROFILE_DATA,
                payload : response
            })
            dispatch(getSingleUser(id))
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

//download API
export const downloadLists = (token,type) => (dispatch) => {
    axios
    .get(BASE_URL+'/download/?entity='+type,{
        headers : {Authorization : 'token ' + token,'Content-Type': 'blob'},
        responseType: 'arraybuffer'
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : DOWNLOAD_DATA,
                payload : response.data
            })
            // type = type
            if(type === "all-others"){
                type = "users"
            }
            const outputFilename = `${type}_${Date.now()}.xls`;

            // If you want to download file automatically using link attribute.
            const url = URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', outputFilename);
            document.body.appendChild(link);
            link.click();

            // OR you can save/write file locally.
            fs.writeFileSync(outputFilename, response.data);
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

//bulk upload API
export const bulkUpload = (data,entity) => (dispatch) => {
    axios
    .post(BASE_URL+'/upload/',data,{
        headers : authHeader()
    })
    .then(response => {
        // console.log(response,'res1')
        if(response.status === 200 && response.data.status === "pass"){
            // console.log(data)
            if(entity === "users"){
                dispatch(getUsersData())
            }
            else if(entity === "regions"){
                dispatch(getRegionsData())
            }
            else if(entity === "woredas"){
                dispatch(getWoredasData())
            }
            else if(entity === "schools"){
                dispatch(getSchoolsData())
            }
        }
        else{
            // console.log(response,'res')
            if(response.data.status === "failed"){
                dispatch({
                    type:'GET_ERRORS',
                    payload : response.data
                })
            }
        }
    })
    .catch(error => {
        if(error && error.response && error.response.status === 400){
            dispatch({
                type:'GET_ERRORS',
                payload : error.response.data
            })
        }
        else{
            Authorization(error && error.response && error.response.status,dispatch)
        }
    })
};