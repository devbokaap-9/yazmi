import {
    GET_SECURITY_QUESTIONS,
    SAVE_SECURITY_QUESTIONS_ANSWER
} from "../Constants"

const initialState = {
    securityQuestionsData: "",
    securityQuestionsAnswerData: ""
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_SECURITY_QUESTIONS:
            return {
                ...state,
                securityQuestionsData: action.payload,
            }
        case SAVE_SECURITY_QUESTIONS_ANSWER:
            return {
                ...state,
                securityQuestionsAnswerData: action.payload,
            }
        default:
            return state
    }
}