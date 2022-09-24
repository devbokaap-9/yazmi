import {
    GET_ERRORS,
} from "../Constants"

const initialState = {
    errorsData: "",
}

export default function(state = initialState, action) {
    switch (action.type) {
            case GET_ERRORS:
            return {
                ...state,
                errorsData: action.payload,
            }
        default:
            return state
    }
}
