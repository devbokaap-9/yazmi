import React, { useState, useEffect,useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
// import "../../assets/css/Modal.css";
import SettingModal from "../UsersTab/Modals/SettingModal";
import ConfirmModal from "../UsersTab/Modals/ConfirmModal";
import { useDispatch, useSelector } from "react-redux";
import { getProfileDetails, logoutAPI } from "../../actions/Auth";
import { updateSingleUser } from "../../actions/User";
import {UserContext} from "../../UserContext";
import checkPermission from "../../utils/CheckPermission";

const Header = () => {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmtextValue,setConfirmTextValue] = useState('logout')
  const handleShow = () => {setShow(true);removePopup()}
  const userContext = useContext(UserContext);
  const [role,setRoleType] = useState("")
  let history = useHistory();

  
 
  // const handleClose = () => setShow(false);
  const dispatch = useDispatch();


  let username = "";
  let getToken = ""
  let getid = ""
  let user_data = JSON.parse(decodeURIComponent(localStorage.getItem('user_data')));
  if(user_data){
    getid = user_data.profile_id
    username = user_data.username
    getToken = user_data.key
  }

  if(window.location.href.includes("users") && !checkPermission('custom_user_data_get') && !checkPermission('custom_user_operation_download') && !checkPermission('custom_user_operation_upload')){
    history.push("/401")
  }
  else if(window.location.href.includes("federal") && !checkPermission('custom_federal_data_created') && !checkPermission('custom_federal_data_delete') && !checkPermission('custom_federal_data_edit') && !checkPermission('custom_federal_data_get') && !checkPermission('custom_federal_data_all') 
  // && !checkPermission('custom_federal_operation_download') && !checkPermission('custom_federal_operation_upload') 
  && !checkPermission('custom_federal_operation_suspend')){
    history.push("/401")
  }
  else if(window.location.href.includes("regions") && !checkPermission('custom_region_data_created') && !checkPermission('custom_region_data_delete') && !checkPermission('custom_region_data_edit') && !checkPermission('custom_region_data_get') && !checkPermission('custom_region_data_all') && !checkPermission('custom_region_operation_download') && !checkPermission('custom_region_operation_upload') && !checkPermission('custom_region_operation_suspend')){
    history.push("/401")
  }
  else if(window.location.href.includes("woreda") && !checkPermission('custom_woreda_data_created') && !checkPermission('custom_woreda_data_delete') && !checkPermission('custom_woreda_data_edit') && !checkPermission('custom_woreda_data_get') && !checkPermission('custom_woreda_data_all') && !checkPermission('custom_woreda_operation_download') && !checkPermission('custom_woreda_operation_upload') && !checkPermission('custom_woreda_operation_suspend')){
    history.push("/401")
  }
  else if(window.location.href.includes("schools") && !checkPermission('custom_school_data_created') && !checkPermission('custom_school_data_delete') && !checkPermission('custom_school_data_edit') && !checkPermission('custom_school_data_get') && !checkPermission('custom_school_data_all') && !checkPermission('custom_school_operation_download') && !checkPermission('custom_school_operation_upload') && !checkPermission('custom_school_operation_suspend')){
    history.push("/401")
  }
  else if(window.location.href.includes("form") && !checkPermission('custom_form_data_created') && !checkPermission('custom_form_data_delete') && !checkPermission('custom_form_data_edit') && !checkPermission('custom_form_data_get') && !checkPermission('custom_form_data_all') && !checkPermission('custom_form_operation_download') && !checkPermission('custom_form_operation_preview') && !checkPermission('custom_form_operation_share')){
    history.push("/401")
  }
  else if(window.location.href.includes("contents") && !checkPermission('custom_course_data_created') && !checkPermission('custom_course_data_delete') && !checkPermission('custom_course_data_edit') && !checkPermission('custom_course_data_get') && !checkPermission('custom_course_data_all') && !checkPermission('custom_course_operation_assign') && !checkPermission('custom_course_operation_publish')){
    history.push("/401")
  }
  else if(window.location.href.includes("roles") && !checkPermission('custom_role_data_created') && !checkPermission('custom_role_data_delete') && !checkPermission('custom_role_data_edit') && !checkPermission('custom_role_data_get') && !checkPermission('custom_role_data_all') && !checkPermission('custom_role_operation_share')){
    history.push("/401")
  }

  useEffect(() => {
    dispatch(getProfileDetails(getToken))
  }, [])

  // const authData = useSelector((state) => state.authData.loginResData);
  let profileDetails = useSelector((state) => state.authData.loginResData);

  let getName = profileDetails && profileDetails.fullname.split(" ")

  let FirstName = getName[0] && getName[0].charAt(0)
  let LastName = getName[2] && getName[2].charAt(0)

  const confirmValue = (value) => {
      setConfirmTextValue(value)
  }

  const handleShowConfirm = () => {
    if(!profileDetails.dont_ask_again_login){
      setShowConfirm(true)
    }
    else{
      dispatch(logoutAPI());
    }
  }

  const handleShowConfirmLogin = (roleType) => {
    setRoleType(roleType)
    if(!profileDetails.dont_ask_again_role){
      setShowConfirm(true)
    }
    else{
      let data = {}
      data.last_logged_in_as = roleType
      let last_log_in_as = {
        last_logged_in_as : roleType
      }
      localStorage.setItem('last_log_in_as',encodeURIComponent(JSON.stringify(last_log_in_as)))
      dispatch(updateSingleUser(getid,data))
      if(roleType === "admin"){
        // history.push("/users")
        redirectRoute();
      }
      else if(roleType === "learner"){
        history.push("/student")
      }
    }
  }

  const responseUpdateUser = useSelector((state) => state.usersData.updateSingleUser);

    useEffect(() => {
        if(responseUpdateUser.status === 200 && confirmtextValue === 'login'){
            dispatch(getProfileDetails(getToken))
            if(role === "admin"){
              // history.push("/users")
              redirectRoute();
            }
            else if(role === "learner"){
              history.push("/student")
            }
        }
    }, [responseUpdateUser])

  const redirectRoute = () => {
    if(checkPermission('custom_user_data_get') || checkPermission('custom_user_operation_download') || checkPermission('custom_user_operation_upload')){
      history.push("/users")
    }
    else if(checkPermission('custom_federal_data_created') || checkPermission('custom_federal_data_delete') || checkPermission('custom_federal_data_edit') || checkPermission('custom_federal_data_get') || checkPermission('custom_federal_data_all') || checkPermission('custom_federal_operation_download') || checkPermission('custom_federal_operation_upload') || checkPermission('custom_federal_operation_suspend')){
      history.push("/federal")
    }
    else if(checkPermission('custom_region_data_created') || checkPermission('custom_region_data_delete') || checkPermission('custom_region_data_edit') || checkPermission('custom_region_data_get') || checkPermission('custom_region_data_all') || checkPermission('custom_region_operation_download') || checkPermission('custom_region_operation_upload') || checkPermission('custom_region_operation_suspend')){
      history.push("/regions")
    }
    else if(checkPermission('custom_woreda_data_created') || checkPermission('custom_woreda_data_delete') || checkPermission('custom_woreda_data_edit') || checkPermission('custom_woreda_data_get') || checkPermission('custom_woreda_data_all') || checkPermission('custom_woreda_operation_download') || checkPermission('custom_woreda_operation_upload') || checkPermission('custom_woreda_operation_suspend')){
      history.push("/woreda")
    }
    else if(checkPermission('custom_school_data_created') || checkPermission('custom_school_data_delete') || checkPermission('custom_school_data_edit') || checkPermission('custom_school_data_get') || checkPermission('custom_school_data_all') || checkPermission('custom_school_operation_download') || checkPermission('custom_school_operation_upload') || checkPermission('custom_school_operation_suspend')){
      history.push("/schools")
    }
    else if(checkPermission('custom_form_data_created') || checkPermission('custom_form_data_delete') || checkPermission('custom_form_data_edit') || checkPermission('custom_form_data_get') || checkPermission('custom_form_data_all') || checkPermission('custom_form_operation_download') || checkPermission('custom_form_operation_preview') || checkPermission('custom_form_operation_share')){
      history.push("/form")
    }
    else if(checkPermission('custom_course_data_created') || checkPermission('custom_course_data_delete') || checkPermission('custom_course_data_edit') || checkPermission('custom_course_data_get') || checkPermission('custom_course_data_all') || checkPermission('custom_course_operation_assign') || checkPermission('custom_course_operation_publish')){
      history.push("/contents")
    }
    else if(checkPermission('custom_role_data_created') || checkPermission('custom_role_data_delete') || checkPermission('custom_role_data_edit') || checkPermission('custom_role_data_get') || checkPermission('custom_role_data_all') || checkPermission('custom_role_operation_share')){
      history.push("/roles")
    }
  }


  const closeSettingModal = () => {
    setShow(false);
  };
  const closeConfirmModal = () => {
    setShowConfirm(false);
  }

  const unauthorized = useSelector((state) => state.authData.unauthorized);
  useEffect(() => {
    if(unauthorized && window.location.href.includes('401')){
      history.push('/401');
    }
  },[unauthorized])

  useEffect(() => {
    if(profileDetails){
      let permissionArray = [];
      if(profileDetails.permissions){
          profileDetails.permissions.map(function(value){
              permissionArray.push(value.codename)
          })
      }
      localStorage.setItem('user_permissions',encodeURIComponent(JSON.stringify(permissionArray)))
    }
  },[profileDetails])

  const handleChange = (event) => {
    const filterValue = event.target.value;
    userContext.setCourseFilterValue(filterValue);
  }

  const removePopup = () => {
    var element = document.getElementsByClassName("user_profile");
    element[0].classList.remove("show");
  };

  return (
    <>
      <header>
        <div className="left_content">
          {/* <Link to={profileDetails.last_logged_in_as === "learner" ? "/student" : (checkPermission('custom_user_data_get') || checkPermission('custom_user_operation_download')) ? "/users" : (checkPermission('custom_federal_data_created') || checkPermission('custom_federal_data_delete') || checkPermission('custom_federal_data_edit') || checkPermission('custom_federal_data_get') || checkPermission('custom_federal_data_all') || checkPermission('custom_federal_operation_download') || checkPermission('custom_federal_operation_upload') || checkPermission('custom_federal_operation_suspend')) ? "/federal" : (checkPermission('custom_region_data_created') || checkPermission('custom_region_data_delete') || checkPermission('custom_region_data_edit') || checkPermission('custom_region_data_get') || checkPermission('custom_region_data_all') || checkPermission('custom_region_operation_download') || checkPermission('custom_region_operation_upload') || checkPermission('custom_region_operation_suspend')) ? "/regions" : (checkPermission('custom_woreda_data_created') || checkPermission('custom_woreda_data_delete') || checkPermission('custom_woreda_data_edit') || checkPermission('custom_woreda_data_get') || checkPermission('custom_woreda_data_all') || checkPermission('custom_woreda_operation_download') || checkPermission('custom_woreda_operation_upload') || checkPermission('custom_woreda_operation_suspend')) ? "/woreda" : (checkPermission('custom_school_data_created') || checkPermission('custom_school_data_delete') || checkPermission('custom_school_data_edit') || checkPermission('custom_school_data_get') || checkPermission('custom_school_data_all') || checkPermission('custom_school_operation_download') || checkPermission('custom_school_operation_upload') || checkPermission('custom_school_operation_suspend')) ? "/schools" : (checkPermission('custom_form_data_created') || checkPermission('custom_form_data_delete') || checkPermission('custom_form_data_edit') || checkPermission('custom_form_data_get') || checkPermission('custom_form_data_all') || checkPermission('custom_form_operation_download') || checkPermission('custom_form_operation_preview') || checkPermission('custom_form_operation_share')) ? "/form" : (checkPermission('custom_course_data_created') || checkPermission('custom_course_data_delete') || checkPermission('custom_course_data_edit') || checkPermission('custom_course_data_get') || checkPermission('custom_course_data_all') || checkPermission('custom_course_operation_assign') || checkPermission('custom_course_operation_publish')) ? "/contents" : (checkPermission('custom_role_data_created') || checkPermission('custom_role_data_delete') || checkPermission('custom_role_data_edit') || checkPermission('custom_role_data_get') || checkPermission('custom_role_data_all') || checkPermission('custom_role_operation_share')) ? "/roles" : "/users"
          }> */}
            <img
              src={process.env.PUBLIC_URL + "/images/yazmi-logo.png"}
              alt=""
            />
          {/* </Link> */}
        </div>
        <div className="right_content d-flex align-items-center">
          <div className="right_content_div d-flex">
            {window.location.href.includes("student")
            ?
              <div className="input_div">
                <input type="text" value={userContext.courseFilterValue} onChange={(e) => {handleChange(e)}} placeholder="Search" />
                <span>
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.17647 1C5.95488 1 4.76073 1.36224 3.74501 2.04092C2.72929 2.7196 1.93764 3.68423 1.47016 4.81284C1.00268 5.94144 0.880361 7.18332 1.11868 8.38144C1.357 9.57956 1.94525 10.6801 2.80905 11.5439C3.67284 12.4077 4.77339 12.9959 5.9715 13.2343C7.16962 13.4726 8.4115 13.3503 9.54011 12.8828C10.6687 12.4153 11.6333 11.6236 12.312 10.6079C12.9907 9.59222 13.3529 8.39806 13.3529 7.17647C13.3528 5.5384 12.7021 3.96745 11.5438 2.80916C10.3855 1.65087 8.81454 1.0001 7.17647 1V1Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M11.5879 11.5881L15.9997 15.9999"
                      stroke="white"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </div>
            :
              <></>
            }
          </div>
          <div className="profile_image">
            {/* <img src={process.env.PUBLIC_URL + "/images/joel.png"} alt="" /> */}
            { FirstName && LastName ?
            `${FirstName}${LastName}`
            : <></> 
            }
          </div>
          <p className="mb-0">
            {username}
            <span id="PopoverLegacy">
              <svg
                width="15"
                height="9"
                viewBox="0 0 15 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.03125 0.999999L7.51562 7.43412L14 1"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </p>
          <UncontrolledPopover
            className="user_profile logout_popup"
            trigger="legacy"
            placement="bottom"
            target="PopoverLegacy"
          >
            <div className="squar_box squar_box_hover"></div>
            <PopoverBody>
              <ul className="list-unstyled mb-0">
                <li className="first_li" onClick={handleShow}>
                  <Link className="text-decoration-none">
                    Profile
                  </Link>
                </li>
                {(profileDetails && profileDetails.last_logged_in_as === "learner" && (checkPermission('custom_user_data_get') || checkPermission('custom_user_operation_download') || checkPermission('custom_user_operation_upload') || checkPermission('custom_federal_data_created') || checkPermission('custom_federal_data_delete') || checkPermission('custom_federal_data_edit') || checkPermission('custom_federal_data_get') || checkPermission('custom_federal_data_all') || checkPermission('custom_federal_operation_download') || checkPermission('custom_federal_operation_upload') || checkPermission('custom_federal_operation_suspend') || checkPermission('custom_region_data_created') || checkPermission('custom_region_data_delete') || checkPermission('custom_region_data_edit') || checkPermission('custom_region_data_get') || checkPermission('custom_region_data_all') || checkPermission('custom_region_operation_download') || checkPermission('custom_region_operation_upload') || checkPermission('custom_region_operation_suspend') || checkPermission('custom_woreda_data_created') || checkPermission('custom_woreda_data_delete') || checkPermission('custom_woreda_data_edit') || checkPermission('custom_woreda_data_get') || checkPermission('custom_woreda_data_all') || checkPermission('custom_woreda_operation_download') || checkPermission('custom_woreda_operation_upload') || checkPermission('custom_woreda_operation_suspend') || checkPermission('custom_school_data_created') || checkPermission('custom_school_data_delete') || checkPermission('custom_school_data_edit') || checkPermission('custom_school_data_get') || checkPermission('custom_school_data_all') || checkPermission('custom_school_operation_download') || checkPermission('custom_school_operation_upload') || checkPermission('custom_school_operation_suspend') || checkPermission('custom_role_data_created') || checkPermission('custom_role_data_delete') || checkPermission('custom_role_data_edit') || checkPermission('custom_role_data_get') || checkPermission('custom_role_data_all') || checkPermission('custom_role_operation_share') || checkPermission('custom_form_data_created') || checkPermission('custom_form_data_delete') || checkPermission('custom_form_data_edit') || checkPermission('custom_form_data_get') || checkPermission('custom_form_data_all') || checkPermission('custom_form_operation_download') || checkPermission('custom_form_operation_preview') || checkPermission('custom_form_operation_share') || checkPermission('custom_course_data_created') || checkPermission('custom_course_data_delete') || checkPermission('custom_course_data_edit') || checkPermission('custom_course_data_get') || checkPermission('custom_course_data_all') || checkPermission('custom_course_operation_assign') || checkPermission('custom_course_operation_publish')))
                ?
                  <li>
                    <Link className="text-decoration-none" onClick={() => {handleShowConfirmLogin('admin');confirmValue('login');removePopup()}}>
                      Login as Admin
                    </Link>
                  </li>
                :
                  (profileDetails && profileDetails.last_logged_in_as === "admin" && (checkPermission('custom_learner_data_get')))
                  ?
                    <li>
                      <Link className="text-decoration-none" onClick={() => {handleShowConfirmLogin('learner');confirmValue('login');removePopup()}}>
                        Login as Learner
                      </Link>
                    </li>
                  :
                    <li></li>
                }
                
                <li>
                  <Link className="text-decoration-none" onClick={() => {handleShowConfirm();confirmValue('logout')}}>
                    Logout
                  </Link>
                </li>
              </ul>
            </PopoverBody>
          </UncontrolledPopover>
        </div>
      </header>
 
      <SettingModal show={show} closeModal={closeSettingModal} />
      <ConfirmModal show={showConfirm} closeModal={closeConfirmModal} confirmtextValue={confirmtextValue} roleType={role}/>
    </>
  );
};
export default Header;
