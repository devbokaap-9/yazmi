//Base URL
export const BASE_URL = 'https://yazmitest.learnfastconsulting.com/api/v1';
//auth
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const UPDATE_PROFILE_DATA = 'UPDATE_PROFILE_DATA';
//reset password
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
//forgot password
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
//erros
export const GET_ERRORS = 'GET_ERRORS';
// region constants
export const GET_REGIONS_DATA = 'GET_REGIONS_DATA';
export const SAVE_REGIONS_DATA = 'SAVE_REGIONS_DATA';
export const GET_REGION_DATA = 'GET_REGION_DATA';
export const DELETE_REGION_DATA = 'DELETE_REGION_DATA';
export const UPDATE_REGION_DATA = 'UPDATE_REGION_DATA';
export const SINGLE_REGION_USERS_DATA = 'SINGLE_REGION_USERS_DATA';
export const SINGLE_INVITED_REGION_USERS_DATA =
	'SINGLE_INVITED_REGION_USERS_DATA';
export const SINGLE_DATA_FOR_REGION_USER = 'SINGLE_DATA_FOR_REGION_USER';
export const SINGLE_DELETE_FOR_REGION_USER = 'SINGLE_DELETE_FOR_REGION_USER';

// User
export const GET_USER_DATA = 'GET_USER_DATA';
export const SAVE_USER_DATA = 'SAVE_USER_DATA';
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const GET_SINGLE_USER_DATA = 'GET_SINGLE_USER_DATA';
export const DELETE_SINGLE_USER_DATA = 'DELETE_SINGLE_USER_DATA';
export const USERS_BULK_ACTION = 'USERS_BULK_ACTION';
export const ENTITIES_BULK_DELETE = 'ENTITIES_BULK_DELETE';
export const UPDATE_SINGLE_USER_PROFILE_DATA =
	'UPDATE_SINGLE_USER_PROFILE_DATA';

// woreda
export const GET_WOREDAS_DATA = 'GET_WOREDAS_DATA';
export const SAVE_WOREDAS_DATA = 'SAVE_WOREDAS_DATA';
export const DELETE_WOREDA_DATA = 'DELETE_WOREDA_DATA';
export const GET_WOREDA_DATA = 'GET_WOREDA_DATA';
export const UPDATE_WOREDA_DATA = 'UPDATE_WOREDA_DATA';
export const WOREDA_USER_DATA = 'WOREDA_USER_DATA';
export const DELETE_WOREDA_USER_DATA = 'DELETE_WOREDA_USER_DATA';
export const SINGLE_WOREDA_USER_DATA = 'SINGLE_WOREDA_USER_DATA';
export const WOREDA_INVITED_USER_DATA = 'WOREDA_INVITED_USER_DATA';
export const GET_REGION_SPECIFIC_WOREDAS_DATA =
	'GET_REGION_SPECIFIC_WOREDAS_DATA';

// Federal
export const GET_FEDERAL_DATA = 'GET_FEDERAL_DATA';
export const SINGLE_FEDERAL_DATA = 'SINGLE_FEDERAL_DATA';
export const SINGLE_FEDERAL_SINGLE_DATA = 'SINGLE_FEDERAL_SINGLE_DATA';
export const DELETE_FEDERAL_SINGLE_DATA = 'DELETE_FEDERAL_SINGLE_DATA';
export const FEDERAL_ID = '738f2827-a227-4f59-adfc-59a81c23415a';
export const SINGLE_INVITED_FEDERAL_DATA = 'SINGLE_INVITED_FEDERAL_DATA';

// Security Questions
export const GET_SECURITY_QUESTIONS = 'GET_SECURITY_QUESTIONS';
export const SAVE_SECURITY_QUESTIONS_ANSWER = 'SAVE_SECURITY_QUESTIONS_ANSWER';

