import React, {useState}  from "react";
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useSelector } from "react-redux";
import EditDistrictModal from "./EditDistrictModal";
import checkPermission from "../../../utils/CheckPermission"

const ViewDistrictModal = (props) => {
    const singledadata = useSelector((state) => state.woredaData.singleWoredaData);
    const [showEditDistrict, setShowEditDistrict] = useState(false);
    
    const editIconClick = () => {
        setShowEditDistrict(true)
        props.closeModal()
    }

    const closeEditDistrictModal = () => {
        setShowEditDistrict(false);
    };

    var gioLocation_1 = singledadata.geolocation && singledadata.geolocation.split(",") 
    return (
        <>
            <Modal show={props.show} onHide={props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h3>View Woreda Details</h3>
                        {(checkPermission('custom_woreda_data_edit') && window.location.href.includes("woreda"))
                        ?
                            <Link className="edit-modal-header" onClick={editIconClick}><img src={process.env.PUBLIC_URL + "/images/edit-icon-white.svg"} alt="edit" /></Link>
                        :
                            <></>
                        }
                        <Link className="close-modal-header" onClick={props.closeModal}><img src={process.env.PUBLIC_URL + "/images/modal-close.svg"}  alt="close" /></Link>
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
                                    <div className="uf-label">Woreda Name</div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{singledadata.name ? singledadata.name : ""}</span>
                                    </div>
                                </div>
                                <div className="uf-single">
                                    <div className="uf-label">Woreda ID </div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{singledadata.identification_number ? singledadata.identification_number : ""}</span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Geolocation </div>
                                    <div className="uf-field uf-field-two">
                                        <span className="uf-field-value">{gioLocation_1 && gioLocation_1[0] ? gioLocation_1[0] : ""}</span>
                                        <span className="uf-field-value">{gioLocation_1 && gioLocation_1[1] ? gioLocation_1[1] : ""}</span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Region </div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{singledadata.region_name === null || singledadata.region_name === "" ? " --- " : singledadata.region_name}</span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Zone </div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{singledadata.zone === null || singledadata.zone === "" ? " --- " : singledadata.zone}</span>
                                    </div>
                                </div>                                
                            </div>
                        </Tab>
                        <Tab eventKey="locationinfo" title="Location Information">
                            <div className="modal-form-wrapper">
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Woreda Distance From The Regional Capital </div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{singledadata.distance_from_regional_capital === null || singledadata.distance_from_regional_capital === "" ? " --- " : singledadata.distance_from_regional_capital}</span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Woreda Distance From Addis Ababa</div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{singledadata.distance_from_addis_abba === null || singledadata.distance_from_addis_abba === "" ? " --- " : singledadata.distance_from_addis_abba}</span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Woreda Distance From Central Woreda</div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{singledadata.distance_from_central_region === null || singledadata.distance_from_central_region === "" ? " --- " : singledadata.distance_from_central_region}</span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Woreda Distance From Central Zone</div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{singledadata.distance_from_central_zone === null || singledadata.distance_from_central_zone === "" ? " --- " : singledadata.distance_from_central_zone}</span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Where it is Located </div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{singledadata.where_it_is_located === null ||singledadata.where_it_is_located === "" ? " --- " : singledadata.where_it_is_located}</span>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>

                </Modal.Body>
            </Modal>
            <EditDistrictModal show={showEditDistrict} closeModal={closeEditDistrictModal} />
        </>
    )
};
export default ViewDistrictModal;
