import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link ,Redirect , useHistory} from "react-router-dom";
import { getSecurityQuestions, securityQuestionSubmission } from "../../actions/SecurityQuestions";
import {removeErrorData} from "../../actions/RemoveError";
import { UserContext } from '../../UserContext';
import {forgotPasswordAPI} from "../../actions/Auth";
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as yup from 'yup';

//validation
const validationSchema = yup.object({
  answer1: yup.string().required('Cannot be blank'),
  answer2: yup.string().required('Cannot be blank'),
  answer3: yup.string().required('Cannot be blank'),
});

const ForgotPasswordSecurityQuestionsSubmission = (props) => {
  const userContext = useContext(UserContext);
  let history = useHistory();
  const [ loading, setLoading ] = useState(false)
  const [question1,setQuestion1] = useState("");
  const [question2,setQuestion2] = useState("");
  const [question3,setQuestion3] = useState("");
  const [questionId1,setQuestionId1] = useState("");
  const [questionId2,setQuestionId2] = useState("");
  const [questionId3,setQuestionId3] = useState("");

  const dispatch = useDispatch();

  //data come from reducer
  const error = useSelector((state) => state.error.errorsData);
  const {securityQuestionsData}  = useSelector((state) => state.securityQuestionData);
  const forgotPasswordPrevRes = useSelector((state) => state.authData.forgotPasswordRes);
  const forgotPasswordRes = useSelector((state) => state.authData.forgotPasswordRes);
  
  var { results } = securityQuestionsData;
  
  useEffect(() => {
    dispatch(getSecurityQuestions());
  },[])

  useEffect(()=>{
    if(results){
      let question1 = results && results.filter((data) => data.id === forgotPasswordPrevRes.security_questions[0])
      setQuestion1(question1[0].title)
      setQuestionId1(question1[0].id)

      let question2 = results && results.filter((data) => data.id === forgotPasswordPrevRes.security_questions[1])
      setQuestion2(question2[0].title)
      setQuestionId2(question2[0].id)

      let question3 = results && results.filter((data) => data.id === forgotPasswordPrevRes.security_questions[2])
      setQuestion3(question3[0].title)
      setQuestionId3(question3[0].id)
    }
  },[results])

  useEffect(() => {
    if(forgotPasswordRes && forgotPasswordRes.id && error === ''){
      if(!forgotPasswordRes.is_security_question_set){
        
      }
      else{
        userContext.setToken(forgotPasswordRes.key)
        history.push('/change-password')
      }
    }
    else{
      if(error){
        setLoading(false)
      }
    }
  }, [forgotPasswordRes,error]);

  //calling security qtn API
  const onSubmit = values => {
    dispatch(removeErrorData());
    let data = {
      "username" : userContext.uName,
      "action" : "security-question-answer-validation",
      "security-question-answers" : [
        {
          "answer" : values.answer1,
          "question" : questionId1
        },
        {
          "answer" : values.answer2,
          "question" : questionId2
        },
        {
          "answer" : values.answer3,
          "question" : questionId3
        }
      ]
    }
    dispatch(forgotPasswordAPI(data))
  }

  return (
    <>
      {(userContext.sQuestion !== '')?
        <section
          className="security_question"
        >
          <div className="top_left">
              <img
              src={process.env.PUBLIC_URL + "/images/BackgroundIcon.png"}
              alt=""
            />
          </div>
          <div className="top_right">
              <img
              src={process.env.PUBLIC_URL + "/images/login-bg-top.png"}
              alt=""
            />
          </div>
          <div className="Left_bottom">
              <img
              src={process.env.PUBLIC_URL + "/images/Ellipse 49.png"}
              alt=""
            />
          </div>
          <div className="right_bottom">
              <img
              src={process.env.PUBLIC_URL + "/images/BackgroundIcon.png"}
              alt=""
            />
          </div>
          <div className="security_question_div d-flex justify-content-center align-items-center">
            <div className="answer_div">
              <h3 className="mb-0">Setup Security Questions</h3>
              <p className="mb-0">
                Setup security questions to answer incase you forget your password
              </p>
                <Formik initialValues={{answer1: '',answer2: '' ,answer3: ''  }} validationSchema={validationSchema} onSubmit={onSubmit}>
                  {({ handleChange, values }) => {
                  return (
                    <Form className="security_yazmi">
                      <div className="form-group question_1">
                          <label htmlFor="" className="label-yazmi">
                          Question 1
                          </label>
                          <Field type="text" className="form-control input-yazmi" name="question1" value={question1}/>
                          <label htmlFor="" className="label-yazmi">
                          Answer
                          </label>
                          <Field type="text" className="form-control input-yazmi" name="answer1"/>
                          <ErrorMessage name="answer1" component="div" className="text-danger error_msg"/>

                          <label htmlFor="" className="label-yazmi">
                          Question 2
                          </label>
                          <Field type="text" className="form-control input-yazmi" name="question2" value={question2}/>
                          <label htmlFor="" className="label-yazmi">
                          Answer
                          </label>
                          <Field type="text" className="form-control input-yazmi" name="answer2"/>
                          <ErrorMessage name="answer2" component="div" className="text-danger error_msg"/>


                          <label htmlFor="" className="label-yazmi">
                          Question 3
                          </label>
                          <Field type="text" className="form-control input-yazmi" name="question3" value={question3}/>
                          <label htmlFor="" className="label-yazmi">
                          Answer
                          </label>
                          <Field type="text" className="form-control input-yazmi" name="answer3"/>
                          <ErrorMessage name="answer3" component="div" className="text-danger error_msg"/>
                          {/*temp error msg div*/}
                          {(error.detail)
                          ?
                            <div><span className="text-danger error_msg">{error.detail}</span></div>
                          :
                            <></>
                          }
                          {/*temp error msg div*/}
                      
                      </div>
                      <div className="form-group text-center">
                          <button type="submit" className={loading ? "btn-primary-yazmi button_disable": "btn-primary-yazmi "} disabled={loading ? true : false}>Confirm</button>
                      </div>
                    </Form>
                  )
                  }}
                </Formik>
              
            </div>
          </div>
        </section>
      :
      <>
          <Redirect to="/"></Redirect>
      </>
  }
    </>
  );
};

export default ForgotPasswordSecurityQuestionsSubmission;
