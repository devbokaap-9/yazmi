import {
    LOGIN_SUCCESS,
    RESET_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_SUCCESS,
    UNAUTHORIZED,
    UPDATE_PROFILE_DATA,
    TOASTER_HIDE_SHOW
} from "../Constants"

const initialState = {
    loginResData: "",
    resetPasswordSuccess: "",
    forgotPasswordRes: "",
    unauthorized: "",
    updateProfileData: "",
    isToasterDisplay:false
}

export default function(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                loginResData: action.payload,
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                resetPasswordSuccess: action.payload,
            }
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                forgotPasswordRes: action.payload,
            }
        case UNAUTHORIZED:
            return {
                ...state,
                unauthorized: action.payload,
            }
        case UPDATE_PROFILE_DATA:
            return {
                ...state,
                updateProfileData: action.payload,
            }
        case TOASTER_HIDE_SHOW:
            return {
            ...state,
            isToasterDisplay:action.payload
        }
        default:
            return state
    }
}
