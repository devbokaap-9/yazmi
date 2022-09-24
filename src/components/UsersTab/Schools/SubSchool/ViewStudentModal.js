import React, { useEffect, useState } from 'react'
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import EditUserModal from "../../Users/EditUserModal";
import checkPermission from "../../../../utils/CheckPermission"

const ViewStudentModal = (props) => {
  const [showEditSchoolUser, setShowEditSchoolUser] = useState(false);

  const SingleuserSchoolData = useSelector((state) => state.schoolData && state.schoolData.singleUserSchoolData);

  const editIconClick = () => {
    setShowEditSchoolUser(true)
    props.close()
  }

  const closeEditSchoolUserModal = () => {
    setShowEditSchoolUser(false);
  };

    return (
      <>
        <Modal show={props.show} onHide={props.close}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>View {SingleuserSchoolData.profile && SingleuserSchoolData.profile.roles[0].title} Details</h3>
            {(checkPermission('custom_school_data_edit') && window.location.href.includes("schools"))
            ?
              <Link className="edit-modal-header" onClick={editIconClick}><img src={process.env.PUBLIC_URL + "/images/edit-icon-white.svg"} alt="edit"/></Link>
            :
              <></>
            }
            <Link className="close-modal-header" onClick={props.close}><img src={process.env.PUBLIC_URL + "/images/modal-close.svg"} alt="close" /></Link>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey="basicdata"
            id="uncontrolled-tab-example"
            className="mb-0"
          >
            <Tab eventKey="basicdata" title="Basic Data">
              <div className="modal-form-wrapper">
                <div className="uf-single">
                  <div className="uf-label">Username</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{SingleuserSchoolData.profile && SingleuserSchoolData.profile.username}</span>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Password</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{SingleuserSchoolData.profile && SingleuserSchoolData.profile.username}</span>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">First Name</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{SingleuserSchoolData.profile &&  SingleuserSchoolData.profile.first_name}</span>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Father's Name  </div>
                  <div className="uf-field">
                    <span className="uf-field-value">{SingleuserSchoolData.profile &&  SingleuserSchoolData.profile.middle_name}</span>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">GrandFather's Name</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{SingleuserSchoolData.profile &&  SingleuserSchoolData.profile.last_name}</span>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Phone Number </div>
                  <div className="uf-field">
                    <span className="uf-field-value">{SingleuserSchoolData.profile &&  SingleuserSchoolData.profile.phone_number}</span>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="locationinfo" title="Location Details">
              <div className="modal-form-wrapper">
                <div className="uf-single uf-single">
                  <div className="uf-label">Address</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{SingleuserSchoolData.profile &&  SingleuserSchoolData.profile.address}</span>
                  </div>
                </div>
                <div className="uf-single uf-single">
                  <div className="uf-label">Region</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{SingleuserSchoolData.profile &&  SingleuserSchoolData.profile.region_name}</span>
                  </div>
                </div>
                <div className="uf-single uf-single">
                  <div className="uf-label">City</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{SingleuserSchoolData.profile &&  SingleuserSchoolData.profile.city}</span>
                  </div>
                </div>
                <div className="uf-single uf-single">
                  <div className="uf-label">Woreda</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{SingleuserSchoolData.profile &&  SingleuserSchoolData.profile.woreda_name}</span>
                  </div>
                </div>
                <div className="uf-single uf-single">
                  <div className="uf-label">Kebele</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{ SingleuserSchoolData.profile && SingleuserSchoolData.profile.kebele}</span>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="optional" title="Optional">
              <div className="modal-form-wrapper">
                <div className="uf-single">
                  <div className="uf-label">Sex</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{SingleuserSchoolData.profile && SingleuserSchoolData.profile.sex}</span>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Marital Status</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{SingleuserSchoolData.profile && SingleuserSchoolData.profile.marital_status}</span>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Enrollment Type/<br />Student Type **</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{SingleuserSchoolData.profile && SingleuserSchoolData.profile.enrollment}</span>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Date of Birth </div>
                  <div className="uf-field">
                    <span className="uf-field-value">{SingleuserSchoolData.profile && SingleuserSchoolData.profile.dob}</span>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Citzenship </div>
                  <div className="uf-field">
                    <span className="uf-field-value">{SingleuserSchoolData.profile && SingleuserSchoolData.profile.citizenship}</span>
                  </div>
                </div>
                <div className="uf-single uf-single">
                  <div className="uf-label">Disability Status</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{SingleuserSchoolData.profile && SingleuserSchoolData.profile.disability}</span>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>

        </Modal.Body>
      </Modal>
      <EditUserModal name={props.name} show={showEditSchoolUser} closeModal={closeEditSchoolUserModal} />
    </>
      
    )
}

export default ViewStudentModal
