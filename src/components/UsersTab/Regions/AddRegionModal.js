import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useDispatch, useSelector } from "react-redux";
import { postRegionData, getRegionsData } from "../../../actions/Region";
import {removeErrorData} from "../../../actions/RemoveError";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from 'react-toastify';

//validation
const validationSchema = yup.object({
  usernames: yup.string().required("Cannot be blank"),
  idnumbers: yup.string().required("Cannot be blank"),
});

const AddRegionModal = (props) => {
  const [addClass, setAddClass] = useState(false);
  const [key, setKey] = useState('Basic');
  const [disable,setDisable] = useState(true)
  const [btnClickFlag,setBtnClickFlag] = useState(false)
  const [ loading, setLoading ] = useState(false)

  const dispatch = useDispatch();
  const formRef = useRef();
  const form1Ref = useRef();

  const { error } = useSelector((state) => state);
  //get data from reducer
  const regionResData = useSelector(
    (state) =>
      state.regionData.regionSaveData
  );
  
  //for first tab
  const saveFirstData = (e) => {
    setBtnClickFlag(false)
    //call for removing error data
    dispatch(removeErrorData())
    if(!formRef.current.values.usernames == "" || !formRef.current.values.idnumbers == "" ){
      setAddClass(true);
      setDisable(false);
      setKey('Location')
    }
  };

  //call add region API
  const handleSave = () => {
    let geolocation = ''
    setBtnClickFlag(true)
    setLoading(true);
    if(formRef.current.values.latitude && formRef.current.values.longitude){
      geolocation = formRef.current.values.latitude +","+formRef.current.values.longitude
    }
    else{
      if(formRef.current.values.latitude){
        geolocation = formRef.current.values.latitude
      }
      else if(formRef.current.values.longitude){
        geolocation = formRef.current.values.longitude
      }
    }
    let save_region = {
      name:formRef.current.values.usernames,
      identification_number: formRef.current.values.idnumbers,
      geolocation: geolocation,
      distance_from_addis_abba: form1Ref.current.values.addisababa,
      distance_from_central_region: form1Ref.current.values.centerrigion,
      distance_from_central_zone: form1Ref.current.values.centerzone,
    };
    dispatch(postRegionData(save_region));
  };
  useEffect( () => {
    //if success then only execute
    if (regionResData.id && props.show && btnClickFlag && error.errorsData === '') {
     
      props.closeModal();
      setBtnClickFlag(false)
      setLoading(false);
      setAddClass(false);
      setDisable(true);
      setKey('Basic')
      toast.success('Region Added');
      dispatch(getRegionsData());
    }
    else{
      if(error && error.errorsData && btnClickFlag){
        setLoading(false);
        if(error.errorsData.identification_number || error.errorsData.name || error.errorsData.geolocation){
          setBtnClickFlag(false)
          setAddClass(false);
          setDisable(true);
          setKey('Basic')
        }
      }
    }
  },[regionResData , error])
  
  return (
    <>
      <Modal show={props.show} onHide={() => {props.closeModal();
    dispatch(removeErrorData())}} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>Add Region</h3>
            <p>Add Region invidually</p>
            <Link
              className="close-modal-header"
              onClick={() => {props.closeModal();
                dispatch(removeErrorData())}}
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
            onSelect={(k) => setKey(k)}
            activeKey={key}
            id="uncontrolled-tab-example"
            className="mb-0"
          >
            <Tab eventKey="Basic" title="Basic data">
              <Formik
                initialValues={{ usernames: "", idnumbers: "",latitude:"",longitude:"" }}
                validationSchema={validationSchema}
                onSubmit={saveFirstData}
                innerRef={formRef}
              >
                {({ values, handleChange }) => {
                return(
                  <Form className="modal-form-wrapper">
                    <div className="uf-single">
                      <div className="uf-label">Name</div>
                      <div className="uf-field">
                        <Field
                          type="text"
                          name="usernames"
                          className="input-yazmi"
                          placeholder="Enter name"
                          onChange={handleChange}
                          value={values.usernames}
                          maxlength="50"
                        />
                        {(!error.errorsData)
                        ?
                          <ErrorMessage
                            name="usernames"
                            component="div"
                            className="text-danger error_msg"
                          />
                        :
                          <span className="text-danger error_msg">
                            {error.errorsData && error.errorsData.name
                              ? error.errorsData.name
                              : ""}
                          </span>
                        }
                      </div>
                    </div>
                    <div className="uf-single">
                      <div className="uf-label">ID Number</div>
                      <div className="uf-field">
                        <Field
                          type="text"
                          className="input-yazmi"
                          placeholder="Enter ID number"
                          name="idnumbers"
                          onChange={handleChange}
                          value={values.idnumbers}
                        />
                        {(!error.errorsData)
                        ?
                          <ErrorMessage
                            name="idnumbers"
                            component="div"
                            className="text-danger error_msg"
                          />
                        :
                          <span className="text-danger error_msg">
                            {error.errorsData &&
                            error.errorsData.identification_number
                              ? error.errorsData.identification_number
                              : ""}
                          </span>
                        }
                      </div>
                    </div>
                    <div className="uf-single uf-single">
                      <div className="uf-label">Geolocation</div>
                      <div className="uf-field uf-field-two">
                        <Field
                          type="number"
                          className="input-yazmi appearance_none"
                          placeholder="Latitude"
                          name="latitude"
                        />
                        <Field
                          type="number"
                          className="input-yazmi appearance_none"
                          placeholder="Longitude"
                          name="longitude"
                        />
                        <span className="text-danger error_msg">
                          {error.errorsData &&
                          error.errorsData.geolocation
                            ? error.errorsData.geolocation
                            : ""}
                        </span>
                      </div>
                    </div>

                    <div className="modal-form-cta">
                      <button type="submit" className="btn-primary-yazmi">
                        Save
                      </button>
                      <button type="button"
                        className="btn-secondary-yazmi"
                        onClick={() => {props.closeModal();
                          dispatch(removeErrorData())}}
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>
                  )
                }}
              </Formik>
            </Tab>
            <Tab eventKey="Location" title="Location information" disabled={disable}>
            <Formik
                initialValues={{ addisababa: "",centerrigion:"",centerzone:"" }}
                innerRef={form1Ref}
                onSubmit={handleSave}
              >
              {({ values }) => {
                return(
                  <Form className="modal-form-wrapper">
                    <div className="uf-single uf-single">
                      <div className="uf-label">Distance from Addis Ababa</div>
                      <div className="uf-field">
                        <Field
                          type="text"
                          className="input-yazmi"
                          placeholder="Enter distance"
                          name="addisababa"
                        />
                        <span className="text-danger error_msg">
                          {error.errorsData &&
                          error.errorsData.distance_from_addis_abba
                            ? error.errorsData.distance_from_addis_abba
                            : ""}
                        </span>
                      </div>
                    </div>
                    <div className="uf-single">
                      <div className="uf-label">
                        Region Distance From Central Region
                      </div>
                      <div className="uf-field">
                        <Field
                          type="text"
                          className="input-yazmi"
                          placeholder="Enter distance"
                          name="centerrigion"
                        />
                        <span className="text-danger error_msg">
                          {error.errorsData &&
                          error.errorsData.distance_from_central_region
                            ? error.errorsData.distance_from_central_region
                            : ""}
                        </span>
                      </div>
                    </div>
                    <div className="uf-single uf-single">
                      <div className="uf-label">
                        Region Distance From Central Zone
                      </div>
                      <div className="uf-field">
                        <Field
                          type="number"
                          className="input-yazmi appearance_none"
                          placeholder="Enter distance"
                          name="centerzone"
                        />
                        <span className="text-danger error_msg">
                          {error.errorsData &&
                          error.errorsData.distance_from_central_zone
                            ? error.errorsData.distance_from_central_zone
                            : ""}
                        </span>
                      </div>
                    </div>

                    <div className="modal-form-cta">
                      <button type="submit" className={loading ? "btn-primary-yazmi button_disable": "btn-primary-yazmi"} disabled={loading ? true : false}>
                        Save
                      </button>
                      <button type="button"
                        className="btn-secondary-yazmi"
                        onClick={() => {props.closeModal();
                          dispatch(removeErrorData())}}
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>
                  )
                }}
              </Formik>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AddRegionModal;
