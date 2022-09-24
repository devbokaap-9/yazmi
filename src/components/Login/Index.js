import React, { useContext, useEffect, useState} from "react";
import { Link,Redirect } from "react-router-dom";
import {updateProfileData} from "../../actions/Auth";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from '../../UserContext';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;



const Index = () => {
    const userContext = useContext(UserContext);
    const dispatch = useDispatch();
    const [btnClick,setBtnClick] = useState(false)
    let [color, setColor] = useState("#ffffff");
    const [loading,setLoading] = useState(false)

    let displayMode = 'browser';
    const mqStandAlone = '(display-mode: standalone)';

    //call me API
    const loginRedirect = (type) => {
        setLoading(true)
        let data = {
            "last_logged_in_as" : type
        }
        dispatch(updateProfileData(userContext.token,userContext.pUserId,data))
    }

    let updatedProfileDetails = useSelector((state) => state.authData.updateProfileData);

    useEffect(() => {
        if(updatedProfileDetails.id && loading){
            setBtnClick(true)
        }
    },[updatedProfileDetails])

    let profileDetails = useSelector((state) => state.authData.loginResData);

    const redirectRoute = () => {
        if(checkPermissions('custom_user_data_get') || checkPermissions('custom_user_operation_download') || checkPermissions('custom_user_operation_upload')){
            window.location.href = "/users"
        }
        else if(checkPermissions('custom_federal_data_created') || checkPermissions('custom_federal_data_delete') || checkPermissions('custom_federal_data_edit') || checkPermissions('custom_federal_data_get') || checkPermissions('custom_federal_data_all') || checkPermissions('custom_federal_operation_download') || checkPermissions('custom_federal_operation_upload') || checkPermissions('custom_federal_operation_suspend')){
            window.location.href = "/federal"
        }
        else if(checkPermissions('custom_region_data_created') || checkPermissions('custom_region_data_delete') || checkPermissions('custom_region_data_edit') || checkPermissions('custom_region_data_get') || checkPermissions('custom_region_data_all') || checkPermissions('custom_region_operation_download') || checkPermissions('custom_region_operation_upload') || checkPermissions('custom_region_operation_suspend')){
            window.location.href = "/regions"
        }
        else if(checkPermissions('custom_woreda_data_created') || checkPermissions('custom_woreda_data_delete') || checkPermissions('custom_woreda_data_edit') || checkPermissions('custom_woreda_data_get') || checkPermissions('custom_woreda_data_all') || checkPermissions('custom_woreda_operation_download') || checkPermissions('custom_woreda_operation_upload') || checkPermissions('custom_woreda_operation_suspend')){
            window.location.href = "/woreda"
        }
        else if(checkPermissions('custom_school_data_created') || checkPermissions('custom_school_data_delete') || checkPermissions('custom_school_data_edit') || checkPermissions('custom_school_data_get') || checkPermissions('custom_school_data_all') || checkPermissions('custom_school_operation_download') || checkPermissions('custom_school_operation_upload') || checkPermissions('custom_school_operation_suspend')){
            window.location.href = "/schools"
        }
        else if(checkPermissions('custom_form_data_created') || checkPermissions('custom_form_data_delete') || checkPermissions('custom_form_data_edit') || checkPermissions('custom_form_data_get') || checkPermissions('custom_form_data_all') || checkPermissions('custom_form_operation_download') || checkPermissions('custom_form_operation_preview') || checkPermissions('custom_form_operation_share')){
            window.location.href = "/form"
        }
        else if(checkPermissions('custom_course_data_created') || checkPermissions('custom_course_data_delete') || checkPermissions('custom_course_data_edit') || checkPermissions('custom_course_data_get') || checkPermissions('custom_course_data_all') || checkPermissions('custom_course_operation_assign') || checkPermissions('custom_course_operation_publish')){
            window.location.href = "/contents"
        }
        else if(checkPermissions('custom_role_data_created') || checkPermissions('custom_role_data_delete') || checkPermissions('custom_role_data_edit') || checkPermissions('custom_role_data_get') || checkPermissions('custom_role_data_all') || checkPermissions('custom_role_operation_share')){
            window.location.href = "/roles"
        }
        else if(checkPermissions('custom_learner_data_get')){
            window.location.href = '/student'
        }
    }

    useEffect(() => {
        let roles = []
        if(profileDetails.id && btnClick && loading){
            setLoading(false)
            let user_data = {
                key : profileDetails.key,
                username : profileDetails.username,
                profile_id : profileDetails.profile_id,
                roles : profileDetails.roles
            }
            localStorage.setItem('user_data',encodeURIComponent(JSON.stringify(user_data)))
            let last_log_in_as = {
                last_logged_in_as : profileDetails.last_logged_in_as
            }
            localStorage.setItem('last_log_in_as',encodeURIComponent(JSON.stringify(last_log_in_as)))
            let permissionArray = [];
            if(profileDetails.permissions){
                profileDetails.permissions.map(function(value){
                    permissionArray.push(value.codename)
                })
            }
            localStorage.setItem('user_permissions',encodeURIComponent(JSON.stringify(permissionArray)))
            profileDetails.roles && profileDetails.roles.map((obj) => {
                roles.push(obj.title.toLowerCase())
            })


            if((navigator.standalone || window.matchMedia(mqStandAlone).matches) && profileDetails.last_logged_in_as === "learner" && checkPermissions('custom_learner_data_get')){
                window.location.href = '/student'
            }
            else if(profileDetails.last_logged_in_as === "learner" && checkPermissions('custom_learner_data_get')){
                window.location.href = '/student'
            }
            else if(profileDetails.last_logged_in_as === "admin"){
                // window.location.href = '/users'
                redirectRoute();
            }
            else if(profileDetails.last_logged_in_as === null){
                redirectRoute();
            }
        }
    },[profileDetails]);

    const checkPermissions = (codename) => {
        if(userContext.lUserPermissions && userContext.lUserPermissions.indexOf(codename) !== -1){
            return true;
        }
        else{
            return false;
        }
    }

    return (
        <>
            {(userContext.token)?
                <div className="login-container" style={{backgroundImage:'url('+process.env.PUBLIC_URL+'/images/login-bg-top.png)',  backgroundPosition: 'top right',backgroundRepeat: 'no-repeat'}}>
                    <div className="login-banner-wrapper">
                        <img src={process.env.PUBLIC_URL + "/images/bghome(3).webp"} alt="" className="login-banner"/>
                    </div>
                    <div className="login-content-wrapper" style={{backgroundImage:'url('+process.env.PUBLIC_URL+'/images/login-bg-bottom.png)',  backgroundPosition: 'bottom left',backgroundRepeat: 'no-repeat'}}>
                        <div className="login-content">
                            {/* Select user type*/}
                            <div className="select-user-type">
                                {/*learner section all codename comes here inside condition */}
                                {(checkPermissions('custom_learner_data_get'))
                                ?
                                    <div className="user-type-single">
                                        {/* <p>Login as Learner</p> */}
                                        <Link className="btn-large-bg login-learner-link"  style={{backgroundImage:'url('+process.env.PUBLIC_URL+'/images/button-bg.png)',  backgroundPosition: 'bottom left -20px',backgroundRepeat: 'no-repeat'}} onClick={() => {loginRedirect("learner")}}>Login as Learner</Link>
                                    </div>
                                :
                                    <></>
                                } 

                                {/*uer/role/course section all codename comes here inside condition */}
                                {(checkPermissions('custom_user_data_get') || checkPermissions('custom_user_operation_download') || checkPermissions('custom_user_operation_upload') || checkPermissions('custom_federal_data_created') || checkPermissions('custom_federal_data_delete') || checkPermissions('custom_federal_data_edit') || checkPermissions('custom_federal_data_get') || checkPermissions('custom_federal_data_all') || checkPermissions('custom_federal_operation_download') || checkPermissions('custom_federal_operation_upload') || checkPermissions('custom_federal_operation_suspend') || checkPermissions('custom_region_data_created') || checkPermissions('custom_region_data_delete') || checkPermissions('custom_region_data_edit') || checkPermissions('custom_region_data_get') || checkPermissions('custom_region_data_all') || checkPermissions('custom_region_operation_download') || checkPermissions('custom_region_operation_upload') || checkPermissions('custom_region_operation_suspend') || checkPermissions('custom_woreda_data_created') || checkPermissions('custom_woreda_data_delete') || checkPermissions('custom_woreda_data_edit') || checkPermissions('custom_woreda_data_get') || checkPermissions('custom_woreda_data_all') || checkPermissions('custom_woreda_operation_download') || checkPermissions('custom_woreda_operation_upload') || checkPermissions('custom_woreda_operation_suspend') || checkPermissions('custom_school_data_created') || checkPermissions('custom_school_data_delete') || checkPermissions('custom_school_data_edit') || checkPermissions('custom_school_data_get') || checkPermissions('custom_school_data_all') || checkPermissions('custom_school_operation_download') || checkPermissions('custom_school_operation_upload') || checkPermissions('custom_school_operation_suspend') || checkPermissions('custom_role_data_created') || checkPermissions('custom_role_data_delete') || checkPermissions('custom_role_data_edit') || checkPermissions('custom_role_data_get') || checkPermissions('custom_role_data_all') || checkPermissions('custom_role_operation_share') || checkPermissions('custom_form_data_created') || checkPermissions('custom_form_data_delete') || checkPermissions('custom_form_data_edit') || checkPermissions('custom_form_data_get') || checkPermissions('custom_form_data_all') || checkPermissions('custom_form_operation_download') || checkPermissions('custom_form_operation_preview') || checkPermissions('custom_form_operation_share') || checkPermissions('custom_course_data_created') || checkPermissions('custom_course_data_delete') || checkPermissions('custom_course_data_edit') || checkPermissions('custom_course_data_get') || checkPermissions('custom_course_data_all') || checkPermissions('custom_course_operation_assign') || checkPermissions('custom_course_operation_publish'))
                                ?
                                    <div className="user-type-single ml_23">
                                        {/* <p>Login as Administrator</p> */}
                                        <Link className="btn-large-bg login-admin-link"  style={{backgroundImage:'url('+process.env.PUBLIC_URL+'/images/button-bg.png)',  backgroundPosition: 'bottom left -20px',backgroundRepeat: 'no-repeat'}} onClick={() => {loginRedirect("admin")}}>Login as Administrator</Link>
                                    </div>
                                :
                                    <></>
                                }   
                            </div>
                            {/* Select user type*/}
                        </div>

                    </div>
                </div>
            :
                <>
                    <Redirect to="/"></Redirect>
                </>
            }
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className={loading ? "loader_div" : ""}>
              <ClipLoader
                color={color}
                className="loader"
                loading={loading}
                css={override}
                size={50}
              />
            </div>
        </>
    );
};
export default Index;
