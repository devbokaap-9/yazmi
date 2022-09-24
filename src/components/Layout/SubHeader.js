import React, { useState, useEffect, useContext } from "react";
import { useLocation, useHistory  } from "react-router-dom";
import DownloadingModal from "../UsersTab/Modals/DownloadingModal";
import BulkUploadModal from "../UsersTab/Modals/BulkUploadModal";
import BroadcastModal from "../UsersTab/Modals/BroadcastModal";
import DeleteAllModal from "../UsersTab/Modals/DeleteAllModal";
import AddUserModal from "../UsersTab/Users/AddUserModal";
import AddRegionModal from "../UsersTab/Regions/AddRegionModal";
import AddDistrictModal from "../UsersTab/Districts/AddDistrictModal";
import AddSchoolModal from "../UsersTab/Schools/AddSchoolModal";
import CreateNewRole from "../RoleTab/Modals/CreateNewRole";
import ShareForm from "../FormTab/AllForms/Modal/ShareForm";
import checkPermission from "../../utils/CheckPermission"
import { useSelector, useDispatch } from "react-redux";
import { UserContext } from '../../UserContext';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import EditFormName from "../FormTab/AllForms/Modal/EditFormName";
import Publish from "../ContentTab/Modal/Publish";
import DeleteCourse from "../ContentTab/Modal/DeleteCourse";
import PreviewForm from "../FormTab/AllForms/Modal/PreviewForm";
import {editFormTitle} from "../../actions/Form";
import {downloadLists} from "../../actions/User";
import {removeLessonPracticeExamData,getLessonPracticeExamData} from "../../actions/Content";
import { toast } from 'react-toastify';
import DownloadForm from "../FormTab/AllForms/Allform/DownloadForm";
import DownloadListModal from "../UsersTab/Users/DownloadListModal";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;

