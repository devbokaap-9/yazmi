import React, { useEffect, useState, useContext } from "react";
import { Link,useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import {loginAPI,updateProfileData} from "../../actions/Auth";
import { UserContext } from '../../UserContext';
import {removeErrorData} from "../../actions/RemoveError";
import checkPermission from "../../utils/CheckPermission";

//validation
const validationSchema = yup.object({
    username: yup.string().required('Cannot be blank'),
    password: yup.string().required('Cannot be blank'),
});

const Login = () => {
    const [ loading, setLoading ] = useState(false)
    const dispatch = useDispatch();
    const history = useHistory();


    let displayMode = 'browser';
    const mqStandAlone = '(display-mode: standalone)';

    const userContext = useContext(UserContext);

    //response come from reducer
    {/*Error response*/}
    const error = useSelector((state) => state.error);
    {/*Login response*/}
    const { errorsData } = error
    const loginData = useSelector((state) => state.authData.loginResData);
    // console.log(loginData,'loginData')
    
    //check security questions are set or not
    if(loginData){
        let roles = []
        //if first time login
        if(!loginData.is_security_question_set){
            
            userContext.setToken(loginData.key)
            userContext.setLUserId(loginData.id)
            userContext.setPUserId(loginData.profile_id)
            let permissionArray = [];
            if(loginData.permissions){
                loginData.permissions.map(function(value){
                    permissionArray.push(value.codename)
                })
            }
            userContext.setLUserPermissions(permissionArray)
            history.push('/reset-password')
        }
        else{
            setLoading(false);
            let user_data = {
                key : loginData.key,
                username : loginData.username,
                profile_id : loginData.profile_id,
                roles : loginData.roles
            }
            localStorage.setItem('user_data',encodeURIComponent(JSON.stringify(user_data)))
            let last_log_in_as = {
                last_logged_in_as : loginData.last_logged_in_as
            }
            localStorage.setItem('last_log_in_as',encodeURIComponent(JSON.stringify(last_log_in_as)))
            let permissionArray = [];
            if(loginData.permissions){
                loginData.permissions.map(function(value){
                    permissionArray.push(value.codename)
                })
            }
            localStorage.setItem('user_permissions',encodeURIComponent(JSON.stringify(permissionArray)))
            if((navigator.standalone || window.matchMedia(mqStandAlone).matches) && loginData.last_logged_in_as === "learner" && checkPermission('custom_learner_data_get')){
                window.location.href = '/student'
            }
            else if(loginData.last_logged_in_as === "learner" && checkPermission('custom_learner_data_get')){
                window.location.href = '/student'
            }
            else if(loginData.last_logged_in_as === "admin"){
                // window.location.href = '/users'
                if(checkPermission('custom_user_data_get') || checkPermission('custom_user_operation_download') || checkPermission('custom_user_operation_upload')){
                    window.location.href = "/users"
                }
                else if(checkPermission('custom_federal_data_created') || checkPermission('custom_federal_data_delete') || checkPermission('custom_federal_data_edit') || checkPermission('custom_federal_data_get') || checkPermission('custom_federal_data_all') || checkPermission('custom_federal_operation_download') || checkPermission('custom_federal_operation_upload') || checkPermission('custom_federal_operation_suspend')){
                    window.location.href = "/federal"
                }
                else if(checkPermission('custom_region_data_created') || checkPermission('custom_region_data_delete') || checkPermission('custom_region_data_edit') || checkPermission('custom_region_data_get') || checkPermission('custom_region_data_all') || checkPermission('custom_region_operation_download') || checkPermission('custom_region_operation_upload') || checkPermission('custom_region_operation_suspend')){
                    window.location.href = "/regions"
                }
                else if(checkPermission('custom_woreda_data_created') || checkPermission('custom_woreda_data_delete') || checkPermission('custom_woreda_data_edit') || checkPermission('custom_woreda_data_get') || checkPermission('custom_woreda_data_all') || checkPermission('custom_woreda_operation_download') || checkPermission('custom_woreda_operation_upload') || checkPermission('custom_woreda_operation_suspend')){
                    window.location.href = "/woreda"
                }
                else if(checkPermission('custom_school_data_created') || checkPermission('custom_school_data_delete') || checkPermission('custom_school_data_edit') || checkPermission('custom_school_data_get') || checkPermission('custom_school_data_all') || checkPermission('custom_school_operation_download') || checkPermission('custom_school_operation_upload') || checkPermission('custom_school_operation_suspend')){
                    window.location.href = "/schools"
                }
                else if(checkPermission('custom_form_data_created') || checkPermission('custom_form_data_delete') || checkPermission('custom_form_data_edit') || checkPermission('custom_form_data_get') || checkPermission('custom_form_data_all') || checkPermission('custom_form_operation_download') || checkPermission('custom_form_operation_preview') || checkPermission('custom_form_operation_share')){
                    window.location.href = "/form"
                }
                else if(checkPermission('custom_course_data_created') || checkPermission('custom_course_data_delete') || checkPermission('custom_course_data_edit') || checkPermission('custom_course_data_get') || checkPermission('custom_course_data_all') || checkPermission('custom_course_operation_assign') || checkPermission('custom_course_operation_publish')){
                    window.location.href = "/contents"
                }
                else if(checkPermission('custom_role_data_created') || checkPermission('custom_role_data_delete') || checkPermission('custom_role_data_edit') || checkPermission('custom_role_data_get') || checkPermission('custom_role_data_all') || checkPermission('custom_role_operation_share')){
                    window.location.href = "/roles"
                }
            }
            else if(loginData.last_logged_in_as === null){
                let data = {}
                // window.location.href = "/users"
                if(checkPermission('custom_user_data_get') || checkPermission('custom_user_operation_download') || checkPermission('custom_user_operation_upload')){
                    data.last_logged_in_as = "admin"
                    window.location.href = "/users"
                }
                else if(checkPermission('custom_federal_data_created') || checkPermission('custom_federal_data_delete') || checkPermission('custom_federal_data_edit') || checkPermission('custom_federal_data_get') || checkPermission('custom_federal_data_all') || checkPermission('custom_federal_operation_download') || checkPermission('custom_federal_operation_upload') || checkPermission('custom_federal_operation_suspend')){
                    data.last_logged_in_as = "admin"
                    window.location.href = "/federal"
                }
                else if(checkPermission('custom_region_data_created') || checkPermission('custom_region_data_delete') || checkPermission('custom_region_data_edit') || checkPermission('custom_region_data_get') || checkPermission('custom_region_data_all') || checkPermission('custom_region_operation_download') || checkPermission('custom_region_operation_upload') || checkPermission('custom_region_operation_suspend')){
                    data.last_logged_in_as = "admin"
                    window.location.href = "/regions"
                }
                else if(checkPermission('custom_woreda_data_created') || checkPermission('custom_woreda_data_delete') || checkPermission('custom_woreda_data_edit') || checkPermission('custom_woreda_data_get') || checkPermission('custom_woreda_data_all') || checkPermission('custom_woreda_operation_download') || checkPermission('custom_woreda_operation_upload') || checkPermission('custom_woreda_operation_suspend')){
                    data.last_logged_in_as = "admin"
                    window.location.href = "/woreda"
                }
                else if(checkPermission('custom_school_data_created') || checkPermission('custom_school_data_delete') || checkPermission('custom_school_data_edit') || checkPermission('custom_school_data_get') || checkPermission('custom_school_data_all') || checkPermission('custom_school_operation_download') || checkPermission('custom_school_operation_upload') || checkPermission('custom_school_operation_suspend')){
                    data.last_logged_in_as = "admin"
                    window.location.href = "/schools"
                }
                else if(checkPermission('custom_form_data_created') || checkPermission('custom_form_data_delete') || checkPermission('custom_form_data_edit') || checkPermission('custom_form_data_get') || checkPermission('custom_form_data_all') || checkPermission('custom_form_operation_download') || checkPermission('custom_form_operation_preview') || checkPermission('custom_form_operation_share')){
                    data.last_logged_in_as = "admin"
                    window.location.href = "/form"
                }
                else if(checkPermission('custom_course_data_created') || checkPermission('custom_course_data_delete') || checkPermission('custom_course_data_edit') || checkPermission('custom_course_data_get') || checkPermission('custom_course_data_all') || checkPermission('custom_course_operation_assign') || checkPermission('custom_course_operation_publish')){
                    data.last_logged_in_as = "admin"
                    window.location.href = "/contents"
                }
                else if(checkPermission('custom_role_data_created') || checkPermission('custom_role_data_delete') || checkPermission('custom_role_data_edit') || checkPermission('custom_role_data_get') || checkPermission('custom_role_data_all') || checkPermission('custom_role_operation_share')){
                    data.last_logged_in_as = "admin"
                    window.location.href = "/roles"
                }
                else if(checkPermission('custom_learner_data_get')){
                    data.last_logged_in_as = "learner"
                    window.location.href = '/student'
                }
                dispatch(updateProfileData(loginData.key,loginData.profile_id,data))
            }
        }
    }
    
    useEffect(() => {
        if(errorsData && errorsData.non_field_errors.length >= 0){
            setLoading(false);
        }
    
    }, [error])

    //calling login API
    const onSubmit = values => {
        setLoading(true);
        dispatch(removeErrorData())
        dispatch(loginAPI(values))
    }
    return (
        <div className="login-container" style={{backgroundImage:'url('+process.env.PUBLIC_URL+'/images/login-bg-top.png)',  backgroundPosition: 'top right',backgroundRepeat: 'no-repeat'}}>
            <div className="login-banner-wrapper" >
                <img src={process.env.PUBLIC_URL + "/images/bghome(3).webp"} alt="" className="login-banner"/>
            </div>
            <div className="login-content-wrapper" style={{backgroundImage:'url('+process.env.PUBLIC_URL+'/images/login-bg-bottom.png)',  backgroundPosition: 'bottom left',backgroundRepeat: 'no-repeat'}}>
                <div className="login-content">
                    <img src={process.env.PUBLIC_URL + "/images/logo.svg"} alt="" className="login-logo"/>
                    {/* Login form */}
                    <div className="login-form">
                        <Formik 
                            initialValues={{username: '',password: '' }}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}>
                            <Form className="login-yazmi">
                                <div className="form-group">
                                    <label htmlFor="" className="label-yazmi">User name</label>
                                    <Field type="text" className="form-control input-yazmi" placeholder="Enter your username" name="username"/>
                                        <ErrorMessage name="username" component="div" className="text-danger error_msg"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="label-yazmi">Password</label>
                                    <Field type="password" className="form-control input-yazmi" placeholder="Enter your password" name="password"/>
                                        <ErrorMessage name="password" component="div" className="text-danger error_msg"/>
                                        {/*temp error msg div*/}
                                        <div><span className="text-danger error_msg">{(error.errorsData && error.errorsData.non_field_errors ? error.errorsData.non_field_errors : "")}</span></div>
                                        {/*temp error msg div*/}
                                </div>
                                <div className="form-group">
                                    <button type="submit" className={loading ? 
                                    "btn-primary-yazmi button_disable": "btn-primary-yazmi "} disabled={loading ? true : false}>Login</button>
                                    <Link to="/forgot-password" className="link-tertiary forgot-password-link">Forget Password?</Link>              
                                </div>
                            </Form>
                        </Formik>
                    </div>
                    {/* Login form */}
                </div>

            </div>
        </div>
    );
};
export default Login;
