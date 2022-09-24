import { Field } from "formik";
import React, { useEffect, useState,useContext } from "react";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserContext } from "../../../../../UserContext";
import checkPermission from "../../../../../utils/CheckPermission";

const MultiridDetailedPage = (props) => {

  const subdata = props && props.subdata
  const userContext = useContext(UserContext);
  
  const [EditMultiGridId, setEditMultiGridId] = useState("");
  const [rowCount, setRowCount] = useState(0)
  const [columnCount, setColumnCount] = useState(0)

  const editQualitativeQuestionData = useSelector(
    (state) => state.formsData.editQualitativeQuestionData
  );

  const removeHeaderPopover = () => {
    const element = document.querySelector(".header-part");
    element.classList.remove("show");
    // element.parentNode.empty()
    document.querySelector(".header-part").parentNode.style.display = "none";
  };

  useEffect(() => {
    if(editQualitativeQuestionData.id && editQualitativeQuestionData.content_object.type === "MULTIGRID"){
      setEditMultiGridId("")
    }
  }, [editQualitativeQuestionData])

  const handleClickEditMultigrid = (value) => {
    
    userContext.setRemoveIdForUser(true)
    setEditMultiGridId(value[0])
    props.setId(value[0])
    props.passFunction()
    if(props.getSectionName === "Edit_Questions_tab"){
      props.sectionName("Edit_Questions_tab")
    }
    if(props.getSectionName === "Edit_Questions_in_Section_Tab"){
      props.sectionName("Edit_Questions_in_Section_Tab")
      props.setSection_Id(props.data)
      props.setContentId(value[3].id)
    }
    props.lineRemoveCallback()
  }

  // add row
  const handleAddRow = () => {
    let addDivRow = document.getElementById("append_div_row")
    let copyRow = addDivRow.firstElementChild.cloneNode(true);
    copyRow.childNodes[0].value = ""
    copyRow.childNodes[0].placeholder = "defaultValue"
    // let addclass = copyRow.classList.add("mystyle")
    addDivRow.appendChild(copyRow)
    setRowCount(rowCount + 1)

    // get remove button
    let removeButton = copyRow.childNodes[1]
    removeButton.addEventListener('click',function(e){
      handleRemoveRow(e)
    })
  } 

  // remove column
  const handleRemoveRow = (e) => {
    let element = e.target.id || e.target.parentNode.id
    let elementDiv = document.getElementById(element).parentNode


    let getUlLenght = document.getElementById("append_div_row").childNodes.length
    
    if(getUlLenght > 1){
      elementDiv.remove()
    }
  }

  //  add column
  const handleAddColumn = () => {
    let addDivColumn = document.getElementById("append_div_column")
    let copyColumn = addDivColumn.firstElementChild.cloneNode(true);
    copyColumn.childNodes[0].childNodes[1].value = ""
    copyColumn.childNodes[0].childNodes[1].placeholder = "defaultValue"


    addDivColumn.appendChild(copyColumn)
    setColumnCount(columnCount + 1)

    // get remove button
    let removeButtonColumn = copyColumn.childNodes[1]

    removeButtonColumn.addEventListener('click',function(e){
      handleRemoveColumn(e)
    })

  } 

  const handleRemoveColumn = (e) => {
    let getelementColumnid = e.target.id || e.target.parentNode.id
    let elementDivColumnLi = document.getElementById(getelementColumnid).parentNode


    let getUlLenghtColumn = document.getElementById("append_div_column").childNodes.length

    if(getUlLenghtColumn > 1){
      elementDivColumnLi.remove()
    }
  }

  const handleChange = (e) => {
    if(e.target.value === ""){
      props.SaveSetLoading(true)
    }else{
      props.SaveSetLoading(false)
    }
  }

  return (
    <div className="rate_teacher">
      <div className="row">
        <div className="add_title">
          {/* <h3>{props.title}</h3> */}
          <Field
            type="text"
            name={"edit_title" + subdata.id}
            className={props.getId === subdata.id ? "edit_title" : ""}
            defaultValue={props.title}
            readOnly={props.getId === subdata.id ? false : true}
            onChange={(e) => {props.setTitle(e.target.value);handleChange(e)}}
          />
          {(checkPermission('custom_form_data_delete') || checkPermission('custom_form_data_edit'))
          ?
            <>
              <span id={`singlemultigrid`+subdata.id}>
                <svg
                  width="4"
                  height="13"
                  viewBox="0 0 4 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.126 10.822C3.126 11.194 3 11.506 2.748 11.758C2.496 12.01 2.184 12.136 1.812 12.136C1.44 12.136 1.128 12.01 0.876 11.758C0.624 11.506 0.498 11.194 0.498 10.822C0.498 10.462 0.624 10.156 0.876 9.904C1.128 9.652 1.44 9.526 1.812 9.526C2.184 9.526 2.496 9.652 2.748 9.904C3 10.156 3.126 10.462 3.126 10.822ZM3.126 6.4802C3.126 6.8522 3 7.1642 2.748 7.4162C2.496 7.6682 2.184 7.7942 1.812 7.7942C1.44 7.7942 1.128 7.6682 0.876 7.4162C0.624 7.1642 0.497999 6.8522 0.497999 6.4802C0.497999 6.1202 0.623999 5.8142 0.876 5.5622C1.128 5.3102 1.44 5.1842 1.812 5.1842C2.184 5.1842 2.496 5.3102 2.748 5.5622C3 5.8142 3.126 6.1202 3.126 6.4802ZM3.126 2.13841C3.126 2.51041 3 2.82241 2.748 3.07441C2.496 3.32641 2.184 3.45241 1.812 3.45241C1.44 3.45241 1.128 3.32641 0.875999 3.07441C0.623999 2.82241 0.497999 2.51041 0.497999 2.13841C0.497999 1.77841 0.623999 1.47241 0.875999 1.22041C1.128 0.968406 1.44 0.842406 1.812 0.842406C2.184 0.842406 2.496 0.968406 2.748 1.22041C3 1.47241 3.126 1.77841 3.126 2.13841Z"
                    fill="#666666"
                  />
                </svg>
              </span>
              <UncontrolledPopover
                className="duplicate header-part header"
                trigger="legacy"
                placement="bottom"
                target={`singlemultigrid`+subdata.id}
              >
                <div className="squar_box squar_box_hover"></div>
                <PopoverBody>
                  <ul className="list-unstyled mb-0">
                    {checkPermission('custom_form_data_edit')
                    ?
                      <li onClick={()=> {
                        handleClickEditMultigrid([subdata.id,subdata.content_object.type,subdata.content_object,subdata]);removeHeaderPopover()
                      }}>
                        <Link className="text-decoration-none">
                          Edit Question
                        </Link>
                      </li>
                    :
                      <></>
                    }
                    {checkPermission('custom_form_data_delete')
                    ?
                      <li>
                        <Link
                          onClick={() => {
                            props.deleteQuestion(
                              subdata.id,
                              props.data
                            );
                            props.removePopOver();
                          }}
                          className="text-decoration-none"
                        >
                          Delete Question
                        </Link>
                      </li>
                    :
                      <></>
                    }
                  </ul>
                </PopoverBody>
              </UncontrolledPopover>
            </>
          :
            <></>
          }
        </div>
        {props.getId === subdata.id ?
          // <></>
          <div className="multichoice_grid_div">
      <div className="row_div">
        <h3>Rows</h3>
        <div className="add-rows">
          <ol className="mb-0" id="append_div_row">
            {/* <li className="" >
              <input type="text" className="multigridrow" placeholder="defaultValue" />
              <span id={`li_id_${rowCount}`} onClick={(e)=>{handleRemoveRow(e)}} >
                <img src={process.env.PUBLIC_URL + "/images/Vector.png"} alt="" />
              </span>
            </li> */}
            {Object.values(props.rows).map((data,key) =>
              <li className="">
                <input type="text" className="multigridrow Multi_grid_row" defaultValue={data} />
                <span  id={`li_id_${rowCount + 1}_${key}`} onClick={(e)=>{handleRemoveRow(e)}} >
                  <img src={process.env.PUBLIC_URL + "/images/Vector.png"} alt="" />
                </span>
              </li>
            )}
          </ol>
          <div className="add_row_icon" onClick={()=> {handleAddRow()}}>
            <span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 0C6.19891 0 6.38968 0.0790176 6.53033 0.21967C6.67098 0.360322 6.75 0.551088 6.75 0.75L6.75 5.25L11.25 5.25C11.4489 5.25 11.6397 5.32902 11.7803 5.46967C11.921 5.61032 12 5.80109 12 6C12 6.19891 11.921 6.38968 11.7803 6.53033C11.6397 6.67098 11.4489 6.75 11.25 6.75L6.75 6.75L6.75 11.25C6.75 11.4489 6.67098 11.6397 6.53033 11.7803C6.38968 11.921 6.19891 12 6 12C5.80109 12 5.61032 11.921 5.46967 11.7803C5.32902 11.6397 5.25 11.4489 5.25 11.25L5.25 6.75L0.75 6.75C0.551088 6.75 0.360322 6.67098 0.21967 6.53033C0.0790176 6.38968 0 6.19891 0 6C0 5.80109 0.0790176 5.61032 0.21967 5.46967C0.360322 5.32902 0.551088 5.25 0.75 5.25L5.25 5.25L5.25 0.75C5.25 0.551088 5.32902 0.360322 5.46967 0.21967C5.61032 0.0790176 5.80109 0 6 0V0Z"
                  fill="#00A7E7"
                />
              </svg>
            </span>
            <p className="mb-0">Add Row</p>
          </div>
        </div>
      </div>
      <div className="column_div">
        <h3> Columns</h3>
        <div className="add-rows">
          <ul className="mb-0" id="append_div_column">
          {Object.values(props.columns).map((data,key) =>
            <li className="">
              <div className="circle_div">
                <span className="circle_icon">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="7.5" cy="7.5" r="7" stroke="#C4C4C4" />
                  </svg>
                </span>
                <input type="text" className="multigridcolumn Multi_Grid_Column" placeholder="defaultValue" defaultValue={data} />
              </div>
              <span id={`li_id_${columnCount}_${key}_cloumn`} onClick={(e)=>{handleRemoveColumn(e)}} >
                <img src={process.env.PUBLIC_URL + "/images/Vector.png"} alt="" />
              </span>
            </li>
          )}
            {/* <li className="">
              <div className="circle_div">
                <span className="circle_icon">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="7.5" cy="7.5" r="7" stroke="#C4C4C4" />
                  </svg>
                </span>
                <input type="text" className="multigridcolumn" placeholder="defaultValue" />
              </div>
              <span id={`li_id_${columnCount + 1}_cloumn`} onClick={(e)=>{handleRemoveColumn(e)}}>
                <img src={process.env.PUBLIC_URL + "/images/Vector.png"} alt="" />
              </span>
            </li> */}
          </ul>
          <div className="add_row_icon" onClick={()=> {handleAddColumn()}}>
            <span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 0C6.19891 0 6.38968 0.0790176 6.53033 0.21967C6.67098 0.360322 6.75 0.551088 6.75 0.75L6.75 5.25L11.25 5.25C11.4489 5.25 11.6397 5.32902 11.7803 5.46967C11.921 5.61032 12 5.80109 12 6C12 6.19891 11.921 6.38968 11.7803 6.53033C11.6397 6.67098 11.4489 6.75 11.25 6.75L6.75 6.75L6.75 11.25C6.75 11.4489 6.67098 11.6397 6.53033 11.7803C6.38968 11.921 6.19891 12 6 12C5.80109 12 5.61032 11.921 5.46967 11.7803C5.32902 11.6397 5.25 11.4489 5.25 11.25L5.25 6.75L0.75 6.75C0.551088 6.75 0.360322 6.67098 0.21967 6.53033C0.0790176 6.38968 0 6.19891 0 6C0 5.80109 0.0790176 5.61032 0.21967 5.46967C0.360322 5.32902 0.551088 5.25 0.75 5.25L5.25 5.25L5.25 0.75C5.25 0.551088 5.32902 0.360322 5.46967 0.21967C5.61032 0.0790176 5.80109 0 6 0V0Z"
                  fill="#00A7E7"
                />
              </svg>
            </span>
            <p className="mb-0">Add Column</p>
          </div>
        </div>
      </div>
    </div>
          :
          <> 
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
                {Object.values(props.rows).map((rowData) => {
                  return <li>{rowData}</li>;
                })}
              </ol>
            </div>
          </div>
        <div className="col">
          <div className="actions_div">
            <ul className="action_name">
              {Object.values(props.columns).map((columnData) => {
                return (
                  <li>
                    <p class="mb-0">{columnData}</p>
                  </li>
                );
              })}
            </ul>
            <ul>
              {Object.values(props.rows).map((rowData) => {
                return (
                  <li>
                    {Object.values(props.columns).map((columnData) => {
                      return (
                        <div class="li_div">
                          <div class="checbox_div">
                            <div class="form-check">
                              <input
                                aria-label="option 1"
                                name="userData[]"
                                type="checkbox"
                                class="form-check-input position-static"
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
        </>
        }
      </div>
    </div>
  );
};

export default MultiridDetailedPage;
