import React from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

const PreviewForm = (props) => {
    const getsingleFormData = useSelector((state) => state.formsData.singleFormData && state.formsData.singleFormData);
    
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return (
    <Modal show={props.show} onHide={props.closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h3>{getsingleFormData.title}</h3>
          <p className="mb-0">{getsingleFormData ? (new Date(getsingleFormData.created.replace('IST', '')).getDate()) +" "+(monthNames[new Date(getsingleFormData.created.replace('IST', '')).getMonth()]) + " "+(new Date(getsingleFormData.created.replace('IST', '')).getFullYear()) : ""}</p>
          <Link
            // to="#/"
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
            {getsingleFormData && getsingleFormData.items.map((data) => {
                return(
                    (data.content_type_name === "question" && data.content_object.type === "MULTIPLECHOICE") ?
                    <div className="uf-single">
                    <div className="after_added_questions multichoice_question_div">
                        <h3>
                        {data.content_object.title}
                        </h3>
                        <div className="added_question multichoice_question">
                        {Object.values(data.content_object.options).map((options) => {
                            return(
                            <div className="option_name">
                                <input type="radio" id={data.content_object.id} name={data.content_object.id} value={options} className="MulchociceQuestion" disabled/>
                                <p className="mb-0">{options}</p>
                            </div>

                            )
                        })}
                        </div>
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
                                                    // onChange={(e) => {optionChange(e)}}
                                                    className="form-check-input position-static getIdInMultigrid"
                                                    disabled
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
                    <div className="uf-single">
                    <div className="uf-label">{data.content_object.title}</div>
                    <div className="uf-field">
                    <span className="uf-field-value">{data.content_object.description}</span>
                    </div>       
                    </div>       
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
                            <div className="uf-single">
                                <div className="uf-label">{data.content_object.title}</div>
                                <div className="uf-field">
                                <span className="uf-field-value">{data.content_object.description}</span>
                            </div>
                            </div> : 
                             data.content_object.type === "MULTIPLECHOICE" ?
                             <div className="uf-single">
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
                                                <input type="radio" id={data.content_object.id} className="getIdInmultiChoice" name={data.content_object.id} value={options} disabled className="MulchociceQuestionInSection"/>
                                                <p className="mb-0">{options}</p>
                                              </div>
                                            )
                                          })}
                                        </div>
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
                                                                    // onChange={(e) => {optionChange(e)}}
                                                                    disabled
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
                        )})
                        }
                    </div> : 
                    (data.content_type_name === "header") ?
                    <div className="uf-single">
                        <div className="uf-label">{data.content_object.title}</div>
                        <div className="uf-field">
                        <span className="uf-field-value">{data.content_object.description}</span>
                        </div>
                    </div> : <></>
            )})
            }
          {/* <div className="uf-single">
            <div className="uf-label">School ID </div>
            <div className="uf-field">
              <span className="uf-field-value">5512456</span>
            </div>
          </div>
          <div className="uf-single">
            <div className="uf-label">Prev School Name</div>
            <div className="uf-field">
              <span className="uf-field-value">ABC</span>
            </div>
          </div> */}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PreviewForm;
