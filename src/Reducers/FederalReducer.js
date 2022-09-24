import {
    GET_FEDERAL_DATA,
    SINGLE_FEDERAL_DATA,
    SINGLE_FEDERAL_SINGLE_DATA,
    DELETE_FEDERAL_SINGLE_DATA,
    SINGLE_INVITED_FEDERAL_DATA
} from "../Constants"

const initialState = {
    federalData: "",
    singlefederal: "",
    singlefederaluserdata: "",
    deletefederaluserdata: "",
    singleInvitedFederalUserData: ""
}

export default function(state = initialState, action) {
    switch (action.type) {
            case GET_FEDERAL_DATA:
                return {
                    ...state,
                    federalData: action.payload,
                }
            case SINGLE_FEDERAL_DATA:
                return {
                    ...state,
                    singlefederal: action.payload,
                }
            case SINGLE_FEDERAL_SINGLE_DATA:
                console.log("action.payload ",action.payload);
                return {
                    ...state,
                    singlefederaluserdata: action.payload,
                }
            case DELETE_FEDERAL_SINGLE_DATA:
                return {
                    ...state,
                    deletefederaluserdata: action.payload,
                }
            case SINGLE_INVITED_FEDERAL_DATA:
                return {
                    ...state,
                    singleInvitedFederalUserData: action.payload,
                }
        default:
            return state
    }
}