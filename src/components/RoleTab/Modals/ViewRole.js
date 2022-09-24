import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import FormCheck from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { getPermissions } from "../../../actions/Role";

const ViewRole = (props) => {
  let permissionIdArray = []
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getPermissions());
  },[]);

  const permissionData = useSelector((state) => state.rolesData.permissionData);

  const singleRoleData = useSelector(
    (state) =>  state.rolesData.singleRoleData
  );
  
  if(singleRoleData){
    singleRoleData.permissions.map((data) => {
      data.permissions.map((subdata) => {
        subdata.permissions.map((fianldata) => {
          permissionIdArray.push(fianldata.id)
        })
      })
    })
  }

  return (
    <Modal
      show={props.show }
      onHide={props.closeModal}
      className="create_new_role view_role"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h3>View Role</h3>
          <Link
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
        <div className="body_head">
          <div className="uf-single">
            <div className="uf-label">Role Name</div>
            <div className="uf-field">
              <span className="uf-field-value">{singleRoleData && singleRoleData.title ? singleRoleData.title : ""}</span>
            </div>
          </div>

          <div className="uf-single">
            <div className="uf-label">Level</div>
            <div className="uf-field">
              <span className="uf-field-value">{singleRoleData.level === 1 ? "Federal" : singleRoleData.level === 2 ? "Region" : singleRoleData.level === 3 ? "Woreda" : singleRoleData.level === 4 ? "School" : ""}</span>
            </div>
          </div>
 
          <div className="uf-single">
            <div className="uf-label">Parent</div>
            <div className="uf-field">
              <span className="uf-field-value">{singleRoleData && singleRoleData.parent_name ? singleRoleData.parent_name : ""}</span>
            </div>
          </div>
        </div>
        <h3 className="select_head">Select Actions for each role</h3>
        <div className="row">
          <div className="col-md-3">
            <div className="role_name_div">
              <h4 className="invisible">Data</h4>
              <ul>
                <li>All User Management</li>
              </ul>
              <ul>
                <li>Federal Management</li>
              </ul>
              <ul>
                <li>Region Management</li>
              </ul>
              <ul>
                <li>Woreda Management</li>
              </ul>
              <ul>
                <li>School Management</li>
              </ul>
              <ul>
                <li>Role Management</li>
              </ul>
              <ul>
                <li>Form Management</li>
              </ul>
              <ul>
                <li>Course Management</li>
              </ul>
              <ul>
                <li>Learner Management</li>
              </ul>
              {/* <ul>
                <li>Resources Management</li>
              </ul> */}
              {/* <ul>
                <li>Announcement Management</li>
              </ul> */}
            </div>
          </div>
          <div className="col">
            <div className="actions_div">
              <h4>Data</h4>
              <ul>
                <li>
                  {permissionData &&
                  permissionData.map((data) => {
                    return(
                      (data.appname === "user")
                      ?
                        <>
                          {data.permissions && data.permissions[0] && data.permissions[0].permissions &&
                          data.permissions[0].permissions.map((subdata) => {
                            return(
                              <div className="li_div">
                                <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                <div className="checbox_div">
                                  <FormCheck.Check  aria-label="option 1" name="userData[]"  disabled checked={(permissionIdArray.length > 0 && (permissionIdArray.indexOf(subdata.id) !== -1)) ? true : false}/>
                                            
                                </div>
                              </div>
                            )
                          })}
                        </>
                      :
                        <></>
                    )
                  })}
                </li>
              </ul>

              <ul>
                <li>
                  {permissionData &&
                  permissionData.map((data) => {
                    return(
                      (data.appname === "federal")
                      ?
                        <>
                          {data.permissions && data.permissions[0] && data.permissions[0].permissions &&
                          data.permissions[0].permissions.map((subdata) => {
                            return(
                              <div className="li_div">
                                <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                <div className="checbox_div">
                                  <FormCheck.Check  aria-label="option 1" name="federalData[]"  disabled checked={(permissionIdArray.length > 0 && (permissionIdArray.indexOf(subdata.id) !== -1)) ? true : false}/>
                                            
                                </div>
                              </div>
                            )
                          })}
                        </>
                      :
                        <></>
                    )
                  })}
                </li>
              </ul>

              <ul>
                <li>
                  {permissionData &&
                  permissionData.map((data) => {
                    return(
                      (data.appname === "region")
                      ?
                        <>
                          {data.permissions && data.permissions[0] && data.permissions[0].permissions &&
                          data.permissions[0].permissions.map((subdata) => {
                            return(
                              <div className="li_div">
                                <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                <div className="checbox_div">
                                  <FormCheck.Check  aria-label="option 1" name="regionData[]"  disabled checked={(permissionIdArray.length > 0 && (permissionIdArray.indexOf(subdata.id) !== -1)) ? true : false}/>
                                            
                                </div>
                              </div>
                            )
                          })}
                        </>
                      :
                        <></>
                    )
                  })}
                </li>
              </ul>

              <ul>
                <li>
                  {permissionData &&
                  permissionData.map((data) => {
                    return(
                      (data.appname === "woreda")
                      ?
                        <>
                          {data.permissions && data.permissions[0] && data.permissions[0].permissions &&
                          data.permissions[0].permissions.map((subdata) => {
                            return(
                              <div className="li_div">
                                <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                <div className="checbox_div">
                                  <FormCheck.Check  aria-label="option 1" name="woredaData[]"  disabled checked={(permissionIdArray.length > 0 && (permissionIdArray.indexOf(subdata.id) !== -1)) ? true : false}/>
                                            
                                </div>
                              </div>
                            )
                          })}
                        </>
                      :
                        <></>
                    )
                  })}
                </li>
              </ul>

              <ul>
                <li>
                  {permissionData &&
                  permissionData.map((data) => {
                    return(
                      (data.appname === "school")
                      ?
                        <>
                          {data.permissions && data.permissions[0] && data.permissions[0].permissions &&
                          data.permissions[0].permissions.map((subdata) => {
                            return(
                              <div className="li_div">
                                <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                <div className="checbox_div">
                                  <FormCheck.Check  aria-label="option 1" name="schoolData[]"  disabled checked={(permissionIdArray.length > 0 && (permissionIdArray.indexOf(subdata.id) !== -1)) ? true : false}/>
                                            
                                </div>
                              </div>
                            )
                          })}
                        </>
                      :
                        <></>
                    )
                  })}
                </li>
              </ul>

              <ul>
                <li>
                  {permissionData &&
                  permissionData.map((data) => {
                    return(
                      (data.appname === "role")
                      ?
                        <>
                          {data.permissions && data.permissions[0] && data.permissions[0].permissions &&
                          data.permissions[0].permissions.map((subdata) => {
                            return(
                              <div className="li_div">
                                <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                <div className="checbox_div">
                                  <FormCheck.Check  aria-label="option 1" name="roleData[]"  disabled checked={(permissionIdArray.length > 0 && (permissionIdArray.indexOf(subdata.id) !== -1)) ? true : false}/>
                                            
                                </div>
                              </div>
                            )
                          })}
                        </>
                      :
                        <></>
                    )
                  })}
                </li>
              </ul>

              <ul>
                <li>
                  {permissionData &&
                  permissionData.map((data) => {
                    return(
                      (data.appname === "form")
                      ?
                        <>
                          {data.permissions && data.permissions[0] && data.permissions[0].permissions &&
                          data.permissions[0].permissions.map((subdata) => {
                            return(
                              <div className="li_div">
                                <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                <div className="checbox_div">
                                  <FormCheck.Check  aria-label="option 1" name="formData[]"  disabled checked={(permissionIdArray.length > 0 && (permissionIdArray.indexOf(subdata.id) !== -1)) ? true : false}/>
                                            
                                </div>
                              </div>
                            )
                          })}
                        </>
                      :
                        <></>
                    )
                  })}
                </li>
              </ul>

              <ul>
                <li>
                  {permissionData &&
                  permissionData.map((data) => {
                    return(
                      (data.appname === "course")
                      ?
                        <>
                          {data.permissions && data.permissions[0] && data.permissions[0].permissions &&
                          data.permissions[0].permissions.map((subdata) => {
                            return(
                              <div className="li_div">
                                <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                <div className="checbox_div">
                                  <FormCheck.Check  aria-label="option 1" name="courseData[]"  disabled checked={(permissionIdArray.length > 0 && (permissionIdArray.indexOf(subdata.id) !== -1)) ? true : false}/>
                                             
                                </div>
                              </div>
                            )
                          })}
                        </>
                      :
                        <></>
                    )
                  })}
                </li>
              </ul>
              
              <ul>
                <li>
                  {permissionData &&
                  permissionData.map((data) => {
                    return(
                      (data.appname === "learner")
                      ?
                        <>
                          {data.permissions && data.permissions[0] && data.permissions[0].permissions &&
                          data.permissions[0].permissions.map((subdata) => {
                            return(
                              <div className="li_div">
                                <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                <div className="checbox_div">
                                  <FormCheck.Check  aria-label="option 1" name="learnerData[]"  disabled checked={(permissionIdArray.length > 0 && (permissionIdArray.indexOf(subdata.id) !== -1)) ? true : false}/>
                                            
                                </div>
                              </div>
                            )
                          })}
                        </>
                      :
                        <></>
                    )
                  })}
                </li>
              </ul>
              {/* <ul>
                <li>
                  {permissionData &&
                  permissionData.map((data) => {
                    return(
                      (data.appname === "resource")
                      ?
                        <>
                          {data.permissions && data.permissions[0] && data.permissions[0].permissions &&
                          data.permissions[0].permissions.map((subdata) => {
                            return(
                              <div className="li_div">
                                <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                <div className="checbox_div">
                                  <FormCheck.Check  aria-label="option 1" name="resourceData[]"  disabled checked={(permissionIdArray.length > 0 && (permissionIdArray.indexOf(subdata.id) !== -1)) ? true : false}/>      
                                </div>
                              </div>
                            )
                          })}
                        </>
                      :
                        <></>
                    )
                  })}
                </li>
              </ul> */}
              {/* <ul>
                <li>
                  {permissionData &&
                  permissionData.map((data) => {
                    return(
                      (data.appname === "announcements")
                      ?
                        <>
                          {data.permissions && data.permissions[0] && data.permissions[0].permissions &&
                          data.permissions[0].permissions.map((subdata) => {
                            return(
                              <div className="li_div">
                                <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                <div className="checbox_div">
                                  <FormCheck.Check  aria-label="option 1" name="announcementData[]"  disabled checked={(permissionIdArray.length > 0 && (permissionIdArray.indexOf(subdata.id) !== -1)) ? true : false}/>      
                                </div>
                              </div>
                            )
                          })}
                        </>
                      :
                        <></>
                    )
                  })}
                </li>
              </ul> */}
            </div>
          </div>
          <div className="col">
            <div className="access_div">
              <h4>Operations</h4>
              <ul>
                <li>
                  {permissionData &&
                  permissionData.map((data) => {
                    return(
                      (data.appname === "user")
                      ?
                        <>
                          {data.permissions && data.permissions[1] && data.permissions[1].permissions &&
                          data.permissions[1].permissions.map((subdata) => {
                            return(
                              <div className="li_div">
                                <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                <div className="checbox_div">
                                  <FormCheck.Check  aria-label="option 1" name="userData[]"  disabled checked={(permissionIdArray.length > 0 && (permissionIdArray.indexOf(subdata.id) !== -1)) ? true : false}/>   
                                </div>
                              </div>
                            )
                          })}
                        </>
                      :
                        <></>
                    )
                  })}
                </li>
              </ul>

              <ul>
                <li>
                  {permissionData &&
                  permissionData.map((data) => {
                    return(
                      (data.appname === "federal")
                      ?
                        <>
                          {data.permissions && data.permissions[1] && data.permissions[1].permissions &&
                          data.permissions[1].permissions.map((subdata) => {
                            return(
                              <div className="li_div">
                                <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                <div className="checbox_div">
                                  <FormCheck.Check  aria-label="option 1" name="federalData[]"  disabled checked={(permissionIdArray.length > 0 && (permissionIdArray.indexOf(subdata.id) !== -1)) ? true : false}/>   
                                </div>
                              </div>
                            )
                          })}
                        </>
                      :
                        <></>
                    )
                  })}
                </li>
              </ul>

              <ul>
                <li>
                  {permissionData &&
                  permissionData.map((data) => {
                    return(
                      (data.appname === "region")
                      ?
                        <>
                          {data.permissions && data.permissions[1] && data.permissions[1].permissions &&
                          data.permissions[1].permissions.map((subdata) => {
                            return(
                              <div className="li_div">
                                <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                <div className="checbox_div">
                                  <FormCheck.Check  aria-label="option 1" name="regionData[]"  disabled checked={(permissionIdArray.length > 0 && (permissionIdArray.indexOf(subdata.id) !== -1)) ? true : false}/>   
                                </div>
                              </div>
                            )
                          })}
                        </>
                      :
                        <></>
                    )
                  })}
                </li>
              </ul>

              <ul>
                <li>
                  {permissionData &&
                  permissionData.map((data) => {
                    return(
                      (data.appname === "woreda")
                      ?
                        <>
                          {data.permissions && data.permissions[1] && data.permissions[1].permissions &&
                          data.permissions[1].permissions.map((subdata) => {
                            return(
                              <div className="li_div">
                                <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                <div className="checbox_div">
                                  <FormCheck.Check  aria-label="option 1" name="woredaData[]"  disabled checked={(permissionIdArray.length > 0 && (permissionIdArray.indexOf(subdata.id) !== -1)) ? true : false}/>   
                                </div>
                              </div>
                            )
                          })}
                        </>
                      :
                        <></>
                    )
                  })}
                </li>
              </ul>

              <ul>
                <li>
                  {permissionData &&
                  permissionData.map((data) => {
                    return(
                      (data.appname === "school")
                      ?
                        <>
                          {data.permissions && data.permissions[1] && data.permissions[1].permissions &&
                          data.permissions[1].permissions.map((subdata) => {
                            return(
                              <div className="li_div">
                                <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                <div className="checbox_div">
                                  <FormCheck.Check  aria-label="option 1" name="schoolData[]"  disabled checked={(permissionIdArray.length > 0 && (permissionIdArray.indexOf(subdata.id) !== -1)) ? true : false}/>   
                                </div>
                              </div>
                            )
                          })}
                        </>
                      :
                        <></>
                    )
                  })}
                </li>
              </ul>

              <ul>
                <li>
                  
                </li>
              </ul>

              <ul>
                <li>
                  {permissionData &&
                  permissionData.map((data) => {
                    return(
                      (data.appname === "form")
                      ?
                        <>
                          {data.permissions && data.permissions[1] && data.permissions[1].permissions &&
                          data.permissions[1].permissions.map((subdata) => {
                            return(
                              <div className="li_div">
                                <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                <div className="checbox_div">
                                  <FormCheck.Check  aria-label="option 1" name="formData[]"  disabled checked={(permissionIdArray.length > 0 && (permissionIdArray.indexOf(subdata.id) !== -1)) ? true : false}/>   
                                </div>
                              </div>
                            )
                          })}
                        </>
                      :
                        <></>
                    )
                  })}
                </li>
              </ul>
              <ul>
                <li>
                  {permissionData &&
                  permissionData.map((data) => {
                    return(
                      (data.appname === "course")
                      ?
                        <>
                          {data.permissions && data.permissions[1] && data.permissions[1].permissions &&
                          data.permissions[1].permissions.map((subdata) => {
                            return(
                              <div className="li_div">
                                <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                <div className="checbox_div">
                                  <FormCheck.Check  aria-label="option 1" name="courseData[]"  disabled checked={(permissionIdArray.length > 0 && (permissionIdArray.indexOf(subdata.id) !== -1)) ? true : false}/>  
                                </div>
                              </div>
                            )
                          })}
                        </>
                      :
                        <></>
                    )
                  })}
                </li>
              </ul>

              <ul>
                <li>
                  
                </li>
              </ul>
              
              {/* <ul>
                <li>
                  {permissionData &&
                  permissionData.map((data) => {
                    return(
                      (data.appname === "learner")
                      ?
                        <>
                          {data.permissions && data.permissions[1] && data.permissions[1].permissions &&
                          data.permissions[1].permissions.map((subdata) => {
                            return(
                              <div className="li_div">
                                <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                <div className="checbox_div">
                                  <FormCheck.Check  aria-label="option 1" name="learnerData[]"  disabled checked={(permissionIdArray.length > 0 && (permissionIdArray.indexOf(subdata.id) !== -1)) ? true : false}/> 
                                </div>
                              </div>
                            )
                          })}
                        </>
                      :
                        <></>
                    )
                  })}
                </li>
              </ul> */}

              {/* <ul>
                <li>
                  {permissionData &&
                  permissionData.map((data) => {
                    return(
                      (data.appname === "resource")
                      ?
                        <>
                          {data.permissions && data.permissions[1] && data.permissions[1].permissions &&
                          data.permissions[1].permissions.map((subdata) => {
                            return(
                              <div className="li_div">
                                <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                <div className="checbox_div">
                                  <FormCheck.Check  aria-label="option 1" name="resourceData[]"  disabled checked={(permissionIdArray.length > 0 && (permissionIdArray.indexOf(subdata.id) !== -1)) ? true : false}/> 
                                </div>
                              </div>
                            )
                          })}
                        </>
                      :
                        <></>
                    )
                  })}
                </li>
              </ul> */}
              {/* <ul>
                <li>
                  {permissionData &&
                  permissionData.map((data) => {
                    return(
                      (data.appname === "announcements")
                      ?
                        <>
                          {data.permissions && data.permissions[1] && data.permissions[1].permissions &&
                          data.permissions[1].permissions.map((subdata) => {
                            return(
                              <div className="li_div">
                                <p className="mb-0">{(subdata.name.includes('_')) ? subdata.name.substring(subdata.name.lastIndexOf('_')+1) : subdata.name}</p>
                                <div className="checbox_div">
                                  <FormCheck.Check  aria-label="option 1" name="announcementData[]"  disabled checked={(permissionIdArray.length > 0 && (permissionIdArray.indexOf(subdata.id) !== -1)) ? true : false}/> 
                                </div>
                              </div>
                            )
                          })}
                        </>
                      :
                        <></>
                    )
                  })}
                </li>
              </ul> */}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ViewRole;
