import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useSelector } from "react-redux";
import EditUserModal from "../../Users/EditUserModal";
import checkPermission from "../../../../utils/CheckPermission"

const ViewRegionModal = (props) => {
  const [showEditRegionUser, setShowEditRegionUser] = useState(false);

    const single_user = useSelector((state) => state.regionData && state.regionData.getSingleDataForRegion);

    const editIconClick = () => {
      setShowEditRegionUser(true)
      props.closeModal()
  }

  const closeEditRegionlUserModal = () => {
    setShowEditRegionUser(false);
  };

    return (
        <>
            <Modal show={props.show} onHide={props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h3>View User Details</h3>
                        {(checkPermission('custom_region_data_edit') && window.location.href.includes("regions"))
                        ?
                          <Link className="edit-modal-header" onClick={editIconClick}><img src={process.env.PUBLIC_URL + "/images/edit-icon-white.svg"} alt="Edit" /></Link>
                        :
                          <></>
                        }
                        <Link className="close-modal-header" onClick={props.closeModal}><img src={process.env.PUBLIC_URL + "/images/modal-close.svg"} alt="Close" /></Link>
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
                    <span className="uf-field-value">{ single_user && single_user.profile && single_user.profile.username}</span>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Password</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{ single_user && single_user.profile && single_user.profile.username}</span>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">First Name</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{single_user && single_user.profile &&  single_user.profile.first_name}</span>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Father's Name  </div>
                  <div className="uf-field">
                    <span className="uf-field-value">{single_user && single_user.profile &&  single_user.profile.middle_name}</span>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">GrandFather's Name</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{single_user && single_user.profile &&  single_user.profile.last_name}</span>
                  </div>
                </div>
                <div className="uf-single uf-single">
                  <div className="uf-label">Sex </div>
                  <div className="uf-field">
                      <span className="uf-field-value">{single_user && single_user.profile && single_user.profile.sex}</span>
                  </div>
              </div>     
              <div className="uf-single uf-single">
                  <div className="uf-label">Citzenship</div>
                  <div className="uf-field">
                      <span className="uf-field-value">{single_user && single_user.profile && single_user.profile.citizenship}</span>
                  </div>
              </div>  
              <div className="uf-single uf-single">
                  <div className="uf-label">Date of Birth</div>
                  <div className="uf-field">
                      <span className="uf-field-value">{single_user && single_user.profile && single_user.profile.dob}</span>
                  </div>
              </div>   
                <div className="uf-single">
                  <div className="uf-label">Phone Number </div>
                  <div className="uf-field">
                    <span className="uf-field-value">{single_user && single_user.profile &&  single_user.profile.phone_number}</span>
                  </div>
                </div>
              </div>
                        </Tab>
                        <Tab eventKey="locationinfo" title="Location Details">
                        <div className="modal-form-wrapper">
                <div className="uf-single uf-single">
                  <div className="uf-label">Address</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{single_user && single_user.profile &&  single_user.profile.address}</span>
                  </div>
                </div>
                <div className="uf-single uf-single">
                  <div className="uf-label">Region</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{single_user && single_user.profile &&  single_user.profile.region_name}</span>
                  </div>
                </div>
                <div className="uf-single uf-single">
                  <div className="uf-label">City</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{single_user && single_user.profile &&  single_user.profile.city}</span>
                  </div>
                </div>
                <div className="uf-single uf-single">
                  <div className="uf-label">Woreda</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{single_user && single_user.profile &&  single_user.profile.woreda_name}</span>
                  </div>
                </div>
                <div className="uf-single uf-single">
                  <div className="uf-label">Kebele</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{ single_user && single_user.profile && single_user.profile.kebele}</span>
                  </div>
                </div>
              </div>
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
            <EditUserModal name="Other" show={showEditRegionUser} closeModal={closeEditRegionlUserModal} />
        </>
    )
};
export default ViewRegionModal;
