import React, { useState,useEffect,useContext } from "react";
import { useHistory , Link } from "react-router-dom";
import SubHeader from "../../Layout/SubHeader";
import {UserContext} from "../../../UserContext";
import { useSelector,useDispatch } from "react-redux";
import {removeLessonPracticeExamData,getLessonPracticeExamData} from "../../../actions/Content";

const ExamTestResult = () => {
    const [score, setScore] = useState("50")
    const [courseDatas,setCourseData] = useState([])
    const userContext = useContext(UserContext)
    let dispatch = useDispatch();

    let history = useHistory();

    const courseDetailsData = useSelector((state) => state.contentData.getCourseDetails);
    
    useEffect(() => {
      let courseData = [];
      if(courseDetailsData && courseDetailsData.id){
        courseData.push(...courseDetailsData.lessons,...courseDetailsData.practices,...courseDetailsData.exams)
        setCourseData(courseData);
      }
    },[courseDetailsData])
  

    const handlePush = () => {
      if(percentageCalculation > getLessonPracticeExamDataRes.passing_percentage){
        if(userContext.practiceExamSctnData.length === 0){
          userContext.setFrmUpdating(false)
          history.push("/student")
        }
        else{
          let courseArray = [];
          userContext.setFrmUpdating(true)
          let key = userContext.practiceExamSctnData[0].key
          history.push("/student/course-details/"+userContext.practiceExamSctnData[0].type+"/"+userContext.practiceExamSctnData[0].id)
          dispatch(getLessonPracticeExamData(courseDetailsData.id,userContext.practiceExamSctnData[0].id,userContext.practiceExamSctnData[0].type))
          console.log(key,'keyyy')
          console.log(courseDatas.length,'length')
          if((key + 1) === courseDatas.length){
            userContext.setPracticeExamSctnData([])
          }
          else{
            let nextSectionId = 0
            let nextSectionType = 0
            if(courseDatas[key+1]){
              nextSectionId = courseDatas[key+1].id
              nextSectionType = courseDatas[key+1].content_type_name
              courseArray.push({"id":nextSectionId,"type" :nextSectionType+"s","key":key+1})
              userContext.setPracticeExamSctnData(courseArray)
            }
          }
        }
      }
      else{
        dispatch(removeLessonPracticeExamData())
        userContext.setFrmLdng(true)
        history.push("/student/course-details/exams/"+getLessonPracticeExamDataRes.id)
      }
    }

    const getLessonPracticeExamDataRes = useSelector((state) => state.contentData.getLessonPracticeExamData);
    

    let correctAnswer = getLessonPracticeExamDataRes && getLessonPracticeExamDataRes.items ? getLessonPracticeExamDataRes.items.length - userContext.wrongPracticeExamQtnIds.length : 0
    let percentageCalculation = getLessonPracticeExamDataRes && getLessonPracticeExamDataRes.items ? (100 * correctAnswer)/ getLessonPracticeExamDataRes.items.length : 0
  return (
    <>
      <main className="main_section">
        <div className="all_user">
          <SubHeader
            checkedAll=""
            name="Exam"
            count=""
            countname=""
            addName=""
          />
          <div className="practice_test_result">
            <div className="show_result">
              <h3>{ percentageCalculation > getLessonPracticeExamDataRes.passing_percentage ? "Well Done" : "You need more practice!"}</h3>
              <p>You’ve scored {Number.isInteger(percentageCalculation) ?percentageCalculation : percentageCalculation.toFixed(2)}%</p>
              <img    
                src={ percentageCalculation > getLessonPracticeExamDataRes.passing_percentage ? process.env.PUBLIC_URL + "/images/score100.png" :  process.env.PUBLIC_URL + "/images/percent50.png"}
                alt=""
              />
            </div>
            {(getLessonPracticeExamDataRes.allowed_attempts -  (getLessonPracticeExamDataRes.submissions_count + 1) < 0) ?
              <></>
            :
              <>
              <button className="btn retry_button" onClick={handlePush}>{ percentageCalculation > getLessonPracticeExamDataRes.passing_percentage ? "Finish" : "Retry Exam"} </button></>
            }
              {
                  percentageCalculation > getLessonPracticeExamDataRes.passing_percentage ? <></> : <p className="para">{(getLessonPracticeExamDataRes.allowed_attempts -  (getLessonPracticeExamDataRes.submissions_count + 1) <= 0) ? 0 : getLessonPracticeExamDataRes.allowed_attempts -  (getLessonPracticeExamDataRes.submissions_count + 1)} attempts remaining</p>
              }
              
          </div>
        </div>
      </main>
    </>
  );
};

export default ExamTestResult;