//School
export const GET_SCHOOLS_DATA = 'GET_SCHOOLS_DATA';
export const DELETE_SCHOOL_DATA = 'DELETE_SCHOOL_DATA';
export const SAVE_SCHOOLS_DATA = 'SAVE_SCHOOLS_DATA';
export const SCHOOL_USER_DATA = 'SCHOOL_USER_DATA';
export const DELETE_SCHOOL_USER_DATA = 'DELETE_SCHOOL_USER_DATA';
export const GET_SINGLE_SCHOOL_DATA = 'GET_SINGLE_SCHOOL_DATA';
export const UPDATE_SCHOOL_DATA = 'UPDATE_SCHOOL_DATA';
export const SINGLE_SCHOOL_USER_DATA = 'SINGLE_SCHOOL_USER_DATA';
export const SCHOOL_INVITED_USER_DATA = 'SCHOOL_INVITED_USER_DATA';

//unauthorized
export const UNAUTHORIZED = 'UNAUTHORIZED';

// *********************************** Role constants ***********************************
export const GET_ROLES_DATA = 'GET_ROLES_DATA';
export const GET_SINGLE_ROLE_DATA = 'GET_SINGLE_ROLE_DATA';
export const CREATE_ROLE_DATA = 'CREATE_ROLE_DATA';
export const DELETE_ROLE_DATA = 'DELETE_ROLE_DATA';
export const EDIT_ROLE_DATA = 'EDIT_ROLE_DATA';
export const GET_ROLES_DATA_LEVEL_WISE = 'GET_ROLES_DATA_LEVEL_WISE';
export const GET_SIDEBAR_ROLES_DATA = 'GET_SIDEBAR_ROLES_DATA';
export const GET_PERMISSIONS_DATA = 'GET_PERMISSIONS_DATA';

//role codenames for permission
//announcement data permission
export const custom_announcements_data_created =
	'custom_announcements_data_created';
export const custom_announcements_data_delete =
	'custom_announcements_data_delete';
export const custom_announcements_data_edit = 'custom_announcements_data_edit';
export const custom_announcements_data_get = 'custom_announcements_data_get';
export const custom_announcements_data_all = 'custom_announcements_data_all';
//announcement operation permission
export const custom_announcements_operation_download =
	'custom_announcements_operation_download';
export const custom_announcements_operation_receive =
	'custom_announcements_operation_receive';
export const custom_announcements_operation_send =
	'custom_announcements_operation_send';

//course data permission
export const custom_course_data_created = 'custom_course_data_created';
export const custom_course_data_delete = 'custom_course_data_delete';
export const custom_course_data_edit = 'custom_course_data_edit';
export const custom_course_data_get = 'custom_course_data_get';
export const custom_course_data_all = 'custom_course_data_all';
//course operation permission
export const custom_course_operation_assign = 'custom_course_operation_assign';
export const custom_course_operation_publish =
	'custom_course_operation_publish';

//resource data permission
export const custom_resource_data_created = 'custom_resource_data_created';
export const custom_resource_data_delete = 'custom_resource_data_delete';
export const custom_resource_data_edit = 'custom_resource_data_edit';
export const custom_resource_data_get = 'custom_resource_data_get';
export const custom_resource_data_all = 'custom_resource_data_all';
//resource operation permission
export const custom_resource_operation_download =
	'custom_resource_operation_download';
export const custom_resource_operation_publish =
	'custom_resource_operation_publish';

//role data permission
export const custom_role_data_created = 'custom_role_data_created';
export const custom_role_data_delete = 'custom_role_data_delete';
export const custom_role_data_edit = 'custom_role_data_edit';
export const custom_role_data_get = 'custom_role_data_get';
export const custom_role_data_all = 'custom_role_data_all';
//role operation permission
export const custom_role_operation_share = 'custom_role_operation_share';

