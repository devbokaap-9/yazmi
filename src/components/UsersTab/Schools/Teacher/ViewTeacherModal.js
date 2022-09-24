import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useSelector } from 'react-redux';
import EditUserModal from "../../Users/EditUserModal";
import checkPermission from "../../../../utils/CheckPermission"

const ViewTeacherModal = (props) => {
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
                        <h3>View Teacher Details</h3>
                        {(checkPermission('custom_school_data_edit') && window.location.href.includes("schools"))
                        ?
                            <Link className="edit-modal-header" onClick={editIconClick}><img src={process.env.PUBLIC_URL + "/images/edit-icon-white.svg"} alt="edit" /></Link>
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
                        className="mb-0 nav_tab_width"
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
                                    <div className="uf-label">Sex</div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{SingleuserSchoolData.profile && SingleuserSchoolData.profile.sex}</span>
                                    </div>
                                </div>
                                <div className="uf-single">
                                    <div className="uf-label">Citzenship </div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{SingleuserSchoolData.profile && SingleuserSchoolData.profile.citizenship}</span>
                                    </div>
                                </div> 
                                <div className="uf-single">
                                    <div className="uf-label">Date of Birth </div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{SingleuserSchoolData.profile && SingleuserSchoolData.profile.dob}</span>
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
                        <Tab eventKey="employmentinfo" title="Employment Information">
                            <div className="modal-form-wrapper">                                
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Year of Employment </div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{ SingleuserSchoolData.profile && SingleuserSchoolData.profile.teacher && SingleuserSchoolData.profile.teacher.emp_year}</span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Year of Employment as a teacher </div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{ SingleuserSchoolData.profile && SingleuserSchoolData.profile.teacher && SingleuserSchoolData.profile.teacher.emp_year_teacher}</span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Employment Year as a transfer  </div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{ SingleuserSchoolData.profile && SingleuserSchoolData.profile.teacher && SingleuserSchoolData.profile.teacher.emp_year_transfer}</span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Employment Contract  </div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{ SingleuserSchoolData.profile && SingleuserSchoolData.profile.teacher && SingleuserSchoolData.profile.teacher.emp_contract}</span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Number of Sections from Grade 9-12  </div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{ SingleuserSchoolData.profile && SingleuserSchoolData.profile.teacher && SingleuserSchoolData.profile.teacher.sections}</span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Assigned Course List  </div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{ SingleuserSchoolData.profile && SingleuserSchoolData.profile.teacher && SingleuserSchoolData.profile.teacher.course_list}</span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Education Level </div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{ SingleuserSchoolData.profile && SingleuserSchoolData.profile.teacher && SingleuserSchoolData.profile.teacher.education_level}</span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Major Field </div>
                                    <div className="uf-field">
                                        <span className="uf-field-value"> { SingleuserSchoolData.profile && SingleuserSchoolData.profile.teacher && SingleuserSchoolData.profile.teacher.major_fields}</span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Minor Field </div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{ SingleuserSchoolData.profile && SingleuserSchoolData.profile.teacher && SingleuserSchoolData.profile.teacher.minor_fields}</span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Pedagogical Training  </div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{ SingleuserSchoolData.profile && SingleuserSchoolData.profile.teacher && SingleuserSchoolData.profile.teacher.pedagogical_training}</span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Salary </div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{ SingleuserSchoolData.profile && SingleuserSchoolData.profile.teacher && SingleuserSchoolData.profile.teacher.currency}  { SingleuserSchoolData.profile && SingleuserSchoolData.profile.teacher && SingleuserSchoolData.profile.teacher.salary} </span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Title  </div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{ SingleuserSchoolData.profile && SingleuserSchoolData.profile.teacher && SingleuserSchoolData.profile.teacher.title}</span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Teaching License   </div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{ SingleuserSchoolData.profile && SingleuserSchoolData.profile.teacher && SingleuserSchoolData.profile.teacher.is_teaching_license ? "Yes" :"No"}</span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Continuous Professional Development </div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{ SingleuserSchoolData.profile && SingleuserSchoolData.profile.teacher && SingleuserSchoolData.profile.teacher.continue_prof_dev}</span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">English Language Development  </div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{ SingleuserSchoolData.profile && SingleuserSchoolData.profile.teacher && SingleuserSchoolData.profile.teacher.is_eng_development ? "Yes" :"No"}</span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Basic Computer Course  </div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{SingleuserSchoolData.profile && SingleuserSchoolData.profile.teacher && SingleuserSchoolData.profile.teacher.is_basic_comp_course ? "Yes" :"No"}</span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">COC</div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{ SingleuserSchoolData.profile && SingleuserSchoolData.profile.teacher && SingleuserSchoolData.profile.teacher.is_coc ? "Yes" :"No"}</span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Science, Tech and Math Course</div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{ SingleuserSchoolData.profile && SingleuserSchoolData.profile.teacher && SingleuserSchoolData.profile.teacher.is_sci_tech_math_course ? "Yes" :"No"}</span>
                                    </div>
                                </div>
                                <div className="uf-single uf-single">
                                    <div className="uf-label">Disability Status</div>
                                    <div className="uf-field">
                                        <span className="uf-field-value">{ SingleuserSchoolData.profile && SingleuserSchoolData.profile.disability}</span>
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
};
export default ViewTeacherModal;
