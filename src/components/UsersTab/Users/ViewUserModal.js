import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useSelector } from "react-redux";
import EditUserModal from "./EditUserModal";
import checkPermission from "../../../utils/CheckPermission"

const ViewUserModal = (props) => {
    const [showEditSchoolUser, setShowEditSchoolUser] = useState(false);

    const singleUserData = useSelector((state) => (props.name && props.name === "school") ? state.schoolData.singleUserSchoolData.profile : state.usersData.singleUserData);

    const editIconClick = () => {
        setShowEditSchoolUser(true)
        props.closeModal()
    }

    const closeEditSchoolUserModal = () => {
        setShowEditSchoolUser(false);
    };
   
    return (
        <>
            <Modal show={props.show} onHide={props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h3>View User Details</h3>
                        {(checkPermission('custom_school_data_edit') && window.location.href.includes("schools"))
                        ?
                            <Link className="edit-modal-header" onClick={editIconClick}><img src={process.env.PUBLIC_URL + "/images/edit-icon-white.svg"} alt="edit" /></Link> 
                        :
                            <></>
                        }
                        <Link className="close-modal-header" onClick={props.closeModal}><img src={process.env.PUBLIC_URL + "/images/modal-close.svg"} alt="close" /></Link>
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
                                        <span className="uf-field-value">{ singleUserData && singleUserData.username}</span>
                                    </div>
                                </div>
                                <div className="uf-single">
                                    <div className="uf-label">Password</div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{ singleUserData && singleUserData.username}</span>
                                    </div>
                                </div>
                                <div className="uf-single">
                                    <div className="uf-label">First Name</div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{singleUserData && singleUserData.first_name}</span>
                                    </div>
                                </div>
                                <div className="uf-single">
                                    <div className="uf-label">Father Name</div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{singleUserData && singleUserData.middle_name}</span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">GrandFather's Name </div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{singleUserData && singleUserData.last_name}</span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Sex </div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{singleUserData && singleUserData.sex}</span>
                                    </div>
                                </div>     
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Citzenship</div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{singleUserData && singleUserData.citizenship}</span>
                                    </div>
                                </div>  
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Date of Birth</div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{singleUserData && singleUserData.dob}</span>
                                    </div>
                                </div>   
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Phone Number</div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{singleUserData && singleUserData.phone_number}</span>
                                    </div>
                                </div>                        
                            </div>
                        </Tab>
                        <Tab eventKey="locationinfo" title="Location Information">
                            <div className="modal-form-wrapper">
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Address</div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{singleUserData  &&  singleUserData.address}</span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Region</div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{singleUserData && singleUserData.region_name}</span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">City</div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{singleUserData && singleUserData.city}</span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Woreda</div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{singleUserData && singleUserData.woreda_name}</span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Kebele</div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{singleUserData && singleUserData.kebele}</span>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
            <EditUserModal name="Other" show={showEditSchoolUser} closeModal={closeEditSchoolUserModal} />
        </>
    )
};
export default ViewUserModal;
