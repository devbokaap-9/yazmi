import {
    GET_SECURITY_QUESTIONS,
    SAVE_SECURITY_QUESTIONS_ANSWER,
    GET_ERRORS
} from "../Constants";
import axios from 'axios';
import {BASE_URL} from '../Constants';
// import authHeader from "../utils/AuthHeader";

// get All Security Questions data
export const getSecurityQuestions = (token) => (dispatch) => {
    axios
    .get(BASE_URL+'/security-questions/')
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : GET_SECURITY_QUESTIONS,
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


// post security question answer 
export const securityQuestionSubmission = (data,token) => (dispatch) => {
    axios
    .post(BASE_URL+'/security-questions-submissions/',data,{
        headers : {Authorization : 'token ' + token},
    })
    .then(response => {
        if(response.status === 201){
            dispatch({
                type : SAVE_SECURITY_QUESTIONS_ANSWER,
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