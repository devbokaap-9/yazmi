import {
    GET_FORMS_DATA,
    GET_OWNED_FORMS_DATA,
    SAVE_FORM_TITLE_DATA,
    DELETE_FORM_DATA,
    GET_SINGLE_FORM_DATA,
    GET_ASSIGNED_FORMS_DATA,
    SHARE_FORM_DATA,
    UPDATE_FORM_TITLE_DATA,
    SAVE_FORM_HEADER_DATA,
    SAVE_FORM_SECTION_DATA,
    DELETE_FORM_HEADER_DATA,
    DELETE_FORM_SECTION_DATA,
    DELETE_FORM_QUESTION_DATA,
    UPDATE_FORM_HEADER_DATA,
    GET_ERRORS,
    UPDATE_FORM_SECTION_DATA,
    SAVE_FORM_QUESTION_DATA,
    SAVE_FORM_SECTION_QUESTION_DATA,
    DELETE_FORM_SECTION_QUESTION_DATA,
    EDIT_FORM_QUALITATIVE_QUESTION_DATA,
    EDIT_QUALITATIVE_QUESTION_IN_SECTION_DATA,
    FORM_ALL_DEATILS,
    FROM_SUBMISSION,
    GET_FORM_RESPONSES,
    DELETE_FORM_RESPONSES_USER,
    GET_FORM_RESPONSES_WITH_ANS,
    SEND_FORM_NOTIFY_TO_ALL,
    SEND_FORM_NOTIFY_TO_ONE
} from "../Constants";
import axios from 'axios';
import {BASE_URL} from '../Constants';
import authHeader from "../utils/AuthHeader";
import {Authorization} from "../utils/CheckAuthorization";

