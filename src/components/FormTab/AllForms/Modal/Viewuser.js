import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getFormResponseAns } from "../../../../actions/Form";

const Viewuser = (props) => {
  const dispatch = useDispatch()

  const responseData = useSelector((state) => state.formsData.getformResponseData);
  

  // useEffect(() => {
  //   // dispatch(getFormResponseAns({"0":props.form_id,"1":props.user_id}))
  // }, [props.user_id])

    const getsingleFormData = useSelector((state) => state.formsData.singleFormData && state.formsData.singleFormData);
   

  const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];



  return (
    <Modal show={props.show} onHide={props.closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>

          {/* <h3>{responseData.results && responseData.results[0] && responseData.results[0].submitted_by && responseData.results[0].submitted_by.fullname}</h3> */}
          <p className="mb-0">11/20/2020, 3:10am</p>
          <Link
            to="#/"
            className="close-modal-header"
            onClick={props.closeModal}
          >
            <img
              src={process.env.PUBLIC_URL + "/images/modal-close.svg"}
              alt="close"
            />
          </Link>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-form-wrapper form_user_view perview_form">
            {
                  responseData && responseData.results.map((result) => {
                return(
                  <>
                          {
                  // result.responses.map((res) => {
                  //   return(
                      getsingleFormData && getsingleFormData.items.map((data) => {
                        return(
                          
                    (data.content_type_name === "question" && data.content_object.type === "MULTIPLECHOICE") ?
                    result.responses.map((res) => {
                      return(
                        res.question.type === "MULTIPLECHOICE" && res.question.id === data.content_object.id
                        ?
                          <div className="uf-single">
                            <div className="after_added_questions multichoice_question_div">
                                <h3>
                                {data.content_object.title}
                                </h3>
                                <div className="added_question multichoice_question">
                                {Object.values(data.content_object.options).map((options) => {
                                    return(
                                      // data.content_object.id ===  getresponse ? 
                                      <>
                                      {/* <h1>dileep</h1> */}
                                        <div className="option_name">
                                            <input type="radio" id={data.content_object.id} name={data.content_object.id} value={options} className="MulchociceQuestion" disabled checked={res.question.id === data.content_object.id && res.response.answer === options ? true : false} />
                                            <p className="mb-0">{options}</p>
                                        </div>
                                        </>
                                      // : 
                                      // <h1>dileep</h1>
                                    )
                                })}
                                </div>
                            </div>  
                          </div>
                        :
                          <></>
                      )})
                    : (data.content_type_name === "question" && data.content_object.type === "MULTIGRID") ?
                    result.responses.map((res) => {
                    return(
                      res.question.type === "MULTIGRID" && res.question.id === data.content_object.id
                      ?
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
                                    <p className="mb-0">{options}</p>
                                  </li>
                                  )
                                })}
                                </ul>
                                <ul>
                                  {Object.values(data.content_object.options.rows).map((rowData) => {
                                    return (
                                      <li>
                                        {Object.values(data.content_object.options.columns).map((columnData) => {
                                          const answerData = res && res.response && res.response.answer && Object.values(res.response.answer).filter(obj => obj.row === rowData && obj.column === columnData);
                                          return (
                                            answerData.length > 0
                                                ?
                                                  <>
                                                    <div className="li_div">
                                                      <div className="checbox_div">
                                                        <div className="form-check">
                                                          <input
                                                            aria-label="option 1"
                                                            name={`${rowData},${columnData}`}
                                                            type="checkbox"
                                                            id={data.content_object.id}
                                                            // onChange={(e) => {optionChange(e)}}
                                                            disabled
                                                            checked="checked"
                                                            className="form-check-input position-static getIdsectionmultigrid"
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>
                                                    
                                                  </>
                                                :
                                                  <>
                                                    <div className="li_div">
                                                      <div className="checbox_div">
                                                        <div className="form-check">
                                                          <input
                                                            aria-label="option 1"
                                                            name={`${rowData},${columnData}`}
                                                            type="checkbox"
                                                            id={data.content_object.id}
                                                            disabled
                                                            className="form-check-input position-static getIdsectionmultigrid"
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </>
                                          )
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
                          )})
                    : (data.content_type_name === "question" && data.content_object.type === "QUALITATIVE") ?
                    result.responses.map((res) => {
                      return(
                        res.question.type === "QUALITATIVE" && res.question.id === data.content_object.id
                        ?
                          <div className="uf-single">
                          <div className="uf-label">{data.content_object.title}</div>
                        <div className="uf-field">
                            <span className="uf-field-value">{res.question.id === data.content_object.id ? res.response.answer : ""} </span>
                          </div>       
                        </div>
                        : 
                            <></>
                            )})
                    :
                    (data.content_type_name === "section") ?
                        <div className="uf-single">
                        <div className="uf-label">{data.content_object.title}</div>
                        <div className="uf-field">
                        <span className="uf-field-value">{data.content_object.description}</span>
                        </div>
                        {data.content_object.items.map((data) => {
                            return(
                                <>
                                {
                                  data.content_object.type === "QUALITATIVE" ?
                                    result.responses.map((res) => {
                                      return(
                                        res.question.type === "QUALITATIVE" && res.question.id === data.content_object.id
                                        ?
                                          <div className="uf-single">
                                              <div className="uf-label">{data.content_object.title}</div>
                                              <div className="uf-field">
                                              <span className="uf-field-value">{data.content_object.description}</span>
                                          </div>
                                          </div> 
                                        : 
                                        <></>
                                        )})
                            : 
                             data.content_object.type === "MULTIPLECHOICE" ?
                             result.responses.map((res) => {
                              return(
                                res.question.type === "MULTIPLECHOICE" && res.question.id === data.content_object.id
                                ?
                                    <div className="uf-single">
                                    <div className="after_added_questions">
                                            <h3>
                                              {data.content_object.title}
                                            </h3>
                                            <div className="added_question">
                                              {Object.values(data.content_object.options).map((options,) => {
                                                return(
                                                  <div className="option_name">
                                                    <input type="radio" id={data.content_object.id} className="getIdInmultiChoice" name={data.content_object.id} value={options} disabled className="MulchociceQuestionInSection" checked={ res.question.id === data.content_object.id && res.response.answer === options ? true : false}/>
                                                    <p className="mb-0">{options}</p>
                                                  </div>
                                                )
                                              })}
                                            </div>
                                          </div>
                                        </div>
                                       : 
                                       <></>
                                       )})
                             :  
                             data.content_object.type === "MULTIGRID" ? 
                             result.responses.map((res) => {
                              return(
                                res.question.type === "MULTIGRID" && res.question.id === data.content_object.id
                                ?
                                      <div className="rate_teacher submission_form">
                                          <div className="row">
                                            <h3>{data.content_object.title}</h3>
                                            <div className="col-md-3"> 
                                              <div className="actions_div">
                                                <ul className="action_name invisible">
                                                  <li>
                                                    <p className="mb-0">N</p>
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
                                                    <p className="mb-0">{options}</p>
                                                  </li>
                                                  )
                                                })}
                                                </ul>
                                                <ul>
                                                  {Object.values(data.content_object.options.rows).map((rowData) => {
                                                    return (
                                                      <li>
                                                        {Object.values(data.content_object.options.columns).map((columnData) => {
                                                          const answerData = res && res.response && res.response.answer && Object.values(res.response.answer).filter(obj => obj.row === rowData && obj.column === columnData);
                                                          return (
                                                            answerData.length > 0
                                                          ?
                                                            <>
                                                              <div className="li_div">
                                                                <div className="checbox_div">
                                                                  <div className="form-check">
                                                                    <input
                                                                      aria-label="option 1"
                                                                      name={`${rowData},${columnData}`}
                                                                      type="checkbox"
                                                                      id={data.content_object.id}
                                                                      // onChange={(e) => {optionChange(e)}}
                                                                      disabled
                                                                      checked="checked"
                                                                      className="form-check-input position-static getIdsectionmultigrid"
                                                                    />
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              
                                                            </>
                                                          :
                                                            <>
                                                              <div className="li_div">
                                                                <div className="checbox_div">
                                                                  <div className="form-check">
                                                                    <input
                                                                      aria-label="option 1"
                                                                      name={`${rowData},${columnData}`}
                                                                      type="checkbox"
                                                                      id={data.content_object.id}
                                                                      disabled
                                                                      className="form-check-input position-static getIdsectionmultigrid"
                                                                    />
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </>
                                                          )
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
                                   )})
                             :
                            <></>
                            }
                        </>
                        )})
                        }
                    </div>
                    :
                    (data.content_type_name === "header") ?
                    <div className="uf-single">
                        <div className="uf-label">{data.content_object.title}</div>
                        <div className="uf-field">
                        <span className="uf-field-value">{data.content_object.description}</span>
                        </div>
                    </div> : <></>
                      
            )
                      
          })
              // )})
            }
            <hr />
            </>
                )
          })
            }
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Viewuser;