//user data permission
export const custom_user_data_created = 'custom_user_data_created';
export const custom_user_data_delete = 'custom_user_data_delete';
export const custom_user_data_edit = 'custom_user_data_edit';
export const custom_user_data_get = 'custom_user_data_get';
export const custom_user_data_all = 'custom_user_data_all';
//user operation permission
export const custom_user_operation_upload = 'custom_user_operation_upload';
export const custom_user_operation_download = 'custom_user_operation_download';
export const custom_user_operation_share = 'custom_user_operation_share';
export const custom_user_operation_suspend = 'custom_user_operation_suspend';

//federal data permission
export const custom_federal_data_created = 'custom_federal_data_created';
export const custom_federal_data_delete = 'custom_federal_data_delete';
export const custom_federal_data_edit = 'custom_federal_data_edit';
export const custom_federal_data_get = 'custom_federal_data_get';
export const custom_federal_data_all = 'custom_federal_data_all';
//federal operation permission
export const custom_federal_operation_download =
	'custom_federal_operation_download';
export const custom_federal_operation_upload =
	'custom_federal_operation_upload';
export const custom_federal_operation_suspend =
	'custom_federal_operation_suspend';

//region data permission
export const custom_region_data_created = 'custom_region_data_created';
export const custom_region_data_delete = 'custom_region_data_delete';
export const custom_region_data_edit = 'custom_region_data_edit';
export const custom_region_data_get = 'custom_region_data_get';
export const custom_region_data_all = 'custom_region_data_all';
//region operation permission
export const custom_region_operation_download =
	'custom_region_operation_download';
export const custom_region_operation_upload = 'custom_region_operation_upload';
export const custom_region_operation_suspend =
	'custom_region_operation_suspend';

//woreda data permission
export const custom_woreda_data_created = 'custom_woreda_data_created';
export const custom_woreda_data_delete = 'custom_woreda_data_delete';
export const custom_woreda_data_edit = 'custom_woreda_data_edit';
export const custom_woreda_data_get = 'custom_woreda_data_get';
export const custom_woreda_data_all = 'custom_woreda_data_all';
//woreda operation permission
export const custom_woreda_operation_download =
	'custom_woreda_operation_download';
export const custom_woreda_operation_upload = 'custom_woreda_operation_upload';
export const custom_woreda_operation_suspend =
	'custom_woreda_operation_suspend';

//school data permission
export const custom_school_data_created = 'custom_school_data_created';
export const custom_school_data_delete = 'custom_school_data_delete';
export const custom_school_data_edit = 'custom_school_data_edit';
export const custom_school_data_get = 'custom_school_data_get';
export const custom_school_data_all = 'custom_school_data_all';
//school operation permission
export const custom_school_operation_download =
	'custom_school_operation_download';
export const custom_school_operation_upload = 'custom_school_operation_upload';
export const custom_school_operation_suspend =
	'custom_school_operation_suspend';

//form data permission
export const custom_form_data_created = 'custom_form_data_created';
export const custom_form_data_delete = 'custom_form_data_delete';
export const custom_form_data_edit = 'custom_form_data_edit';
export const custom_form_data_get = 'custom_form_data_get';
export const custom_form_data_all = 'custom_form_data_all';
//form operation permission
export const custom_form_operation_download = 'custom_form_operation_download';
export const custom_form_operation_preview = 'custom_form_operation_preview';
export const custom_form_operation_share = 'custom_form_operation_share';

//learner section
export const custom_learner_data_get = 'custom_learner_data_get';