// get All Forms data
export const getFormsData = () => (dispatch) => {
    axios
    .get(BASE_URL+'/forms/',{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : GET_FORMS_DATA,
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

// get All Owned Forms data
export const getOwnedForms = (profile_id) => (dispatch) => {
    axios
    .get(BASE_URL+'/profiles/'+profile_id+'/owned-forms/',{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : GET_OWNED_FORMS_DATA,
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

//add form title
export const addFormTitle = (data) => (dispatch) => {
    axios
    .post(BASE_URL+'/forms/',data,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 201){
            dispatch({
                type : SAVE_FORM_TITLE_DATA,
                payload : response.data
            })
            dispatch(getOwnedForms(data.creator))//call for updating sidebar
            dispatch(singleFormData(response.data.id))//call for update title at top
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

//delete form data
export const deleteFormData = (id) => (dispatch) => {
    axios
    .delete(BASE_URL+'/forms/'+id+'/',{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 204){
            dispatch({
                type : DELETE_FORM_DATA,
                payload : response
            })
            dispatch(getFormsData())
            let user_data = JSON.parse(decodeURIComponent(localStorage.getItem('user_data')));
            dispatch(getOwnedForms(user_data.profile_id))//call for updating sidebar
            dispatch(getAssignedForms(user_data.profile_id))
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

//get single form data
export const singleFormData = (formId) => (dispatch) => {
    axios
    .get(BASE_URL+'/forms/'+formId+'/',{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : GET_SINGLE_FORM_DATA,
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

//remove single form data
export const removeSingleFormData = () => (dispatch) => {
    dispatch({
        type: GET_SINGLE_FORM_DATA,
        payload : ''
    })
};

// get All Assigned Forms data
export const getAssignedForms = (profile_id) => (dispatch) => {
    axios
    .get(BASE_URL+'/profiles/'+profile_id+'/assigned-forms/',{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : GET_ASSIGNED_FORMS_DATA,
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

//share form
export const shareForm = (data) => (dispatch) => {
    axios
    .post(BASE_URL+'/forms/'+data.form+'/share/',data,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 201){
            dispatch({
                type : SHARE_FORM_DATA,
                payload : response.data
            })
            let user_data = JSON.parse(decodeURIComponent(localStorage.getItem('user_data')));
            dispatch(getAssignedForms(user_data.profile_id))
            dispatch(singleFormData(data.form))
            dispatch(getFormResponse(data.form))
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

// Update form title
export const editFormTitle = (data,formId) => (dispatch) => {
    axios
    .patch(BASE_URL+`/forms/${formId}/`,data,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : UPDATE_FORM_TITLE_DATA,
                payload : response.data
            })

            let loginData = JSON.parse(decodeURIComponent(localStorage.getItem('user_data')));
            dispatch(getOwnedForms(loginData.profile_id))
            dispatch(singleFormData(response.data.id))//call for update title at top
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

export const addFormHeader = (headerData) => (dispatch) => {
    axios
    .post(BASE_URL+'/forms/'+headerData.form+'/headers/',headerData,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 201){
            dispatch({
                type : SAVE_FORM_HEADER_DATA,
                payload : response.data
            })
            dispatch(singleFormData(headerData.form))//call for getting latest order num 
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

export const addFormSection = (sectionData) => (dispatch) => {
    axios
    .post(BASE_URL+'/forms/'+sectionData.form+'/sections/',sectionData,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 201){
            dispatch({
                type : SAVE_FORM_SECTION_DATA,
                payload : response.data
            })
            dispatch(singleFormData(sectionData.form))//call for getting latest order num 
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

//delete Header/section/question
export const deleteHeaderSectionQuestion = (id,formId , elementName) => (dispatch) => {
    axios
    .delete(BASE_URL+`/forms/${formId}/${elementName}/${id}/`,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 204){
            if(elementName === "headers"){
                dispatch({
                    type : DELETE_FORM_HEADER_DATA,
                    payload : response
                })
            }
            else if(elementName === "sections"){
                dispatch({
                    type : DELETE_FORM_SECTION_DATA,
                    payload : response
                })
            }
            else if(elementName === "questions"){
                dispatch({
                    type : DELETE_FORM_QUESTION_DATA,
                    payload : response
                })
            }
            dispatch(singleFormData(formId))
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
}

//delete question inside section box
export const deleteQuestionOfSection = (questionId,formId , sectionId) => (dispatch) => {
    axios
    .delete(BASE_URL+`/forms/${formId}/sections/${sectionId}/questions/${questionId}/`,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 204){
            dispatch({
                type : DELETE_FORM_SECTION_QUESTION_DATA,
                payload : response
            })
            dispatch(singleFormData(formId))
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
}

// edit header
export const editheadertitle = (form,formId,headerId) => (dispatch) => {
    axios
    .patch(BASE_URL+`/forms/${formId}/headers/${headerId}/`,form,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 201){
            dispatch({
                type : UPDATE_FORM_HEADER_DATA,
                payload : response.data
            })
        }
        dispatch(singleFormData(formId))
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


// edit section title
export const editsectiontitle = (form,formId,headerId) => (dispatch) => {
    axios
    .patch(BASE_URL+`/forms/${formId}/sections/${headerId}/`,form,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 201){
            dispatch({
                type : UPDATE_FORM_SECTION_DATA,
                payload : response.data
            })
        }
        dispatch(singleFormData(formId))
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

export const addFormQuestion = (questionData) => (dispatch) => {
    axios
    .post(BASE_URL+'/forms/'+questionData.form+'/questions/',questionData,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 201){
            dispatch({
                type : SAVE_FORM_QUESTION_DATA,
                payload : response.data
            })
            dispatch(singleFormData(questionData.form))//call for getting latest order num 
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

export const addFormSectionQuestion = (questionData,formId) => (dispatch) => {
    axios
    .post(BASE_URL+'/forms/'+formId+'/sections/'+questionData.section+'/questions/',questionData,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 201){
            dispatch({
                type : SAVE_FORM_SECTION_QUESTION_DATA,
                payload : response.data
            })
            dispatch(singleFormData(formId))//call for getting latest order num 
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


// edit Qualitative Question
export const editQualitativeQuestionaction = (form,formId,headerId) => (dispatch) => {
    axios
    .patch(BASE_URL+`/forms/${formId}/questions/${headerId}/`,form,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 201){
            dispatch({
                type : EDIT_FORM_QUALITATIVE_QUESTION_DATA,
                payload : response.data
            })
        }
        dispatch(singleFormData(formId))
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


// EDIT QUALITATIVE QUESTION IN SECTION
export const editqualitativeSectionAction = (form,FormId,SectionQId,QuestionQuesId) => (dispatch) => {
    axios
    .patch(BASE_URL+`/forms/${FormId}/sections/${SectionQId}/questions/${QuestionQuesId}/`,form,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 201){
            dispatch({
                type : EDIT_QUALITATIVE_QUESTION_IN_SECTION_DATA,
                payload : response.data
            })
        }
        dispatch(singleFormData(FormId))
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


// // EDIT MULTICHOICE QUESTION IN SECTION
// export const editMultiChoiceSectionAction = (form,FormId,SectionQId,QuestionQuesId) => (dispatch) => {
//     
//     axios
//     .patch(BASE_URL+`/forms/${FormId}/sections/${SectionQId}/questions/${QuestionQuesId}/`,form,{
//         headers : authHeader(),
//     })
//     .then(response => {
//         
//         if(response.status === 201){
//             dispatch({
//                 type : EDIT_QUALITATIVE_QUESTION_IN_SECTION_DATA,
//                 payload : response.data
//             })
//         }
//         dispatch(singleFormData(FormId))
//     })
//     .catch(error => {
//         if(error && error.response && error.response.status === 400){
//             dispatch({
//                 type:GET_ERRORS,
//                 payload : error.response.data
//             })
//         }
//         else{
//             Authorization(error && error.response && error.response.statuss,dispatch)
//         }
//     })
// };


// Form all Details
export const getAllDetails = (formId) => (dispatch) => {
    axios
    .get(BASE_URL+'/forms/'+formId,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : FORM_ALL_DEATILS,
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


// ***************************  Form Submission ****************************************

export const formSubmission = (questionData) => (dispatch) => {
    axios
    .post(BASE_URL+'/forms/'+questionData.id+'/submissions/',questionData.ans,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 201){
            dispatch({
                type : FROM_SUBMISSION,
                payload : response
            })
            dispatch(getAssignedForms(questionData.id))//call for getting latest order num 
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





// ***************************  Form Responses **************************************** 

export const getFormResponse = (id) => (dispatch) => {
    axios
    .get(BASE_URL+'/forms/'+id+'/share/',{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : GET_FORM_RESPONSES,
                payload : response.data
            })
            
            dispatch(getAssignedForms(id))//call for getting latest order num 
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

export const deleteFormResponseUser = (data) => (dispatch) => {
    axios
        .delete(BASE_URL+'/forms/'+data[0]+'/share/'+data[1],{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 204){
            dispatch({
                type : DELETE_FORM_RESPONSES_USER,
                payload : response
            })
            dispatch( getFormResponse(data[0]))//call for getting latest order num 
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


export const getFormResponseAns = (data) => (dispatch) => {
    axios.get(BASE_URL+`/forms/${data[0]}/submissions/?submitted_by=${data[1]}`,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : GET_FORM_RESPONSES_WITH_ANS,
                payload : response.data
            })
            // dispatch(getAssignedForms(data.id))//call for getting latest order num 
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


// Share forms notify to all
export const sendNotifyToAll = (id,data) => (dispatch) => {
    axios
    .post(BASE_URL+`/forms/${id}/notify-all/`,data,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 201){
            dispatch({
                type : SEND_FORM_NOTIFY_TO_ALL,
                payload : response
            })
            dispatch(singleFormData(id))
            dispatch(getAssignedForms(id))
            dispatch(getOwnedForms(id))
            dispatch(getFormResponse(id))
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

// Share forms notify to one
export const sendNotifyToOne = (id,userId,data) => (dispatch) => {
    axios
    .patch(BASE_URL+`/forms/${id}/share/${userId}/`,data,{
        headers : authHeader(),
    })
    .then(response => {
        if(response.status === 200){
            dispatch({
                type : SEND_FORM_NOTIFY_TO_ONE,
                payload : response
            })
            dispatch(singleFormData(id))
            dispatch(getAssignedForms(id))
            dispatch(getOwnedForms(id))
            dispatch(getFormResponse(id))
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


