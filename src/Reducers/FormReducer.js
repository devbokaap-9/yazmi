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
    UPDATE_FORM_HEADER_DATA,
    UPDATE_FORM_SECTION_DATA,
    SAVE_FORM_QUESTION_DATA,
    SAVE_FORM_SECTION_QUESTION_DATA,
    DELETE_FORM_QUESTION_DATA,
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
} from "../Constants"

const initialState = {
    formsData: "",
    ownedFormsData: "",
    saveFormTitleData: "",
    deleteFormData: "",
    singleFormData: "",
    assignedFormsData: "",
    sharedFormData: "",
    updatedFormTitleData: "",
    saveFormHeaderData: "",
    saveFormSectionData: "",
    deleteHeaderFormData: "",
    deleteFormSectionData: "",
    updatetitlefromheader: "",
    updatesectionfromheader: "",
    saveFormQuestionData: "",
    saveFormSectionQuestionData: "",
    deleteFormQuestionData: "",
    deleteFormSectionQuestionData: "",
    editQualitativeQuestionData: "",
    editqualitativeQuestionInSection: "",
    getAllData: "",
    getResponsData: "",
    deleteResponseData: "",
    getformResponseData: "",
    sendNotifyToAllData: "",
    sendNotifyToOneData: ""
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_FORMS_DATA:
            return {
                ...state,
                formsData: action.payload,
            }
        case GET_OWNED_FORMS_DATA:
            return {
                ...state,
                ownedFormsData: action.payload,
            }
        case FORM_ALL_DEATILS:
            return {
                ...state,
                getAllData: action.payload,
            }
        case SAVE_FORM_TITLE_DATA:
            return {
                ...state,
                saveFormTitleData: action.payload,
            }
        case DELETE_FORM_DATA:
            return {
                ...state,
                deleteFormData: action.payload,
            }
        case GET_SINGLE_FORM_DATA:
            return {
                ...state,
                singleFormData: action.payload,
            }
        case GET_ASSIGNED_FORMS_DATA:
            return {
                ...state,
                assignedFormsData: action.payload,
            }
        case SHARE_FORM_DATA:
            return {
                ...state,
                sharedFormData: action.payload,
            }
        case UPDATE_FORM_TITLE_DATA:
            return {
                ...state,
                updatedFormTitleData: action.payload,
            }
        case SAVE_FORM_HEADER_DATA:
            return {
                ...state,
                saveFormHeaderData: action.payload,
            }
        case SAVE_FORM_SECTION_DATA:
            return {
                ...state,
                saveFormSectionData: action.payload,
            }
        case DELETE_FORM_HEADER_DATA:
            return {
                ...state,
                deleteHeaderFormData: action.payload,
            }
        case DELETE_FORM_SECTION_DATA:
            return {
                ...state,
                deleteFormSectionData: action.payload,
            }
        case UPDATE_FORM_HEADER_DATA:
            return {
                ...state,
                updatetitlefromheader: action.payload,
            }
        case UPDATE_FORM_SECTION_DATA:
            return {
                ...state,
                updatesectionfromheader: action.payload,
            }
        case SAVE_FORM_QUESTION_DATA:
            return {
                ...state,
                saveFormQuestionData: action.payload,
            }
        case SAVE_FORM_SECTION_QUESTION_DATA:
            return {
                ...state,
                saveFormSectionQuestionData: action.payload,
            }
        case DELETE_FORM_QUESTION_DATA:
            return {
                ...state,
                deleteFormQuestionData: action.payload,
            }
        case DELETE_FORM_SECTION_QUESTION_DATA:
            return {
                ...state,
                deleteFormSectionQuestionData: action.payload,
            }
        case EDIT_FORM_QUALITATIVE_QUESTION_DATA:
            return {
                ...state,
                editQualitativeQuestionData: action.payload,
            }
        case EDIT_QUALITATIVE_QUESTION_IN_SECTION_DATA:
            return {
                ...state,
                editqualitativeQuestionInSection: action.payload,
            }
        case FROM_SUBMISSION:
            return {
                ...state,
                formsubmissionData: action.payload,
            }
        case GET_FORM_RESPONSES:
            return {
                ...state,
                getResponsData: action.payload,
            }
        case DELETE_FORM_RESPONSES_USER:
            return {
                ...state,
                deleteResponseData: action.payload,
            }
        case GET_FORM_RESPONSES_WITH_ANS:
            return {
                ...state,
                getformResponseData: action.payload,
            }
        case SEND_FORM_NOTIFY_TO_ALL:
            return {
                ...state,
                sendNotifyToAllData: action.payload,
            }
        case SEND_FORM_NOTIFY_TO_ONE:
            return {
                ...state,
                sendNotifyToOneData: action.payload,
            }
        default:
            return state
    }
}