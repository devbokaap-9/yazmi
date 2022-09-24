import React,{useEffect, useContext, useState} from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {UserContext} from "../../../../UserContext";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;

const DownloadForm = (props) => {
    let dispatch = useDispatch();
    const userContext = useContext(UserContext);
    const [color, setColor] = useState("#ffffff");
    const [loading,setLoading] = useState(true)

    const getsingleFormData = useSelector((state) => state.formsData.singleFormData && state.formsData.singleFormData);
    
    useEffect(() => {
        if(userContext.frmResponse === 1 && window.location.href.includes("form") && !window.location.href.includes("notownform")){
            // setLoading(true)
            var date = new Date();
            userContext.setFrmResponse(0)
            const input = document.getElementById("formDownload");
            html2canvas(input)
                .then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF();
                    pdf.addImage(imgData, 'JPEG', 0, 0);
                    pdf.save(getsingleFormData.title+"_"+date.getDate()+"_"+(date.getMonth()+1)+"_"+date.getFullYear()+"_"+date.getHours()+"_"+date.getMinutes()+"_"+date.getSeconds()+".pdf");
                })
        }
        else{
            if(loading && userContext.frmResponse === 0){
                setLoading(false)
            }
        }
    })
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const ufsingle = {
        display: "block",
        border: "1px solid black",
        width: "100%"
    }

    return (
        <>
        {(userContext.frmResponse === 1 )
        ? 
        <>
            <div id="formDownload" className="form_download" style={{padding: "20px", display: "block",width: "50%"}}>
                <h3 style={{fontSize: "15px", fontWeight: "bold"}}>{getsingleFormData.title}</h3>
                <p className="mb-0" style={{fontSize: "11px"}}>{getsingleFormData ? (new Date(getsingleFormData.created.replace('IST', '')).getDate()) +" "+(monthNames[new Date(getsingleFormData.created.replace('IST', '')).getMonth()]) + " "+(new Date(getsingleFormData.created.replace('IST', '')).getFullYear()) : ""}</p>
                <div className="modal-form-wrapper form_user_view perview_form" >
                    {getsingleFormData && getsingleFormData.items.map((data) => {
                        return(
                            (data.content_type_name === "question" && data.content_object.type === "MULTIPLECHOICE") ?
                                <div className="uf-single" style={ufsingle}>
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
                                <div className="rate_teacher submission_form" style={ufsingle}>
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
                                <div className="uf-single" style={ufsingle}>
                                    <div className="uf-label">{data.content_object.title}</div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{data.content_object.description}</span>
                                    </div>       
                                </div>       
                            : (data.content_type_name === "section") ?
                                <div className="uf-single" style={ufsingle}>
                                    <div className="uf-label">{data.content_object.title}</div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{data.content_object.description}</span>
                                </div>
                                {data.content_object.items.map((data) => {
                                    return(
                                        <>
                                        {data.content_object.type === "QUALITATIVE" ?
                                            <div className="uf-single" style={ufsingle}>
                                                <div className="uf-label">{data.content_object.title}</div>
                                                <div className="uf-field">
                                                    <span className="uf-field-value">{data.content_object.description}</span>
                                                </div>
                                            </div> 
                                        : data.content_object.type === "MULTIPLECHOICE" ?
                                            <div className="uf-single" style={ufsingle}>
                                                <div className="after_added_questions">
                                                    <h3>{data.content_object.title}</h3>
                                                    <div className="added_question">
                                                        {Object.values(data.content_object.options).map((options,) => {
                                                            return(
                                                                <div className="option_name">
                                                                <input type="radio" id={data.content_object.id} className="getIdInmultiChoice" name={data.content_object.id} value={options} disabled className="MulchociceQuestionInSection"/>
                                                                <p className="mb-0">{options}</p>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        : data.content_object.type === "MULTIGRID" ? 
                                            <div className="rate_teacher submission_form" style={ufsingle}>
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
                                        : <></>
                                        }
                                        </>
                                    )})
                                }
                            </div> 
                            : (data.content_type_name === "header") ?
                                <div className="uf-single" style={ufsingle}>
                                    <div className="uf-label">{data.content_object.title}</div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{data.content_object.description}</span>
                                    </div>
                                </div> 
                            : <></>
                        )}
                        )
                    }
                </div>
            <hr />
            </div>
            </>
           : 
             <></>
            }
        <div className={loading ? "loader_div download_bg_load" : ""}>
            <ClipLoader color={color} className="loader" loading={loading} css={override} size={50} />
        </div>
        </>
    );
};

export default DownloadForm;
