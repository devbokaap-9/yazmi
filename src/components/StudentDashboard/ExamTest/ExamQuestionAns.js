import React,{useState,useEffect,useContext} from "react";
import {
    Radio,
    FormControl,
    FormControlLabel,
    RadioGroup,
    FormLabel,
  } from "@material-ui/core";
  import { withStyles } from "@material-ui/core/styles";
  import { green } from "@material-ui/core/colors";
  import { useHistory } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import {UserContext} from "../../../UserContext";
  import { css } from "@emotion/react";
  import ClipLoader from "react-spinners/ClipLoader";
  import {practiceExamSubmission} from "../../../actions/Learning";

  // Can be a string as well. Need to ensure each key-value pair ends with ;
  const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
  `;

  const GreenRadio = withStyles({
    root: {
      color: green[400],
      "&$checked": {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

  

const ExamQuestionAns = () => {
  const userContext = useContext(UserContext)
  const dispatch = useDispatch()

  const [selectedValue, setSelectedValue] = React.useState();
  const [qtnCount,stQtnCount] = useState(0)
  const [qtnAnswers,setQtnAnswers] = useState([])
  const [flag,setFlag] = useState(false)
  const [loading,setLoading] = useState(false)
  const [prevLoading,setPrevLoading] = useState(false)
  const [nextLoading,setNextLoading] = useState(false)
  const [color, setColor] = useState("#ffffff");


  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  let history = useHistory();

  const getLessonPracticeExamDataRes = useSelector((state) => state.contentData.getLessonPracticeExamData);

  const courseDetailsData = useSelector((state) => state.contentData.getCourseDetails);

  useEffect(() => {
    if(getLessonPracticeExamDataRes.id && window.location.href.includes("exams")){
      if(getLessonPracticeExamDataRes.items){
        setQtnAnswers([])
        stQtnCount(getLessonPracticeExamDataRes.items.length-1)
      }
    }
  },[getLessonPracticeExamDataRes])

  const handleClick = () => {
    setLoading(true)
    setQtnAnswers([])

    if(qtnCount === userContext.practiceExamQtnsCnt){

      setFlag(false)
      let mainData = []
      let ids = []
      getLessonPracticeExamDataRes.items.map((data,key) => {
        let ansArray = []
        Object.values(data.content_object.answer).map((correctAns)=>{
          ansArray.push(correctAns.value)
        })

        let is_wrong = false 
        if(userContext.practiceExamAns[key].value.length !== ansArray.length){
          is_wrong = true
        }
        else{
          userContext.practiceExamAns[key].value.map((ans) => { 
            let index = ansArray.indexOf(ans)
              if(index > -1){
              }
              else{
                is_wrong = true
              }
          })
        }

        if(is_wrong){

          if(userContext.wrongPracticeExamQtnIds.length === 0){
            ids.push(data.content_object.id)
          }
          else{
            ids.push(...userContext.wrongPracticeExamQtnIds,data.content_object.id)
          }
          if(ids.length !== 0){
            userContext.setWrongPracticeExamQtnIds(ids)
          }
        }

        let practiceData = {
          "question" : data.content_object.id,
          "response" : {
            "answer" : userContext.practiceExamAns[key].value
          },
          "is_correct" : !is_wrong
        }
        mainData.push(practiceData)
      })
      dispatch(practiceExamSubmission(mainData,courseDetailsData.id,getLessonPracticeExamDataRes.id,'exams'))
    }
    else{
      setFlag(true)
    }
  }

  if(flag && window.location.href.includes("exams") && qtnCount !== userContext.practiceExamQtnsCnt){

    let count1 = userContext.practiceExamQtnsCnt
    userContext.setPracticeExamQtnsCnt(count1 + 1)
    let tmpArray = []
    userContext.practiceExamAns.map((ansData) => {
      if(ansData.key === (userContext.practiceExamQtnsCnt +1)){
        tmpArray.push(ansData.value)
        setQtnAnswers(...tmpArray)
      }
    })
    history.push("/student/course-details/exams/"+getLessonPracticeExamDataRes.id+"/start-test");
    setFlag(false)
    setNextLoading(true)
  }

  useEffect(() => {
    if(nextLoading && window.location.href.includes("exams")){
      setLoading(false)
      setNextLoading(false)
    }
  },[userContext.practiceExamQtnsCnt])

  const practiceSubmissionRes = useSelector((state) => state.learningData.practiceExamSubmissionData);
  useEffect(() => {
    // let ids = []
    if(practiceSubmissionRes.id && loading && window.location.href.includes("exams")){
      setLoading(false)
      if(qtnCount === userContext.practiceExamQtnsCnt){
        userContext.setFrmUpdating(true)
        history.push("/student/course-details/exams/"+getLessonPracticeExamDataRes.id+"/exam-result");
      }
      else{
        
      }
    }
  },[practiceSubmissionRes])

  const handlePrevious = () => {
    setPrevLoading(true)
    setQtnAnswers([])
    let count = userContext.practiceExamQtnsCnt
    if(count === 0){
      userContext.setPracticeExamQtnsCnt(count)
      // userContext.setPracticeExamWrongAnsCnt(0)
      history.push("/student/course-details/exams/"+getLessonPracticeExamDataRes.id)
    }
    else{
      userContext.setPracticeExamQtnsCnt(count-1)
      let tmpArray = []
      userContext.practiceExamAns.map((ansData) => {
        if(ansData.key === (userContext.practiceExamQtnsCnt -1)){
          tmpArray.push(ansData.value)
          setQtnAnswers(...tmpArray)
        }
      })
      history.push("/student/course-details/exams/"+getLessonPracticeExamDataRes.id+"/start-test")
    }
  }

  useEffect(() => {
    if(userContext.practiceExamPrevLoading && window.location.href.includes("exams")){
      
      setQtnAnswers([])
      setPrevLoading(true)
      handlePrevious()
    }
  },[userContext.practiceExamPrevLoading])

  useEffect(() => {
    let data = []
    if(prevLoading && qtnAnswers.length !== 0 && window.location.href.includes("exams")){
      setPrevLoading(false)
      userContext.setPracticeExamPrevLoading(false)
      data.push(...userContext.wrongPracticeExamQtnIds)
      let index = data.indexOf(getLessonPracticeExamDataRes.items[userContext.practiceExamQtnsCnt].content_object.id)
      if(index > -1){
        data.splice(index,1)
      }
      userContext.setWrongPracticeExamQtnIds(data)
    }
  },[userContext.practiceExamQtnsCnt])
  
  const optionChange = (e,answer) => {
    let ans = []
    let ansArray = []
    if(qtnAnswers.length === 0){
      ans.push(answer)
    }
    else{
      ans.push(...qtnAnswers)
      let index = ans.indexOf(answer)
      if(index > -1){
        ans.splice(index,1)
      }
      else{
        ans.push(answer)
      }
    }
    setQtnAnswers(ans)
    if(userContext.practiceExamAns.length === 0){
      ansArray.push({"key":userContext.practiceExamQtnsCnt,"value":ans})
      userContext.setPracticeExamAns(ansArray)
    }
    else{
      let tmpArray = []
      let keyArray = []
      tmpArray.push(userContext.practiceExamAns)
      userContext.practiceExamAns.map((ansData,key) => {
        keyArray.push(key)
        if(ansData.key === userContext.practiceExamQtnsCnt){
          ansData.value = ans
          userContext.setPracticeExamAns(...tmpArray)
        }
        else{
          if(key === userContext.practiceExamAns.length - 1){
            if(!keyArray.includes(userContext.practiceExamQtnsCnt)){
              ansArray.push(...userContext.practiceExamAns,{"key":userContext.practiceExamQtnsCnt,"value":ans})
              userContext.setPracticeExamAns(ansArray)
            }
          }
        }
      })
    }
  }

  setTimeout(function(){
    if((!loading || !prevLoading) && !userContext.practiceExamPrevLoading && qtnAnswers.length !== 0 && window.location.href.includes("exams")){
      qtnAnswers.map((ans) => {
        if(document.getElementById(ans)){
          document.getElementById(ans).setAttribute("checked",true)
        }
      })
    }
  },500)

  return (
    <>
      <div className="question_answser_div">
        <div className="question_answser">
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={selectedValue}
              onChange={handleChange}
            >
              {!loading && !prevLoading && !userContext.practiceExamPrevLoading && getLessonPracticeExamDataRes && getLessonPracticeExamDataRes.items
              ?
                Object.values(getLessonPracticeExamDataRes.items[userContext.practiceExamQtnsCnt].content_object.options).map((option) => {
                  return(
                    <div className="option_div">
                      <label className="container-radio">
                        <input type="checkbox" name={"gender"+userContext.practiceExamQtnsCnt} className="option_checkbox" id={option}
                        onClick={(e) => {optionChange(e,option)}}
                        />
                        <span className="checkmark-radio"></span>
                      </label>
                      <span className="select_question">
                        {option}
                      </span>
                    </div>
                  )
                })
              :
                <></>
              }
            </RadioGroup>
          </FormControl>
        </div>
        <div className="pre_and_next_button">
          {userContext.practiceExamQtnsCnt !== 0
          ?
            <button type="button" className="btn-secondary-yazmi" onClick={handlePrevious}>
              <span>
                <svg
                  width="7"
                  height="12"
                  viewBox="0 0 7 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 11L1 6L6 1"
                    stroke="#666666"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Previous
            </button>
          :
            <></>
          }
          <button type="button" className="btn-primary-yazmi" 
          onClick={handleClick} 
          disabled={qtnAnswers.length === 0 ? true : false}
          >
            Next
            <span>
              <svg
                width="7"
                height="12"
                viewBox="0 0 7 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 11L6 6L1 1"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
      <div className={loading || prevLoading || userContext.practiceExamPrevLoading ? "loader_div" : ""}>
        <ClipLoader color={color} className="loader" loading={loading || prevLoading || userContext.practiceExamPrevLoading} css={override} size={50} />
      </div>
    </>
  );
};

export default ExamQuestionAns;
