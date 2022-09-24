import React, { useEffect, useState , useContext } from "react";
import { Link,useHistory,Redirect } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import {resetPasswordAPI, getProfileDetails} from "../../actions/Auth";
import { UserContext } from '../../UserContext';

//validation
const validationSchema = yup.object({
    new_password1: yup.string().required('Cannot be blank'),
    new_password2: yup.string().required('Cannot be blank'),
});

const ChangePassword = (props) => {
    const [ loading, setLoading ] = useState(false)

    const dispatch = useDispatch();
    const history = useHistory();

    const userContext = useContext(UserContext);

    //response come from reducer
    {/*Error response*/}
    const error = useSelector((state) => state.error);
    const { errorsData } = error
    {/*Reset password success response*/}
    const resetPasswordRes = useSelector((state) => state.authData.resetPasswordSuccess);

    let profileDetails = useSelector((state) => state.authData.loginResData);

    if(resetPasswordRes && resetPasswordRes.detail){
        userContext.setPUserId(profileDetails.profile_id)
        let permissionArray = [];
        if(profileDetails && profileDetails.permissions){
            profileDetails.permissions.map(function(value){
                permissionArray.push(value.codename)
            })
        }
        userContext.setLUserPermissions(permissionArray)
        history.push('/login')
    }
    useEffect(() => {
        if(errorsData && errorsData.new_password2){
            setLoading(false);
        }
    
    }, [error])

    //calling Reset Password API
    const onSubmit = values => {
        setLoading(true);
        dispatch(getProfileDetails(userContext.token))
        dispatch(resetPasswordAPI(values,userContext.token))
    }

    return (
        <>
            {(userContext.token !== '')?
            <div className="login-container" style={{backgroundImage:'url('+process.env.PUBLIC_URL+'/images/login-bg-top.png)',  backgroundPosition: 'top right',backgroundRepeat: 'no-repeat'}}>
                <div className="login-banner-wrapper">
                    <img src={process.env.PUBLIC_URL + "/images/bghome(3).webp"} alt="banner" className="login-banner" />
                </div>
                <div className="login-content-wrapper" style={{backgroundImage:'url('+process.env.PUBLIC_URL+'/images/login-bg-bottom.png)',  backgroundPosition: 'bottom left',backgroundRepeat: 'no-repeat'}}>
                    <div className="login-content">
                        <img src={process.env.PUBLIC_URL + "/images/logo.svg"} alt="logo" className="login-logo"/>
                        <div className="forgot-password-form">
                            <h3>Set up your new password</h3>
                            <Formik 
                                initialValues={{new_password1: '',new_password2: '' }}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}>
                                <Form className="login-yazmi">
                                    <div className="form-group">
                                        <label htmlFor="" className="label-yazmi">New Password</label>
                                        <Field type="password" className="form-control input-yazmi" placeholder="Enter new password" name="new_password1"/>
                                        <ErrorMessage name="new_password1" component="div" className="text-danger error_msg"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="" className="label-yazmi">Re-enter Password</label>
                                        <Field type="password" className="form-control input-yazmi" placeholder="Re-enter new password" name="new_password2"/>
                                        <ErrorMessage name="new_password2" component="div" className="text-danger error_msg"/>
                                        {/*temp error msg div*/}
                                        <div><span className="text-danger error_msg">{(!resetPasswordRes && error.errorsData && error.errorsData.new_password2 ? error.errorsData.new_password2 : "")}</span></div>
                                        {/*temp error msg div*/}
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className={loading ? "btn-primary-yazmi float-end hover_color button_disable": "btn-primary-yazmi float-end hover_color"} disabled={loading ? true : false}>Confirm</button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>

                </div>
            </div>
            :
                <>
                    <Redirect to="/"></Redirect>
                </>
            }
        </>
    );
};
export default ChangePassword;
