import React, { useState,useContext,useEffect } from "react";
import SubHeader from "../../Layout/SubHeader";
import {UserContext} from "../../../UserContext";
import { useSelector } from "react-redux";

const PracticeTestResult = () => {
  // const [score, setScore] = useState("100")
  const userContext = useContext(UserContext)
  const [flag,setFlag] = useState(0)
  
  const getLessonPracticeExamDataRes = useSelector((state) => state.contentData.getLessonPracticeExamData);

  let correctAnswer = getLessonPracticeExamDataRes && getLessonPracticeExamDataRes.items ? getLessonPracticeExamDataRes.items.length - userContext.wrongPracticeExamQtnIds.length : 0
  let percentageCalculation = getLessonPracticeExamDataRes && getLessonPracticeExamDataRes.items ? (100 * correctAnswer)/ getLessonPracticeExamDataRes.items.length : 0


  // const wrongQuestionsData = getLessonPracticeExamDataRes && getLessonPracticeExamDataRes.items.filter(obj => userContext.wrongPracticeExamQtnIds.indexOf(obj.content_object.id) > -1 && flag === 0)

  const wrongQuestionAnsData = []
  const wrongQuestionsData = []
  if(getLessonPracticeExamDataRes && getLessonPracticeExamDataRes.items && window.location.href.includes("practice-result")){
    getLessonPracticeExamDataRes && getLessonPracticeExamDataRes.items.map((obj,key) => {
      if(userContext.wrongPracticeExamQtnIds.indexOf(obj.content_object.id) > -1 && flag === 0){
        wrongQuestionAnsData.push(userContext.practiceExamAns[key])
        wrongQuestionsData.push(obj)
      }
    })
  }


  const correctQuestionsData = getLessonPracticeExamDataRes && getLessonPracticeExamDataRes.items.filter(obj => userContext.wrongPracticeExamQtnIds.indexOf(obj.content_object.id) <= -1 && flag === 1)

  return (
    <>
      <main className="main_section">
        <div className="all_user">
          <SubHeader
            checkedAll=""
            name="Practice"
            count=""
            countname=""
            addName=""
          />
          <div className="practice_test_result">
            <div className="show_result">
              <h3>{ percentageCalculation === 100 ? "Well Done" : "You need more practice!"}</h3>
              <p>You’ve scored {Number.isInteger(percentageCalculation) ?percentageCalculation : percentageCalculation.toFixed(2)}%</p>
              <img    
                src={ percentageCalculation === 100 ? process.env.PUBLIC_URL + "/images/score100.png" :  process.env.PUBLIC_URL + "/images/percent50.png"}
                alt=""
              />
              <div className="d-flex text-center button_div">
                <button className={"btn "+((flag === 0) ? "cross_btn" : "")} onClick={() => {setFlag(0)}}>
                  <span>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="7.5" cy="7.5" r="7.5" fill="#DC1D00" />
                      <path
                        d="M5 5L9.77273 9.77273"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M5 9.77273L9.77273 5"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  Incorrect ({getLessonPracticeExamDataRes && getLessonPracticeExamDataRes.items ? userContext.wrongPracticeExamQtnIds.length +" / "+getLessonPracticeExamDataRes.items.length : 0})
                </button>
                <button className={"btn right_btn "+((flag === 1) ? "cross_btn" : "")} onClick={() => {setFlag(1)}}>
                  <span>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.5 0C3.35795 0 0 3.35795 0 7.5C0 11.642 3.35795 15 7.5 15C11.642 15 15 11.642 15 7.5C15 3.35795 11.642 0 7.5 0ZM10.7509 6.23182C10.8108 6.16339 10.8563 6.08369 10.8849 5.99739C10.9135 5.91109 10.9246 5.81994 10.9175 5.72931C10.9103 5.63867 10.8851 5.55038 10.8433 5.46963C10.8016 5.38888 10.7441 5.3173 10.6742 5.2591C10.6044 5.20089 10.5236 5.15725 10.4367 5.13072C10.3497 5.1042 10.2583 5.09534 10.1679 5.10466C10.0774 5.11397 9.98978 5.14128 9.91005 5.18498C9.83033 5.22867 9.76015 5.28787 9.70364 5.35909L6.77182 8.87659L5.25477 7.35886C5.12618 7.23467 4.95395 7.16594 4.77518 7.1675C4.59641 7.16905 4.4254 7.24075 4.29899 7.36717C4.17257 7.49358 4.10087 7.66459 4.09931 7.84336C4.09776 8.02213 4.16648 8.19436 4.29068 8.32295L6.33614 10.3684C6.40313 10.4354 6.48334 10.4876 6.57165 10.5219C6.65996 10.5561 6.75443 10.5716 6.84905 10.5673C6.94366 10.563 7.03635 10.539 7.12119 10.4969C7.20603 10.4548 7.28117 10.3955 7.34182 10.3227L10.7509 6.23182Z"
                        fill="#0AB83B"
                      />
                    </svg>
                  </span>
                  Correct ({getLessonPracticeExamDataRes && getLessonPracticeExamDataRes.items ? correctAnswer + " / " + getLessonPracticeExamDataRes.items.length : 0})
                </button>
              </div>
            </div>
            <div className="show_answer">
              {wrongQuestionsData && wrongQuestionsData.map((data,key) =>{
                return(
                    <>
                      <h3>Question {key+1}</h3>
                      <p>{data.content_object.title}</p>
                      <ul className="list-unstyled">
                        {Object.values(data.content_object.options).map((optionData)=>{
                          const correctAnsData = Object.values(data.content_object.answer).filter(obj => obj.value === optionData);
                          
                          return(
                            <li className={((correctAnsData.length > 0) ? "green_bg" : (wrongQuestionAnsData[key].value.indexOf(optionData) > -1) ? "red_bg" : "")}>
                              <div className="">
                          
                                <span>
                                  
                                </span>
                                <p className="mb-0">{optionData}</p>
                              </div>
                              <span>{wrongQuestionAnsData[key].value.indexOf(optionData) > -1 ? "Your Response" : ""}</span>
                            </li>
                          )
                        })}
                      </ul>
                    </>
                )
              })}

              {correctQuestionsData && correctQuestionsData.map((data,key) => {
                return(
                  <>
                    <h3>Question {key+1}</h3>
                    <p>{data.content_object.title}</p>
                    <ul className="list-unstyled">
                      {Object.values(data.content_object.options).map((optionData)=>{
                        const correctAnsData = Object.values(data.content_object.answer).filter(obj => obj.value === optionData);
                        return(
                          <li className={((correctAnsData.length > 0) ? "green_bg" : "")}>
                            <div className="">
                        
                              <span>
                                
                              </span>
                              <p className="mb-0">{optionData}</p>
                            </div>
                            <span></span>
                          </li>
                        )
                      })}
                    </ul>
                  </>
                )
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PracticeTestResult;
