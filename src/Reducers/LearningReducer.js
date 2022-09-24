import {
    SAVE_LESSON_SUBMISSION_DATA,
    SAVE_PRACTICE_EXAM_SUBMISSION_DATA,
    GET_COURSE_COUNT_STATUS
} from "../Constants"

const initialState = {
    lessonSubmissionData: "",
    practiceExamSubmissionData: "",
    courseCountStatus: ""
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SAVE_LESSON_SUBMISSION_DATA:
            return {
                ...state,
                lessonSubmissionData: action.payload,
            }
        case SAVE_PRACTICE_EXAM_SUBMISSION_DATA:
            return {
                ...state,
                practiceExamSubmissionData: action.payload,
            }
        case GET_COURSE_COUNT_STATUS:
            return {
                ...state,
                courseCountStatus: action.payload,
            }
        default:
            return state
    }
}
