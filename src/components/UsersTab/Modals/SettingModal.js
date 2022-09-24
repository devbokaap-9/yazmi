import React, { useEffect,useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser, updateSingleUser } from "../../../actions/User";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { removeErrorData } from "../../../actions/RemoveError";


const validationForUser = yup.object({
  first_name: yup.string().required("Cannot be blank"),
  middle_name: yup.string().required("Cannot be blank"),
  last_name: yup.string().required("Cannot be blank"),
  phone_number: yup.string().min(10,"Phone number must be 10 characters").max(10,"Phone number must be 10 characters").required("Cannot be blank"),
  username: yup.string().required("Cannot be blank"),
  sex: yup.string().required("Please select one option"),
});

const SettingModal = (props) => {

  const [ProfileRoleId, setProfileRoleId] = useState("")
  const [RegionId, setRegionId] = useState("")
  const [WoredaId, setWoredaId] = useState("")
  const [UserId, setUserId] = useState("")
  const [Loading, setLoading] = useState("")
  const [date,setDates] = useState("")

  let user_data = JSON.parse(decodeURIComponent(localStorage.getItem('user_data')));

  const singleUserData = useSelector((state) => state.usersData.singleUserData);

  const regionData = useSelector((state) => state.regionData.regionData.results);
  var regionResults = regionData;

  const woredaData = useSelector((state) => state.woredaData.woredaData.results);
  var woredaResults = woredaData;

  const formRef = useRef();

  let dispatch = useDispatch();

  useEffect(()=> {
    let yesterday = new Date();
    yesterday. setDate(yesterday. getDate() - 1);
    var myDate = new Date(yesterday);
    let date = myDate.toLocaleString().split(',')
    let newDate = date[0].split('/')//20/9/2021
    let month = newDate[0].charAt(1) ? newDate[0] : "0"+newDate[0]
    let getnewdate = newDate[1].charAt(1) ? newDate[1] : "0"+newDate[1] 
    newDate = newDate[2]+"-"+ month +"-"+getnewdate
    // newDate = getnewdate+"-"+ month +"-"+newDate[2]
    setDates(newDate)
  })

  useEffect(() => {
    dispatch(getSingleUser(user_data.profile_id))
    // setProfileRoleId(singleUserData.roles[0].id)
    setRegionId(singleUserData.region)
    setWoredaId(singleUserData.woreda)
    setUserId(singleUserData.user)
  }, [user_data.profile_id])


  const saveData = () => {
    dispatch(removeErrorData())
    formRef.current.values.user = singleUserData.user
    // formRef.current.values.region = singleUserData.region
    // formRef.current.values.woreda = singleUserData.woreda

    let formval = formRef.current.values

    // if(user_data.profile_id !== "" || singleUserData.user !== "" || singleUserData.region !== "" || singleUserData.woreda !== ""){
    if(user_data.profile_id !== ""){
      setLoading(true);
      console.log(formval,'formval')
      dispatch(updateSingleUser(user_data.profile_id,formval))
    }
  }

  const responseUpdateUser = useSelector((state) => state.usersData.updateSingleUser);

  useEffect(() => {
    if(responseUpdateUser.status === 200 && Loading){
      setLoading(false);
      setDates("")
      props.closeModal()
    }
  }, [responseUpdateUser])
  
  return (
    <>
      <Modal show={props.show} onHide={() => {props.closeModal();setLoading(false);setDates("")}} className="manage_profile_user">
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>{singleUserData && singleUserData.fullname}</h3>
            <p>Manage Profile Details</p>
            <Link
              className="close-modal-header"
              onClick={() => {props.closeModal();setLoading(false);setDates("")}}
            >
              <img src={process.env.PUBLIC_URL + "/images/modal-close.svg"} alt="Close" />
            </Link>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Formik
            initialValues={{ first_name: singleUserData && singleUserData.first_name,middle_name:singleUserData && singleUserData.middle_name,last_name:singleUserData && singleUserData.last_name,username:singleUserData && singleUserData.username,phone_number:singleUserData && singleUserData.phone_number,dob:singleUserData && singleUserData.dob,city:singleUserData && singleUserData.city,sex:singleUserData && singleUserData.sex,citizenship:singleUserData && singleUserData.citizenship,region:singleUserData && singleUserData.region,woreda:singleUserData && singleUserData.woreda,kebele : singleUserData && singleUserData.kebele,marital_status: singleUserData && singleUserData.marital_status}}
            validationSchema={validationForUser}
            onSubmit={saveData}
            innerRef={formRef}
          >
            {({ values, handleChange }) => {
                return(
                  <Form className="">
                    <div className="modal-form-wrapper user-form-wrapper">
                      <div className="uf-single">
                        <div className="uf-label">First Name</div>
                        <div className="uf-field">
                          <Field
                            type="text"
                            className="input-yazmi"
                            placeholder="Enter your first name"
                            name="first_name"
                            maxlength="50"
                            // onChange={handleChange}
                            // value={singleUserData && singleUserData.first_name}
                          />
                          {
                            <ErrorMessage
                              name="first_name"
                              component="div"
                              className="text-danger error_msg"
                            />
                            }
                        </div>
                      </div>
                      <div className="uf-single">
                        <div className="uf-label">Middle Name</div>
                        <div className="uf-field">
                          <Field
                            type="text"
                            className="input-yazmi"
                            placeholder="Enter your middle name"
                            name="middle_name"
                            // value={singleUserData && singleUserData.middle_name}
                          />
                          {
                            <ErrorMessage
                              name="middle_name"
                              component="div"
                              className="text-danger error_msg"
                            />
                          }
                        </div>
                      </div>
                      <div className="uf-single">
                        <div className="uf-label">Last Name</div>
                        <div className="uf-field">
                          <Field
                            type="text"
                            className="input-yazmi"
                            placeholder="Enter your last name"
                            name="last_name"
                            />
                            {
                              <ErrorMessage
                                name="last_name"
                                component="div"
                                className="text-danger error_msg"
                              />
                            }
                        </div>
                      </div>
                      <div className="uf-single">
                        <div className="uf-label">Username</div>
                        <div className="uf-field">
                          <Field
                            type="text"
                            className="input-yazmi"
                            placeholder="Enter your username"
                            name="username"
                            disabled="disabled"
                          />
                          {
                            <ErrorMessage
                              name="username"
                              component="div"
                              className="text-danger error_msg"
                            />
                          }
                        </div>
                      </div>
                      <div className="uf-single">
                        <div className="uf-label">Phone Number</div>
                        <div className="uf-field">
                          <Field
                            type="text"
                            className="input-yazmi"
                            placeholder="Enter phone number"
                            name="phone_number"
                            // value={singleUserData && singleUserData.phone_number}
                          />
                          {
                              <ErrorMessage
                                name="phone_number"
                                component="div"
                                className="text-danger error_msg"
                              />
                            }
                        </div>
                      </div>
                      <div className="uf-single">
                        <div className="uf-label">Gender</div>
                        <div className="uf-field">
                          <select className="search-yazmi" value={values.sex} name="sex" onChange={handleChange}>
                            <option value="">Select Gender</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHER">Other</option>
                          </select>
                        </div>
                      </div>
                      {/* {
                        <ErrorMessage
                          name="Gender"
                          component="div"
                          className="text-danger error_msg"
                        />
                      } */}
                      <div className="uf-single">
                        <div className="uf-label">Citizenship</div>
                        <div className="uf-field">
                          <select className="search-yazmi" name="citizenship" value={values.citizenship} onChange={handleChange}>
                            <option value="">Select Citizenship</option>
                            <option value="ETHIOPIAN" >Ethiopian</option>
                            <option value="FOREIGNER">Foreigner</option>
                            <option value="OTHER">Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="uf-single">
                        <div className="uf-label">Date of Birth</div>
                        <div className="uf-field">
                          <Field
                            type="date"
                            className="input-yazmi"
                            placeholder="Enter birth date"
                            name="dob"
                            max={date}
                            // defaultValue={singleUserData && singleUserData.dob}
                          />
                        </div>
                      </div>
                      <div className="uf-single">
                        <div className="uf-label">Marital Status</div>
                        <div className="uf-field">
                          <select className="search-yazmi" name="marital_status" onChange={handleChange} value={values.marital_status}>
                            <option value="">Select Status</option>
                            <option value="MARRIED" >Married</option>
                            <option value="UNMARRIED">Not married</option>
                            <option value="DIVORCED">Divorced</option>
                            <option value="WIDOW">Widow/ widower</option>
                            <option value="OTHER">Other</option>
                          </select>
                        </div>
                      </div>
                      {/* <div className="uf-single">
                        <div className="uf-label">Qualification</div>
                        <div className="uf-field">
                          <Field
                            type="text"
                            className="input-yazmi"
                            // placeholder="Enter your qualification"
                          />
                        </div>
                      </div> */}
                      <h5 className="uf-section-title">Location Details</h5>
                      <div className="uf-single">
                        <div className="uf-label">Region</div>
                        <div className="uf-field">
                          <select className="search-yazmi" name="region" onChange={handleChange} value={values.region}>
                            <option value="">Select Region</option>
                            {
                              regionResults && regionResults.map((data,key) => 
                                <option value={data.id}>{data.name}</option>
                                  
                              )
                            }
                          </select>
                        </div>
                      </div>
                      <div className="uf-single">
                        <div className="uf-label">City</div>
                        <div className="uf-field">
                          <Field
                            type="text"
                            className="input-yazmi"
                            placeholder="Enter city"
                            name="city"
                            // value={singleUserData && singleUserData.city}
                          />
                        </div>
                      </div>
                      <div className="uf-single">
                        <div className="uf-label">Woreda</div>
                        <div className="uf-field">
                          <select className="search-yazmi" name="woreda" onChange={handleChange} value={values.woreda}>
                            <option value="">Select Woreda</option>
                            {
                              woredaResults && woredaResults.map((data,key) => 
                                <option value={data.id}>{data.name}</option>
                                  
                              )
                            }
                          </select>
                        </div>
                      </div>
                      <div className="uf-single">
                        <div className="uf-label">Kebele</div>
                        <div className="uf-field">
                          <Field
                            type="text"
                            className="input-yazmi"
                            placeholder="Enter kebele"
                            name="kebele"
                            // value={singleUserData && singleUserData.kebele}
                          />
                        </div>
                      </div>
                      <div className="uf-single uf-note">
                        <p className=" text-red">
                          Note: All other changes and updates can be made by your Sys
                          Admin
                        </p>
                      </div>
                      <div className="modal-form-cta">
                        <button className={Loading ? "btn-primary-yazmi button_disable": "btn-primary-yazmi"} disabled={Loading ? true : false}>Save</button>
                        <button
                          className="btn-secondary-yazmi"
                          onClick={() => {props.closeModal();setLoading(false);setDates("")}}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </Form>
                )
            }}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default SettingModal;