const SubHeader = (props) => {

  let history = useHistory();
  let dispatch = useDispatch();

  const [showUser, setShowUser] = useState(false);
  const [OpenPreviewForm, setPreviewForm] = useState(false);
  const [showFormStop, setShowFormStop] = useState(false);
  const [showBroadcast, setShowBroadcast] = useState(false);
  const [showDownloading, setShowDownloading] = useState(false);
  const [showBulkUploading, setShowBulkUploading] = useState(false);
  const [createNewRole, setCreateNewRole] = useState(false);
  const [showDeleteAll,setShowDeleteAll] = useState(false)
  const [AllDownloadList,setAllDownloadList] = useState(false)
  const [action,setAction] = useState("")
  const [stopBtn,setStopBtn] = useState(false)
  //const [formLoading, setFormLoading] = useState(true);
  const [deleteCourses, setDeleteCourses] = useState(false);
  const [publishCourses, setPublishCourses] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const [editName, setEditFormName] = useState(false);
  const handleShowBroadcast = () => setShowBroadcast(true);
  const handleShowDownloading = () => setShowDownloading(true);
  const handleShowBulkUploading = () => setShowBulkUploading(true);
  const handleShowUser = () => setShowUser(true);
  const handlePreviewForm = () => setPreviewForm(true);
  const handleShowFormStop = () => setShowFormStop(true);
  const handleShowCreateRole = () => setCreateNewRole(true)
  const showDeleteAllModal = () => {setShowDeleteAll(true)}
  const ShowEditFormName = () => {setEditFormName(true)}
  const handleDownloadList = () => {setAllDownloadList(true)}
  const [downloadType,setDownloadType] = useState('')
  const [courseDatas,setCourseData] = useState([])
  let location = useLocation();

  var segmentCount = (location.pathname.split('/').length - 1) - (location.pathname[location.pathname.length - 1] == '/' ? 1 : 0);
  
  const userContext = useContext(UserContext);

  const singleFormData  = useSelector((state) => state.formsData.singleFormData);
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];


  const allUsers  = useSelector((state) => state.usersData.usersData);

  useEffect(() => {
    if(allUsers){
      userContext.setFrmLdng(false)
    }
  },[allUsers])
  
  useEffect(()=>{
    if(singleFormData){
      userContext.setFrmLdng(false)
    }
  },[singleFormData])

  useEffect(() => {
    if(!userContext.crtFormBtn){
      userContext.setFrmLdng(false)
      userContext.setCrtFormBtn(true)
    }
    
    if(window.location.href.includes('student') && window.location.href.includes('course-details') && (window.location.href.includes('practice-result') || window.location.href.includes('exam-result')) && (segmentCount === 5) && !userContext.frmUpdating){
      history.push('/student')
    } 
  })

  const closeUserModal = () => {
    setShowUser(false);
  };

  const closeShowDownloading = () => {
    setShowDownloading(false);
  };

  const closeBulkUploading = () => {
    setShowBulkUploading(false);
  };

  const closeShowBroadcast = () => {
    setShowBroadcast(false);
  };
  const closeShowCreateRole = () => {
    setCreateNewRole(false);
  }

  const closeShowDeleteAll = () => {
    setShowDeleteAll(false)
  }

  const closeShowFormStop = () => {
    setShowFormStop(false)
  }


  const closePreViewForm = () => {
    setPreviewForm(false)
  }

  const closeEditFormName = () => {
    setEditFormName(false)
  }


  const handleDeleteCourses = () => {
    setDeleteCourses(true)
  }
  const closeDeleteCourses = () => {
    setDeleteCourses(false)
  }


  const handlePublishCourses = () => {
    setPublishCourses(true)
  }
  const closePublishCourses = () => {
    setPublishCourses(false)
  }

  const closeDownloadlist = () => {
    setAllDownloadList(false)
  }

  const getLessonPracticeExamDataRes = useSelector((state) => state.contentData.getLessonPracticeExamData);

  const handlePush = () => {
    userContext.setPracticeExamQtnsCnt(0)
    userContext.setPracticeExamAns([])
    // userContext.setPracticeExamWrongAnsCnt(0)
    userContext.setWrongPracticeExamQtnIds([])
    userContext.setFrmUpdating(true)
    if(props.name === "Exam"){
      dispatch(removeLessonPracticeExamData());
      history.push("/student/course-details/exams/"+getLessonPracticeExamDataRes.id)
    }else{
      history.push("/student/course-details/practices/"+getLessonPracticeExamDataRes.id)
    }
  }

  const stopFormResponse = () => {
    setStopBtn(true)
    let formData = {
      "accept_responses" : true
    }
    dispatch(editFormTitle(formData,singleFormData.id))
  }
  const updatedFormRes = useSelector((state) => state.formsData.updatedFormTitleData);

  useEffect( () => {
    //if success then only execute
    if (updatedFormRes.id && stopBtn) {
      setStopBtn(false)
      toast.success('Accepting Response Stopped');
    }
  },[updatedFormRes])

  const downloadList = (name) => {
      setDownloadType(name)
      let user_data = JSON.parse(decodeURIComponent(localStorage.getItem('user_data')));
      let token = user_data.key
      dispatch(downloadLists(token,name))
  }
  const downloadData = useSelector((state) => state.usersData.downloadData);

  useEffect(() => {
    if(downloadData){
      closeShowDownloading();
    }
  },[downloadData])

  const { error } = useSelector((state) => state);

  useEffect(() => {
    if(error && handleShowDownloading){
      setShowDownloading(false)
    }
  },[error])

  const courseDetailsData = useSelector((state) => state.contentData.getCourseDetails);
  
  useEffect(() => {
    let courseData = [];
    if(courseDetailsData && courseDetailsData.id){
      courseData.push(...courseDetailsData.lessons,...courseDetailsData.practices,...courseDetailsData.exams)
      setCourseData(courseData);
    }
  },[courseDetailsData])

  const practiceExamNextHandleClick = () => {
    let courseArray = [];
    userContext.setFrmUpdating(true)
    let key = userContext.practiceExamSctnData[0].key
    history.push("/student/course-details/"+userContext.practiceExamSctnData[0].type+"/"+userContext.practiceExamSctnData[0].id)
    dispatch(getLessonPracticeExamData(courseDetailsData.id,userContext.practiceExamSctnData[0].id,userContext.practiceExamSctnData[0].type))
    if((key + 1) === courseDatas.length){
      userContext.setPracticeExamSctnData([])
    }
    else{
      let nextSectionId = 0
      let nextSectionType = 0
      if(courseDatas[key+1]){
        nextSectionId = courseDatas[key+1].id
        nextSectionType = courseDatas[key+1].content_type_name
        courseArray.push({"id":nextSectionId,"type" :nextSectionType+"s","key":key+1})
        userContext.setPracticeExamSctnData(courseArray)
      }
    }
  }

  

  return (
    <>
      <div className={ location.pathname.includes("practice-result") || location.pathname.includes("exam-result") ? "user_div d-block" : `user_div ${props.classpass}  `} >
        <div className="row_1 d-flex justify-content-between align-items-center">
          <div className="left_user">
            <h3 className={props.id === "edit_name_id" || location.pathname.includes("practice-result") || location.pathname.includes("exam-result") ? "cursor_pointer mb-0" : " mb-0"} id={props.id} onClick={props.id === "edit_name_id" ? ShowEditFormName : location.pathname.includes("practice-result") || location.pathname.includes("exam-result") ? handlePush : ""} > { location.pathname.includes("practice-result") || location.pathname.includes("exam-result") ?  <span><svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 1L1 6L6 11" stroke="black" stroke-linecap="round" strokeLinejoin="round"></path><path d="M1 6H12.4286" stroke="black" stroke-linecap="round" strokeLinejoin="round"></path></svg></span> : <></> } {props.name ? decodeURI(props.name) : (singleFormData.title) ? decodeURI(singleFormData.title) : ""}</h3>
            <p className="count_para mb-0">
              {(window.location.href.includes('form') && segmentCount === 2 && !window.location.href.includes('notownform')) ?  (singleFormData ? ((new Date(singleFormData.modified.replace('IST', '')).getHours() % 12 ? (new Date(singleFormData.modified.replace('IST', '')).getHours() % 12).toString().padStart(2, '0') : 12) + ':' + (new Date(singleFormData.modified.replace('IST', '')).getMinutes().toString().padStart(2, '0')) + ' ' + (new Date(singleFormData.modified.replace('IST', '')).getHours() >= 12 ? 'pm' : 'am')) : ((new Date().getHours() % 12) ? (new Date().getHours() % 12 < 10 ? '0'+new Date().getHours() % 12 : new Date().getHours() % 12) : 12) +":"+((new Date().getMinutes() < 10 ? '0'+new Date().getMinutes() : new Date().getMinutes()) +" "+(new Date().getHours() >= 12 ? "pm" : "am"))) 
              :
                (window.location.href.includes('notownform') && segmentCount === 2) ?
                  "Sent By " + (singleFormData && singleFormData.creator && singleFormData.creator.username ? singleFormData.creator.username : "")
                : props.count}{" "}
              {(window.location.href.includes('form') && segmentCount === 2 && !window.location.href.includes('notownform')) ?<span className="after_css">|</span> : <></>}
              <span>
                {(window.location.href.includes('form') && segmentCount === 2 && !window.location.href.includes('notownform')) ? (singleFormData ? (new Date(singleFormData.modified.replace('IST', '')).getDate()) +" "+(monthNames[new Date(singleFormData.modified.replace('IST', '')).getMonth()]) : (new Date().getDate()) +" "+(monthNames[new Date().getMonth()])) : props.countname}
              </span>
            </p>
          </div>
          
          <div className="right_user">
            <ul className="list-unstyled d-flex mb-0">
              {
              // location.pathname !== "/users" &&
              location.pathname !== "/roles" &&
              location.pathname !== "/allannouncement" &&
              location.pathname !== "/allannouncement/inbox" &&
              location.pathname !== "/allannouncement/sent" &&
              !location.pathname.includes('form') && !location.pathname.includes("student") && !window.location.href.includes('role') && !window.location.href.includes('learning') && !window.location.href.includes('contents') ? (
                <>
                  {((checkPermission('custom_federal_data_created') || checkPermission('custom_federal_data_all')) && window.location.href.includes("federal"))
                  ?
                    <li
                      onClick={props.checkedAll ? null : handleShowUser}
                      className={props.checkedAll && ((checkPermission('custom_federal_operation_upload') || checkPermission('custom_federal_operation_download')) && window.location.href.includes("federal")) ? "grey_color cursor_none" : props.checkedAll && ((!checkPermission('custom_federal_operation_upload') || !checkPermission('custom_federal_operation_download')) && window.location.href.includes("federal")) ? "grey_color cursor_none contain_none" :((checkPermission('custom_federal_operation_upload') || checkPermission('custom_federal_operation_download')) && window.location.href.includes("federal")) ? "contain_none" : "contain_none"}
                    >
                      + Add {props.addName} <span></span>
                    </li>
                  :
                    <></>
                  }
                  {((checkPermission('custom_region_data_created') || checkPermission('custom_region_data_all')) && window.location.href.includes("regions"))
                  ?
                    <li
                      onClick={props.checkedAll ? null : handleShowUser}
                      className={props.checkedAll && ((checkPermission('custom_region_operation_upload') || checkPermission('custom_region_operation_download')) && window.location.href.includes("regions")  && segmentCount === 1) ? "grey_color cursor_none" : props.checkedAll && ((!checkPermission('custom_region_operation_upload') || !checkPermission('custom_region_operation_download')) && window.location.href.includes("regions")  && segmentCount === 1) ? "grey_color cursor_none contain_none" : props.checkedAll && segmentCount === 2 ? "grey_color cursor_none contain_none" : ((checkPermission('custom_region_operation_upload') || checkPermission('custom_region_operation_download')) && window.location.href.includes("regions") && segmentCount === 1) ? "" : "contain_none"}
                    >
                      + Add {props.addName} <span></span>
                    </li>
                  :
                    <></>
                  }
                  {((checkPermission('custom_woreda_data_created') || checkPermission('custom_woreda_data_all')) && window.location.href.includes("woreda"))
                  ?
                    <li
                      onClick={props.checkedAll ? null : handleShowUser}
                      className={props.checkedAll && ((checkPermission('custom_woreda_operation_upload') || checkPermission('custom_woreda_operation_download')) && window.location.href.includes("woreda") && segmentCount === 1) ? "grey_color cursor_none" : props.checkedAll && ((!checkPermission('custom_woreda_operation_upload') || !checkPermission('custom_woreda_operation_download')) && window.location.href.includes("woreda") && segmentCount === 1) ? "grey_color cursor_none contain_none" : props.checkedAll && segmentCount === 2 ? "grey_color cursor_none contain_none" : ((checkPermission('custom_woreda_operation_upload') || checkPermission('custom_woreda_operation_download')) && window.location.href.includes("woreda") && segmentCount === 1) ? "" : "contain_none"}
                    >
                      + Add {props.addName} <span></span>
                    </li>
                  :
                    <></>
                  }
                  {((checkPermission('custom_school_data_created') || checkPermission('custom_school_data_all')) && window.location.href.includes("schools"))
                  ?
                    <li
                      onClick={props.checkedAll ? null : handleShowUser}
                      className={props.checkedAll && ((checkPermission('custom_school_operation_upload') || checkPermission('custom_school_operation_download')) && window.location.href.includes("schools") && segmentCount === 1) ? "grey_color cursor_none" : props.checkedAll && ((!checkPermission('custom_school_operation_upload') || !checkPermission('custom_school_operation_download')) && window.location.href.includes("schools") && segmentCount === 1) ? "grey_color cursor_none contain_none" : props.checkedAll && segmentCount === 2 ? "grey_color cursor_none contain_none" : ((checkPermission('custom_school_operation_upload') || checkPermission('custom_school_operation_download')) && window.location.href.includes("schools") && segmentCount === 1) ? "" : "contain_none"}
                    >
                      + Add {props.addName} <span></span>
                    </li>
                  :
                    <></>
                  }
                  {/* {(checkPermission('custom_federal_operation_upload') && window.location.href.includes("federal"))
                  ?
                    <li
                      onClick={props.checkedAll ? null : handleShowBulkUploading}
                      className={props.checkedAll ? "grey_color cursor_none" : (checkPermission('custom_federal_operation_download') && window.location.href.includes("federal")) ? "contain_none" : "contain_none"}
                    >
                      Bulk Upload <span></span>
                    </li>
                  :
                    <></>
                  } */}
                  {(checkPermission('custom_user_operation_upload') && window.location.href.includes("users"))
                  ?
                    <li
                      onClick={props.checkedAll ? null : handleShowBulkUploading}
                      className={props.checkedAll ? "grey_color cursor_none" : ((checkPermission('custom_school_operation_download') || checkPermission('custom_user_operation_download')) && window.location.href.includes("users")) ? "" : "contain_none"}
                    >
                      Bulk Upload <span></span>
                    </li>
                  :
                    <></>
                  }
                  {(checkPermission('custom_region_operation_upload') && window.location.href.includes("regions") && segmentCount === 1)
                  ?
                    <li
                      onClick={props.checkedAll ? null : handleShowBulkUploading}
                      className={props.checkedAll ? "grey_color cursor_none" : (checkPermission('custom_region_operation_download') && window.location.href.includes("regions") && segmentCount === 1) ? "" : "contain_none"}
                    >
                      Bulk Upload <span></span>
                    </li>
                  :
                    <></>
                  }
                  {(checkPermission('custom_woreda_operation_upload') && window.location.href.includes("woreda") && segmentCount === 1)
                  ?
                    <li
                      onClick={props.checkedAll ? null : handleShowBulkUploading}
                      className={props.checkedAll ? "grey_color cursor_none" : (checkPermission('custom_woreda_operation_download') && window.location.href.includes("woreda") && segmentCount === 1) ? "" : "contain_none"}
                    >
                      Bulk Upload <span></span>
                    </li>
                  :
                    <></>
                  }
                  {(checkPermission('custom_school_operation_upload') && window.location.href.includes("schools") && segmentCount === 1)
                  ?
                    <li
                      onClick={props.checkedAll ? null : handleShowBulkUploading}
                      className={props.checkedAll ? "grey_color cursor_none" : (checkPermission('custom_school_operation_download') && window.location.href.includes("schools") && segmentCount === 1) ? "" : "contain_none"}
                    >
                      Bulk Upload <span></span>
                    </li>
                  :
                    <></>
                  }
                </>
              ) : location.pathname.includes("form") && !location.pathname.includes("notownform") && segmentCount === 2 && (singleFormData && singleFormData.accept_responses) ? (
                <>
                  {(checkPermission('custom_form_operation_preview'))
                  ?
                    <li
                      onClick={props.checkedAll ? null : handlePreviewForm}
                      className={props.checkedAll ? "grey_color cursor_none" : (checkPermission('custom_form_operation_share')) ? "" : "contain_none"}
                    >
                      Preview Form <span></span>
                    </li>
                  :
                    <></>
                  }
                  {(checkPermission('custom_form_operation_share'))
                  ?
                    <li
                      className="contain_none"
                      onClick={handleShowFormStop}
                    >
                      Start Accepting Responses <span></span>
                    </li>
                  :
                    <></>
                  }
                </>
              ) : 
              location.pathname.includes("form") && !location.pathname.includes("notownform") && segmentCount === 2 && (singleFormData && !singleFormData.accept_responses) ? (
                <>
                  {(checkPermission('custom_form_operation_preview'))
                  ?
                    <li
                      onClick={props.checkedAll ? null : handlePreviewForm}
                      className={props.checkedAll ? "grey_color cursor_none" : (checkPermission('custom_form_operation_share')) ? "" : "contain_none"}
                    >
                      Preview Form <span></span>
                    </li>
                  :
                    <></>
                  }
                  {(checkPermission('custom_form_operation_share'))
                  ?
                    <li
                      className="contain_none"
                      onClick={() => {stopFormResponse()}}
                    >
                      Stop Accepting Responses <span></span>
                    </li>
                  :
                    <></>
                  }
                </>
              )
              :
              window.location.href.includes("notownform") ?  (
                <>
                  <li
                    className=""
                    onClick={() => {userContext.setFrmResponse(1)}}
                  >
                   Submit Responses <span></span>
                  </li>
                  <li
                    onClick={() => {userContext.setFrmResponse(2)}}
                    className="contain_none"
                  >
                    Clear Form
                  </li>
                </>
              ) :  window.location.href.includes("learning") ?
              <>
              <li onClick={handleDeleteCourses}
              >
               Delete Course
              </li>
              <li
                className="contain_none" onClick={handlePublishCourses}
              >
                Publish Course
              </li>
            </> :
               <></>
              }
              {location.pathname !== "/allannouncement" &&
              location.pathname !== "/allannouncement/inbox" &&
              location.pathname !== "/allannouncement/sent" &&
              !location.pathname.includes('form') && !window.location.href.includes('learning') ? (
                location.pathname === "/roles" || window.location.href.includes('role') ? (
                  <>
                  {(checkPermission('custom_role_data_created')) || (checkPermission('custom_role_data_all')) 
                  ?
                    <li
                      className={
                        props.checkedAll
                          ? "contain_none grey_color cursor_none"
                          : "contain_none"
                      }
                      onClick={handleShowCreateRole}
                    >
                      + Create New Role <span></span>
                    </li>
                  :
                    <></>
                  }
                  </>
                ) : (
                  !location.pathname.includes("student") && !location.pathname.includes("contents") && window.location.href.includes("users") && (checkPermission('custom_user_operation_download') || checkPermission('custom_school_operation_download'))
                  ?
                    // <>
                    //   {(checkPermission('custom_user_operation_download'))
                    //   ?
                    //     <li
                    //       className={
                    //         props.checkedAll
                    //           ? "contain_none grey_color cursor_none"
                    //           : (checkPermission('custom_school_operation_download')) ? "" : "contain_none"
                    //       }
                    //       onClick={() => {downloadList('all-others');handleShowDownloading()}}
                    //     >
                    //     Other User Download List <span></span>
                    //     </li>
                    //   :
                    //     <></>
                    //   }
                      // {
                      // (checkPermission('custom_user_operation_download') || checkPermission('custom_school_operation_download'))
                      // ?
                        // <>
                        //   <li
                        //     className={
                        //       props.checkedAll
                        //         ? "contain_none grey_color cursor_none"
                        //         : ""
                        //     }
                        //     onClick={() => {downloadList('students');handleShowDownloading()}}
                        //   >
                        //     Student Download List <span></span>
                        //   </li>
                        //   <li
                        //     className={
                        //       props.checkedAll
                        //         ? "contain_none grey_color cursor_none"
                        //         : "contain_none"
                        //     }
                        //     onClick={() => {downloadList('teachers');handleShowDownloading()}}
                        //   >
                        //     Teacher Download List <span></span>
                        //   </li>
                          <li
                            className={
                              props.checkedAll
                                ? "contain_none grey_color cursor_none"
                                : "contain_none"
                            }
                            onClick={() => handleDownloadList()}
                          >
                            Download list <span></span>
                          </li>
                        // </>
                      // :
                      //   <></>
                      // }
                    // </>
                  // :
                  //   !location.pathname.includes("student") && !location.pathname.includes("contents") && (checkPermission('custom_federal_operation_download') && window.location.href.includes("federal"))
                  //   ?
                  //     <li
                  //       className={
                  //         props.checkedAll
                  //           ? "contain_none grey_color cursor_none"
                  //           : "contain_none"
                  //       }
                  //       onClick={() => {downloadList('all-others');handleShowDownloading()}}
                  //     >
                  //       Download List <span></span>
                  //     </li>
                  :
                    !location.pathname.includes("student") && !location.pathname.includes("contents") && (checkPermission('custom_region_operation_download') && window.location.href.includes("regions") && segmentCount === 1)
                  ?
                    <li
                      className={
                        props.checkedAll
                          ? "contain_none grey_color cursor_none"
                          : "contain_none"
                      }
                      onClick={() => {downloadList('regions');handleShowDownloading()}}
                    >
                      Download List <span></span>
                    </li>
                  :
                    !location.pathname.includes("student") && !location.pathname.includes("contents") && (checkPermission('custom_woreda_operation_download') && window.location.href.includes("woreda") && segmentCount === 1)
                  ?
                    <li
                      className={
                        props.checkedAll
                          ? "contain_none grey_color cursor_none"
                          : "contain_none"
                      }
                      onClick={() => {downloadList('woredas');handleShowDownloading()}}
                    >
                      Download List <span></span>
                    </li>
                  :
                    !location.pathname.includes("student") && !location.pathname.includes("contents") && (checkPermission('custom_school_operation_download') && window.location.href.includes("schools") && segmentCount === 1)
                  ?
                    <li
                      className={
                        props.checkedAll
                          ? "contain_none grey_color cursor_none"
                          : "contain_none"
                      }
                      onClick={() => {downloadList('schools');handleShowDownloading()}}
                    >
                      Download List <span></span>
                    </li>
                  :
                    // !location.pathname.includes("student") && !location.pathname.includes("contents") && (checkPermission('custom_school_operation_download') && window.location.href.includes("schools") && segmentCount === 2)
                    // ?
                    //   <>
                        
                    //   </>
                    // :
                      <></>
                  
                )
              ) : (location.pathname.includes("form") && segmentCount === 1 && !location.pathname.includes("student") && userContext.frmResponse === 2 && !window.location.href.includes("notownform") && checkPermission('custom_form_operation_download')) ? 
                <>
                  <li
                    className={
                      props.checkedAll
                        ? "contain_none grey_color cursor_none"
                        : "contain_none"
                    }
                    onClick={() => {userContext.setFrmResponse(1)}}
                  >
                    Download <span></span>
                  </li>
                </>: <></>
              }
              {
                ((location.pathname.includes("practice-result") || location.pathname.includes("exam-result")) && userContext.practiceExamSctnData.length !== 0)
                ? 
                  <li
                  className="btn btn_next_section"
                  onClick={() => {practiceExamNextHandleClick()}}
                >
                  Next Section
                </li>
                :
                ((location.pathname.includes("practice-result") || location.pathname.includes("exam-result")) && userContext.practiceExamSctnData.length === 0)
                ? 
                  <li
                  className="btn btn_end_course"
                  onClick={() => {userContext.setFrmUpdating(false);history.push("/student")}}
                >
                  End Course
                </li>
                :
                  <></>
              }
            </ul>
            <div className="d-flex align-items-center justify-content-end">
              {props.checkedAll && !location.pathname.includes("form")? (
                <>
                  {(((checkPermission('custom_federal_data_delete')) || checkPermission('custom_federal_data_all')) && window.location.href.includes("federal"))
                  ?
                    <p className="mb-0 delete_all" onClick={() => {userContext.setAllBtn('deleteAll');setAction('deleteAll');showDeleteAllModal()}}>Delete All</p>
                  :
                    <></>
                  }
                  {(((checkPermission('custom_region_data_delete')) || checkPermission('custom_region_data_all')) && window.location.href.includes("regions"))
                  ?
                    <p className="mb-0 delete_all" onClick={() => {userContext.setAllBtn('deleteAll');setAction('deleteAll');showDeleteAllModal()}}>Delete All</p>
                  :
                    <></>
                  }
                  {(((checkPermission('custom_woreda_data_delete')) || checkPermission('custom_woreda_data_all')) && window.location.href.includes("woreda"))
                  ?
                    <p className="mb-0 delete_all" onClick={() => {userContext.setAllBtn('deleteAll');setAction('deleteAll');showDeleteAllModal()}}>Delete All</p>
                  :
                    <></>
                  }
                  {(((checkPermission('custom_school_data_delete')) || checkPermission('custom_school_data_all')) && window.location.href.includes("schools"))
                  ?
                    <p className="mb-0 delete_all" onClick={() => {userContext.setAllBtn('deleteAll');setAction('deleteAll');showDeleteAllModal()}}>Delete All</p>
                  :
                    <></>
                  }
                  {(checkPermission('custom_federal_operation_suspend') && window.location.href.includes("federal") && !location.pathname.includes('form'))
                  ?
                    <p className="mb-0 suspend_all" 
                    onClick={() => {userContext.setAllBtn('suspendAll');setAction('suspendAll');showDeleteAllModal()}}
                    >Suspend All</p>
                  :
                    <></>
                  }
                  {(checkPermission('custom_region_operation_suspend') && window.location.href.includes("regions") && !location.pathname.includes('form') && segmentCount === 2)
                  ?
                    <p className="mb-0 suspend_all" 
                    onClick={() => {userContext.setAllBtn('suspendAll');setAction('suspendAll');showDeleteAllModal()}}
                    >Suspend All</p>
                  :
                    <></>
                  }{(checkPermission('custom_woreda_operation_suspend') && window.location.href.includes("woreda") && !location.pathname.includes('form') && segmentCount === 2)
                  ?
                    <p className="mb-0 suspend_all" 
                    onClick={() => {userContext.setAllBtn('suspendAll');setAction('suspendAll');showDeleteAllModal()}}
                    >Suspend All</p>
                  :
                    <></>
                  }{(checkPermission('custom_school_operation_suspend') && window.location.href.includes("schools") && !location.pathname.includes('form') && segmentCount === 2)
                  ?
                    <p className="mb-0 suspend_all" 
                    onClick={() => {userContext.setAllBtn('suspendAll');setAction('suspendAll');showDeleteAllModal()}}
                    >Suspend All</p>
                  :
                    <></>
                  }
                </>
              ) : (
                ""
              )}
              {/* { location.pathname !== '/allannouncement' && location.pathname !== '/allannouncement/inbox' && location.pathname !== '/allannouncement/sent' ?
                    (location.pathname === '/roles') ? 
                     <></> : 
                     <p className={props.checkedAll ? "broadcast mb-0 grey_color cursor_none" : "broadcast mb-0"} onClick={props.checkedAll ? null : handleShowBroadcast}>
                    Send Announcement
                    </p> : <></>
                  } */}
            </div>
          </div>
        </div>
        <div className="row_2 ">
          <div className="user_count d-flex align-items-center justify-content-between"></div>
        </div>
      </div>

      {props.addName === "User" ? (
        <AddUserModal show={showUser} closeModal={closeUserModal} />
      ) : props.addName === "Region" ? (
        <AddRegionModal show={showUser} closeModal={closeUserModal} />
      ) : props.addName === "Woreda" ? (
        <AddDistrictModal show={showUser} closeModal={closeUserModal} />
      ) : props.addName === "School" ? (
        <AddSchoolModal show={showUser} closeModal={closeUserModal} />
      ) : (
        ""
      )}
      <BroadcastModal
        show={showBroadcast}
        closeShowBroadcast={closeShowBroadcast}
      />
      <DownloadingModal
        show={showDownloading}
        closeShowDownloading={closeShowDownloading}
        type={downloadType}
      />
      <BulkUploadModal
        show={showBulkUploading}
        closeModal={closeBulkUploading}
      />
      <CreateNewRole show={createNewRole} closeModal={closeShowCreateRole} />
      <DeleteAllModal show={showDeleteAll} closeModal={closeShowDeleteAll} actionName={action}/>
      <ShareForm show={showFormStop}  closeModal={closeShowFormStop}/>
      <PreviewForm  show={OpenPreviewForm} closeModal={closePreViewForm}/>
      <div className={userContext.formLdng && ((window.location.href.includes('form') && segmentCount === 2) || (window.location.href.includes("users") || window.location.href.includes("federal") || window.location.href.includes("regions") || window.location.href.includes("woreda") || window.location.href.includes("schools"))) ? "loader_div" : ""}>
        <ClipLoader color={color} className="loader" loading={userContext.formLdng && ((window.location.href.includes('form') && segmentCount === 2 && useContext.crtFormBtn) || (window.location.href.includes("users") || window.location.href.includes("federal") || window.location.href.includes("regions") || window.location.href.includes("woreda") || window.location.href.includes("schools")))} css={override} size={50} />
      </div>
      <EditFormName name={props.name} show={editName}  closeModal={closeEditFormName} />
      <Publish show={publishCourses}  closeModal={closePublishCourses} />
      <DeleteCourse show={deleteCourses}  closeModal={closeDeleteCourses} />
      <DownloadListModal show={AllDownloadList}  closeModal={closeDownloadlist} />
      {(userContext.frmResponse === 1)
        ?
          <DownloadForm />
          :
          <></>
      }
    </>
  );
};

export default SubHeader;
