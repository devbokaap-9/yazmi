import React,{useContext,useState} from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {UserContext} from "../../UserContext";

const QuestionAnsSidebar = () => {

  let history = useHistory();
  const userContext = useContext(UserContext)

  const getLessonPracticeExamDataRes = useSelector((state) => state.contentData.getLessonPracticeExamData);

  const handlePush = () => {
    let count = userContext.practiceExamQtnsCnt
    
    if(count === 0){
      userContext.setPracticeExamQtnsCnt(count)
      if(window.location.href.includes("practices")){
        history.push("/student/course-details/practices/"+getLessonPracticeExamDataRes.id)
      }
      else{
        history.push("/student/course-details/exams/"+getLessonPracticeExamDataRes.id)
      }
    }
    else{
      userContext.setPracticeExamQtnsCnt(count-1)
      if(window.location.href.includes("practices")){
        history.push("/student/course-details/practices/"+getLessonPracticeExamDataRes.id+"/start-test")
      }
      else{
        history.push("/student/course-details/exams/"+getLessonPracticeExamDataRes.id+"/start-test")
      }
    }
  }

  const handlePrevious = () => {
    let count = userContext.practiceExamQtnsCnt
    userContext.setPracticeExamPrevLoading(true)
  }


  return (
    <div className="student_sidebar">
      {userContext.practiceExamQtnsCnt === 0
      ?
        <button className="btn" onClick={handlePush}>
          <span>
            <svg
              width="13"
              height="12"
              viewBox="0 0 13 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 1L1 6L6 11"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 6H12.4286"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Q{userContext.practiceExamQtnsCnt+1}
        </button>
      :
        <button className="btn" onClick={handlePrevious}>
          <span>
            <svg
              width="13"
              height="12"
              viewBox="0 0 13 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 1L1 6L6 11"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 6H12.4286"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Q{userContext.practiceExamQtnsCnt+1}
        </button>
      }
        <div className="question">
            <h3>Question {userContext.practiceExamQtnsCnt+1} of {getLessonPracticeExamDataRes && getLessonPracticeExamDataRes.items ?getLessonPracticeExamDataRes.items.length : 0}</h3>
            <p className="mb-0">
              {getLessonPracticeExamDataRes && getLessonPracticeExamDataRes.items && getLessonPracticeExamDataRes.items[userContext.practiceExamQtnsCnt] && getLessonPracticeExamDataRes.items[userContext.practiceExamQtnsCnt].content_object? getLessonPracticeExamDataRes.items[userContext.practiceExamQtnsCnt].content_object.title : ""}
            </p>
        </div>
    </div>
  );
};

export default QuestionAnsSidebar;
