import React from "react";
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

const EditTeacherModal = (props) => {
    return (
        <>
            <Modal show={props.show} onHide={props.closeModal} className="edit-modal" backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h3>Edit Teacher Details</h3>
                        <Link className="edit-modal-header" onClick={props.closeModal}><img src={process.env.PUBLIC_URL + "/images/edit-icon-white.svg"} alt="edit" /></Link>
                        <Link className="close-modal-header" onClick={props.closeModal}><img src={process.env.PUBLIC_URL + "/images/modal-close.svg"} alt="close" /></Link>
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
                                    <div className="uf-label">Sex</div>
                                    <div className="uf-field">
                                        <select className="search-yazmi" defaultValue="Male">
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="">Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="uf-single">
                                    <div className="uf-label">Citzenship </div>
                                    <div className="uf-field">
                                        <select className="search-yazmi" defaultValue="Ethiopian">
                                            <option value="">Select Citizenship</option>
                                            <option value="Ethiopian">Ethiopian</option>
                                            <option value="">Foreigner</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="uf-single">
                                    <div className="uf-label">Date of Birth </div>
                                    <div className="uf-field">
                                        <input
                                            type="date"
                                            className="input-yazmi"
                                            placeholder="Enter birth date"
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
                                        <select className="search-yazmi" defaultValue="AfarRegion">
                                            <option value="">Select Region</option>
                                            <option value="AfarRegion">Afar Region</option>
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
                                        <select className="search-yazmi" defaultValue="city1">
                                            <option value="">Select City</option>
                                            <option value="city1">City 1</option>
                                            <option value="">City 2</option>
                                            <option value="">City 3</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="uf-single">
                                    <div className="uf-label">Woreda</div>
                                    <div className="uf-field">
                                        <select className="search-yazmi" defaultValue="yes">
                                            <option value="">Select Woreda</option>
                                            <option value="yes">Woreda 1</option>
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
                        <Tab eventKey="employmentinfo" title="Employment Information">
                            <div className="modal-form-wrapper">
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Year of Employment </div>
                                    <div className="uf-field">
                                        <input
                                            type="text"
                                            className="input-yazmi"
                                            placeholder="Enter kebele"
                                            defaultValue="2005"
                                        />
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Year of Employment as a teacher </div>
                                    <div className="uf-field">
                                        <input
                                            type="text"
                                            className="input-yazmi"
                                            placeholder="Enter kebele"
                                            defaultValue="15"
                                        />
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Employment Year as a transfer  </div>
                                    <div className="uf-field">
                                        <input
                                            type="text"
                                            className="input-yazmi"
                                            placeholder="Enter kebele"
                                            defaultValue="15"
                                        />
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Employment Contract  </div>
                                    <div className="uf-field">
                                        <select className="search-yazmi" defaultValue="yes">
                                            <option value="">Select Employment Contract</option>
                                            <option value="yes">Permanent</option>
                                            <option value="">Contract Worker</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Number of Sections from Grade 9-12  </div>
                                    <div className="uf-field">
                                        <input
                                            type="text"
                                            className="input-yazmi"
                                            placeholder="Enter number of sections"
                                            defaultValue="5"
                                        />
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Assigned Course List  </div>
                                    <div className="uf-field">
                                        <input
                                            type="text"
                                            className="input-yazmi"
                                            placeholder="Enter number of sections"
                                            defaultValue="2"
                                        />
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Education Level </div>
                                    <div className="uf-field">
                                        <select className="search-yazmi" defaultValue="Education">
                                            <option value="Education">Select Education Level</option>
                                            <option value="" >Certificate</option>
                                            <option value="">Different from TCC</option>
                                            <option value="">TCC diploma</option>
                                            <option value="">Cluster TCC diploma</option>
                                            <option value="">Linear</option>
                                            <option value="">Generalist</option>
                                            <option value="">Specialist</option>
                                            <option value="">Applied</option>
                                            <option value="">Level 3</option>
                                            <option value="">Level 4</option>
                                            <option value="">Level 5</option>
                                            <option value="">BA/BSC/BED</option>
                                            <option value="">MA/MS</option>
                                            <option value="">PhD</option>
                                            <option value="">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Major Field </div>
                                    <div className="uf-field">
                                        <select className="search-yazmi">
                                            <option value="">Mathematics</option>
                                            <option value="">English</option>
                                            <option value="">Amharic</option>
                                            <option value="">First language</option>
                                            <option value="">Chemistry</option>
                                            <option value="">Physics</option>
                                            <option value="">Biology</option>
                                            <option value="">Geography</option>
                                            <option value="">History</option>
                                            <option value="">Civics</option>
                                            <option value="">Sports</option>
                                            <option value="">IT</option>
                                            <option value="">Economics</option>
                                            <option value="">Technical drawing</option>
                                            <option value="">Business</option>
                                            <option value="">Accounting</option>
                                            <option value="">Edpm</option>
                                            <option value="">Special need education</option>
                                            <option value="">Sign language</option>
                                            <option value="">Applied</option>
                                            <option value="">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Minor Field </div>
                                    <div className="uf-field">
                                        <select className="search-yazmi">
                                            <option value="">Mathematics</option>
                                            <option value="">English</option>
                                            <option value="">Amharic</option>
                                            <option value="">First language</option>
                                            <option value="">Chemistry</option>
                                            <option value="">Physics</option>
                                            <option value="">Biology</option>
                                            <option value="">Geography</option>
                                            <option value="">History</option>
                                            <option value="">Civics</option>
                                            <option value="">Sports</option>
                                            <option value="">IT</option>
                                            <option value="">Economics</option>
                                            <option value="">Technical drawing</option>
                                            <option value="">Business</option>
                                            <option value="">Accounting</option>
                                            <option value="">Edpm</option>
                                            <option value="">Special need education</option>
                                            <option value="">Sign language</option>
                                            <option value="">Applied</option>
                                            <option value="">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Pedagogical Training  </div>
                                    <div className="uf-field">
                                        <select className="search-yazmi">
                                            <option value="">BED</option>
                                            <option value="">BSC</option>
                                            <option value="">BA</option>
                                            <option value="">PGDT</option>
                                            <option value="">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Salary </div>
                                    <div className="uf-field">
                                        <input
                                            type="text"
                                            className="input-yazmi"
                                            placeholder="Enter salary"
                                            defaultValue="100000"
                                        />
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Title  </div>
                                    <div className="uf-field">
                                        <select className="search-yazmi">
                                            <option value="">Beginner</option>
                                            <option value="">Junior</option>
                                            <option value="">Teacher</option>
                                            <option value="">Senior</option>
                                            <option value="">Associate leader</option>
                                            <option value="">Leading teacher</option>
                                            <option value="">Senior lecturer</option>
                                            <option value="">Senior lecturer II</option>
                                            <option value="">Senior lecturer III</option>
                                            <option value="">No title</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Teaching License  </div>
                                    <div className="uf-field">
                                        <select className="search-yazmi" defaultValue="yes">
                                            <option value="yes">Yes</option>
                                            <option value="">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Continuous Professional Development </div>
                                    <div className="uf-field">
                                        <select className="search-yazmi" defaultValue="cpd">
                                            <option value="">Introduction</option>
                                            <option value="cpd">CPD</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">English Language Development  </div>
                                    <div className="uf-field">
                                        <select className="search-yazmi" defaultValue="yes">
                                            <option value="yes">Yes</option>
                                            <option value="">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Basic Computer Course  </div>
                                    <div className="uf-field">
                                        <select className="search-yazmi" defaultValue="yes">
                                            <option value="yes" >Yes</option>
                                            <option value="">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">COC</div>
                                    <div className="uf-field">
                                        <select className="search-yazmi" defaultValue="yes">
                                            <option value="yes">Yes</option>
                                            <option value="">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Science, Tech and Math Course</div>
                                    <div className="uf-field">
                                        <select className="search-yazmi" defaultValue="yes">
                                            <option value="yes">Yes</option>
                                            <option value="">No</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Disability Status</div>
                                    <div className="uf-field">
                                        <select className="search-yazmi" defaultValue="Nondisabled">
                                            <option value="Nondisabled" >Non-disabled </option>
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
                        <button className="btn-secondary-yazmi" onClick={props.closeModal}>Cancel</button>
                    </div>
                </Modal.Body>

            </Modal>

        </>
    )
};
export default EditTeacherModal;
