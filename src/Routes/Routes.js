import React from "react";
import { Switch, Route, withRouter, Redirect,BrowserRouter as Router } from "react-router-dom";
import Base from "../Base";
import Index from '../components/Login/Index';
import Login from '../components/Login/Login';
import SecurityQuestions from '../components/Login/SecurityQuestions';
import ResetPassword from '../components/Login/ResetPassword';
import ForgotPasswordUserData from '../components/Login/ForgotPasswordUserData';
import ForgotPasswordSecurityQuestionsSubmission from '../components/Login/ForgotPasswordSecurityQuestionsSubmission';
import ChangePassword from '../components/Login/ChangePassword';
import UsersListing from '../components/UsersTab/Users/AllUsers'
import FederalListing from '../components/UsersTab/Federal/Federal'
import RegionListing from '../components/UsersTab/Regions/Region'
import RegionUserListing from '../components/UsersTab/Regions/RegionUsers/RegionUsers'
import DistrictListing from '../components/UsersTab/Districts/District'
import DistrictUserListing from '../components/UsersTab/Districts/DistrictUsers/DistrictUsers'
import SchoolListing from '../components/UsersTab/Schools/School'
import SubStudentListing from '../components/UsersTab/Schools/Teacher/Teacher'
import SubTeacherListing from '../components/UsersTab/Schools/SubSchool/SubSchool'
import Role from '../components/RoleTab/Roles/Role'
import UnAuthorized from "../components/CustomPages/UnAuthorizedPage";
// import AllAnnouncements from "../components/Announcements/AllAnnouncements";
import AllForm from "../components/FormTab/AllForms/Allform/AllForm";
// import Inbox from "../components/Announcements/Inbox";
// import Sent from "../components/Announcements/Sent";
import {Provider} from "react-redux"
import store from "../store"
import PrivateRoute from "./PrivateRoute";
import authHeader from '../utils/AuthHeader';
import SubUserForm from "../components/FormTab/AllForms/FormByUser/SubUserForm";
import NotOwnSubHeader from "../components/FormTab/AllForms/FormByUser/FormNotOwnByMe/NotOwnSubHeader";
import Category from "../components/ContentTab/Category/Category";
import PageNotFound from "../components/CustomPages/PageNotFound";
import Learner from "../components/StudentDashboard/StudentDashboard";
// import Product from "../components/Products/Product";
import Course from "../components/StudentDashboard/ViewCourse/Course";
import PracticeTestResult from "../components/StudentDashboard/PracticeTest/PracticeTestResult";
import ExamQuestionAns from "../components/StudentDashboard/ExamTest/ExamQuestionAns";
import PracticeQuestionAns from "../components/StudentDashboard/PracticeTest/PracticeQuestionAns";
import ExamTestResult from "../components/StudentDashboard/ExamTest/ExamTestResult";
import ViewCourses from "../components/StudentDashboard/StudentComponents/ViewCourses";
import checkPermission from "../utils/CheckPermission";

let displayMode = 'browser';
const mqStandAlone = '(display-mode: standalone)';

let user_data = JSON.parse(decodeURIComponent(localStorage.getItem('last_log_in_as')));
// console.log(user_data,'userdata')
const PreLoginRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authHeader() ? (
        ((navigator.standalone || window.matchMedia(mqStandAlone).matches)  && user_data.last_logged_in_as === "learner" && checkPermission('custom_learner_data_get')) ? 
          <Redirect  to="/student"/>
        :
        (user_data.last_logged_in_as === "learner" && checkPermission('custom_learner_data_get'))
        ?
          <Redirect  to="/student"/>
        :
        (checkPermission('custom_user_data_get') || checkPermission('custom_user_operation_download') || checkPermission('custom_user_operation_upload'))
        ?
          <Redirect to="/users"/>
        :
        (checkPermission('custom_federal_data_created') || checkPermission('custom_federal_data_delete') || checkPermission('custom_federal_data_edit') || checkPermission('custom_federal_data_get') || checkPermission('custom_federal_data_all') || checkPermission('custom_federal_operation_download') || checkPermission('custom_federal_operation_upload') || checkPermission('custom_federal_operation_suspend'))
        ?
          <Redirect to="/federal"/>
        :
        (checkPermission('custom_region_data_created') || checkPermission('custom_region_data_delete') || checkPermission('custom_region_data_edit') || checkPermission('custom_region_data_get') || checkPermission('custom_region_data_all') || checkPermission('custom_region_operation_download') || checkPermission('custom_region_operation_upload') || checkPermission('custom_region_operation_suspend'))
        ?
          <Redirect to="/regions"/>
        :
        (checkPermission('custom_woreda_data_created') || checkPermission('custom_woreda_data_delete') || checkPermission('custom_woreda_data_edit') || checkPermission('custom_woreda_data_get') || checkPermission('custom_woreda_data_all') || checkPermission('custom_woreda_operation_download') || checkPermission('custom_woreda_operation_upload') || checkPermission('custom_woreda_operation_suspend'))
        ?
          <Redirect to="/woreda"/>
        :
        (checkPermission('custom_school_data_created') || checkPermission('custom_school_data_delete') || checkPermission('custom_school_data_edit') || checkPermission('custom_school_data_get') || checkPermission('custom_school_data_all') || checkPermission('custom_school_operation_download') || checkPermission('custom_school_operation_upload') || checkPermission('custom_school_operation_suspend'))
        ?
          <Redirect to="/schools"/>
        :
        (checkPermission('custom_form_data_created') || checkPermission('custom_form_data_delete') || checkPermission('custom_form_data_edit') || checkPermission('custom_form_data_get') || checkPermission('custom_form_data_all') || checkPermission('custom_form_operation_download') || checkPermission('custom_form_operation_preview') || checkPermission('custom_form_operation_share'))
        ?
          <Redirect to="/form"/>
        :
        (checkPermission('custom_course_data_created') || checkPermission('custom_course_data_delete') || checkPermission('custom_course_data_edit') || checkPermission('custom_course_data_get') || checkPermission('custom_course_data_all') || checkPermission('custom_course_operation_assign') || checkPermission('custom_course_operation_publish'))
        ?
          <Redirect to="/contents"/> 
        :
        (checkPermission('custom_role_data_created') || checkPermission('custom_role_data_delete') || checkPermission('custom_role_data_edit') || checkPermission('custom_role_data_get') || checkPermission('custom_role_data_all') || checkPermission('custom_role_operation_share'))
        ?
          <Redirect to="/roles"/> 
        :
          <Redirect to="/users"/> 
        ) : (
        <Component {...props} />
      )
    }
  />
);

