import {
    GET_CONTENT_TAGS,
    SAVE_CONTENT_TAG,
    ADD_ATTACHMENT,
    DELETE_ATTACHMENT,
    SAVE_CATEGORY_DATA,
    GET_CATEGORY_DATA,
    DELETE_CATEGORY_DATA,
    GET_GRADE_DATA,
    ADD_COURSE_DATA,
    GET_COURSE_DATA,
    DELETE_COURSE_DATA,
    GET_CATEGORY_DETAIL_DATA,
    GET_ATTACHMENT_DATA,
    UPDATE_CATEGORY_DATA,
    GET_COURSE_DETAIL_DATA,
    UPDATE_COURSE_DATA,
    ADD_LESSON_DATA,
    DELETE_COURSE_DETAIL_DATA,
    GET_LESSON_PRACTICE_EXAM_DATA,
    UPDATE_LESSON_PRACTICE_EXAM_DATA,
    ADD_PRACTICE_TITLE_DATA,
    ADD_PRACTICE_QUESTION_DATA,
    UPDATE_PRACTICE_TITLE_DATA,
    UPDATE_PRACTICE_QUESTION_DATA,
    ADD_EXAM_TITLE_DATA,
    ADD_EXAM_QUESTION_DATA,
    UPDATE_EXAM_TITLE_DATA,
    UPDATE_EXAM_QUESTION_DATA,
    GET_COURSE_FILTER_DATA,
    GET_ERRORS,
    GET_ATTACHMENTS,
    ASSIGN_COURSE_DATA,
    GET_COURSES_RESPONSE_DATA
} from "../Constants";
import axios from 'axios';
import {BASE_URL} from '../Constants';
import authHeader from "../utils/AuthHeader";
import {Authorization} from "../utils/CheckAuthorization";

