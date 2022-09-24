import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useSelector } from "react-redux";
import EditSchoolModal from "./EditSchoolModal";
import checkPermission from "../../../utils/CheckPermission"

const ViewSchoolModal = (props) => {
  const singleSchoolData = useSelector((state) => state.schoolData.singleSchoolData);
  const [showEditSchool, setShowEditSchool] = useState(false);
  const editIconClick = () => {
      setShowEditSchool(true)
      props.closeModal()
  }

  const closeEditSchoolModal = () => {
      setShowEditSchool(false);
  };

  var geoLocation = singleSchoolData.geolocation && singleSchoolData.geolocation.split(",")


  return (
    <>
      <Modal show={props.show} onHide={props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>View School Details</h3>
            {(checkPermission('custom_school_data_edit') && window.location.href.includes("schools"))
            ?
              <Link
                className="edit-modal-header"
                onClick={editIconClick}
              >
                <img
                  src={process.env.PUBLIC_URL + "/images/edit-icon-white.svg"}
                  alt="edit"
                />
              </Link>
            :
              <></>
            }
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
          <Tabs
            defaultActiveKey="basicdata"
            id="uncontrolled-tab-example"
            className="mb-0 nav_tab_width"
          >
            <Tab eventKey="basicdata" title="Basic Data">
              <div className="modal-form-wrapper">
                <div className="uf-single">
                  <div className="uf-label">School Name</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.name}</span>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">School ID </div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.identification_number}</span>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Prev School Name</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.previous_name}</span>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Prev School Level</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.previous_level}</span>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">
                    School
                    <br /> Esablishment Year
                  </div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.establishment_year}</span>
                  </div>
                </div>
                <div className="uf-single uf-single">
                  <div className="uf-label">Geo Location</div>
                  <div className="uf-field uf-field-two">
                    <span className="uf-field-value">{singleSchoolData.geolocation ? singleSchoolData.geolocation : ""}</span>
                    {/* <span className="uf-field-value">{geoLocation && geoLocation[1] ? geoLocation[1] : ""}</span> */}
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Region</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.region_name}</span>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Zone</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.zone}</span>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Woreda</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.woreda_name}</span>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Email</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.email}</span>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Post Number</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.post_number}</span>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">
                    School
                    <br /> Phone Number
                  </div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.phone_number}</span>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">
                    Region
                    <br /> Phone Number
                  </div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.region_phone_number}</span>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="locationinfo" title="Location Details">
              <div className="modal-form-wrapper">
                <div className="uf-single uf-single">
                  <div className="uf-label">
                    Distance from
                    <br /> Addis Ababa
                  </div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.distance_from_addis_abba}</span>
                  </div>
                </div>
                <div className="uf-single uf-single">
                  <div className="uf-label">
                    Distance from
                    <br />
                    Regional Capital
                  </div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.distance_from_regional_capital}</span>
                  </div>
                </div>
                <div className="uf-single uf-single">
                  <div className="uf-label">
                    Distance from
                    <br /> Central Woreda
                  </div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.distance_from_central_region}</span>
                  </div>
                </div>
                <div className="uf-single uf-single">
                  <div className="uf-label">
                    Distance from
                    <br /> Central Zone
                  </div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.distance_from_central_zone}</span>
                  </div>
                </div>
                <div className="uf-single uf-single">
                  <div className="uf-label">Where is it located?</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.where_it_is_located}</span>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="schoolcategory" title="School Category">
              <div className="modal-form-wrapper">
                <div className="uf-single uf-single">
                  <div className="uf-label">Ownership </div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.owned_by}</span>
                  </div>
                </div>
                <div className="uf-single uf-single">
                  <div className="uf-label">Has School property Ownership </div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.is_school_owns_property ? "Yes" : "No"}</span>
                  </div>
                </div>
                <div className="uf-single uf-single">
                  <div className="uf-label">
                    If they have the property right (Area in meter square){" "}
                  </div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.property_area} {(singleSchoolData.property_area) ? "sq.mts" : ""}</span>
                  </div>
                </div>
                <div className="uf-single uf-single">
                  <div className="uf-label">
                    Does the School Provide Special Needs
                  </div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.special_needs ? "Yes" : "No"}</span>
                  </div>
                </div>
                <div className="uf-single uf-single">
                  <div className="uf-label">
                    Does the School received yearly school budgets
                  </div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.is_yearly_budget ? "Yes" : "No"}</span>
                  </div>
                </div>
                <div className="uf-single uf-single">
                  <div className="uf-label">
                    Does the School have 3 years school Development Plan
                  </div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.is_yearly_development_plan ? "Yes" : "No"}</span>
                  </div>
                </div>
                <div className="uf-single uf-single">
                  <div className="uf-label">
                    Does the school form Parent Unity
                  </div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.is_parent_unit ? "Yes" : "No"}</span>
                  </div>
                </div>
                <div className="uf-single uf-single">
                  <div className="uf-label">
                    Does the school has Permanent Unit Leader{" "}
                  </div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.is_permanent_unit_leader ? "Yes" : "No"}</span>
                  </div>
                </div>
                <div className="uf-single uf-single">
                  <div className="uf-label">
                    Does the school has Standard Inspection Level{" "}
                  </div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.standard_inspection_level}</span>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="building" title="Building/Facilities">
              <div className="modal-form-wrapper">
                <div className="uf-single uf-single">
                  <div className="uf-label">Building Number </div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.building_number}</span>
                  </div>
                </div>
                <div className="uf-single uf-single">
                  <div className="uf-label">Number of Libraries </div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.no_of_libraries}</span>
                  </div>
                </div>
                <div className="uf-single uf-single">
                  <div className="uf-label">Number of Offices </div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.no_of_offices}</span>
                  </div>
                </div>
                <div className="uf-single uf-single">
                  <div className="uf-label">Number of Pedagogies</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.no_of_pedagogies}</span>
                  </div>
                </div>
                <div className="uf-single uf-single">
                  <div className="uf-label">Number of Teacher Lounge</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.no_of_teacher_lounge}</span>
                  </div>
                </div>
                <div className="uf-single uf-single">
                  <div className="uf-label">Number of Stores</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.no_of_stores}</span>
                  </div>
                </div>
                <div className="uf-single uf-single">
                  <div className="uf-label">Number of Auditorium</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.no_of_auditorium}</span>
                  </div>
                </div>
                <div className="uf-single uf-single">
                  <div className="uf-label">Number of Chemistry Labs</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.no_of_chemistry_labs}</span>
                  </div>
                </div>
                <div className="uf-single uf-single">
                  <div className="uf-label">Number of Biology Labs</div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.no_of_biology_labs}</span>
                  </div>
                </div>
                <div className="uf-single uf-single">
                  <div className="uf-label">
                    WASH Facilities/ School Area/other details/Staff details
                    incl. non-teaching staff
                  </div>
                  <div className="uf-field">
                    <span className="uf-field-value">{singleSchoolData.others}</span>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
      <EditSchoolModal show={showEditSchool} closeModal={closeEditSchoolModal} />
    </>
  );
};
export default ViewSchoolModal;