const Routes = ({ location }) => {
  return(
    <Provider store={store}>
      <Router>
        <Base>
          <Switch>
            <PreLoginRoute exact path="/" component={Login}/>
            <PreLoginRoute path="/reset-password" component={ResetPassword} />
            <PreLoginRoute path="/forgot-password" component={ForgotPasswordUserData} /> 
            <PreLoginRoute path="/security-questions" component={SecurityQuestions} />
            <PreLoginRoute path="/security-questions-submission" component={ForgotPasswordSecurityQuestionsSubmission} />
            <PreLoginRoute path="/change-password" component={ChangePassword} />
            <PreLoginRoute path="/login" component={Index} /> 
            <PrivateRoute path="/student/course-details/practices/:id?/start-test" component={PracticeQuestionAns} /> 
            <PrivateRoute path="/student/course-details/exams/:id?/start-test" component={ExamQuestionAns} /> 
            <PrivateRoute path="/student/course-details/:name?/:id?/practice-result" component={PracticeTestResult} /> 
            <PrivateRoute path="/student/course-details/:name?/:id?/exam-result" component={ExamTestResult} /> 
            <PrivateRoute path="/student/pratice" component={Course} /> 
            <PrivateRoute path="/student/viewexam" component={Course} /> 
            <PrivateRoute path="/student/viewcourse" component={ViewCourses} /> 
            <PrivateRoute path="/student/course-details/:name?/:id?" component={Course} /> 
            <PrivateRoute path="/student" component={Learner} /> 
            <PrivateRoute path="/users" component={UsersListing} />
            <PrivateRoute path="/federal" component={FederalListing} />
            <PrivateRoute path="/roles" component={Role} />
            <PrivateRoute path="/role/:name" component={Role} />
            <PrivateRoute path="/regions/:id" component={RegionUserListing} />
            <PrivateRoute path="/regions" component={RegionListing} />
            <PrivateRoute path={`/woreda/:id`} component={DistrictUserListing} />
            <PrivateRoute path="/woreda" component={DistrictListing} />
            <PrivateRoute path={`/schools/:id`} component={SubTeacherListing} />
            <PrivateRoute path="/schools/teacher" component={SubStudentListing} />
            <PrivateRoute path="/schools" component={SchoolListing} />
            {/* <PrivateRoute path="/allannouncement/inbox" component={Inbox} />  */}
            {/* <PrivateRoute path="/allannouncement/sent" component={Sent} /> */}
            {/* <PrivateRoute path="/allannouncement" component={AllAnnouncements} /> */}
            <PrivateRoute path="/notownform/:title" component={NotOwnSubHeader} />
            <PrivateRoute path="/form/:name" component={SubUserForm} />
            <PrivateRoute path="/form" component={AllForm} />
            <PrivateRoute path="/contents" component={Category} />
            <PrivateRoute path="/contents/:category/:course?" component={Category} />
            <PrivateRoute path="/401" component={UnAuthorized} />
            {/* <PrivateRoute path="/product" component={Product} /> */}


            {/* add all routes above it */}
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Base>
      </Router>
    </Provider>
  )
}


export default withRouter(Routes);
