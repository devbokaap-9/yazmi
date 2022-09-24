import { combineReducers } from "redux";
import ErrorReducer from "./ErrorReducer";
import AuthReducer from "./AuthReducer";
import RegionReducer from "./RegionReducer";
import WoredaReducer from "./WoredaReducer";
import FederalReducer from "./FederalReducer";
import SecurityQuestionsReducer from "./SecurityQuestionsReducer";
import UserReducer from "./UserReducer";
import RoleReducer from "./RoleReducer";
import SchoolReducer from "./SchoolReducer";
import FormReducer from "./FormReducer";
import ContentReducer from "./ContentReducer";
import LearningReducer from "./LearningReducer";

export default combineReducers({
    error : ErrorReducer,
    authData : AuthReducer,
    regionData : RegionReducer,
    woredaData : WoredaReducer,
    federalData : FederalReducer,
    securityQuestionData : SecurityQuestionsReducer,
    usersData : UserReducer,
    rolesData : RoleReducer,
    schoolData : SchoolReducer,
    formsData : FormReducer,
    contentData : ContentReducer,
    learningData : LearningReducer
});