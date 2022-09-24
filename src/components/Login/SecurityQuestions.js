import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link ,Redirect , useHistory} from "react-router-dom";
import { getSecurityQuestions, securityQuestionSubmission } from "../../actions/SecurityQuestions";
import {removeErrorData} from "../../actions/RemoveError";
import { UserContext } from '../../UserContext';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as yup from 'yup';

//validation
const validationSchema1 = yup.object({
  answer1: yup.string().required('Cannot be blank'),
});
const validationSchema2 = yup.object({
  answer2: yup.string().required('Cannot be blank'),
});
const validationSchema3 = yup.object({
  answer3: yup.string().required('Cannot be blank'),
});

const SecurityQuestions = (props) => {
  const userContext = useContext(UserContext);
  let history = useHistory();
  const [ loading, setLoading ] = useState(false)

  //set steps
  const [steps,setSteps] = useState(1);

  const dispatch = useDispatch();

  //data come from reducer
  const error = useSelector((state) => state.error.errorsData);
  const quesionAnswerSubmissionRes = useSelector((state) => state.securityQuestionData.securityQuestionsAnswerData);
  const {securityQuestionsData}  = useSelector((state) => state.securityQuestionData);
  
  var { results } = securityQuestionsData;
  // console.log(results,'results')
  useEffect(() => {
    if(userContext.token !== ''){
      dispatch(getSecurityQuestions(userContext.token));
    }
    if(quesionAnswerSubmissionRes && quesionAnswerSubmissionRes.id && error === ''){
      if(steps === 1){
        setTimeout(function(){
          setSteps(2);
          setLoading(false)
        },100)
      }
      else if(steps === 2){
        setTimeout(function(){
          setSteps(3);
          setLoading(false)
        },100)
      }
      else if(steps === 3){
        setTimeout(function(){
          history.push('/login')
          setLoading(false)
        },100)
      }
    }
    else{
      if(error){
        setLoading(false)
      }
    }
  }, [quesionAnswerSubmissionRes,error]);

  //calling security qtn API
  const onSubmit = values => {
    dispatch(removeErrorData());
    let answer = '';
    let question = '';
    if(steps === 1){
      answer = values.answer1;
      question = values.question1

      values.answer1 = ""
      values.question1 = "1"
    }
    else if(steps === 2){
      answer = values.answer2;
      question = values.question2

      values.answer2 = ""
      values.question2 = "1"
    }
    else if(steps === 3){
      answer = values.answer3;
      question = values.question3

      values.answer3 = ""
      values.question3 = "1"
    }
    setLoading(true);
    let data = {
      "answer" : answer,
      "user" : userContext.lUserId,
      "question" : question
    }
    dispatch(securityQuestionSubmission(data,userContext.token))
  }
  return (
    <>
      {(userContext.token !== '')?
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
              {(steps === 1)
              ?
                <Formik initialValues={{answer1: '',question1: '' }} validationSchema={validationSchema1} onSubmit={onSubmit}>
                  {({ handleChange, values }) => {
                  return (
                    <Form className="security_yazmi">
                      <div className="form-group question_1">
                        <label htmlFor="" className="label-yazmi">
                          Question 1
                        </label>
                        <select className="form-control input-yazmi" name="question1" onChange={handleChange} value={values.question1}>
                          <option value="1">Select the Question</option>
                          {
                            results && results.map((data,key) => 
                              <option value={data.id}>{data.title}</option>
                                
                            )
                          }
                        </select>
                        <span className="down_arrow">
                          <svg
                            width="15"
                            height="9"
                            viewBox="0 0 15 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 0.999999L7.48437 7.43412L13.9688 1"
                              stroke="#252525"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>

                        <label htmlFor="" className="label-yazmi">
                          Answer
                        </label>
                        <Field type="text" className="form-control input-yazmi" name="answer1"/>
                        
                        {(error)?
                          <div><span className="text-danger error_msg">{(error.question ? error.question[0] : (error.non_field_errors) ? error.non_field_errors[0] :"")}</span></div>
                        :
                          <ErrorMessage name="answer1" component="div" className="text-danger error_msg"/>
                        }
                      </div>
                      <div className="form-group text-center">
                        <button type="submit" className={loading ? "btn-primary-yazmi button_disable": "btn-primary-yazmi "} disabled={loading ? true : false}>Next</button>
                      </div>
                    </Form>
                  )
                  }}
                </Formik>
              :
                (steps === 2)
                ?
                  <Formik initialValues={{answer2: '',question2: '' }} validationSchema={validationSchema2} onSubmit={onSubmit}>
                    {({ handleChange,values }) => {
                    return (
                      <Form className="security_yazmi">
                        <div className="form-group question_1">
                          <label htmlFor="" className="label-yazmi">
                            Question 2
                          </label>
                          <select className="form-control input-yazmi" name="question2" onChange={handleChange} value={values.question2}>
                            <option value="1">Select the Question</option>
                            {
                              results && results.map((data,key) => 
                                <option value={data.id}>{data.title}</option>
                                  
                              )

                            }
                          </select>
                          <span className="down_arrow">
                            <svg
                              width="15"
                              height="9"
                              viewBox="0 0 15 9"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 0.999999L7.48437 7.43412L13.9688 1"
                                stroke="#252525"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>

                          <label htmlFor="" className="label-yazmi">
                            Answer
                          </label>
                          <Field type="text" className="form-control input-yazmi" name="answer2"/>
                          {(error)?
                            <div><span className="text-danger error_msg">{(error.question ? error.question[0] : (error.non_field_errors) ? error.non_field_errors[0] :"")}</span></div>
                          :
                            <ErrorMessage name="answer2" component="div" className="text-danger error_msg"/>
                          }
                        </div>
                        <div className="form-group text-center">
                          <button type="submit" className={loading ? "btn-primary-yazmi button_disable": "btn-primary-yazmi "} disabled={loading ? true : false}>Next</button>
                        </div>
                      </Form>
                    )
                    }}
                  </Formik>
                :
                  (steps === 3)
                  ?
                    <Formik initialValues={{answer3: '',question3: '' }} validationSchema={validationSchema3} onSubmit={onSubmit}>
                      {({ handleChange, values }) => {
                      return (
                        <Form className="security_yazmi">
                          <div className="form-group question_1">
                            <label htmlFor="select" className="label-yazmi">
                              Question 3
                            </label>
                            <select className="form-control input-yazmi" name="question3" onChange={handleChange} value={values.question3}>
                              <option value="1">Select the Question</option>
                              {
                                results && results.map((data,key) => 
                                  <option value={data.id}>{data.title}</option>
                                    
                                )

                              }
                            </select>
                            <span className="down_arrow">
                              <svg
                                width="15"
                                height="9"
                                viewBox="0 0 15 9"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M1 0.999999L7.48437 7.43412L13.9688 1"
                                  stroke="#252525"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>

                            <label htmlFor="" className="label-yazmi">
                              Answer
                            </label>
                            <Field type="text" className="form-control input-yazmi" name="answer3"/>
                            {(error)?
                              <div><span className="text-danger error_msg">{(error.question ? error.question[0] : (error.non_field_errors) ? error.non_field_errors[0] :"")}</span></div>
                            :
                              <ErrorMessage name="answer3" component="div" className="text-danger error_msg"/>
                            }
                          </div>
                          <div className="form-group text-center">
                            <button type="submit" className={loading ? "btn-primary-yazmi button_disable": "btn-primary-yazmi "} disabled={loading ? true : false}>Confirm</button>
                          </div>
                        </Form>
                      )
                      }}
                    </Formik>
                  :
                      <></>
                }
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

export default SecurityQuestions;
