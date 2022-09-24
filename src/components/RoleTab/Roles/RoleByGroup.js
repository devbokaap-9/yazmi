import React, { useState, useEffect , useContext } from "react";
import DeleteRoleModal from "../../RoleTab/Modals/DeleteRoleModal";
import DeleteRoleTeacherModal from "../Modals/DeleteRoleTeacherModal";
import CreateNewRole from "../Modals/CreateNewRole";
import EditRole from "../Modals/EditRole";
import ViewRole from "../Modals/ViewRole";
import { getRolesData, getSingleRoleData } from "../../../actions/Role";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "@emotion/react";
import { UserContext } from '../../../UserContext';
import ClipLoader from "react-spinners/ClipLoader";
import checkPermission from "../../../utils/CheckPermission"

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;

const RoleByGroup = (props) => {
  const [stateSet, setstate] = useState(true);
  const [role, setRole] = useState(false);
  const [teacherRole, setTeacherRole] = useState(false);
  const [showAddRole, setShowAddRole] = useState(false);
  const [showEditRole, setShowEditRole] = useState(false);
  const [showViewtRole, setShowViewtRole] = useState(false);
  const [sorting, setSorting] = useState(false);
  const [getRoleId, setGetRoleId] = useState();
  const [getEditId, setGetEditId] = useState();
  let [editLoading, setEditLoading] = useState(false);
  let [viewLoading, setViewLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  let [viewId, setViewId] = useState();
  const [toggleLoading,setToggleLoading] = useState(false)
  const [levelLoading,setLevelLoading] = useState(false)

  const userContext = useContext(UserContext);

  const dispatch = useDispatch();
  const rolesData = useSelector((state) => state.rolesData.rolesData);
  var { results } = rolesData;
  
  var resultsort = !sorting ? results && results.sort((a, b) => (a.title.charAt(0).toUpperCase() + a.title.slice(1) > b.title.charAt(0).toUpperCase() + b.title.slice(1)) ? 1: -1) : results && results.sort((a, b) => (a.title.charAt(0).toUpperCase() + a.title.slice(1) > b.title.charAt(0).toUpperCase() + b.title.slice(1)) ? -1: 1);

  let federalCount = resultsort && resultsort.filter((data) => data.level == 1)
  let regionCount = resultsort && resultsort.filter((data) => data.level == 2)
  let woredaCount = resultsort && resultsort.filter((data) => data.level == 3)
  let schoolCount = resultsort && resultsort.filter((data) => data.level == 4)

  useEffect(()=>{
    if(window.location.href.includes('federal') || window.location.href.includes('regional') || window.location.href.includes('woreda') || window.location.href.includes('schools')){
      let element = document.querySelectorAll('.accordion-collapse')
      let element1 = document.querySelectorAll('.accordion-button')
      if(element[0] && element1[0] && !window.location.href.includes('federal')){
        element[0].classList.remove('show')
        element1[0].classList.add('collapsed')
      }
      if(element[1] && element1[1] && !window.location.href.includes('regional')){
        element[1].classList.remove('show')
        element1[1].classList.add('collapsed')
      }
      if(element[2] && element1[2] && !window.location.href.includes('woreda')){
        element[2].classList.remove('show')
        element1[2].classList.add('collapsed')
      }
      if(element[3] && element1[3] && !window.location.href.includes('schools')){
        element[3].classList.remove('show')
        element1[3].classList.add('collapsed')
      }
      if(userContext.rLevel){//level set in RoleTab
        if(stateSet){
          dispatch(getRolesData(true));
          setLevelLoading(true)
        }
        setstate(false)
        userContext.setRLevel(false)
        userContext.setGByToggle(false)
      }
    }
    else{
      if(window.location.href.includes('roles')){
        if(userContext.rLevel && !stateSet){
          setstate(true)
          userContext.setRLevel(false)
          dispatch(getRolesData(false));
          setLevelLoading(true)
          userContext.setGByToggle(true)
        }
      }
    }
  })

  useEffect(()=>{
    if(results){
      if(!viewLoading && !editLoading && toggleLoading){
        setToggleLoading(false)
        setstate(!stateSet)
        userContext.setGByToggle(!stateSet)
      }
      if(levelLoading){
        setLevelLoading(false)
      }
      setShowEditRole(false)
      setShowViewtRole(false)

      let fCount = federalCount && federalCount[0] && federalCount[0].subroles ? federalCount.length +  federalCount[0].subroles.length : federalCount ? federalCount : 0
      let wCount = woredaCount && woredaCount[0] && woredaCount[0].subroles ? woredaCount.length +  woredaCount[0].subroles.length : woredaCount ? woredaCount : 0
      let rCount = regionCount && regionCount[0] && regionCount[0].subroles ? regionCount.length +  regionCount[0].subroles.length : regionCount ? regionCount : 0
      let sCount = schoolCount && schoolCount[0] && schoolCount[0].subroles ? schoolCount.length +  schoolCount[0].subroles.length : schoolCount ? schoolCount : 0

      props.count(rolesData.count)
    }
  },[results])
  
  const singleRoleData = useSelector(
    (state) =>  state.rolesData.singleRoleData
  );

  useEffect(() => {
    if(singleRoleData){
      if(!viewLoading && editLoading && !toggleLoading && !levelLoading){
        setEditLoading(false);
        setShowEditRole(true);
      }
      else if(viewLoading && !editLoading && !toggleLoading && !levelLoading){
        setViewLoading(false);
        setShowViewtRole(true);
      }
    }
  },[singleRoleData])

  useEffect(() => {
    dispatch(getRolesData(!stateSet));
    userContext.setGByToggle(stateSet)
  }, []);

  const ShowDeleteRole = (id) => {
    setRole(true);
    setGetRoleId(id);
  };
  const CloseDeleteRole = () => {
    setRole(false);
  };
  const ShowDeleteRoleTeacher = () => {
    setTeacherRole(true);
  };
  const closeDeleteRoleTeacher = () => {
    setTeacherRole(false);
  };
  const handleShowaddRole = () => {
    setShowAddRole(true);
    setstate(false)
    userContext.setGByToggle(false)
  };
  const handleCloseaddRole = () => {
    setShowAddRole(false);
  };
  const handleShowEditRole = (id) => {
    setEditLoading(true);
    setGetEditId(id);
    dispatch(getSingleRoleData(id));
  };
  const handleCloseEditRole = () => {
    setShowEditRole(false);
  };
  const handleViewShow = (id) => {
    setViewId(id);
    setViewLoading(true);
    dispatch(getSingleRoleData(id));
  };
  const handleViewclose = () => {
    setShowViewtRole(false);
  };


  const handleSorting = () => {
    if (!sorting) {
      // resultsort && resultsort.sort((a, b) => (a.title > b.title) ? 1: -1);
      setSorting(true);
    } else {
      // resultsort && resultsort.sort((a, b) => (a.title > b.title) ? -1: 1);
      setSorting(false);
    }
  };

  
  return (
    <>
      <div className="role_by_group">
        <div className="card_div">
          <div className="card_header">
            <div
              className={stateSet === false ? "role_name_without_cursor d-flex align-items-center" : "role_name d-flex align-items-center"}
              onClick={handleSorting}
            >
              <p className="mb-0">Role Name</p>
              {stateSet ? 
                <span>
                  <svg
                    width="8"
                    height="15"
                    viewBox="0 0 8 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 9L3.97 15L0 9H8Z" fill="white" />
                    <path d="M8 6L3.97 0L0 6H8Z" fill="white" />
                  </svg>
                </span>
                : 
                <></>
              }
            </div>
            <div className="check_box d-flex align-items-center">
              <p className="mb-0">Group By Level</p>
              <label className="switch" htmlFor="checkbox">
                <input
                  type="checkbox"
                  id="checkbox"
                  onChange={() => {setToggleLoading(true);dispatch(getRolesData(stateSet));}}
                  checked={!stateSet}
                />
                <div className="slider round"></div>
              </label>
            </div>
          </div>
          <div className="card_body">
            {stateSet === false ? (
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="federal">
                    <button
                      className={"accordion-button " +(window.location.href.includes('federal') ? "" : "collapsed")}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#federalOne"
                      aria-expanded="true"
                      aria-controls="federalOne"
                    >
                      Federal
                      <span>({federalCount && federalCount[0] && federalCount[0].subroles ? federalCount.length +  federalCount[0].subroles.length : federalCount ? federalCount : 0} roles)</span>
                      {window.location.href.includes('roles') && ((checkPermission('custom_role_data_created')) || (checkPermission('custom_role_data_all')))
                      ?
                        <p
                          className="mb-0 add_role"
                          onClick={() => {
                            handleShowaddRole();
                          }}
                        >
                          {" "}
                          + Add Role
                        </p>
                      :
                        <></>
                      }
                    </button>
                  </h2>
                  <div
                    id="federalOne"
                    className={"accordion-collapse collapse "+(window.location.href.includes('federal') ? "show" : "")}
                    aria-labelledby="federal"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <ul className="mb-0 pl-0">
                        {resultsort &&
                        resultsort.map((data) => {
                          return(
                            (data.level === 1)
                            ?
                              <>
                                <li>
                                  <div className="head_div" onClick={() => {handleViewShow(data.id);}}>
                                    <h3 className="mb-0">
                                      {data.title}
                                    </h3>
                                    <span>
                                      Created on {((new Date(data.created.replace('IST', '')).getHours() % 12 ? (new Date(data.created.replace('IST', '')).getHours() % 12).toString().padStart(2, '0') : 12) + ':' + (new Date(data.created.replace('IST', '')).getMinutes().toString().padStart(2, '0')) + ' ' + (new Date(data.created.replace('IST', '')).getHours() >= 12 ? 'pm' : 'am'))} EAT by {data.created_by}
                                    </span>
                                  </div>
                                  <div className="action_icon">
                                    
                                    {(checkPermission('custom_role_data_edit')) || (checkPermission('custom_role_data_all'))
                                    ?
                                      <span
                                        className="d-flex edit_icon"
                                        onClick={() => {
                                          handleShowEditRole(data.id);
                                        }}
                                      >
                                        <svg
                                          width="16"
                                          height="16"
                                          viewBox="0 0 16 16"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M14.0488 1.95073C12.8952 0.796334 12.0288 0.969134 12.0288 0.969134L7.18716 5.81073L1.76796 11.2291L0.959961 15.0387L4.77036 14.2307L10.1896 8.81393L15.0312 3.97233C15.0304 3.97233 15.204 3.10593 14.0488 1.95073ZM4.54396 13.7731L3.24476 14.0531C3.10098 13.7772 2.91471 13.5256 2.69276 13.3075C2.47448 13.0856 2.22292 12.8991 1.94716 12.7547L2.22716 11.4563L2.60316 11.0811C2.60316 11.0811 3.30956 11.0955 4.10796 11.8939C4.90556 12.6907 4.92076 13.3987 4.92076 13.3987L4.54396 13.7731Z"
                                            fill="#7CD21F"
                                          />
                                        </svg>
                                      </span>
                                    :
                                      <></>
                                    }
                                  </div>
                                </li>
                                {data.subroles &&
                                  data.subroles.map((subdata) => {
                                    return(
                                      <li>
                                        <div className="head_div" onClick={() => {handleViewShow(subdata.id);}}>
                                          <h3 className="mb-0">
                                            {subdata.title}
                                          </h3>
                                          <span>
                                            Created on {((new Date(data.created.replace('IST', '')).getHours() % 12 ? (new Date(data.created.replace('IST', '')).getHours() % 12).toString().padStart(2, '0') : 12) + ':' + (new Date(data.created.replace('IST', '')).getMinutes().toString().padStart(2, '0')) + ' ' + (new Date(data.created.replace('IST', '')).getHours() >= 12 ? 'pm' : 'am'))} EAT by {data.created_by}
                                          </span>
                                        </div>
                                        <div className="action_icon">
                                        {/* {(checkPermission('custom_role_data_delete')) || (checkPermission('custom_role_data_all'))
                                        ?
                                          <span
                                            className="d-flex delete_icon"
                                            onClick={() => {
                                              ShowDeleteRole(subdata.id);
                                            }}
                                          >
                                            <svg
                                              width="11"
                                              height="14"
                                              viewBox="0 0 11 14"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M11 0.777778L8.25 0.777778L7.46429 0L3.53571 0L2.75 0.777778L0 0.777778L0 2.33333L11 2.33333V0.777778ZM0.785714 12.4444C0.785714 12.857 0.951275 13.2527 1.24597 13.5444C1.54067 13.8361 1.94037 14 2.35714 14L8.64286 14C9.05963 14 9.45932 13.8361 9.75402 13.5444C10.0487 13.2527 10.2143 12.857 10.2143 12.4444L10.2143 3.11111L0.785714 3.11111L0.785714 12.4444Z"
                                                fill="#FD4F48"
                                              />
                                            </svg>
                                          </span>
                                        :
                                          <></>
                                        } */}
                                        {(checkPermission('custom_role_data_edit')) || (checkPermission('custom_role_data_all'))
                                        ?
                                          <span
                                            className="d-flex edit_icon"
                                            onClick={() => {
                                              handleShowEditRole(subdata.id);
                                            }}
                                          >
                                            <svg
                                              width="16"
                                              height="16"
                                              viewBox="0 0 16 16"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M14.0488 1.95073C12.8952 0.796334 12.0288 0.969134 12.0288 0.969134L7.18716 5.81073L1.76796 11.2291L0.959961 15.0387L4.77036 14.2307L10.1896 8.81393L15.0312 3.97233C15.0304 3.97233 15.204 3.10593 14.0488 1.95073ZM4.54396 13.7731L3.24476 14.0531C3.10098 13.7772 2.91471 13.5256 2.69276 13.3075C2.47448 13.0856 2.22292 12.8991 1.94716 12.7547L2.22716 11.4563L2.60316 11.0811C2.60316 11.0811 3.30956 11.0955 4.10796 11.8939C4.90556 12.6907 4.92076 13.3987 4.92076 13.3987L4.54396 13.7731Z"
                                                fill="#7CD21F"
                                              />
                                            </svg>
                                          </span>
                                        :
                                          <></>
                                        }
                                        </div>
                                      </li>
                                    )
                                })}
                              </>
                            :
                              <></>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="region">
                    <button
                      className={"accordion-button " +(window.location.href.includes('regional') ? "" : "collapsed")}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#regionOne"
                      aria-expanded="true"
                      aria-controls="regionOne"
                    >
                      Region
                      <span>({regionCount && regionCount[0] && regionCount[0].subroles ? regionCount.length +  regionCount[0].subroles.length : regionCount ? regionCount : 0} roles)</span>
                      {window.location.href.includes('roles') && ((checkPermission('custom_role_data_created')) || (checkPermission('custom_role_data_all')))
                      ?
                        <p
                          className="mb-0 add_role"
                          onClick={() => {
                            handleShowaddRole();
                          }}
                        >
                          {" "}
                          + Add Role
                        </p>
                      :
                        <></>
                      }
                    </button>
                  </h2>
                  <div
                    id="regionOne"
                    className={"accordion-collapse collapse "+(window.location.href.includes('regional') ? "show" : "")}
                    aria-labelledby="region"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <ul className="mb-0 pl-0">
                        {resultsort &&
                        resultsort.map((data) => {
                          return(
                            (data.level === 2)
                            ?
                              <>
                                <li>
                                  <div className="head_div" onClick={() => {handleViewShow(data.id);}}>
                                    <h3 className="mb-0">
                                      {data.title}
                                    </h3>
                                    <span>
                                      Created on {((new Date(data.created.replace('IST', '')).getHours() % 12 ? (new Date(data.created.replace('IST', '')).getHours() % 12).toString().padStart(2, '0') : 12) + ':' + (new Date(data.created.replace('IST', '')).getMinutes().toString().padStart(2, '0')) + ' ' + (new Date(data.created.replace('IST', '')).getHours() >= 12 ? 'pm' : 'am'))} EAT by {data.created_by}
                                    </span>
                                  </div>
                                  <div className="action_icon">
                                  {/* {(checkPermission('custom_role_data_delete')) || (checkPermission('custom_role_data_all'))
                                  ?
                                    <span
                                      className="d-flex delete_icon"
                                      onClick={() => {
                                        ShowDeleteRole(data.id);
                                      }}
                                    >
                                      <svg
                                        width="11"
                                        height="14"
                                        viewBox="0 0 11 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M11 0.777778L8.25 0.777778L7.46429 0L3.53571 0L2.75 0.777778L0 0.777778L0 2.33333L11 2.33333V0.777778ZM0.785714 12.4444C0.785714 12.857 0.951275 13.2527 1.24597 13.5444C1.54067 13.8361 1.94037 14 2.35714 14L8.64286 14C9.05963 14 9.45932 13.8361 9.75402 13.5444C10.0487 13.2527 10.2143 12.857 10.2143 12.4444L10.2143 3.11111L0.785714 3.11111L0.785714 12.4444Z"
                                          fill="#FD4F48"
                                        />
                                      </svg>
                                    </span>
                                  :
                                    <></>
                                  } */}
                                  {(checkPermission('custom_role_data_edit')) || (checkPermission('custom_role_data_all'))
                                  ?
                                    <span
                                      className="d-flex edit_icon"
                                      onClick={() => {
                                        handleShowEditRole(data.id);
                                      }}
                                    >
                                      <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M14.0488 1.95073C12.8952 0.796334 12.0288 0.969134 12.0288 0.969134L7.18716 5.81073L1.76796 11.2291L0.959961 15.0387L4.77036 14.2307L10.1896 8.81393L15.0312 3.97233C15.0304 3.97233 15.204 3.10593 14.0488 1.95073ZM4.54396 13.7731L3.24476 14.0531C3.10098 13.7772 2.91471 13.5256 2.69276 13.3075C2.47448 13.0856 2.22292 12.8991 1.94716 12.7547L2.22716 11.4563L2.60316 11.0811C2.60316 11.0811 3.30956 11.0955 4.10796 11.8939C4.90556 12.6907 4.92076 13.3987 4.92076 13.3987L4.54396 13.7731Z"
                                          fill="#7CD21F"
                                        />
                                      </svg>
                                    </span>
                                  :
                                    <></>
                                  }
                                  </div>
                                </li>
                                {data.subroles &&
                                  data.subroles.map((subdata) => {
                                    return(
                                      <li>
                                        <div className="head_div" onClick={() => {handleViewShow(subdata.id);}}>
                                          <h3 className="mb-0">
                                            {subdata.title}
                                          </h3>
                                          <span>
                                            Created on {((new Date(data.created.replace('IST', '')).getHours() % 12 ? (new Date(data.created.replace('IST', '')).getHours() % 12).toString().padStart(2, '0') : 12) + ':' + (new Date(data.created.replace('IST', '')).getMinutes().toString().padStart(2, '0')) + ' ' + (new Date(data.created.replace('IST', '')).getHours() >= 12 ? 'pm' : 'am'))} EAT by {data.created_by}
                                          </span>
                                        </div>
                                        <div className="action_icon">
                                        {/* {(checkPermission('custom_role_data_delete')) || (checkPermission('custom_role_data_all'))
                                        ?
                                          <span
                                            className="d-flex delete_icon"
                                            onClick={() => {
                                              ShowDeleteRole(subdata.id);
                                            }}
                                          >
                                            <svg
                                              width="11"
                                              height="14"
                                              viewBox="0 0 11 14"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M11 0.777778L8.25 0.777778L7.46429 0L3.53571 0L2.75 0.777778L0 0.777778L0 2.33333L11 2.33333V0.777778ZM0.785714 12.4444C0.785714 12.857 0.951275 13.2527 1.24597 13.5444C1.54067 13.8361 1.94037 14 2.35714 14L8.64286 14C9.05963 14 9.45932 13.8361 9.75402 13.5444C10.0487 13.2527 10.2143 12.857 10.2143 12.4444L10.2143 3.11111L0.785714 3.11111L0.785714 12.4444Z"
                                                fill="#FD4F48"
                                              />
                                            </svg>
                                          </span>
                                        :
                                          <></>
                                        } */}
                                        {(checkPermission('custom_role_data_edit')) || (checkPermission('custom_role_data_all'))
                                        ?
                                          <span
                                            className="d-flex edit_icon"
                                            onClick={() => {
                                              handleShowEditRole(subdata.id);
                                            }}
                                          >
                                            <svg
                                              width="16"
                                              height="16"
                                              viewBox="0 0 16 16"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M14.0488 1.95073C12.8952 0.796334 12.0288 0.969134 12.0288 0.969134L7.18716 5.81073L1.76796 11.2291L0.959961 15.0387L4.77036 14.2307L10.1896 8.81393L15.0312 3.97233C15.0304 3.97233 15.204 3.10593 14.0488 1.95073ZM4.54396 13.7731L3.24476 14.0531C3.10098 13.7772 2.91471 13.5256 2.69276 13.3075C2.47448 13.0856 2.22292 12.8991 1.94716 12.7547L2.22716 11.4563L2.60316 11.0811C2.60316 11.0811 3.30956 11.0955 4.10796 11.8939C4.90556 12.6907 4.92076 13.3987 4.92076 13.3987L4.54396 13.7731Z"
                                                fill="#7CD21F"
                                              />
                                            </svg>
                                          </span>
                                        :
                                          <></>
                                        }
                                        </div>
                                      </li>
                                    )
                                })}
                              </>
                            :
                              <></>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="woreda">
                    <button
                      className={"accordion-button " +(window.location.href.includes('woreda') ? "" : "collapsed")}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#woredaOne"
                      aria-expanded="true"
                      aria-controls="woredaOne"
                    >
                      Woreda
                      <span>({woredaCount && woredaCount[0] && woredaCount[0].subroles ? woredaCount.length +  woredaCount[0].subroles.length : woredaCount ? woredaCount : 0} roles)</span>
                      {window.location.href.includes('roles') && ((checkPermission('custom_role_data_created')) || (checkPermission('custom_role_data_all')))
                      ?
                        <p
                          className="mb-0 add_role"
                          onClick={() => {
                            handleShowaddRole();
                          }}
                        >
                          {" "}
                          + Add Role
                        </p>
                      :
                        <></>
                      }
                    </button>
                  </h2>
                  <div
                    id="woredaOne"
                    className={"accordion-collapse collapse "+(window.location.href.includes('woreda') ? "show" : "")}
                    aria-labelledby="woreda"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <ul className="mb-0 pl-0">
                        {resultsort &&
                        resultsort.map((data) => {
                          return(
                            (data.level === 3)
                            ?
                              <>
                                <li>
                                  <div className="head_div" onClick={() => {handleViewShow(data.id);}}>
                                    <h3 className="mb-0">
                                      {data.title}
                                    </h3>
                                    <span>
                                      Created on {((new Date(data.created.replace('IST', '')).getHours() % 12 ? (new Date(data.created.replace('IST', '')).getHours() % 12).toString().padStart(2, '0') : 12) + ':' + (new Date(data.created.replace('IST', '')).getMinutes().toString().padStart(2, '0')) + ' ' + (new Date(data.created.replace('IST', '')).getHours() >= 12 ? 'pm' : 'am'))} EAT by {data.created_by}
                                    </span>
                                  </div>
                                  <div className="action_icon">
                                    {/* {(checkPermission('custom_role_data_delete')) || (checkPermission('custom_role_data_all'))
                                    ?
                                      <span
                                        className="d-flex delete_icon"
                                        onClick={() => {
                                          ShowDeleteRole(data.id);
                                        }}
                                      >
                                        <svg
                                          width="11"
                                          height="14"
                                          viewBox="0 0 11 14"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M11 0.777778L8.25 0.777778L7.46429 0L3.53571 0L2.75 0.777778L0 0.777778L0 2.33333L11 2.33333V0.777778ZM0.785714 12.4444C0.785714 12.857 0.951275 13.2527 1.24597 13.5444C1.54067 13.8361 1.94037 14 2.35714 14L8.64286 14C9.05963 14 9.45932 13.8361 9.75402 13.5444C10.0487 13.2527 10.2143 12.857 10.2143 12.4444L10.2143 3.11111L0.785714 3.11111L0.785714 12.4444Z"
                                            fill="#FD4F48"
                                          />
                                        </svg>
                                      </span>
                                    :
                                      <></>
                                    } */}
                                    {(checkPermission('custom_role_data_edit')) || (checkPermission('custom_role_data_all'))
                                    ?
                                      <span
                                        className="d-flex edit_icon"
                                        onClick={() => {
                                          handleShowEditRole(data.id);
                                        }}
                                      >
                                        <svg
                                          width="16"
                                          height="16"
                                          viewBox="0 0 16 16"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M14.0488 1.95073C12.8952 0.796334 12.0288 0.969134 12.0288 0.969134L7.18716 5.81073L1.76796 11.2291L0.959961 15.0387L4.77036 14.2307L10.1896 8.81393L15.0312 3.97233C15.0304 3.97233 15.204 3.10593 14.0488 1.95073ZM4.54396 13.7731L3.24476 14.0531C3.10098 13.7772 2.91471 13.5256 2.69276 13.3075C2.47448 13.0856 2.22292 12.8991 1.94716 12.7547L2.22716 11.4563L2.60316 11.0811C2.60316 11.0811 3.30956 11.0955 4.10796 11.8939C4.90556 12.6907 4.92076 13.3987 4.92076 13.3987L4.54396 13.7731Z"
                                            fill="#7CD21F"
                                          />
                                        </svg>
                                      </span>
                                    :
                                      <></>
                                    }
                                  </div>
                                </li>
                                {data.subroles &&
                                  data.subroles.map((subdata) => {
                                    return(
                                      <li>
                                        <div className="head_div" onClick={() => {handleViewShow(subdata.id);}}>
                                          <h3 className="mb-0">
                                            {subdata.title}
                                          </h3>
                                          <span>
                                            Created on {((new Date(data.created.replace('IST', '')).getHours() % 12 ? (new Date(data.created.replace('IST', '')).getHours() % 12).toString().padStart(2, '0') : 12) + ':' + (new Date(data.created.replace('IST', '')).getMinutes().toString().padStart(2, '0')) + ' ' + (new Date(data.created.replace('IST', '')).getHours() >= 12 ? 'pm' : 'am'))} EAT by {data.created_by}
                                          </span>
                                        </div>
                                        <div className="action_icon">
                                          {/* {(checkPermission('custom_role_data_delete')) || (checkPermission('custom_role_data_all'))
                                          ?
                                            <span
                                              className="d-flex delete_icon"
                                              onClick={() => {
                                                ShowDeleteRole(subdata.id);
                                              }}
                                            >
                                              <svg
                                                width="11"
                                                height="14"
                                                viewBox="0 0 11 14"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M11 0.777778L8.25 0.777778L7.46429 0L3.53571 0L2.75 0.777778L0 0.777778L0 2.33333L11 2.33333V0.777778ZM0.785714 12.4444C0.785714 12.857 0.951275 13.2527 1.24597 13.5444C1.54067 13.8361 1.94037 14 2.35714 14L8.64286 14C9.05963 14 9.45932 13.8361 9.75402 13.5444C10.0487 13.2527 10.2143 12.857 10.2143 12.4444L10.2143 3.11111L0.785714 3.11111L0.785714 12.4444Z"
                                                  fill="#FD4F48"
                                                />
                                              </svg>
                                            </span>
                                          :
                                            <></>
                                          } */}
                                          {(checkPermission('custom_role_data_edit')) || (checkPermission('custom_role_data_all'))
                                          ?
                                            <span
                                              className="d-flex edit_icon"
                                              onClick={() => {
                                                handleShowEditRole(subdata.id);
                                              }}
                                            >
                                              <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M14.0488 1.95073C12.8952 0.796334 12.0288 0.969134 12.0288 0.969134L7.18716 5.81073L1.76796 11.2291L0.959961 15.0387L4.77036 14.2307L10.1896 8.81393L15.0312 3.97233C15.0304 3.97233 15.204 3.10593 14.0488 1.95073ZM4.54396 13.7731L3.24476 14.0531C3.10098 13.7772 2.91471 13.5256 2.69276 13.3075C2.47448 13.0856 2.22292 12.8991 1.94716 12.7547L2.22716 11.4563L2.60316 11.0811C2.60316 11.0811 3.30956 11.0955 4.10796 11.8939C4.90556 12.6907 4.92076 13.3987 4.92076 13.3987L4.54396 13.7731Z"
                                                  fill="#7CD21F"
                                                />
                                              </svg>
                                            </span>
                                          :
                                            <></>
                                          }
                                        </div>
                                      </li>
                                    )
                                })}
                              </>
                            :
                              <></>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="school">
                    <button
                      className={"accordion-button " +(window.location.href.includes('schools') ? "" : "collapsed")}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#schoolOne"
                      aria-expanded="true"
                      aria-controls="schoolOne"
                    >
                      School
                      <span>({schoolCount && schoolCount[0] && schoolCount[0].subroles ? schoolCount.length +  schoolCount[0].subroles.length : schoolCount ? schoolCount : 0} roles)</span>
                      {window.location.href.includes('roles') && ((checkPermission('custom_role_data_created')) || (checkPermission('custom_role_data_all')))
                      ?
                        <p
                          className="mb-0 add_role"
                          onClick={() => {
                            handleShowaddRole();
                          }}
                        >
                          {" "}
                          + Add Role
                        </p>
                      :
                        <></>
                      }
                    </button>
                  </h2>
                  <div
                    id="schoolOne"
                    className={"accordion-collapse collapse "+(window.location.href.includes('schools') ? "show" : "")}
                    aria-labelledby="school"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <ul className="mb-0 pl-0">
                        {resultsort &&
                        resultsort.map((data) => {
                          return(
                            (data.level === 4)
                            ?
                              <>
                                <li>
                                  <div className="head_div" onClick={() => {handleViewShow(data.id);}}>
                                    <h3 className="mb-0">
                                      {data.title}
                                    </h3>
                                    <span>
                                      Created on {((new Date(data.created.replace('IST', '')).getHours() % 12 ? (new Date(data.created.replace('IST', '')).getHours() % 12).toString().padStart(2, '0') : 12) + ':' + (new Date(data.created.replace('IST', '')).getMinutes().toString().padStart(2, '0')) + ' ' + (new Date(data.created.replace('IST', '')).getHours() >= 12 ? 'pm' : 'am'))} EAT by {data.created_by}
                                    </span>
                                  </div>
                                  <div className="action_icon">
                                    {/* {(checkPermission('custom_role_data_delete')) || (checkPermission('custom_role_data_all'))
                                    ?
                                      <span
                                        className="d-flex delete_icon"
                                        onClick={() => {
                                          ShowDeleteRole(data.id);
                                        }}
                                      >
                                        <svg
                                          width="11"
                                          height="14"
                                          viewBox="0 0 11 14"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M11 0.777778L8.25 0.777778L7.46429 0L3.53571 0L2.75 0.777778L0 0.777778L0 2.33333L11 2.33333V0.777778ZM0.785714 12.4444C0.785714 12.857 0.951275 13.2527 1.24597 13.5444C1.54067 13.8361 1.94037 14 2.35714 14L8.64286 14C9.05963 14 9.45932 13.8361 9.75402 13.5444C10.0487 13.2527 10.2143 12.857 10.2143 12.4444L10.2143 3.11111L0.785714 3.11111L0.785714 12.4444Z"
                                            fill="#FD4F48"
                                          />
                                        </svg>
                                      </span>
                                    :
                                      <></>
                                    } */}
                                    {(checkPermission('custom_role_data_edit')) || (checkPermission('custom_role_data_all'))
                                    ?
                                      <span
                                        className="d-flex edit_icon"
                                        onClick={() => {
                                          handleShowEditRole(data.id);
                                        }}
                                      >
                                        <svg
                                          width="16"
                                          height="16"
                                          viewBox="0 0 16 16"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M14.0488 1.95073C12.8952 0.796334 12.0288 0.969134 12.0288 0.969134L7.18716 5.81073L1.76796 11.2291L0.959961 15.0387L4.77036 14.2307L10.1896 8.81393L15.0312 3.97233C15.0304 3.97233 15.204 3.10593 14.0488 1.95073ZM4.54396 13.7731L3.24476 14.0531C3.10098 13.7772 2.91471 13.5256 2.69276 13.3075C2.47448 13.0856 2.22292 12.8991 1.94716 12.7547L2.22716 11.4563L2.60316 11.0811C2.60316 11.0811 3.30956 11.0955 4.10796 11.8939C4.90556 12.6907 4.92076 13.3987 4.92076 13.3987L4.54396 13.7731Z"
                                            fill="#7CD21F"
                                          />
                                        </svg>
                                      </span>
                                    :
                                      <></>
                                    }
                                  </div>
                                </li>
                                {data.subroles &&
                                  data.subroles.map((subdata) => {
                                    return(
                                      <li>
                                        <div className="head_div" onClick={() => {handleViewShow(subdata.id);}}>
                                          <h3 className="mb-0">
                                            {subdata.title}
                                          </h3>
                                          <span>
                                            Created on {((new Date(data.created.replace('IST', '')).getHours() % 12 ? (new Date(data.created.replace('IST', '')).getHours() % 12).toString().padStart(2, '0') : 12) + ':' + (new Date(data.created.replace('IST', '')).getMinutes().toString().padStart(2, '0')) + ' ' + (new Date(data.created.replace('IST', '')).getHours() >= 12 ? 'pm' : 'am'))} EAT by {data.created_by}
                                          </span>
                                        </div>
                                        <div className="action_icon">
                                          {/* {(checkPermission('custom_role_data_delete')) || (checkPermission('custom_role_data_all'))
                                          ?
                                            <span
                                              className="d-flex delete_icon"
                                              onClick={() => {
                                                ShowDeleteRole(subdata.id);
                                              }}
                                            >
                                              <svg
                                                width="11"
                                                height="14"
                                                viewBox="0 0 11 14"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M11 0.777778L8.25 0.777778L7.46429 0L3.53571 0L2.75 0.777778L0 0.777778L0 2.33333L11 2.33333V0.777778ZM0.785714 12.4444C0.785714 12.857 0.951275 13.2527 1.24597 13.5444C1.54067 13.8361 1.94037 14 2.35714 14L8.64286 14C9.05963 14 9.45932 13.8361 9.75402 13.5444C10.0487 13.2527 10.2143 12.857 10.2143 12.4444L10.2143 3.11111L0.785714 3.11111L0.785714 12.4444Z"
                                                  fill="#FD4F48"
                                                />
                                              </svg>
                                            </span>
                                          :
                                            <></>
                                          } */}
                                          {(checkPermission('custom_role_data_edit')) || (checkPermission('custom_role_data_all'))
                                          ?
                                            <span
                                              className="d-flex edit_icon"
                                              onClick={() => {
                                                handleShowEditRole(subdata.id);
                                              }}
                                            >
                                              <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M14.0488 1.95073C12.8952 0.796334 12.0288 0.969134 12.0288 0.969134L7.18716 5.81073L1.76796 11.2291L0.959961 15.0387L4.77036 14.2307L10.1896 8.81393L15.0312 3.97233C15.0304 3.97233 15.204 3.10593 14.0488 1.95073ZM4.54396 13.7731L3.24476 14.0531C3.10098 13.7772 2.91471 13.5256 2.69276 13.3075C2.47448 13.0856 2.22292 12.8991 1.94716 12.7547L2.22716 11.4563L2.60316 11.0811C2.60316 11.0811 3.30956 11.0955 4.10796 11.8939C4.90556 12.6907 4.92076 13.3987 4.92076 13.3987L4.54396 13.7731Z"
                                                  fill="#7CD21F"
                                                />
                                              </svg>
                                            </span>
                                          :
                                            <></>
                                          }
                                        </div>
                                      </li>
                                    )
                                })}
                              </>
                            :
                              <></>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="accordion" id="accordionxample">
                <div className="accordion-body">
                  <ul className="mb-0 pl-0">
                    {resultsort &&
                      resultsort.map((data) => (
                        <li>
                          <div className="head_div"
                              onClick={() => {
                                handleViewShow(data.id);
                              }}>
                            <h3
                              className="mb-0"
                            >
                              {data.title}
                            </h3>
                            <span>
                              Created on {((new Date(data.created.replace('IST', '')).getHours() % 12 ? (new Date(data.created.replace('IST', '')).getHours() % 12).toString().padStart(2, '0') : 12) + ':' + (new Date(data.created.replace('IST', '')).getMinutes().toString().padStart(2, '0')) + ' ' + (new Date(data.created.replace('IST', '')).getHours() >= 12 ? 'pm' : 'am'))} EAT by {data.created_by}
                            </span>
                          </div>
                          <div className="action_icon">
                            {/* {(checkPermission('custom_role_data_delete')) || (checkPermission('custom_role_data_all'))
                            ?
                              <span
                                className="d-flex delete_icon"
                                onClick={() => {
                                  ShowDeleteRole(data.id);
                                }}
                              >
                                <svg
                                  width="11"
                                  height="14"
                                  viewBox="0 0 11 14"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M11 0.777778L8.25 0.777778L7.46429 0L3.53571 0L2.75 0.777778L0 0.777778L0 2.33333L11 2.33333V0.777778ZM0.785714 12.4444C0.785714 12.857 0.951275 13.2527 1.24597 13.5444C1.54067 13.8361 1.94037 14 2.35714 14L8.64286 14C9.05963 14 9.45932 13.8361 9.75402 13.5444C10.0487 13.2527 10.2143 12.857 10.2143 12.4444L10.2143 3.11111L0.785714 3.11111L0.785714 12.4444Z"
                                    fill="#FD4F48"
                                  />
                                </svg>
                              </span>
                            :
                              <></>
                            } */}
                            {(checkPermission('custom_role_data_edit')) || (checkPermission('custom_role_data_all'))
                            ?
                              <span
                                className="d-flex edit_icon"
                                onClick={() => {
                                  handleShowEditRole(data.id);
                                }}
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M14.0488 1.95073C12.8952 0.796334 12.0288 0.969134 12.0288 0.969134L7.18716 5.81073L1.76796 11.2291L0.959961 15.0387L4.77036 14.2307L10.1896 8.81393L15.0312 3.97233C15.0304 3.97233 15.204 3.10593 14.0488 1.95073ZM4.54396 13.7731L3.24476 14.0531C3.10098 13.7772 2.91471 13.5256 2.69276 13.3075C2.47448 13.0856 2.22292 12.8991 1.94716 12.7547L2.22716 11.4563L2.60316 11.0811C2.60316 11.0811 3.30956 11.0955 4.10796 11.8939C4.90556 12.6907 4.92076 13.3987 4.92076 13.3987L4.54396 13.7731Z"
                                    fill="#7CD21F"
                                  />
                                </svg>
                              </span>
                            :
                              <></>
                            }
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <DeleteRoleModal show={teacherRole} close={closeDeleteRoleTeacher} />
      <DeleteRoleTeacherModal
        id={getRoleId}
        show={role}
        close={CloseDeleteRole}
        groupByLevel={stateSet}
        name="deleteRole"
      />
      <CreateNewRole show={showAddRole} closeModal={handleCloseaddRole} groupByLevel={stateSet} />
      <EditRole
        id={getEditId}
        show={showEditRole}
        // loading={setEditLoading}
        closeModal={handleCloseEditRole}
        groupByLevel={stateSet}
      />
      <ViewRole
        id={viewId}
        show={showViewtRole}
        loading={setViewLoading}
        closeModal={handleViewclose}
      />
      <div className={editLoading || viewLoading || toggleLoading || levelLoading ? "loader_div" : ""}>
        <ClipLoader
          color={color}
          className="loader"
          loading={editLoading || viewLoading || toggleLoading || levelLoading}
          css={override}
          size={50}
        />
      </div>
      {(window.location.href.includes('roles'))?
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />:null}
    </>
  );
};

export default RoleByGroup;
