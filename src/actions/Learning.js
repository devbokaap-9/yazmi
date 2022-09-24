import {
    SAVE_LESSON_SUBMISSION_DATA,
    SAVE_PRACTICE_EXAM_SUBMISSION_DATA,
    GET_COURSE_COUNT_STATUS,
    GET_ERRORS
} from "../Constants";
import axios from 'axios';
import {BASE_URL} from '../Constants';
import authHeader from "../utils/AuthHeader";
import {Authorization} from "../utils/CheckAuthorization";
import {getCourseDetails} from "./Content";

// submit lesson
export const lessonSubmission = (data,courseId,type,id) => (dispatch) => {
    axios
    .post(BASE_URL+`/courses/${courseId}/${type}/${id}/submissions/`,data,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 201){
            dispatch({
                type : SAVE_LESSON_SUBMISSION_DATA,
                payload : response.data
            })
            dispatch(getCourseDetails(courseId))
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

// submit practice
export const practiceExamSubmission = (data,courseId,id,type) => (dispatch) => {
    axios
    .post(BASE_URL+`/courses/${courseId}/${type}/${id}/submissions/`,data,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 201){
            dispatch({
                type : SAVE_PRACTICE_EXAM_SUBMISSION_DATA,
                payload : response.data
            })
            dispatch(getCourseDetails(courseId))
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

//course status
export const getCourseStatus = () => (dispatch) => {
    let user_data = JSON.parse(decodeURIComponent(localStorage.getItem('user_data')));
    axios
    .get(BASE_URL+'/profiles/'+user_data.profile_id+'/course_stats/',{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : GET_COURSE_COUNT_STATUS,
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
}