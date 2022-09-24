import React, { useEffect, useState,useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import { Modal } from 'react-bootstrap';
import AddUserModal from "../UsersTab/Users/AddUserModal";
import BulkUploadModal from "../UsersTab/Modals/BulkUploadModal";
import AddRegionModal from "../UsersTab/Regions/AddRegionModal";
import AddDistrictModal from "../UsersTab/Districts/AddDistrictModal";
import AddSchoolModal from "../UsersTab/Schools/AddSchoolModal";
import { useDispatch, useSelector } from "react-redux";
import { getSchoolsData, schoolInvitedUserData } from "../../actions/School";
import { getWoredasData, getWoredaInvitedUser } from "../../actions/Woreda";
import { getRegionsData, getSingleRegionInvitedData } from "../../actions/Region";
import {getSingleFederalInvitedData} from "../../actions/Federal";
import { useParams } from "react-router-dom";
import DeleteWoredaModal from '../UsersTab/Modals/DeleteWoredaModal'
import DeleteSchoolModal from "../UsersTab/Modals/DeleteSchoolModal";
import DeleteRegionModal from "../UsersTab/Modals/DeleteRegionModal";
import ManagePermissionModal from "../UsersTab/Modals/ManagePermissionModal";
import checkPermission from "../../utils/CheckPermission";
import {UserContext} from "../../UserContext";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;


const UserSidebar = (props) => {
  var {id} = useParams()
  let userContext = useContext(UserContext)
  let location = useLocation();

  const dispatch = useDispatch();
  
  const [showUser, setShowUser] = useState(false);
  const [showBulkUploading, setShowBulkUploading] = useState(false);
  const [showDistrict, setShowDistrict] = useState(false);
  const [showRegion, setShowRegion] = useState(false);
  const [showAddSchool, setShowAddSchool] = useState(false);
  const [showManagePermissions, setShowManagePermissions] = useState(false);
  const handleShowDistrict = () => setShowDistrict(true);
  const handleShowRegion = () => setShowRegion(true);
  const [showDelete, setShowDelete] = useState(false);
  const [showSchoolDelete, SetShowSchoolDelete] = useState(false);
  const [showrRegionDelete, SetShowrRegionDelete] = useState(false);
  const [deleteId,setDeleteId] = useState(false);
  const [loading,setLoading] = useState(false)
  let [color, setColor] = useState("#ffffff");

  var segmentCount = (location.pathname.split('/').length - 1) - (location.pathname[location.pathname.length - 1] == '/' ? 1 : 0);
  const { federalData } = useSelector((state) => state.federalData);
  var { count, results } = federalData;

  var FederalId = results && results[0].id

  const handleShowManagePermissions = () => {
    // setShowManagePermissions(true); 
    setLoading(true)
    if(window.location.href.includes("federal")){
      dispatch(getSingleFederalInvitedData(FederalId));
    }
    else if(window.location.href.includes("regions") && segmentCount === 2){
      let regionId = window.location.href.split("/").pop()
      dispatch(getSingleRegionInvitedData(regionId))
    }
    else if(window.location.href.includes("woreda") && segmentCount === 2){
      let woredaId = window.location.href.split("/").pop()
      dispatch(getWoredaInvitedUser(woredaId))
    }
    else if(window.location.href.includes("schools") && segmentCount === 2){
      let schoolId = window.location.href.split("/").pop()
      dispatch(schoolInvitedUserData(schoolId))
    }
      props.classRemove(); 
      document.querySelector('.add_user').classList.remove('show')
  };

  const singleInvitedFederalUserData  = useSelector((state) => state.federalData && state.federalData.singleInvitedFederalUserData);

  useEffect(() => {
    if(singleInvitedFederalUserData && loading){
      setLoading(false);
      setShowManagePermissions(true);
    }
  },[singleInvitedFederalUserData])

  const singleInvitedRegionUsersData = useSelector((state) => state.regionData.singleInvitedRegionUsers);

  useEffect(() => {
    if(singleInvitedRegionUsersData && loading){
      setLoading(false);
      setShowManagePermissions(true);
    }
  },[singleInvitedRegionUsersData])

  const singleInvitedWoredaUsersData = useSelector((state) => state.woredaData.woredaInvitedUsersData);

  useEffect(() => {
    if(singleInvitedWoredaUsersData && loading){
      setLoading(false);
      setShowManagePermissions(true);
    }
  },[singleInvitedWoredaUsersData])

  const singleInvitedSchoolUsersData = useSelector((state) => state.schoolData.schoolInvitedUsersData);

  useEffect(() => {
    if(singleInvitedSchoolUsersData && loading){
      setLoading(false);
      setShowManagePermissions(true);
    }
  },[singleInvitedSchoolUsersData])

  const handleShowUser = () => { setShowUser(true); props.classRemove(); document.querySelector('.add_user').classList.remove('show') };
  const handleShowBulkUploading = () => { setShowBulkUploading(true); props.classRemove(); document.querySelector('.add_user').classList.remove('show') };
  const removeSideBar = () => { props.classRemove(); }

  const closeUserModal = () => {
    setShowUser(false);
  }

  const closeBulkUploadingModal = () => {
    setShowBulkUploading(false);
  }

  const closeRegionModal = () => {
    setShowRegion(false);
  }

  const closeDistrictModal = () => {
    setShowDistrict(false);
  }

  const closeSchoolModal = () => {
    setShowAddSchool(false);
  }

  const closeManagePermissionModal = () => {
    setShowManagePermissions(false);
  }

  // school user list
  var  schoolList  = useSelector((state) => state.schoolData.schoolData.results);
  schoolList && schoolList.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1: -1);

  // woreda user list
  var  woredaList  = useSelector((state) => state.woredaData.woredaData.results);
  woredaList && woredaList.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1: -1);

  // region user list
  var regionData  = useSelector((state) => state.regionData.regionData.results);
  regionData && regionData.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1: -1);

  
 
  useEffect(() => {
    if(window.location.href.includes("schools")){
      userContext.setFrmLdng(true)
      dispatch(getSchoolsData())
    }
    if(window.location.href.includes("users") || window.location.href.includes("federal") || window.location.href.includes("regions") || window.location.href.includes("woreda") || window.location.href.includes("schools")){
      userContext.setFrmLdng(true)
      dispatch(getWoredasData())
      dispatch(getRegionsData())
    }
  }, [])

  
  var showdeleteModal = (ids) => {
    setShowDelete(true)
    setDeleteId(location.pathname.split('/')[location.pathname.split('/').length-1]);    
  }
  const closeDeleteModal = () => {
    setShowDelete(false);
  }

  const handleShowDelete = () => {
    SetShowSchoolDelete(true);
  }

  const closeSchoolDeleteModal = () => {
    SetShowSchoolDelete(false);
  }


  const handleRegionDelete = () => {
    SetShowrRegionDelete(true)
  }
  const closeRegionDelete = () => {
    SetShowrRegionDelete(false)
  }



  return (
    <>
      <div className="UserSidebar">
        <ul className="list-unstyled">
          {(checkPermission('custom_user_data_get') || checkPermission('custom_user_operation_download') || checkPermission('custom_user_operation_upload'))
          ?
            <li>
              <Link
                to="/users"
                className={"Link_text" + (location.pathname === "/users" ? " users_box_active" : "")}
                onClick={() => {removeSideBar();}}
              >
                <div className="users_box d-flex align-items-center justify-content-between">
                  <p className="mb-0 ml-2">All Users</p>
                </div>
              </Link>
            </li>
          :
            <></>
          }
          {
            (checkPermission('custom_federal_data_created') || checkPermission('custom_federal_data_delete') || checkPermission('custom_federal_data_edit') || checkPermission('custom_federal_data_get') || checkPermission('custom_federal_data_all') || checkPermission('custom_federal_operation_download') || checkPermission('custom_federal_operation_upload') || checkPermission('custom_federal_operation_suspend'))
          ?

            <li className="position-relative">
              <Link
                to="/federal"
                className={"Link_text " + (location.pathname === "/federal" ? " users_box_active" : "")}
                onClick={props.classRemove}
              >
                <div className="users_box d-flex align-items-center justify-content-between">
                  <p className="mb-0 ml-2">Federal</p>
                  <span id="addFederalUser">
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
                  </span>
                  <UncontrolledPopover
                    className="add_user"
                    trigger="legacy"
                    placement="bottom"
                    target="addFederalUser"
                  >
                    <div className="squar_box squar_box_hover"></div>
                    <PopoverBody>
                      <ul className="list-unstyled mb-0">
                      {
                        (checkPermission('custom_federal_data_created'))
                      ?
                        <li className="first_li" onClick={handleShowUser}>
                          <Link className="text-decoration-none">
                            Add Users
                          </Link>
                        </li>
                      :
                        <></>
                      }
                      {/* {
                        (checkPermission('custom_federal_operation_upload'))
                      ?
                        <li onClick={handleShowBulkUploading}>
                          <Link className="text-decoration-none">
                            Bulk Upload Users
                          </Link>
                        </li>
                      :
                        <></>
                      } */}
                        <li>
                          <Link
                            className="text-decoration-none"
                            onClick={handleShowManagePermissions}
                          >
                            Manage Permissions
                          </Link>
                        </li>
                      </ul>
                    </PopoverBody>
                  </UncontrolledPopover>
                </div>
              </Link>
            </li>
          :
            <></>
          }
          {
            (checkPermission('custom_region_data_created') || checkPermission('custom_region_data_delete') || checkPermission('custom_region_data_edit') || checkPermission('custom_region_data_get') || checkPermission('custom_region_data_all') || checkPermission('custom_region_operation_download') || checkPermission('custom_region_operation_upload') || checkPermission('custom_region_operation_suspend'))
          ?
            <li>
              <Link
                to="/regions"
                className={"Link_text" + (location.pathname === "/regions" ? " users_box_active" : "")}
                onClick={props.classRemove}
              >
                <div className="users_box d-flex w-100 align-items-center justify-content-between">
                  <div className="nav_link_name d-flex">
                    <p className="mb-0 ml-2">Region</p>
                  </div>
                  <span id="addRegion">
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
                  </span>
                  <UncontrolledPopover
                    className="add_user"
                    trigger="legacy"
                    placement="bottom"
                    target="addRegion"
                  >
                    <div className="squar_box squar_box_hover"></div>
                    <PopoverBody>
                      <ul className="list-unstyled mb-0">
                        {(checkPermission('custom_region_data_created'))
                        ?
                          <li className="first_li" onClick={handleShowRegion}>
                            <Link className="text-decoration-none">
                              Add Region
                            </Link>
                          </li>
                        :
                          <></>
                        }
                        {(checkPermission('custom_region_operation_upload'))
                        ?
                          <li onClick={handleShowBulkUploading}>
                            <Link className="text-decoration-none">
                              Bulk Upload Regions
                            </Link>
                          </li>
                        :
                          <></>
                        }
                        {/* <li>
                          <Link
                           
                            className="text-decoration-none"
                            onClick={handleShowManagePermissions}
                          >
                            Manage Permissions
                          </Link>
                        </li> */}
                      </ul>
                    </PopoverBody>
                  </UncontrolledPopover>
                </div>
              </Link>
              <div className={location.pathname.includes("regions") ? "dropdown d-block" : "dropdown translition_d_none" } >
                <ul className="list-unstyled">
                  {regionData && regionData.map((data) =>
                  <li>
                    <NavLink
                      to={`/regions/${data.id}`}
                      className="Link_text"
                      activeClassName="users_box_active"
                      onClick={removeSideBar}
                    >
                      {data.name}
                      <span className="three_dots" id={"region_poup_"+data.id}>
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
                      </span>
                      <UncontrolledPopover
                        className="add_user"
                        trigger="legacy"
                        placement="bottom"
                        target={"region_poup_"+data.id}
                      >
                        <div className="squar_box squar_box_hover"></div>
                        <PopoverBody>
                          <ul className="list-unstyled mb-0">
                            {(checkPermission('custom_region_data_created'))
                            ? 
                              <li className="first_li" onClick={handleShowUser}>
                                <Link
                                
                                  className="text-decoration-none"
                                  onClick={props.classRemove}
                                >
                                  Add Users
                                </Link>
                              </li>
                            :
                              <></>
                            }
                            {/* {(checkPermission('custom_region_operation_upload'))
                            ?
                              <li onClick={handleShowBulkUploading}>
                                <Link
                                
                                  className="text-decoration-none"
                                  onClick={props.classRemove}
                                >
                                  Bulk Upload Users
                                </Link>
                              </li>
                            :
                              <></>
                            } */}
                            <li>
                              <Link
                               
                                className="text-decoration-none"
                                onClick={handleShowManagePermissions}
                              >
                                Manage Permissions
                              </Link>
                            </li>
                            {(checkPermission('custom_region_data_delete'))
                            ?
                              <li>
                                <Link
                                
                                  className="text-decoration-none"
                                  onClick={handleRegionDelete}
                                >
                                  Delete
                                </Link>
                              </li>
                            :
                              <></>
                            }
                          </ul>
                        </PopoverBody>
                      </UncontrolledPopover>
                    </NavLink>
                  </li>
                  )}
                </ul>
              </div>
            </li>
          :
            <></>
          }
          {
            (checkPermission('custom_woreda_data_created') || checkPermission('custom_woreda_data_delete') || checkPermission('custom_woreda_data_edit') || checkPermission('custom_woreda_data_get') || checkPermission('custom_woreda_data_all') || checkPermission('custom_woreda_operation_download') || checkPermission('custom_woreda_operation_upload') || checkPermission('custom_woreda_operation_suspend'))
          ?
            <li>
              <NavLink
                to="/woreda"
                className={"Link_text " + (location.pathname === "/woreda" ? " users_box_active" : "")}
                onClick={props.classRemove}
              >
                <div className="users_box d-flex align-items-center justify-content-between flex-column">
                  <div className="d-flex w-100 align-items-center justify-content-between">
                    <div className="nav_link_name d-flex">
                      <p className="mb-0 ml-2">Woreda</p>
                    </div>
                  </div>
                </div>
              </NavLink>
              <div className={location.pathname.includes("woreda") ? "dropdown d-block" : "dropdown d-none" }>
                <ul className="list-unstyled">
                  {woredaList && woredaList.map((data)=>
                  <li>
                    <NavLink
                      to={`/woreda/${data.id}`}
                      className="Link_text"
                      activeClassName="users_box_active"
                      onClick={removeSideBar}
                    >
                      {data.name}
                      <span className="three_dots" id={"woreda_popup_"+data.id}>
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
                      </span>
                      <UncontrolledPopover
                        className="add_user"
                        trigger="legacy"
                        placement="bottom"
                        target={"woreda_popup_"+data.id}
                      >
                        <div className="squar_box squar_box_hover"></div>
                        <PopoverBody>
                          <ul className="list-unstyled mb-0">
                            {(checkPermission('custom_woreda_data_created'))
                            ?
                              <li className="first_li" onClick={handleShowUser}>
                                <Link
                                
                                  className="text-decoration-none"
                                  onClick={props.classRemove}
                                >
                                  Add Users
                                </Link>
                              </li>
                            :
                              <></>
                            }
                            {/* {(checkPermission('custom_woreda_operation_upload'))
                            ?
                              <li onClick={handleShowBulkUploading}>
                                <Link
                                
                                  className="text-decoration-none"
                                  onClick={props.classRemove}
                                >
                                  Bulk Upload Users
                                </Link>
                              </li>
                            :
                              <></>
                            } */}
                            <li>
                              <Link
                               
                                className="text-decoration-none"
                                onClick={handleShowManagePermissions}
                              >
                                Manage Permissions
                              </Link>
                            </li>
                            {(checkPermission('custom_woreda_data_delete'))
                            ?
                              <li>
                                <Link
                                
                                  className="text-decoration-none"
                                  onClick={(e)=>{showdeleteModal(data.id)}}
                                >
                                  Delete
                                </Link>
                              </li>
                            :
                              <></>
                            }
                          </ul>
                        </PopoverBody>
                      </UncontrolledPopover>
                    </NavLink>
                  </li>
                  )}
                
                </ul>
              </div>
            </li>
          :
            <></>
          }
          {
            (checkPermission('custom_school_data_created') || checkPermission('custom_school_data_delete') || checkPermission('custom_school_data_edit') || checkPermission('custom_school_data_get') || checkPermission('custom_school_data_all') || checkPermission('custom_school_operation_download') || checkPermission('custom_school_operation_upload') || checkPermission('custom_school_operation_suspend'))
          ?

            <li>
              <Link
                to="/schools"
                className={"Link_text" + (location.pathname === "/schools" ? " users_box_active" : "")}
                onClick={props.classRemove}
              >
                <div className="users_box d-flex align-items-center justify-content-between flex-column">
                  <div className="d-flex w-100 align-items-center justify-content-between">
                    <div className="nav_link_name d-flex">
                      <p className="mb-0 ml-2">Schools</p>
                    </div>
                  </div>
                </div>
              </Link>
              <div className={location.pathname.includes("schools") ? "dropdown d-block" : "dropdown d-none" }>
                <ul className="list-unstyled">
                  {schoolList && schoolList.map((data) => 
                  <li>
                    <NavLink
                      to={`/schools/${data.id}`}
                      className="Link_text"
                      activeClassName="users_box_active"
                    >
                      {data.name}
                      <span className="three_dots" id={"school_popup_"+data.id}>
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
                      </span>
                      <UncontrolledPopover
                        className="add_user"
                        trigger="legacy"
                        placement="bottom"
                        target={"school_popup_"+data.id}
                      >
                        <div className="squar_box squar_box_hover"></div>
                        <PopoverBody>
                          <ul className="list-unstyled mb-0">
                            {(checkPermission('custom_school_data_created'))
                            ?
                              <li className="first_li" onClick={handleShowUser}>
                                <Link
                                
                                  className="text-decoration-none"
                                  onClick={props.classRemove}
                                >
                                  Add Users
                                </Link>
                              </li>
                            :
                              <></>
                            }
                            {/* {(checkPermission('custom_school_operation_upload'))
                            ?
                              <li onClick={handleShowBulkUploading}>
                                <Link
                                
                                  className="text-decoration-none"
                                  onClick={props.classRemove}
                                >
                                  Bulk Upload Users
                                </Link>
                              </li>
                            :
                              <></>
                            } */}
                            <li>
                              <Link
                               
                                className="text-decoration-none"
                                onClick={handleShowManagePermissions}
                              >
                                Manage Permissions
                              </Link>
                            </li>
                            {(checkPermission('custom_school_data_delete'))
                            ?
                              <li>
                                <Link
                                
                                  className="text-decoration-none"
                                  onClick={handleShowDelete}
                                >
                                  Delete
                                </Link>
                              </li>
                            :
                              <></>
                            }
                          </ul>
                        </PopoverBody>
                      </UncontrolledPopover>
                    </NavLink>
                  </li>
                  )}
                  
                  

                </ul>
              </div>
            </li>
          :
            <></>
          }
          </ul>
        
      </div>

      <AddUserModal show={showUser} closeModal={closeUserModal} />

      <BulkUploadModal
        show={showBulkUploading}
        closeModal={closeBulkUploadingModal}
      />

      <AddDistrictModal show={showDistrict} closeModal={closeDistrictModal} />
      <AddRegionModal show={showRegion} closeModal={closeRegionModal} />

      
      <ManagePermissionModal show={showManagePermissions} closeModal={closeManagePermissionModal}/>
      <AddSchoolModal show={showAddSchool} closeModal={closeSchoolModal} />
      <DeleteWoredaModal deleteRole="woredaUserDelete" name="woreda" id={deleteId} show={showDelete} closeModal={closeDeleteModal} />
      <DeleteSchoolModal deleteRole="schoolUserDelete" name="school" show={showSchoolDelete} closeModal={closeSchoolDeleteModal} /> 
      <DeleteRegionModal deleteRole="regionUserDelete" name="region" show={showrRegionDelete} closeModal={closeRegionDelete} /> 
      <div className={loading ? "loader_div" : ""}>
        <ClipLoader
          color={color}
          className="loader"
          loading={loading}
          css={override}
          size={50}
        />
      </div> 
    </>
  );
};
export default UserSidebar;
