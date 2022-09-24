import React, {useEffect, useState, useContext} from "react";
import { useLocation, useHistory, NavLink, Link } from "react-router-dom";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {getOwnedForms, singleFormData, removeSingleFormData, getAssignedForms, addFormTitle, sendNotifyToOne, getFormResponse} from "../../actions/Form";
import {removeErrorData} from "../../actions/RemoveError";
import { UserContext } from '../../UserContext';
import checkPermission from "../../utils/CheckPermission";

const AllFormSidebar = (props) => {
  const dispatch = useDispatch();
  const [formCount,setFormCount] = useState(0);
  const [FormID,setFormID] = useState([]);

  const userContext = useContext(UserContext);

  const removeSideBar = () => {
    props.classRemove();
  };
  let getlogindata = JSON.parse(decodeURIComponent(localStorage.getItem('user_data')));
  const shareform = useSelector((state) => state.formsData.getResponsData );
  const singledataforform = useSelector((state) => state.formsData.singleFormData );
  
  const getsharedata = shareform && shareform.results && shareform.results.filter((data) => data.form.id === singledataforform.id && data.shared_with.id === getlogindata.profile_id )
 
  useEffect(() => {
    if(shareform && singledataforform){
      console.log(getsharedata,'getsharedata')
      setFormID(getsharedata)
      let data = {
        notify: false
      }
      if(getsharedata.length !== 0 && window.location.href.includes("notownform") && getsharedata[0].notify){
        dispatch(sendNotifyToOne(singledataforform.id,getsharedata[0].id,data))
      }
    }
  }, [singledataforform,shareform])


  const getFormData = (formId) => {
    dispatch(getFormResponse(formId))
    userContext.setFrmLdng(true)
    userContext.setNotOnwId(formId)
    userContext.setFrmUpdating(false)
    dispatch(singleFormData(formId))
  }

  let location = useLocation();
  let history = useHistory();

  var segmentCount = (location.pathname.split('/').length - 1) - (location.pathname[location.pathname.length - 1] == '/' ? 1 : 0);

  useEffect(()=>{
    let loginData = JSON.parse(decodeURIComponent(localStorage.getItem('user_data')));
    let profile_id = ""
    if(loginData){
      profile_id = loginData.profile_id
    }
    if(window.location.href.includes('form')){
      dispatch(getOwnedForms(profile_id))
      dispatch(getAssignedForms(profile_id))
    }

    if(window.location.href.includes('form') && segmentCount === 2){
      userContext.setCrtFormBtn(true)
      history.push('/form')
    }

  },[]);

  

  const createForm = () => {
    userContext.setCrtFormBtn(false)
    dispatch(removeErrorData())
    dispatch(removeSingleFormData())
    if(ownedFormsData){
      setFormCount(ownedFormsData.length + 1);
      let formNameData = {
        "title" : "FormName"+(ownedFormsData.length + 1)
      }
      let loginData = JSON.parse(decodeURIComponent(localStorage.getItem('user_data')));
      formNameData.creator = loginData.profile_id
      dispatch(addFormTitle(formNameData))
      history.push('/form/FormName'+(ownedFormsData.length + 1))
      ownedFormsData.push({...formNameData})
    }
  }

  const { error } = useSelector((state) => state);


  // useEffect( () => {
  //   if(error && error.errorsData && btnClickFlag){
  //     if(error.errorsData.title){
  //       toast
  //     }
  //   }
  // },[error])

  //get owned forms data
  const ownedFormsData = useSelector((state) => state.formsData.ownedFormsData && state.formsData.ownedFormsData.results);

  //get assigned forms data
  const assignedFormsData = useSelector((state) => state.formsData.assignedFormsData && state.formsData.assignedFormsData.results);

  return (
    <>
    <div className="UserSidebar form_sidebar">
      <ul className="list-unstyled mb-0 h-100 d-flex flex-column">
      {(checkPermission('custom_form_data_get'))
        ?
          <>
          <li>
            <Link
              to="/form"
              className={
                "Link_text" +
                (location.pathname === "/form" ? " users_box_active" : "")
              }
              onClick={removeSideBar}
            >
              <div className="users_box d-flex align-items-center justify-content-between">
                <p className="mb-0 ml-2">All Forms</p>
              </div>
            </Link>
          </li>
          <li>
            <NavLink to="#"
              className={
                "Link_text " +
                (location.pathname === "/ownedbyme" ? " users_box_active" : "")
              }
              // onClick={props.classRemove}
            >
              <div className="users_box d-flex align-items-center justify-content-between flex-column">
                <div className="d-flex w-100 align-items-center justify-content-between">
                  <div className="nav_link_name d-flex">
                    <p className="mb-0 ml-2">Owned by me</p>
                  </div>
                </div>
              </div>
            </NavLink>
            <div
              className={
                location.pathname.includes("form")
                  ? "dropdown d-block"
                  : "dropdown d-none"
              }
            >
              <ul className="list-unstyled">
              {ownedFormsData && ownedFormsData.map((data) => {
                return(
                  <li key={data.id}>
                    <NavLink to="#"
                      to={"/form/"+data.title}
                      className="Link_text"
                      activeClassName="users_box_active"
                      onClick={() => {removeSideBar();getFormData(data.id)}}
                    >
                      {data.title}
                      {/* form1 */}
                      {/* <span className="three_dots" id="own_user_form">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-three-dots"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                        </svg>
                      </span> */}
                      {/* <UncontrolledPopover
                        className="own_user_form"
                        trigger="legacy"
                        placement="bottom"
                        target="own_user_form"
                      >
                        <div className="squar_box squar_box_hover"></div>
                        <PopoverBody>
                          <ul className="list-unstyled mb-0">
                            <li
                              className="first_li"
                              //   onClick={handleShowUser}
                            >
                              <Link
                                className="text-decoration-none"
                                onClick={props.classRemove}
                              >
                                Add Users
                              </Link>
                            </li>
                            <li
                            //   onClick={handleShowBulkUploading}
                            >
                              <Link
                                className="text-decoration-none"
                                onClick={props.classRemove}
                              >
                                Bulk Upload Users
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="text-decoration-none"
                                //   onClick={handleShowManagePermissions}
                              >
                                Manage Permissions
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="text-decoration-none"
                                //   onClick={(e)=>{handleWoredaDelete("woredaUserDelete")}}
                              >
                                Delete
                              </Link>
                            </li>
                          </ul>
                        </PopoverBody>
                      </UncontrolledPopover> */}
                    </NavLink>
                  </li>
                )
              })}
              </ul>
            </div>
          </li>
          <li>
            <NavLink to="#"
              className={
                "Link_text " +
                (location.pathname === "/ownedbyme" ? " users_box_active" : "")
              }
              onClick={props.classRemove}
            >
              <div className="users_box d-flex align-items-center justify-content-between flex-column">
                <div className="d-flex w-100 align-items-center justify-content-between">
                  <div className="nav_link_name d-flex">
                    <p className="mb-0 ml-2">Not Owned by me</p>
                  </div>
                </div>
              </div>
            </NavLink>
            <div
              className={
                location.pathname.includes("form")
                  ? "dropdown d-block"
                  : "dropdown d-none"
              }
            >
              <ul className="list-unstyled">
                {assignedFormsData && assignedFormsData.map((assignedData) => {
                  return(
                    <>
                    {assignedData.is_form_submitted === false ?
                    <li>
                      
                      <NavLink to="#"
                          to={`/notownform/${assignedData.form.title}`}
                          className="Link_text"
                          activeClassName={
                            location.pathname.includes(assignedData.form.title)
                              ? " users_box_active"
                              : ""
                          }
                          onClick={() => {removeSideBar();getFormData(assignedData.form.id)}}
                        >
                      {assignedData.notify === true ?
                      <div className={assignedData.notify ? "_M_L_14" : ""}>
                      <span>
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.5 0C3.60999 0 2.73996 0.26392 1.99994 0.758387C1.25991 1.25285 0.683138 1.95566 0.342544 2.77792C0.00194976 3.60019 -0.0871652 4.50499 0.0864682 5.37791C0.260102 6.25082 0.688685 7.05264 1.31802 7.68198C1.94736 8.31131 2.74918 8.7399 3.6221 8.91353C4.49501 9.08716 5.39981 8.99805 6.22208 8.65746C7.04434 8.31686 7.74715 7.74009 8.24161 7.00006C8.73608 6.26004 9 5.39001 9 4.5C9 3.30652 8.5259 2.16193 7.68198 1.31802C6.83807 0.474106 5.69348 0 4.5 0ZM4.10625 1.88437C4.10625 1.77995 4.14774 1.67979 4.22158 1.60595C4.29542 1.53211 4.39557 1.49062 4.5 1.49062C4.60443 1.49062 4.70458 1.53211 4.77842 1.60595C4.85227 1.67979 4.89375 1.77995 4.89375 1.88437V5.25937C4.89375 5.3638 4.85227 5.46395 4.77842 5.5378C4.70458 5.61164 4.60443 5.65312 4.5 5.65312C4.39557 5.65312 4.29542 5.61164 4.22158 5.5378C4.14774 5.46395 4.10625 5.3638 4.10625 5.25937V1.88437ZM4.5 7.45312C4.39987 7.45312 4.302 7.42343 4.21874 7.36781C4.13549 7.31218 4.0706 7.23311 4.03229 7.14061C3.99397 7.0481 3.98395 6.94631 4.00348 6.84811C4.02301 6.74991 4.07123 6.6597 4.14203 6.5889C4.21283 6.5181 4.30303 6.46988 4.40124 6.45035C4.49944 6.43082 4.60123 6.44084 4.69373 6.47916C4.78624 6.51748 4.8653 6.58236 4.92093 6.66562C4.97656 6.74887 5.00625 6.84675 5.00625 6.94687C5.00625 7.08114 4.95291 7.20991 4.85797 7.30485C4.76303 7.39979 4.63427 7.45312 4.5 7.45312Z" fill="#F13838"/>
                        </svg>
                      </span> 
                      </div>
                      : <></>
                      }
                      
                        
                          {assignedData.form.title}
                      
                        </NavLink>
                    </li>
                    : <></>
                    }
                    </>
                  )
                })}
              </ul>
            </div>
          </li>
          </>
        :
          <></>
        }
        {/* <li className="mt-auto end_li" onClick={() => createForm()}>
          <Link>
            <p className="mb-0">
              <span className="plus_icon">
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
              Create New Form
            </p>
          </Link>
        </li> */}
      </ul>
    </div>
    {(checkPermission('custom_form_data_created'))
    ?
      <button className="mt-auto end_li btn create_new_form" onClick={() => createForm()}>
        <p className="mb-0">
          <span className="plus_icon">
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
          Create New Form
        </p>
      </button>
      :
      <></>
    }
    </>
  );
};

export default AllFormSidebar;
