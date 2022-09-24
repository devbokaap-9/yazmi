import React from 'react'
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';

const EditStudentModal = (props) => {
    return (
        <Modal show={props.show} onHide={props.close} className="edit-modal" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>Edit Student Details</h3>
            {/* <Link className="edit-modal-header"><img src={process.env.PUBLIC_URL + "/images/edit-icon-white.svg"} /></Link> */}
            <Link className="close-modal-header" onClick={props.close}><img src={process.env.PUBLIC_URL + "/images/modal-close.svg"} alt="Close" /></Link>
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
                    <span className="uf-field-value">Username</span>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Password</div>
                  <div className="uf-field">
                    <input
                      type="password"
                      className="input-yazmi"
                      placeholder="Update password"
                      defaultValue="123456"
                    />
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">First Name</div>
                  <div className="uf-field">
                    <input
                      type="text"
                      className="input-yazmi"
                      placeholder="Enter first name"
                      defaultValue="Mulatu"
                    />
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Father's Name</div>
                  <div className="uf-field">
                    <input
                      type="text"
                      className="input-yazmi"
                      placeholder="Enter fathers name"
                      defaultValue="Abel"
                    />
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Grandfather's Name</div>
                  <div className="uf-field">
                    <input
                      type="text"
                      className="input-yazmi"
                      placeholder="Enter grandfathers name"
                      defaultValue="Yonas"
                    />
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Phone Number</div>
                  <div className="uf-field">
                    <input
                      type="text"
                      className="input-yazmi"
                      placeholder="Enter phone number"
                      defaultValue="1234567890"
                    />
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="locationinfo" title="Location Details">
              <div className="modal-form-wrapper">
                <div className="uf-single">
                  <div className="uf-label">Address</div>
                  <div className="uf-field">
                    <textarea className="input-yazmi" rows="5" defaultValue="Address of user"></textarea>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Region</div>
                  <div className="uf-field">
                    <select className="search-yazmi" defaultValue="afar">
                      <option value="">Select Region</option>
                      <option value="afar">Afar Region</option>
                      <option value="">Amhara Region</option>
                      <option value="">Benishangul-Gumuz Region</option>
                      <option value="">Dire Dawa</option>
                      <option value="">Gambela Region</option>
                    </select>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">City</div>
                  <div className="uf-field">
                    <select className="search-yazmi" defaultValue="afar">
                      <option value="">Select City</option>
                      <option value="afar" >City 1</option>
                      <option value="">City 2</option>
                      <option value="">City 3</option>
                    </select>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Woreda</div>
                  <div className="uf-field">
                    <select className="search-yazmi" defaultValue="afar">
                      <option value="">Select Woreda</option>
                      <option value="afar">Woreda 1</option>
                      <option value="">Woreda 2</option>
                      <option value="">Woreda 3</option>
                    </select>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Kebele</div>
                  <div className="uf-field">
                    <input
                      type="text"
                      className="input-yazmi"
                      placeholder="Enter kebele"
                      defaultValue="Kebele name"
                    />
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="optional" title="Optional">
              <div className="modal-form-wrapper">
                <div className="uf-single">
                  <div className="uf-label">Sex</div>
                  <div className="uf-field">
                    <select className="search-yazmi" defaultValue="afar">
                      <option value="">Select Gender</option>
                      <option value="afar" >Male</option>
                      <option value="">Female</option>
                    </select>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Marital Status</div>
                  <div className="uf-field">
                    <select className="search-yazmi" defaultValue="afar">
                      <option value="">Select Status</option>
                      <option value="afar">Married</option>
                      <option value="">Not married</option>
                      <option value="">Divorced</option>
                      <option value="">Widow/ widower</option>
                    </select>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Enrollment Type/<br />Student Type **</div>
                  <div className="uf-field">
                    <input
                      type="text"
                      className="input-yazmi"
                      placeholder="Enter type"
                      defaultValue="Enrollment Type"
                    />
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Date of Birth </div>
                  <div className="uf-field">
                    <input
                      type="date"
                      className="input-yazmi"
                      placeholder="Enter birth date"
                      defaultValue="01/01/1990"
                    />
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Citzenship </div>
                  <div className="uf-field">
                    <select className="search-yazmi" defaultValue="afar">
                      <option value="">Select Citizenship</option>
                      <option value="afar">Ethiopian</option>
                      <option value="">Foreigner</option>
                    </select>
                  </div>
                </div>
                <div className="uf-single">
                  <div className="uf-label">Disability Status</div>
                  <div className="uf-field">
                    <select className="search-yazmi" defaultValue="afar">
                      <option value="afar">Non-disabled </option>
                      <option value="">Blind</option>
                      <option value="">Deaf</option>
                      <option value="">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
          <div className="modal-form-cta">
            <button className="btn-primary-yazmi">Save</button>
            <button className="btn-secondary-yazmi" onClick={props.close}>Cancel</button>
          </div>
        </Modal.Body>
      </Modal>
    )
}

export default EditStudentModal
