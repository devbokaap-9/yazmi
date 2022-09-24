import React, { useEffect, useState,useContext, useRef } from 'react'
import { useLocation, useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { UserContext } from '../../../../../UserContext';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import * as yup from "yup";
import { formSubmission } from '../../../../../actions/Form';

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;

const NotOwnByMe = () => {
  let history = useHistory();

  const [notOwnById, setNotOwnById] = useState("")
  let [color, setColor] = useState("#ffffff");
  const [TitleName, setTitleName] = useState("");
  const [StatusCode,setStatusCode] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clearForm,setClearForm] = useState(false)

  const [selectedValue, setSelectedValue] = React.useState('a');
  const [ValueMultichoice, setValueMultichoice] = React.useState('a');

  //validation
  const validationSchema = yup.object({
    title_ans: yup.string().required("Required"),
  });


  const formRef = useRef();

  const handleChangeRadio = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleMultiChoiceSection = (event) => {
    setValueMultichoice(event.target.value);
  };

  const userContext = useContext(UserContext);

  const getAllData = useSelector((state) => state.formsData.singleFormData);
  
  
  useEffect(() => {
    if(userContext.frmResponse === 2 && window.location.href.includes("notownform")){
      userContext.setFrmResponse(0)
      userContext.setFrmLdng(true)
      userContext.setFrmUpdating(false);
      setClearForm(true)
    }
    else if(userContext.frmResponse === 1 && window.location.href.includes("notownform")){
      userContext.setFrmResponse(0)
      questionsSubmission();
    }
  })

  if(userContext.formLdng && !userContext.frmUpdating && window.location.href.includes('notownform') && clearForm){
    userContext.setFrmLdng(false)
    userContext.setFrmUpdating(true);
    setClearForm(false)
  }

  const dispatch = useDispatch()

  // const ownedFormsDatass = useSelector((state) => state.formsData.getAllData);
  
  const formSubmissionResponse = useSelector((state) => state.formsData.formsubmissionData);
  


  // useEffect(() => {
    
  // }, [getAllData.id])

  // var inputValue = []
  const optionChange = (event) => {
    let parentDiv = event.target.name
    // inputValue.push(parentDiv)

    // for(let i =0;i<parentDiv.length;i++){
    //   if(parentDiv[i].childNodes[0].getAttribute("checked") === true || parentDiv[i].childNodes[0].getAttribute("checked") === "true"){
    //     parentDiv[i].childNodes[0].setAttribute("checked", false);
    //   }
    // }
    event.target.setAttribute("checked", true);
    if(event.target.checked !== true){
      event.target.setAttribute("checked", false);
    }
  };

  

  useEffect(() => {
    if(loading && window.location.href.includes("notownform")){
      setLoading(false)
      setStatusCode(formSubmissionResponse.status)
    }
  }, [formSubmissionResponse])

  if(StatusCode && StatusCode === 201){
    setTimeout(() => {
      setStatusCode("")
      history.push("/form")
    },3000)
  }

  const questionsSubmission = () => {
    console.log(22)
    setLoading(true)

    var getAllId = [];
    let qualitativeSectionInput = document.getElementsByClassName("qualitative_question_section");

    for (let i = 0; i < qualitativeSectionInput.length; i++) {
      if (qualitativeSectionInput[i].id !== "" && !qualitativeSectionInput[i].value == "" ) {
        getAllId.push({"question":qualitativeSectionInput[i].id,response:{"answer":qualitativeSectionInput[i].value}});
      }
    }
    
    let qualitativeInput = document.getElementsByClassName("qualitative_question");

    for (let i = 0; i < qualitativeInput.length; i++) {
      if (qualitativeInput[i].id !== "" && !qualitativeInput[i].value == "" ) {
        getAllId.push({"question":qualitativeInput[i].id,response:{"answer":qualitativeInput[i].value}});
      }
    }

    let MultiChoiceInput = document.getElementsByClassName("MulchociceQuestion");

    for (let i = 0; i < MultiChoiceInput.length; i++) {
      if (MultiChoiceInput[i].checked == true ) {
        getAllId.push({"question":MultiChoiceInput[i].id,response:{"answer":MultiChoiceInput[i].value}});
      }
    }


    let MultiChoiceSectionInput = document.getElementsByClassName("MulchociceQuestionInSection");

    for (let i = 0; i < MultiChoiceSectionInput.length; i++) {
      if (MultiChoiceSectionInput[i].checked == true ) {
        getAllId.push({"question":MultiChoiceSectionInput[i].id,response:{"answer":MultiChoiceSectionInput[i].value}});
      }
    }

    let MultigridInput = document.getElementsByClassName("getIdInMultigrid");
    if(MultigridInput.length !== 0){
      var getobj = []
      var getInputId = MultigridInput[0].getAttribute("id")
      for (let i = 0; i < MultigridInput.length; i++) {
      if (MultigridInput[i].getAttribute("checked") === true || MultigridInput[i].getAttribute("checked") === "true") {
          let id = MultigridInput[i].getAttribute("id")
          let getName = MultigridInput[i].getAttribute("name")
          var splitName = getName.split(",")
          getobj.push({"row":splitName[0],"column":splitName[1]})
        }
      }
      let objJson = Object.assign({}, getobj)
      if(getobj.length > 0){
        getAllId.push({"question":getInputId,response:{"answer":objJson}});
      }
    }

    // MultiGrid in section
    let MultichoiceSectionInput = document.getElementsByClassName("getIdsectionmultigrid");
    if(MultichoiceSectionInput.length > 0){
      var getobjSection = []
      for (let i = 0; i < MultichoiceSectionInput.length; i++) {
        var getSectionInputId = MultichoiceSectionInput[0].getAttribute("id")
        if (MultichoiceSectionInput[i].getAttribute("checked") === true || MultichoiceSectionInput[i].getAttribute("checked") === "true") {
          let id = MultichoiceSectionInput[i].getAttribute("id")
          let getNameSection = MultichoiceSectionInput[i].getAttribute("name")
          let splitNameSection = getNameSection.split(",")
          getobjSection.push({"row":splitNameSection[0],"column":splitNameSection[1]})
        }
      }
      let objJsonSection = Object.assign({}, getobjSection)
      if(getobjSection.length > 0){
        getAllId.push({"question":getSectionInputId,response:{"answer":objJsonSection}});
      }
    }
    

    
    
    let getData = {
      id: getAllData.id,
      ans: getAllId
    }
    if((getAllId[0] && getAllId[0].response && !getAllId[0].response.value == "") || getAllId.length !== 0){
      getData.ans.is_form_submitted = true
      dispatch(formSubmission(getData))
    }else{
      setLoading(false)
    }
  }

  useEffect(() => {
    setTitleName(getAllData.id)
    setStatusCode("")
    setLoading(false)
    userContext.setFrmLdng(false)
    userContext.setFrmUpdating(true);
  }, [getAllData])

  let location = useLocation()

    return (
        <>
          {(StatusCode && StatusCode === 201) ?
            <h2 className="no_record">Your response has been recorded Thank you for submitting</h2> :
            <Formik
              initialValues={{ title_ans: "", description: "" }}
              // validationSchema={validationSchema}
              onSubmit={questionsSubmission}
              innerRef={formRef}
            >
              {({ values, handleChange }) => {
                 return(
                <Form>
                  <div>
                    <div className="added_title_div">
                          <div className="add_title">
                            <h3>{getAllData.title}</h3>
                          </div>
                          {/* <input type="text" className="title_input" readOnly placeholder="Additional Information for the title" /> */}
                        </div>
                        {userContext.frmUpdating && getAllData && getAllData.items.map((data) => {
                          return(
                            (data.content_type_name === "question" && data.content_object.type === "MULTIPLECHOICE")
                            ?
                              <div className="after_added_questions multichoice_question_div">
                                <h3>
                                  {data.content_object.title}
                                </h3>
                                <div className="added_question multichoice_question">
                                  {Object.values(data.content_object.options).map((options) => {
                                    return(
                                      <div className="option_name">
                                        <input type="radio" id={data.content_object.id} name={data.content_object.id} value={options} className="MulchociceQuestion"/>
                                        <p className="mb-0">{options}</p>
                                      </div>

                                    )
                                  })}
                                </div>
                              </div> 
                            : (data.content_type_name === "question" && data.content_object.type === "MULTIGRID") ?
                            <div className="rate_teacher submission_form">

                          <div className="row">
                            <h3>{data.content_object.title}</h3>
                            <div className="col-md-3">
                              <div className="actions_div">
                                <ul className="action_name invisible">
                                  <li>
                                    <p class="mb-0">N</p>
                                  </li>
                                </ul>
                              </div>
                              <div className="role_name_div">
                                <ol>
                                {Object.values(data.content_object.options.rows).map((options) => {
                                    return(
                                  <li>{options}</li>
                                  )
                                })}
                                </ol>
                              </div>
                            </div>
                            <div className="col">
                              <div className="actions_div">
                                <ul className="action_name">
                                {Object.values(data.content_object.options.columns).map((options) => {
                                    return(
                                  <li>
                                    <p class="mb-0">{options}</p>
                                  </li>
                                  )
                                })}
                                </ul>
                                <ul>
                                  {Object.values(data.content_object.options.rows).map((rowData) => {
                                    return (
                                      <li>
                                        {Object.values(data.content_object.options.columns).map((columnData) => {
                                          return (
                                            <div class="li_div">
                                              <div class="checbox_div">
                                                <div class="form-check">
                                                  <input
                                                    aria-label="option 1"
                                                    name={`${rowData},${columnData}`}
                                                    type="checkbox"
                                                    id={data.content_object.id}
                                                    onChange={(e) => {optionChange(e)}}
                                                    className="form-check-input position-static getIdInMultigrid"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                            : (data.content_type_name === "question" && data.content_object.type === "QUALITATIVE") ?
                              <div>
                                  <div className="qulitative_question">
                                      <div className="added_section_div">
                                        <div className="add_title">
                                          <h3>{data.content_object.title}</h3>
                                        </div>
                                        <div className="add_title">
                                          <input
                                            type="text"
                                            id={data.content_object.id}
                                            className="ans_input qualitative_question"
                                          />
                                        </div>
                                      </div>
                                  </div>
                                </div>
                            : (data.content_type_name === "section") ?
                            <div className="form_div">
                            <div className="added_title_div">
                                  <div className="add_title">
                                    <h3>{data.content_object.title }</h3>
                                  </div>
                                  <span className="read_title">
                                  {data.content_object.description }
                                  </span>
                                </div>
                                {/* <div className="duplicate_question">
                                  <div className="add_title">
                                    <h3>What is your teacher’s name?</h3>
                                  </div>
                                  <input
                                    type="text"
                                    className="title_input"
                                  />
                                </div> */}
                                {data.content_object.items.map((data) => {
                                  return(
                                    <>
                                    {
                                      data.content_object.type === "QUALITATIVE" ?
                                      <div className="qulitative_question qulitative_question_section">
                                          <div className="added_section_div">
                                            <div className="add_title">
                                              <h3>{data.content_object.title}</h3>
                                            </div>
                                             
                                            <input
                                              type="text"
                                              name="edit_description"
                                              className="read_title"
                                              Value={data.content_object.description}
                                            />
                                            <div className="add_title">
                                          <input
                                            type="text"
                                            name="title_ans"
                                            id={data.content_object.id}
                                            className="ans_input qualitative_question_section"
                                          />
                                        </div>
                                          </div>
                                      </div> : 
                                      data.content_object.type === "MULTIPLECHOICE" ? 
                                      <div className="after_added_questions">
                                        <h3>
                                          {data.content_object.title}
                                        </h3>
                                        <div className="added_question">
                                          {Object.values(data.content_object.options).map((options,) => {
                                            return(
                                              <div className="option_name">
                                                {/* <GreenRadio
                                                  checked={ValueMultichoice === options}
                                                  onChange={handleMultiChoiceSection}
                                                  value={options}
                                                  name="radio-button-demo"
                                                  inputProps={{ 'aria-label': options }}
                                                /> */}
                                                <input type="radio" id={data.content_object.id} className="getIdInmultiChoice" name={data.content_object.id} value={options} className="MulchociceQuestionInSection"/>
                                                <p className="mb-0">{options}</p>
                                              </div>
                                            )
                                          })}
                                        </div>
                                      </div>
                                      :
                                      data.content_object.type === "MULTIGRID" ? 
                                      <div className="rate_teacher submission_form">
                                          <div className="row">
                                            <h3>{data.content_object.title}</h3>
                                            <div className="col-md-3">
                                              <div className="actions_div">
                                                <ul className="action_name invisible">
                                                  <li>
                                                    <p class="mb-0">N</p>
                                                  </li>
                                                </ul>
                                              </div>
                                              <div className="role_name_div">
                                                <ol>
                                                  {Object.values(data.content_object.options.rows).map((options) => {
                                                      return(
                                                    <li>{options}</li>
                                                    )
                                                  })}
                                                </ol>
                                              </div>
                                            </div>
                                            <div className="col">
                                              <div className="actions_div">
                                                <ul className="action_name">
                                                {Object.values(data.content_object.options.columns).map((options) => {
                                                    return(
                                                  <li>
                                                    <p class="mb-0">{options}</p>
                                                  </li>
                                                  )
                                                })}
                                                  {/* <li>
                                                    <p class="mb-0">Getting Better</p>
                                                  </li>
                                                  <li>
                                                    <p class="mb-0">Good</p>
                                                  </li>
                                                  <li>
                                                    <p class="mb-0">Exceptional</p>
                                                  </li>
                                                  <li>
                                                    <p class="mb-0">Better than the best</p>
                                                  </li> */}
                                                </ul>
                                                <ul>
                                                  {Object.values(data.content_object.options.rows).map((rowData) => {
                                                    return (
                                                      <li>
                                                        {Object.values(data.content_object.options.columns).map((columnData) => {
                                                          return (
                                                            <div class="li_div">
                                                              <div class="checbox_div">
                                                                <div class="form-check">
                                                                  <input
                                                                    aria-label="option 1"
                                                                    name={`${rowData},${columnData}`}
                                                                    type="checkbox"
                                                                    id={data.content_object.id}
                                                                    onChange={(e) => {optionChange(e)}}
                                                                    className="form-check-input position-static getIdsectionmultigrid"
                                                                  />
                                                                </div>
                                                              </div>
                                                            </div>
                                                          );
                                                        })}
                                                      </li>
                                                    );
                                                  })}
                                                </ul>
                                              </div>
                                            </div>
                                          </div>
                                      </div>
                                      :
                                      <></>
                                    }
                                    </>
                                  )
                                })
                                }
                            </div>
                            
                              : (data.content_type_name === "header") ?
                              <div>
                                <div className="qulitative_question">
                                    <div className="added_section_div">
                                      <div className="add_title">
                                        <h3>{data.content_object.title}</h3>
                                      </div>
                                      <div className="add_title">
                                        <h3>{data.content_object.description}</h3>
                                      </div>
                                    </div>
                                </div>
                              </div>
                              :
                              
                              <></>
                          )
                        })}
                  </div>
                </Form>
              )}}
            </Formik>
          }
            <div className={userContext.formLdng || loading ? "loader_div" : ""}>
              <ClipLoader
                color={color}
                className="loader"
                loading={userContext.formLdng || loading}
                css={override}
                size={50}
              />
            </div>
        </>
    )
}

export default NotOwnByMe
