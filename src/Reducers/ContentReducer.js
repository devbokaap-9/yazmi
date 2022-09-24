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
    GET_ATTACHMENTS,
    ASSIGN_COURSE_DATA,
    GET_COURSES_RESPONSE_DATA,
} from "../Constants"

const initialState = {
    getContentTags: "",
    addContentTag: "",
    saveAttachments: "",
    saveCategoryData: "",
    getCategoryData: "",
    deleteCategoryData: "",
    gradeData: "",
    courseData: "",
    getCourses: "",
    deleteCourseData: "",
    categoryDetailsData: "",
    getAttachmentsData: "",
    updatedCategoryData: "",
    getCourseDetails: "",
    updatedCourseData: "",
    saveLessonData: "",
    deleteCourseDetailData: "",
    getLessonPracticeExamData: "",
    updateLessonPracticeExamData: "",
    addPracticeTitleData: "",
    addPracticeQuestionData: "",
    updatePracticeTitleData: "",
    updatePracticeQuestionData: "",
    addExamTitleData: "",
    addExamQuestionData: "",
    updateExamTitleData: "",
    updateExamQuestionData: "",
    courseDataByTags: "",
    getdeleteAttachments: "",
    getsingleattachmentData: "",
    assignCourseDataRes: "",
    getCoursesResponse: ""
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_CONTENT_TAGS:
            return {
                ...state,
                getContentTags: action.payload,
            }
        case SAVE_CONTENT_TAG:
            return {
                ...state,
                addContentTag: action.payload,
            }
        case ADD_ATTACHMENT:
            return {
                ...state,
                saveAttachments: action.payload,
            }
        case GET_ATTACHMENTS:
            return {
                ...state,
                getsingleattachmentData: action.payload,
            }
        case DELETE_ATTACHMENT:
            return {
                ...state,
                getdeleteAttachments: action.payload,
            }
        case SAVE_CATEGORY_DATA:
            return {
                ...state,
                saveCategoryData: action.payload,
            }
        case GET_CATEGORY_DATA:
            return {
                ...state,
                getCategoryData: action.payload,
            }
        case DELETE_CATEGORY_DATA:
            return {
                ...state,
                deleteCategoryData: action.payload,
            }
        case GET_GRADE_DATA:
            return {
                ...state,
                gradeData: action.payload,
            }
        case ADD_COURSE_DATA:
            return {
                ...state,
                courseData: action.payload,
            }
        case GET_COURSE_DATA:
            return {
                ...state,
                getCourses: action.payload,
            }
        case DELETE_COURSE_DATA:
            return {
                ...state,
                deleteCourseData: action.payload,
            }
        case GET_CATEGORY_DETAIL_DATA:
            return {
                ...state,
                categoryDetailsData: action.payload,
            }
        case GET_ATTACHMENT_DATA:
            return {
                ...state,
                getAttachmentsData: action.payload,
            }
        case UPDATE_CATEGORY_DATA:
            return {
                ...state,
                updatedCategoryData: action.payload,
            }
        case GET_COURSE_DETAIL_DATA:
            return {
                ...state,
                getCourseDetails: action.payload,
            }
        case UPDATE_COURSE_DATA:
            return {
                ...state,
                updatedCourseData: action.payload,
            }
        case ADD_LESSON_DATA:
            return {
                ...state,
                saveLessonData: action.payload,
            }
        case DELETE_COURSE_DETAIL_DATA:
            return {
                ...state,
                deleteCourseDetailData: action.payload,
            }
        case GET_LESSON_PRACTICE_EXAM_DATA:
            return {
                ...state,
                getLessonPracticeExamData: action.payload,
            }
        case UPDATE_LESSON_PRACTICE_EXAM_DATA:
            return {
                ...state,
                updateLessonPracticeExamData: action.payload,
            }
        case ADD_PRACTICE_TITLE_DATA:
            return {
                ...state,
                addPracticeTitleData: action.payload,
            }
        case ADD_PRACTICE_QUESTION_DATA:
            return {
                ...state,
                addPracticeQuestionData: action.payload,
            }
        case UPDATE_PRACTICE_TITLE_DATA:
            return {
                ...state,
                updatePracticeTitleData: action.payload,
            }
        case UPDATE_PRACTICE_QUESTION_DATA:
            return {
                ...state,
                updatePracticeQuestionData: action.payload,
            }
        case ADD_EXAM_TITLE_DATA:
            return {
                ...state,
                addExamTitleData: action.payload,
            }
        case ADD_EXAM_QUESTION_DATA:
            return {
                ...state,
                addExamQuestionData: action.payload,
            }
        case UPDATE_EXAM_TITLE_DATA:
            return {
                ...state,
                updateExamTitleData: action.payload,
            }
        case UPDATE_EXAM_QUESTION_DATA:
            return {
                ...state,
                updateExamQuestionData: action.payload,
            }
        case GET_COURSE_FILTER_DATA:
            return {
                ...state,
                courseDataByTags: action.payload,
            }
        case ASSIGN_COURSE_DATA:
            return {
                ...state,
                assignCourseDataRes: action.payload,
            }
        case GET_COURSES_RESPONSE_DATA:
            return {
                ...state,
                getCoursesResponse: action.payload,
            }
        default:
            return state
    }
}