// *********************************** Form Management ***********************************
export const GET_FORMS_DATA = 'GET_FORMS_DATA';
export const GET_OWNED_FORMS_DATA = 'GET_OWNED_FORMS_DATA';
export const SAVE_FORM_TITLE_DATA = 'SAVE_FORM_TITLE_DATA';
export const DELETE_FORM_DATA = 'DELETE_FORM_DATA';
export const GET_SINGLE_FORM_DATA = 'GET_SINGLE_FORM_DATA';
export const GET_ASSIGNED_FORMS_DATA = 'GET_ASSIGNED_FORMS_DATA';
export const GET_SEARCH_USER_DATA = 'GET_SEARCH_USER_DATA';
export const SHARE_FORM_DATA = 'SHARE_FORM_DATA';
export const UPDATE_FORM_TITLE_DATA = 'UPDATE_FORM_TITLE_DATA';
export const SAVE_FORM_HEADER_DATA = 'SAVE_FORM_HEADER_DATA';
export const SAVE_FORM_SECTION_DATA = 'SAVE_FORM_SECTION_DATA';
export const DELETE_FORM_HEADER_DATA = 'DELETE_FORM_HEADER_DATA';
export const UPDATE_FORM_HEADER_DATA = 'UPDATE_FORM_HEADER_DATA';
export const UPDATE_FORM_SECTION_DATA = 'UPDATE_FORM_SECTION_DATA';
export const DELETE_FORM_SECTION_DATA = 'DELETE_FORM_SECTION_DATA';
export const SAVE_FORM_QUESTION_DATA = 'SAVE_FORM_QUESTION_DATA';
export const SAVE_FORM_SECTION_QUESTION_DATA =
	'SAVE_FORM_SECTION_QUESTION_DATA';
export const DELETE_FORM_QUESTION_DATA = 'DELETE_FORM_QUESTION_DATA';
export const DELETE_FORM_SECTION_QUESTION_DATA =
	'DELETE_FORM_SECTION_QUESTION_DATA';
export const EDIT_FORM_QUALITATIVE_QUESTION_DATA =
	'EDIT_FORM_QUALITATIVE_QUESTION_DATA';
export const EDIT_QUALITATIVE_QUESTION_IN_SECTION_DATA =
	'EDIT_QUALITATIVE_QUESTION_IN_SECTION_DATA';
export const FORM_ALL_DEATILS = 'FORM_ALL_DEATILS';
export const FROM_SUBMISSION = 'FROM_SUBMISSION';
export const GET_FORM_RESPONSES = 'GET_FORM_RESPONSES';
export const DELETE_FORM_RESPONSES_USER = 'DELETE_FORM_RESPONSES_USER';
export const GET_FORM_RESPONSES_WITH_ANS = 'GET_FORM_RESPONSES_WITH_ANS';
export const SEND_FORM_NOTIFY_TO_ALL = 'SEND_FORM_NOTIFY_TO_ALL';
export const SEND_FORM_NOTIFY_TO_ONE = 'SEND_FORM_NOTIFY_TO_ONE';

// *********************************** CONTENT MODULE ***********************************
export const GET_CONTENT_TAGS = 'GET_CONTENT_TAGS';
export const SAVE_CONTENT_TAG = 'SAVE_CONTENT_TAG';
export const ADD_ATTACHMENT = 'ADD_ATTACHMENT';
export const GET_ATTACHMENTS = 'GET_ATTACHMENTS';
export const DELETE_ATTACHMENT = 'DELETE_ATTACHMENT';
export const SAVE_CATEGORY_DATA = 'SAVE_CATEGORY_DATA';
export const GET_CATEGORY_DATA = 'GET_CATEGORY_DATA';
export const DELETE_CATEGORY_DATA = 'DELETE_CATEGORY_DATA';
export const GET_GRADE_DATA = 'GET_GRADE_DATA';
export const ADD_COURSE_DATA = 'ADD_COURSE_DATA';
export const GET_COURSE_DATA = 'GET_COURSE_DATA';
export const DELETE_COURSE_DATA = 'DELETE_COURSE_DATA';
export const GET_CATEGORY_DETAIL_DATA = 'GET_CATEGORY_DETAIL_DATA';
export const GET_ATTACHMENT_DATA = 'GET_ATTACHMENT_DATA';
export const UPDATE_CATEGORY_DATA = 'UPDATE_CATEGORY_DATA';
export const GET_COURSE_DETAIL_DATA = 'GET_COURSE_DETAIL_DATA';
export const UPDATE_COURSE_DATA = 'UPDATE_COURSE_DATA';
export const ADD_LESSON_DATA = 'ADD_LESSON_DATA';
export const DELETE_COURSE_DETAIL_DATA = 'DELETE_COURSE_DETAIL_DATA';
export const GET_LESSON_PRACTICE_EXAM_DATA = 'GET_LESSON_PRACTICE_EXAM_DATA';
export const UPDATE_LESSON_PRACTICE_EXAM_DATA =
	'UPDATE_LESSON_PRACTICE_EXAM_DATA';
