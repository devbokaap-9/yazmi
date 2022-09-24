import React, { useEffect, useRef, useState, useContext } from "react";
import { Link,useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import {forgotPasswordAPI, removeForgotPasswordRes} from "../../actions/Auth";
import { UserContext } from '../../UserContext';
import {removeErrorData} from "../../actions/RemoveError";

//validation
const validationSchema = yup.object({
    username: yup.string().required('Cannot be blank'),
});

const ForgotPasswordUserData = () => {
    const [ loading, setLoading ] = useState(false)
    const [ errors, setError ] = useState(false)
    const dispatch = useDispatch();
    const history = useHistory();
    const formRef = useRef();

    const userContext = useContext(UserContext);

    //response come from reducer
    {/*Error response*/}
    const error = useSelector((state) => state.error);
    {/*Login response*/}
    const { errorsData } = error
    const forgotPasswordRes = useSelector((state) => state.authData.forgotPasswordRes);
    
    useEffect(() => {
        //check security questions are set or not
        if(forgotPasswordRes && loading){
            //if first time login
            setLoading(false);
            userContext.setSQuestion(forgotPasswordRes.is_security_question_set)
            if(!forgotPasswordRes.is_user_exists || !forgotPasswordRes.is_security_question_set || forgotPasswordRes.security_questions.length < 3){
                setError("First Do Login to set up Security Questions")
            }
            else{
                setError("")
                history.push("/security-questions-submission")
            }
        }
    
    }, [forgotPasswordRes])

    useEffect(() => {
        if(errorsData && errorsData.non_field_errors.length >= 0 && loading){
            setLoading(false);
        }
    },[error])

    useEffect(() => {
        setError("")
        dispatch(removeErrorData())
    },[])

    //calling login API
    const onSubmit = values => {
        setLoading(true);
        setError("");
        dispatch(removeErrorData())

        values.action = "username-validation"
        userContext.setUName(values.username)
        dispatch(forgotPasswordAPI(values))
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
                            initialValues={{username: ''}}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                            innerRef={formRef}
                        >
                            <Form className="login-yazmi">
                                <div className="form-group">
                                    <label htmlFor="" className="label-yazmi">User name</label>
                                    <Field type="text" className="form-control input-yazmi" placeholder="Enter your username" name="username"/>
                                    
                                    {/*temp error msg div*/}
                                    {(error.errorsData && error.errorsData.non_field_errors)
                                    ?
                                        <div><span className="text-danger error_msg">{error.errorsData.non_field_errors}</span></div>
                                    :
                                        (errors !== '')
                                        ?
                                            <div><span className="text-danger error_msg">{errors}</span></div>
                                        :
                                            <ErrorMessage name="username" component="div" className="text-danger error_msg"/>
                                    }
                                    {/*temp error msg div*/}
                                </div>
                                <div className="form-group">
                                    <button type="submit" className={loading ? 
                                    "btn-primary-yazmi button_disable": "btn-primary-yazmi "} disabled={loading ? true : false}>Confirm</button>            
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
export default ForgotPasswordUserData;
