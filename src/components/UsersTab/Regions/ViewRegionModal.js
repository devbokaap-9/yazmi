import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useSelector } from "react-redux";
import EditRegionModal from "./EditRegionModal";
import checkPermission from "../../../utils/CheckPermission"

const ViewRegionModal = (props) => {
    const { singleRegionData } = useSelector((state) => state.regionData);
    const [showEditRegion, setShowEditRegion] = useState(false);

    const editIconClick = () => {
        setShowEditRegion(true)
        props.closeModal()
    }

    const closeEditRegionModal = () => {
        setShowEditRegion(false);
    };

    return (
        <>
            <Modal show={props.show} onHide={props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h3>View Region Details</h3>
                        {(checkPermission('custom_region_data_edit') && window.location.href.includes('regions'))
                        ?
                            <Link className="edit-modal-header"><img src={process.env.PUBLIC_URL + "/images/edit-icon-white.svg"} alt="Edit" onClick={editIconClick}/></Link>
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
                                    <div className="uf-label">Region Name</div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{singleRegionData.name}</span>
                                    </div>
                                </div>
                                <div className="uf-single">
                                    <div className="uf-label">Region ID</div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{singleRegionData.identification_number}</span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Geolocation </div>
                                    <div className="uf-field uf-field-two">
                                        <span className="uf-field-value">{singleRegionData.geolocation && singleRegionData.geolocation}</span>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="locationinfo" title="Location Details">
                            <div className="modal-form-wrapper">
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Region Distance from Addis Ababa</div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{singleRegionData.distance_from_addis_abba && singleRegionData.distance_from_addis_abba}</span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Region Distance From Central Region</div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{singleRegionData.distance_from_central_region && singleRegionData.distance_from_central_region}</span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Region Distance From Central Zone</div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{singleRegionData.distance_from_central_zone && singleRegionData.distance_from_central_zone}</span>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
            <EditRegionModal id={props.id} show={showEditRegion} closeModal={closeEditRegionModal}/>          
        </>
    )
};
export default ViewRegionModal;
