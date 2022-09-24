import React,{useState, useEffect, useRef} from "react";
import { Input } from "reactstrap";
import {
  Radio,
  FormControl,
  FormControlLabel,
  RadioGroup,
  FormLabel,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { useDispatch, useSelector } from "react-redux";
import {removeErrorData} from "../../../../actions/RemoveError";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from 'react-toastify';
import {editPracticeTitle,editPracticeQuestion, getCourseDetails,addPracticeQuestion, deletePracticeQuestion} from "../../../../actions/Content";

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

//validation
const validationSchema = yup.object({
  title: yup.string().required("Cannot be blank"),
});


const EditPracticeTest = (props) => {
  let dispatch = useDispatch();
  const formRef = useRef();

  const [selectedValue, setSelectedValue] = useState();
  const [loading,setLoading] = useState(false);
  const [btnClickFlag,setBtnClickFlag] = useState(false)
  const [practiceFlag,setPracticeFlag] = useState(false)
  const [practiceQuestions,setPracticeQuestions] = useState([])
  const [questionCount,setQuestionCount] = useState(0)
  const [responseCount,setResponseCount] = useState(0)

  const optionChange = (event,key) => {
    if(event.target.getAttribute("checked") === true || event.target.getAttribute("checked") === "true"){
      event.target.setAttribute("checked", false);
    }
    else{
      event.target.setAttribute("checked", true);
    }
  };
  
  const practiceData = useSelector((state) => state.contentData.getLessonPracticeExamData);
 
  useEffect(() => {
    if(practiceData.id){
      practiceData.items.map((data) => {
        Object.values(data.content_object.options).map((subdata,key) => {

          let answerData = Object.values(data.content_object.answer)[0]
          
          if(answerData){
            Object.values(data.content_object.answer).map((answers) => {

              if((key+1) === answers.key){
                let getId = data.id+"_:_"+(key+1)
                // ids.push(getId)
                if(getId && document.getElementById(getId)){
                  document.getElementById(getId).setAttribute("checked",true)
                }
              }
            })
          }
        })
      })
    }
  },[practiceData])

  //remove options
  const deleteOption = (e) => {
    let optionParentDiv = e.target.closest("div");//clicked element
    let parentDiv = optionParentDiv.closest(".MuiFormGroup-root");//find parent div
    optionParentDiv.remove();//remove clicked element
    if(parentDiv.childNodes.length === 2){//if parent div has only 1 child then dont show delete icon
      parentDiv.childNodes[1].classList.add("option_div_delete")
    }
  }

  //add options
  const addOption = (e) => {
    let addDivRow = e.target.previousElementSibling.childNodes[1]//find prev element which is option div of clicked element
    addDivRow.childNodes[1].classList.remove("option_div_delete")//find first child of options
    let copyRow = addDivRow.childNodes[0].cloneNode(true);//copy option child
    copyRow.classList.remove("d-none")
    copyRow.childNodes[1].value = ""
    copyRow.childNodes[1].placeholder = "Option"

    let index = Array.from(e.target.previousElementSibling.parentNode.parentNode.parentNode.children).indexOf(e.target.previousElementSibling.parentNode.parentNode)

    addDivRow.childNodes[1].childNodes[0].name = "gender"+index
    if(addDivRow.childNodes[2]){
      addDivRow.childNodes[2].childNodes[0].name = "gender"+index
    }

    if(addDivRow.childNodes[3]){
      addDivRow.childNodes[3].childNodes[0].name = "gender"+index
    }

    if(addDivRow.childNodes[4]){
      addDivRow.childNodes[4].childNodes[0].name = "gender"+index
    } 
    copyRow.childNodes[0].name = "gender"+index

    addDivRow.appendChild(copyRow)//append newly added option
    

    // get remove button
    let removeButton = copyRow.childNodes[2]
    // call remove function
    removeButton.addEventListener('click',function(e){
      deleteOption(e)
    })

    copyRow.childNodes[0].addEventListener('change',function(e){
      optionChange(e)
    })
  }

  //add questions
  const addQuestion = (e) => {
    let addDivRow = e.target.previousElementSibling//parent div edit_practice_main_div
    addDivRow.childNodes[1].childNodes[1].classList.remove("d-none")
    let copyRow = addDivRow.childNodes[0].cloneNode(true);//copy question element
    copyRow.classList.remove("d-none")
    let index = Array.from(e.target.previousElementSibling.children).indexOf(e.target.previousElementSibling.lastElementChild)
   
    copyRow.childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].name = "gender"+(index+1)
    copyRow.childNodes[0].childNodes[1].childNodes[1].childNodes[1].childNodes[0].name = "gender"+(index+1)

    copyRow.childNodes[0].childNodes[1].childNodes[1].childNodes[2].childNodes[0].name = "gender"+(index+1)
    copyRow.childNodes[0].childNodes[1].childNodes[1].childNodes[3].childNodes[0].name = "gender"+(index+1)

    copyRow.childNodes[0].childNodes[1].childNodes[1].childNodes[4].childNodes[0].name = "gender"+(index+1)

    addDivRow.appendChild(copyRow)//append newly added question
   
    let addOptionBtn = copyRow.childNodes[0].childNodes[2];

    let deleteBtnDiv = copyRow.childNodes[0].childNodes[1].childNodes[1].childNodes
  
    for(let i =0;i<deleteBtnDiv.length ; i++){
      let deletBtn = deleteBtnDiv[i].childNodes[2]
      deletBtn.addEventListener('click',function(e){
        deleteOption(e)
      })

      deleteBtnDiv[i].childNodes[0].addEventListener('change',function(e){
        optionChange(e)
      })
    }

    //add option event
    addOptionBtn.addEventListener('click',function(e){
      addOption(e)
    })

    //delete question event
    let deleteQuestionBtn = copyRow.childNodes[1]
    deleteQuestionBtn.addEventListener('click',function(e){
      deleteQuestion(e,'','')
    })

    //dynamically addign question count number
    for (let i = 0;i<addDivRow.childNodes.length ; i++){
      addDivRow.childNodes[i].childNodes[0].childNodes[0].childNodes[0].childNodes[1].textContent = i 
    }
  }

  //delete questions
  const deleteQuestion = (e,practiceId,questionId) => {
    let parentDiv = e.target.closest("div").parentNode
    let mainDiv = parentDiv.parentNode
    parentDiv.remove()
    if(mainDiv.childNodes.length === 2){
      mainDiv.childNodes[1].childNodes[1].classList.add("d-none")
    }
    for(let i =0;i<mainDiv.childNodes.length;i++){
      mainDiv.childNodes[i].childNodes[0].childNodes[0].childNodes[0].childNodes[1].textContent = i
    }
    if(practiceId !== "" && questionId !== ""){
      let course_id = window.location.href.split("/").pop();
      dispatch(deletePracticeQuestion(course_id,practiceId,questionId))
    }
  }
  
  const { error } = useSelector((state) => state);

  const submitData = (values) => {
    setLoading(true);
    setBtnClickFlag(true);
    dispatch(removeErrorData());
    let coursePracticeQuestionInput = document.getElementsByClassName('edit_practice_questions')
    let coursePracticeQuestionIdInput = document.getElementsByClassName('question_id')
    let coursePractices = []
    for(let i=1 ; i<coursePracticeQuestionInput.length ; i++){
      if(coursePracticeQuestionInput[i].value !== ""){
        let optionDiv = coursePracticeQuestionInput[i].parentNode.nextElementSibling.childNodes[1].childNodes
        let options = [];
        let answer = [];
        for(let j = 0;j<optionDiv.length;j++){
          let value = optionDiv[j].childNodes[1].value

          if(value !== ""){
            options.push(value)
            if(optionDiv[j].childNodes[0].childNodes[0].getAttribute("checked") === "true" || optionDiv[j].childNodes[0].childNodes[0].getAttribute("checked") === true){
              answer.push({"value":value ,"key" : j})
            }
          }
        }
        let contentObject = {}
        if(options.length !== 0 && answer.length !== 0){
          contentObject = {
            "title" :  coursePracticeQuestionInput[i].value,
            "options" : Object.assign({}, options),
            "id" : coursePracticeQuestionIdInput[i].value,
            "answer" : Object.assign({},answer)
          }
        }
        else{
          setLoading(false)
          if(options.length === 0){
            toast.error("Question or Option cant'be blank")
          }
          else if(answer.length === 0){
            toast.error("Select Correct answer")
          }
          return false;
        }
        if(Object.keys(contentObject).length !== 0)
        {
          coursePractices.push(contentObject)
        }
      }
      else{
        setLoading(false)
        toast.error("Question or Option cant'be blank")
        return false;
      }
    }
    
    if(coursePractices.length !== 0){
      let user_data = JSON.parse(decodeURIComponent(localStorage.getItem('user_data')));
      let course_id = window.location.href.split("/").pop();
      let data = {
        "title" : values.title,
        "creator" : user_data.profile_id,
        "course" : course_id
      }
      setPracticeFlag(true)
      setPracticeQuestions(coursePractices)
      dispatch(editPracticeTitle(data,practiceData.id))
    }
  }

  const updatePracticeTitleDataRes = useSelector((state) => state.contentData.updatePracticeTitleData);

  useEffect(() => {
    if(updatePracticeTitleDataRes.id && practiceFlag && error.errorsData === ""){
      setPracticeFlag(false)
      let course_id = window.location.href.split("/").pop();
      for(let i = 0;i<practiceQuestions.length ; i++){
        let contentObject = {
          "content_object" : {
            "title" : practiceQuestions[i].title,
            "options" : practiceQuestions[i].options,
            "answer" : practiceQuestions[i].answer
          },
          "order" : i+1,
          "practice" : updatePracticeTitleDataRes.id,
          "content_type" : "question"
        }
        setQuestionCount(i);
        if(practiceQuestions[i].id !== ""){
          dispatch(editPracticeQuestion(contentObject,course_id,practiceQuestions[i].id))
        }
        else{
          dispatch(addPracticeQuestion(contentObject,course_id))
        }
      }
      dispatch(getCourseDetails(course_id))
    }
  },[updatePracticeTitleDataRes])

  const updatePracticeQuestionDataRes = useSelector((state) => state.contentData.updatePracticeQuestionData);
  const practiceQuestionDataRes = useSelector((state) => state.contentData.addPracticeQuestionData);

  useEffect(() => {
    if((updatePracticeQuestionDataRes.id || practiceQuestionDataRes.id) && btnClickFlag){
      if(responseCount === questionCount){

        let practiceInput = document.getElementsByClassName('edit_pratice_test_question')
        for(let i = practiceInput.length -1;i>1;i--){
          // if(i !== 0 && i !== 1){
            practiceInput[i].remove();
          // }
        }
        document.getElementsByClassName('edit_practice_questions')[1].value=""
        let qtn = document.getElementsByClassName('edit_pratice_test_question')
        let options = qtn[1].childNodes[0].childNodes[1].childNodes[1].childNodes
        for(let i = 0; i< options.length ; i++){
          options[i].childNodes[1].value = ""
        }
        setResponseCount(0)
        setQuestionCount(0)
        setLoading(false);
        setBtnClickFlag(false);
        formRef.current.values.title = "";
        toast.success("Practice Updated");
        props.callBack();
      }
      else{
        let count = responseCount + 1;
        setResponseCount(count)
      }
    }
  },[updatePracticeQuestionDataRes,practiceQuestionDataRes])

  const handleBack = () => {
      props.setStateBack(false)
  }

  return (
    <>
      <Formik
        initialValues={{ title: practiceData.title}}
        validationSchema={validationSchema}
        onSubmit={submitData}
        innerRef={formRef}
      >
        {({ values, handleChange }) => {
          return(
            <Form>
              <div className="pratice_test">
               
                <div className="modal-form-cta modal_form_cta_test">
                  <div className="d-flex align-items-center ">
                    <span className="cursor_pointer" onClick={handleBack}>
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
                    <h3 className="check_box">Edit Practice Test</h3>
                  </div>
                  <div>
                    <button className={loading ? "btn-primary-yazmi button_disable": "btn-primary-yazmi"} disabled={loading ? true : false}>Save</button>
                    <button className="btn-secondary-yazmi">Cancel</button>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="" className="label-yazmi">
                    Practice Test Title*
                  </label>
                  <Field
                    type="text"
                    className="input-yazmi"
                    name="title"
                  />
                  {(!error.errorsData)
                  ?
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-danger error_msg"
                    />
                  :
                    <span className="text-danger error_msg">
                      {error.errorsData && error.errorsData.title
                        ? error.errorsData.title
                        : ""}
                    </span>
                  }
                </div>
                <div className="edit_practice_main_div">
                  <div className="edit_pratice_test_question d-none">
                    <div className="queston_div">
                      <div className="form-group">
                        <label htmlFor="" className="label-yazmi">
                        Question <span>0</span>
                        </label>
                        <input type="hidden" className="question_id"/>
                        <textarea
                          type="text"
                          placeholder="Add Question Title"
                          className="form-control input-yazmi edit_practice_questions"
                          rows="4"
                        />
                      </div>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Options</FormLabel>
                        <RadioGroup
                          aria-label="gender"
                          name="gender0"
                          // value={selectedValue}
                          // onChange={handleChange}
                        >
                          <div className="option_div d-none">
                            <label className="container-radio">
                              <input type="checkbox" name="gender0" className="check_box" onClick={(e) => {optionChange(e)}}/>
                              <span className="checkmark-radio"></span>
                            </label>
                            <input
                              type="text"
                              className="input-yazmi practice_options"
                              placeholder="Option"
                            />
                            <span className="delete_icon" onClick={(e)=>{deleteOption(e);}}>
                              <svg
                                width="13"
                                height="16"
                                viewBox="0 0 13 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12.5714 0.888889L9.42857 0.888889L8.53061 0L4.04082 0L3.14286 0.888889L0 0.888889L0 2.66667L12.5714 2.66667V0.888889ZM0.897959 14.2222C0.897959 14.6937 1.08717 15.1459 1.42397 15.4793C1.76077 15.8127 2.21757 16 2.69388 16H9.87755C10.3539 16 10.8107 15.8127 11.1475 15.4793C11.4843 15.1459 11.6735 14.6937 11.6735 14.2222L11.6735 3.55556L0.897959 3.55556L0.897959 14.2222Z"
                                  fill="#FD4F48"
                                />
                              </svg>
                            </span>
                          </div>
                          <div className="option_div">
                            <label className="container-radio">
                              <input type="checkbox" name="gender0" className="check_box" onClick={(e) => {optionChange(e)}}/>
                              <span className="checkmark-radio"></span>
                            </label>
                            <input
                              type="text"
                              className="input-yazmi practice_options"
                              placeholder="Option"
                            />
                            <span className="delete_icon" onClick={(e)=>{deleteOption(e);}}>
                              <svg
                                width="13"
                                height="16"
                                viewBox="0 0 13 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12.5714 0.888889L9.42857 0.888889L8.53061 0L4.04082 0L3.14286 0.888889L0 0.888889L0 2.66667L12.5714 2.66667V0.888889ZM0.897959 14.2222C0.897959 14.6937 1.08717 15.1459 1.42397 15.4793C1.76077 15.8127 2.21757 16 2.69388 16H9.87755C10.3539 16 10.8107 15.8127 11.1475 15.4793C11.4843 15.1459 11.6735 14.6937 11.6735 14.2222L11.6735 3.55556L0.897959 3.55556L0.897959 14.2222Z"
                                  fill="#FD4F48"
                                />
                              </svg>
                            </span>
                          </div>
                          <div className="option_div">
                           <label className="container-radio">
                              <input type="checkbox" name="gender0" className="check_box" onClick={(e) => {optionChange(e)}}/>
                              <span className="checkmark-radio"></span>
                            </label>
                            <input
                              type="text"
                              className="input-yazmi practice_options"
                              placeholder="Option"
                            />
                            <span className="delete_icon" onClick={(e)=>{deleteOption(e);}}>
                              <svg
                                width="13"
                                height="16"
                                viewBox="0 0 13 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12.5714 0.888889L9.42857 0.888889L8.53061 0L4.04082 0L3.14286 0.888889L0 0.888889L0 2.66667L12.5714 2.66667V0.888889ZM0.897959 14.2222C0.897959 14.6937 1.08717 15.1459 1.42397 15.4793C1.76077 15.8127 2.21757 16 2.69388 16H9.87755C10.3539 16 10.8107 15.8127 11.1475 15.4793C11.4843 15.1459 11.6735 14.6937 11.6735 14.2222L11.6735 3.55556L0.897959 3.55556L0.897959 14.2222Z"
                                  fill="#FD4F48"
                                />
                              </svg>
                            </span>
                          </div>
                          <div className="option_div">
                            <label className="container-radio">
                              <input type="checkbox" name="gender0" className="check_box" onClick={(e) => {optionChange(e)}}/>
                              <span className="checkmark-radio"></span>
                            </label>
                            <input
                              type="text"
                              className="input-yazmi practice_options"
                              placeholder="Option"
                            />
                            <span className="delete_icon" onClick={(e)=>{deleteOption(e);}}>
                              <svg
                                width="13"
                                height="16"
                                viewBox="0 0 13 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12.5714 0.888889L9.42857 0.888889L8.53061 0L4.04082 0L3.14286 0.888889L0 0.888889L0 2.66667L12.5714 2.66667V0.888889ZM0.897959 14.2222C0.897959 14.6937 1.08717 15.1459 1.42397 15.4793C1.76077 15.8127 2.21757 16 2.69388 16H9.87755C10.3539 16 10.8107 15.8127 11.1475 15.4793C11.4843 15.1459 11.6735 14.6937 11.6735 14.2222L11.6735 3.55556L0.897959 3.55556L0.897959 14.2222Z"
                                  fill="#FD4F48"
                                />
                              </svg>
                            </span>
                          </div>
                          <div className="option_div">
                            <label className="container-radio">
                              <input type="checkbox" name="gender0" className="check_box" onClick={(e) => {optionChange(e)}}/>
                              <span className="checkmark-radio"></span>
                            </label>
                            <input
                              type="text"
                              className="input-yazmi practice_options"
                              placeholder="Option"
                            />
                            <span className="delete_icon" onClick={(e)=>{deleteOption(e);}}>
                              <svg
                                width="13"
                                height="16"
                                viewBox="0 0 13 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12.5714 0.888889L9.42857 0.888889L8.53061 0L4.04082 0L3.14286 0.888889L0 0.888889L0 2.66667L12.5714 2.66667V0.888889ZM0.897959 14.2222C0.897959 14.6937 1.08717 15.1459 1.42397 15.4793C1.76077 15.8127 2.21757 16 2.69388 16H9.87755C10.3539 16 10.8107 15.8127 11.1475 15.4793C11.4843 15.1459 11.6735 14.6937 11.6735 14.2222L11.6735 3.55556L0.897959 3.55556L0.897959 14.2222Z"
                                  fill="#FD4F48"
                                />
                              </svg>
                            </span>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <h4 className="add_option_tag d-flex align-items-center" onClick={(e) => {addOption(e)}}>
                        <span className="d-flex">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 11L6 6M6 6L6 1M6 6L11 6M6 6L1 6"
                              stroke="#252525"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                        Add New Option
                      </h4>
                    </div>
                    <div className="delete_div">
                      <span className="delete_icon">
                        <svg
                          width="13"
                          height="16"
                          viewBox="0 0 13 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.5714 0.888889L9.42857 0.888889L8.53061 0L4.04082 0L3.14286 0.888889L0 0.888889L0 2.66667L12.5714 2.66667V0.888889ZM0.897959 14.2222C0.897959 14.6937 1.08717 15.1459 1.42397 15.4793C1.76077 15.8127 2.21757 16 2.69388 16H9.87755C10.3539 16 10.8107 15.8127 11.1475 15.4793C11.4843 15.1459 11.6735 14.6937 11.6735 14.2222L11.6735 3.55556L0.897959 3.55556L0.897959 14.2222Z"
                            fill="#FD4F48"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                  {practiceData && practiceData.items && practiceData.items.map((data,key) => {
                    return(
                      <div className="edit_pratice_test_question">
                        <div className="queston_div">
                          <div className="form-group">
                            <label htmlFor="" className="label-yazmi">
                            Question <span>{key+1}</span>
                            </label>
                            <input type="hidden" className="question_id" defaultValue={data.id}/>
                            <textarea
                              type="text"
                              placeholder="Add Question Title"
                              className="form-control input-yazmi edit_practice_questions"
                              rows="4"
                              defaultValue={data.content_object.title}
                            />
                          </div>
                          <FormControl component="fieldset">
                            <FormLabel component="legend">Options</FormLabel>
                            <RadioGroup
                              aria-label="gender"
                              name="gender0"
                              // value={selectedValue}
                              // onChange={handleChange}
                            >
                              <div className="option_div d-none">
                              <label className="container-radio">
                                <input type="checkbox" name="gender0" className="check_box" onClick={(e) => {optionChange(e)}}/>
                                <span className="checkmark-radio"></span>
                              </label>
                                <input
                                  type="text"
                                  className="input-yazmi practice_options"
                                  placeholder="Option"
                                />
                                <span className="delete_icon" onClick={(e)=>{deleteOption(e);}}>
                                  <svg
                                    width="13"
                                    height="16"
                                    viewBox="0 0 13 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12.5714 0.888889L9.42857 0.888889L8.53061 0L4.04082 0L3.14286 0.888889L0 0.888889L0 2.66667L12.5714 2.66667V0.888889ZM0.897959 14.2222C0.897959 14.6937 1.08717 15.1459 1.42397 15.4793C1.76077 15.8127 2.21757 16 2.69388 16H9.87755C10.3539 16 10.8107 15.8127 11.1475 15.4793C11.4843 15.1459 11.6735 14.6937 11.6735 14.2222L11.6735 3.55556L0.897959 3.55556L0.897959 14.2222Z"
                                      fill="#FD4F48"
                                    />
                                  </svg>
                                </span>
                              </div>
                              {Object.values(data.content_object.options).map((optionData,subkey) => {
                                return(
                                  <div className={"option_div "+(Object.values(data.content_object.options).length <= 1 ? "option_div_delete" : "")}>
                                    {/* <input type="checkbox" name={"gender"+(key+1)} className="check_box" 
                                    // onChange={(e) => {optionChange(e,key)}} 
                                    onClick={(e) => {optionChange(e,key)}} value={optionData} id={data.id+"_:_"+(subkey+1)}
                                    // checked={answers[key] === optionData ? "checked" : "hi"}
                                    /> */}
                                     <label className="container-radio">
                                      <input type="checkbox" name={"gender"+(key+1)} className="check_box" onClick={(e) => {optionChange(e,key)}} value={optionData} id={data.id+"_:_"+(subkey+1)}/>
                                      <span className="checkmark-radio"></span>
                                    </label>
                                    <input
                                      type="text"
                                      className="input-yazmi practice_options"
                                      placeholder="Option"
                                      defaultValue={optionData}
                                    />
                                    <span className="delete_icon" onClick={(e)=>{deleteOption(e);}}>
                                      <svg
                                        width="13"
                                        height="16"
                                        viewBox="0 0 13 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M12.5714 0.888889L9.42857 0.888889L8.53061 0L4.04082 0L3.14286 0.888889L0 0.888889L0 2.66667L12.5714 2.66667V0.888889ZM0.897959 14.2222C0.897959 14.6937 1.08717 15.1459 1.42397 15.4793C1.76077 15.8127 2.21757 16 2.69388 16H9.87755C10.3539 16 10.8107 15.8127 11.1475 15.4793C11.4843 15.1459 11.6735 14.6937 11.6735 14.2222L11.6735 3.55556L0.897959 3.55556L0.897959 14.2222Z"
                                          fill="#FD4F48"
                                        />
                                      </svg>
                                    </span>
                                  </div>
                                )
                              })} 
                            </RadioGroup>
                          </FormControl>
                          <h4 className="add_option_tag d-flex align-items-center" onClick={(e) => {addOption(e)}}>
                            <span className="d-flex">
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6 11L6 6M6 6L6 1M6 6L11 6M6 6L1 6"
                                  stroke="#252525"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </span>
                            Add New Option
                          </h4>
                        </div>
                        <div className={"delete_div "+(practiceData.items.length <= 1 ? "d-none" : "")} onClick={(e) => {deleteQuestion(e,practiceData.id,data.id)}}>
                          <span className="delete_icon">
                            <svg
                              width="13"
                              height="16"
                              viewBox="0 0 13 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.5714 0.888889L9.42857 0.888889L8.53061 0L4.04082 0L3.14286 0.888889L0 0.888889L0 2.66667L12.5714 2.66667V0.888889ZM0.897959 14.2222C0.897959 14.6937 1.08717 15.1459 1.42397 15.4793C1.76077 15.8127 2.21757 16 2.69388 16H9.87755C10.3539 16 10.8107 15.8127 11.1475 15.4793C11.4843 15.1459 11.6735 14.6937 11.6735 14.2222L11.6735 3.55556L0.897959 3.55556L0.897959 14.2222Z"
                                fill="#FD4F48"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <h4 className="d-flex align-items-center" onClick={(e) => {addQuestion(e)}}>
                  <span className="d-flex">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 11L6 6M6 6L6 1M6 6L11 6M6 6L1 6"
                        stroke="#252525"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  Add New Question
                </h4>
              </div>
            </Form>
          )
        }}
      </Formik>
    </>
  );
};

export default EditPracticeTest;