// store attachments
export const addAttachment = (data) => (dispatch) => {
    axios
    .post(BASE_URL+'/attachments/',data,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 201){
            dispatch({
                type : ADD_ATTACHMENT,
                payload : response.data
            })
            dispatch(getAttachments())
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

// get attachments
export const getsingleAttachments = (data) => (dispatch) => {
    axios
    .get(BASE_URL+'/attachments/'+data.id,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : GET_ATTACHMENTS,
                payload : response.data
            })
            dispatch(getAttachments())
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

// Delete attachments
export const deleteAttachment = (data) => (dispatch) => {
    axios
    .delete(BASE_URL+'/attachments/'+data,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 204){
            dispatch({
                type : DELETE_ATTACHMENT,
                payload : response
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

//fetch tags
export const getTags = () => (dispatch) => {
    axios
    .get(BASE_URL+'/tags/',{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : GET_CONTENT_TAGS,
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

// add content tags
export const addContentTag = (data) => (dispatch) => {
    axios
    .post(BASE_URL+'/tags/',data,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 201){
            dispatch({
                type : SAVE_CONTENT_TAG,
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

// add category
export const addCategory = (data) => (dispatch) => {
    axios
    .post(BASE_URL+'/categories/',data,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 201){
            dispatch({
                type : SAVE_CATEGORY_DATA,
                payload : response.data
            })
            dispatch(getCategories())
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

//fetch categories
export const getCategories = () => (dispatch) => {
    axios
    .get(BASE_URL+'/categories/',{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : GET_CATEGORY_DATA,
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

//delete category
export const deleteCategory = (id) => (dispatch) => {
    axios
    .delete(BASE_URL+'/categories/'+id+'/',{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 204){
            dispatch({
                type : DELETE_CATEGORY_DATA,
                payload : response
            })
            dispatch(getCategories())
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

//fetch grade data
export const getGrades = () => (dispatch) => {
    axios
    .get(BASE_URL+'/grades/',{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : GET_GRADE_DATA,
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

//add course
export const addCourse = (courseData) => (dispatch) => {
    axios
    .post(BASE_URL+'/courses/',courseData,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 201){
            dispatch({
                type : ADD_COURSE_DATA,
                payload : response.data
            })
            dispatch(getCourse());
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

//fetch courses
export const getCourse = () => (dispatch) => {
    axios
    .get(BASE_URL+'/courses/',{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : GET_COURSE_DATA,
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

//delete course
export const deleteCourse = (id) => (dispatch) => {
    axios
    .delete(BASE_URL+'/courses/'+id+'/',{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 204){
            dispatch({
                type : DELETE_COURSE_DATA,
                payload : response
            })
            dispatch(getCourse())
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

//fetch single category detail
export const getCategoryDetails = (categoryId) => (dispatch) => {
    axios
    .get(BASE_URL+'/categories/'+categoryId+'/',{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : GET_CATEGORY_DETAIL_DATA,
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

//fetch all attachments
export const getAttachments = () => (dispatch) => {
    axios
    .get(BASE_URL+'/attachments/?limit=10000',{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : GET_ATTACHMENT_DATA,
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

//edit category
export const editCategory = (catgeoryId,data) => (dispatch) => {
    axios
    .put(BASE_URL+`/categories/${catgeoryId}/`,data,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : UPDATE_CATEGORY_DATA,
                payload : response.data
            })
            dispatch(getCategories())
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
}

//fetch single course detail
export const getCourseDetails = (courseId) => (dispatch) => {
    axios
    .get(BASE_URL+'/courses/'+courseId+'/',{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : GET_COURSE_DETAIL_DATA,
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

//edit course
export const editCourse = (data,courseId) => (dispatch) => {
    axios
    .put(BASE_URL+`/courses/${courseId}/`,data,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : UPDATE_COURSE_DATA,
                payload : response.data
            })
            // dispatch(getCategories())
            dispatch(getCourse())
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
}

//add lesson data
export const addLesson = (data) => (dispatch) => {
    axios
    .post(BASE_URL+'/courses/'+data.course+'/lessons/',data,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 201){
            dispatch({
                type : ADD_LESSON_DATA,
                payload : response.data
            })
            dispatch(getCourseDetails(data.course))
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

//delete course data
export const deleteCourseData = (courseId,id,type) => (dispatch) => {
    axios
    .delete(BASE_URL+'/courses/'+courseId+'/'+type+'/'+id+'/',{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 204){
            dispatch({
                type : DELETE_COURSE_DETAIL_DATA,
                payload : response
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
}

//fetch lesson/exam/practice data
export const getLessonPracticeExamData = (courseId,id,type) => (dispatch) => {
    axios
    .get(BASE_URL+'/courses/'+courseId+'/'+type+'/'+id+'/',{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : GET_LESSON_PRACTICE_EXAM_DATA,
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

export const removeLessonPracticeExamData = () => (dispatch) => {
    dispatch({
        type : GET_LESSON_PRACTICE_EXAM_DATA,
        payload : ""
    })
}

//edit lesson/practice/exam
export const editLessonPracticeExam = (data,id,type) => (dispatch) => {
    axios
    .put(BASE_URL+`/courses/${data.course}/${type}/${id}/`,data,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : UPDATE_LESSON_PRACTICE_EXAM_DATA,
                payload : response.data
            })
            dispatch(getCourseDetails(data.course))
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
}

//add practice title
export const addPracticeTitle = (data) => (dispatch) => {
    axios
    .post(BASE_URL+`/courses/${data.course}/practices/`,data,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 201){
            dispatch({
                type : ADD_PRACTICE_TITLE_DATA,
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
}

//add practice questions
export const addPracticeQuestion = (data,courseId) => (dispatch) => {
    axios
    .post(BASE_URL+`/courses/${courseId}/practices/${data.practice}/questions/`,data,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 201){
            dispatch({
                type : ADD_PRACTICE_QUESTION_DATA,
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
}

//update practice title
export const editPracticeTitle = (data,practiceId) => (dispatch) => {
    axios
    .put(BASE_URL+`/courses/${data.course}/practices/${practiceId}/`,data,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : UPDATE_PRACTICE_TITLE_DATA,
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
}

//update practice questions
export const editPracticeQuestion = (data,courseId,questionId) => (dispatch) => {
    axios
    .patch(BASE_URL+`/courses/${courseId}/practices/${data.practice}/questions/${questionId}/`,data,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 201){
            dispatch({
                type : UPDATE_PRACTICE_QUESTION_DATA,
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
}

//delete practice question
export const deletePracticeQuestion = (courseId,practiceId,questionId) => (dispatch) => {
    axios
    .delete(BASE_URL+`/courses/${courseId}/practices/${practiceId}/questions/${questionId}/`,{
        headers : authHeader(),
    })
    .then(response => {
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

//add exam title
export const addExamTitle = (data) => (dispatch) => {
    axios
    .post(BASE_URL+`/courses/${data.course}/exams/`,data,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 201){
            dispatch({
                type : ADD_EXAM_TITLE_DATA,
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
}

//add exam questions
export const addExamQuestion = (data,courseId) => (dispatch) => {
    axios
    .post(BASE_URL+`/courses/${courseId}/exams/${data.practice}/questions/`,data,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 201){
            dispatch({
                type : ADD_EXAM_QUESTION_DATA,
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
}

//delete practice question
export const deleteExamQuestion = (courseId,examId,questionId) => (dispatch) => {
    axios
    .delete(BASE_URL+`/courses/${courseId}/exams/${examId}/questions/${questionId}/`,{
        headers : authHeader(),
    })
    .then(response => {
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

//update exam title
export const editExamTitle = (data,examId) => (dispatch) => {
    axios
    .put(BASE_URL+`/courses/${data.course}/exams/${examId}/`,data,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : UPDATE_EXAM_TITLE_DATA,
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
}

//update exam questions
export const editExamQuestion = (data,courseId,questionId) => (dispatch) => {
    axios
    .patch(BASE_URL+`/courses/${courseId}/exams/${data.practice}/questions/${questionId}/`,data,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 201){
            dispatch({
                type : UPDATE_EXAM_QUESTION_DATA,
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
}

//get filter course data
export const courseFilterByTags = (data,type) => (dispatch) => {
    axios
    .get(BASE_URL+`/courses/?${type}=`+data['tags'],{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : GET_COURSE_FILTER_DATA,
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

//assign course
export const courseAssignTo = (data) => (dispatch) => {
    axios
    .post(BASE_URL+'/courses/'+data.course+'/share/',data,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 201){
            dispatch({
                type : ASSIGN_COURSE_DATA,
                payload : response.data
            })
            // let user_data = JSON.parse(decodeURIComponent(localStorage.getItem('user_data')));
            // dispatch(getAssignedForms(user_data.profile_id))
            // dispatch(singleFormData(data.form))
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
}




//courses response 
export const getCoursesResponse = (id) => (dispatch) => {
    axios
    .get(`${BASE_URL}/courses/${id}/submissions/`,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : GET_COURSES_RESPONSE_DATA,
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