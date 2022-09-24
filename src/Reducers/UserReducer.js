import {
    GET_USER_DATA,
    SAVE_USER_DATA,
    UPDATE_USER_DATA,
    GET_SINGLE_USER_DATA,
    DELETE_SINGLE_USER_DATA,
    USERS_BULK_ACTION,
    GET_SEARCH_USER_DATA,
    UPDATE_SINGLE_USER_PROFILE_DATA,
    DOWNLOAD_DATA,
    ENTITIES_BULK_DELETE
} from "../Constants"

const initialState = {
    usersData: "",
    addUserData: "",
    updateUserData: "",
    singleUserData: "",
    deleteUserData: "",
    usersBulkActionRes: "",
    searchedUserData: "",
    updateSingleUser: "",
    downloadData: "",
    entitiesBulkDelete: ""
}

export default function(state = initialState, action) {
    switch (action.type) {
            case GET_USER_DATA:
                return {
                    ...state,
                    usersData: action.payload,
                }
            case SAVE_USER_DATA:
                return {
                    ...state,
                    addUserData: action.payload,
                }
            case GET_SINGLE_USER_DATA:
                return {
                    ...state,
                    singleUserData: action.payload,
                }
            case DELETE_SINGLE_USER_DATA:
                return {
                    ...state,
                    deleteUserData: action.payload,
                }
            case UPDATE_USER_DATA:
                return {
                    ...state,
                    updateUserData: action.payload,
                }
            case USERS_BULK_ACTION:
                return {
                    ...state,
                    usersBulkActionRes: action.payload,
                }
            case GET_SEARCH_USER_DATA:
                return {
                    ...state,
                    searchedUserData: action.payload,
                }
            case UPDATE_SINGLE_USER_PROFILE_DATA:
                return {
                    ...state,
                    updateSingleUser: action.payload,
                }
            case DOWNLOAD_DATA:
                return {
                    ...state,
                    downloadData: action.payload,
                }
            case ENTITIES_BULK_DELETE:
                return {
                    ...state,
                    entitiesBulkDelete: action.payload,
                }
        default:
            return state
    }
}