export const ADD_PRACTICE_TITLE_DATA = 'ADD_PRACTICE_TITLE_DATA';
export const ADD_PRACTICE_QUESTION_DATA = 'ADD_PRACTICE_QUESTION_DATA';
export const UPDATE_PRACTICE_TITLE_DATA = 'UPDATE_PRACTICE_TITLE_DATA';
export const UPDATE_PRACTICE_QUESTION_DATA = 'UPDATE_PRACTICE_QUESTION_DATA';
export const ADD_EXAM_TITLE_DATA = 'ADD_EXAM_TITLE_DATA';
export const ADD_EXAM_QUESTION_DATA = 'ADD_EXAM_QUESTION_DATA';
export const UPDATE_EXAM_TITLE_DATA = 'UPDATE_EXAM_TITLE_DATA';
export const UPDATE_EXAM_QUESTION_DATA = 'UPDATE_EXAM_QUESTION_DATA';
export const GET_COURSE_FILTER_DATA = 'GET_COURSE_FILTER_DATA';
export const ASSIGN_COURSE_DATA = 'ASSIGN_COURSE_DATA';
export const GET_COURSES_RESPONSE_DATA = 'GET_COURSES_RESPONSE_DATA';

//extension mapping
export const extensionMapping = (type) => {
	let imageExtensionArray = ['jpg', 'png', 'jpeg', 'JPG', 'PNG', 'JPEG'];
	let videoExtensionArray = ['mp4', 'MP4'];
	let audioExtensionArray = ['mp3', 'MP3'];
	// let docExtensionArray = ["doc","docx","DOC","DOCX"]
	let docExtensionArray = ['docx', 'DOCX'];
	let excelExtensionArray = ['xls', 'xlsx', 'csv', 'XLS', 'XLSX', 'CSV'];
	let pdfExtensionArray = ['pdf', 'PDF'];
	// let pptExtensionArray = ["ppt","pptx","PPT","PPTX"]

	if (imageExtensionArray.indexOf(type) !== -1) {
		return 'image';
	} else if (videoExtensionArray.indexOf(type) !== -1) {
		return 'video';
	} else if (audioExtensionArray.indexOf(type) !== -1) {
		return 'audio';
	} else if (docExtensionArray.indexOf(type) !== -1) {
		return 'doc';
	} else if (excelExtensionArray.indexOf(type) !== -1) {
		return 'excel';
	} else if (pdfExtensionArray.indexOf(type) !== -1) {
		return 'pdf';
	}
	// else if(pptExtensionArray.indexOf(type) !== -1){
	//     return "ppt";
	// }
};

//learning section
export const SAVE_LESSON_SUBMISSION_DATA = 'SAVE_LESSON_SUBMISSION_DATA';
export const SAVE_PRACTICE_EXAM_SUBMISSION_DATA =
	'SAVE_PRACTICE_EXAM_SUBMISSION_DATA';
export const GET_COURSE_COUNT_STATUS = 'GET_COURSE_COUNT_STATUS';

//download
export const DOWNLOAD_DATA = 'DOWNLOAD_DATA';

//toaster hide show
export const TOASTER_HIDE_SHOW = "TOASTER_HIDE_SHOW"
