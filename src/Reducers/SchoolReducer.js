import {
    GET_SCHOOLS_DATA,
    DELETE_SCHOOL_DATA,
    SAVE_SCHOOLS_DATA,
    SCHOOL_USER_DATA,
    DELETE_SCHOOL_USER_DATA,
    GET_SINGLE_SCHOOL_DATA,
    UPDATE_SCHOOL_DATA,
    SINGLE_SCHOOL_USER_DATA,
    SCHOOL_INVITED_USER_DATA
} from "../Constants"

const initialState = {
    schoolData: "",
    deleteSchool : "",
    addSchoolDataRes : "",
    userSchoolData: "",
    deleteUserSchool: "",
    singleSchoolData: "",
    updateSchoolData: "",
    singleUserSchoolData: "",
    schoolInvitedUsersData: ""
}

export default function(state = initialState, action) {
    switch (action.type) {
            case GET_SCHOOLS_DATA:
                return {
                    ...state,
                    schoolData : action.payload,
                }
            case DELETE_SCHOOL_DATA:
                return {
                    ...state,
                    deleteSchool: action.payload,
                }
            case SAVE_SCHOOLS_DATA:
                return {
                    ...state,
                    addSchoolDataRes: action.payload,
                }
            case SCHOOL_USER_DATA:
                return {
                    ...state,
                    userSchoolData: action.payload,
                }
            case SINGLE_SCHOOL_USER_DATA:
                return {
                    ...state,
                    singleUserSchoolData: action.payload,
                }
            case DELETE_SCHOOL_USER_DATA:
                return {
                    ...state,
                    deleteUserSchool: action.payload,
                }
            case GET_SINGLE_SCHOOL_DATA:
                return {
                    ...state,
                    singleSchoolData: action.payload,
                }
            case UPDATE_SCHOOL_DATA:
                return {
                    ...state,
                    updateSchoolData: action.payload,
                }
            case SCHOOL_INVITED_USER_DATA:
                return {
                    ...state,
                    schoolInvitedUsersData: action.payload,
                }
        default:
            return state
    }
}