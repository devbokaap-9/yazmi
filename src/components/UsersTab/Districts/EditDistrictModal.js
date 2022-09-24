import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { removeErrorData } from "../../../actions/RemoveError";
import { getWoredasData, updateWoredaData } from "../../../actions/Woreda";
import { getRegionsData } from "../../../actions/Region";
import { toast } from 'react-toastify';

//validation
const validationSchema = yup.object({
  name: yup.string().required("Cannot be blank"),
  idNum: yup.string().required("Cannot be blank"),
  userregion: yup.string().required("Please select one option"),
});

const validationSchemaForLocationTab = yup.object({
  cityrural: yup.string().required("Please select one option"),
});

const EditDistrictModal = (props) => {
  const [addClass, setAddClass] = useState(false);
  const [key, setKey] = useState("Basic");
  const [disable, setDisable] = useState(true);
  const [btnClickFlag, setBtnClickFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const {singleWoredaData} = useSelector((state) => state.woredaData);

  const { regionData } = useSelector((state) => state.regionData);
  var { count, results } = regionData;
  
  useEffect(() => {
    if(key !== 'Basic'){
      setKey('Basic')
    }
  },[singleWoredaData])

  useEffect(() => {
    dispatch(getRegionsData())
  }, [])

  
  const formRef = useRef();
  const form1Ref = useRef();

  const { error } = useSelector((state) => state);

  const woredaResData = useSelector(
    (state) =>
      state.woredaData.updateWoredaData
  );

  const saveFirstData = () => {
    setBtnClickFlag(false)
    //call for removing error data
    dispatch(removeErrorData())
    if(!formRef.current.values.name == "" || !formRef.current.values.idNum == "" ){
      setAddClass(true);
      setDisable(false);
      setKey('locationinfo')
    }
  };

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
      id:singleWoredaData.id,
      name:formRef.current.values.name,
      identification_number: formRef.current.values.idNum,
      region: formRef.current.values.userregion,
      zone: formRef.current.values.zone,
      geolocation: geolocation,
      distance_from_addis_abba: form1Ref.current.values.addisababa,
      distance_from_central_region: form1Ref.current.values.cantralworeda,
      distance_from_central_zone: form1Ref.current.values.centralzone,
      distance_from_regional_capital: form1Ref.current.values.regionalcapital,
      where_it_is_located: form1Ref.current.values.cityrural,
    };
    dispatch(updateWoredaData(save_region));
  };

  useEffect( () => {
    //if success then only execute
    if (woredaResData.id && props.show && btnClickFlag && error.errorsData === '') {
      props.closeModal();
      setBtnClickFlag(false)
      setLoading(false);
      setAddClass(false);
      setDisable(true);
      setKey('Basic')
      toast.success('Woreda Updated');
      dispatch(getWoredasData());
    }
    else{
      if(error && error.errorsData && btnClickFlag){
        setLoading(false);
        if(error.errorsData.identification_number || error.errorsData.geolocation || error.errorsData.name || error.errorsData.region || error.errorsData.zone){
          setBtnClickFlag(false)
          setAddClass(false);
          setDisable(true);
          setKey('Basic')
        }
      }
    }
  },[woredaResData , error])
  return (
    <>
      <Modal show={props.show} onHide={() => {props.closeModal();dispatch(removeErrorData())}} className="edit-modal" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>Edit Woreda Details</h3>
            <Link
              className="close-modal-header"
              onClick={() => {props.closeModal();dispatch(removeErrorData())}}
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
            <Tab eventKey="Basic" title="Basic Data">
              <Formik
                initialValues={{
                  name: singleWoredaData.name,
                  idNum: singleWoredaData.identification_number,
                  latitude:singleWoredaData.geolocation && singleWoredaData.geolocation.split(',')[0],
                  longitude:singleWoredaData.geolocation && singleWoredaData.geolocation.split(',')[1],
                  userregion : singleWoredaData.region,
                  zone: singleWoredaData.zone,
                }}
                validationSchema={validationSchema}
                onSubmit={saveFirstData}
                innerRef={formRef}
              >
                {({ values, handleChange }) => {
                  return (
                    <Form className="modal-form-wrapper">
                      <div className="uf-single">
                        <div className="uf-label">Woreda Name</div>
                        <div className="uf-field">
                          <Field
                            type="text"
                            className="input-yazmi"
                            placeholder="Woreda Name"
                            name="name"
                            onChange={handleChange}
                            value={values.name}
                            maxlength='50'
                          />
                          {!error.errorsData ? (
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="text-danger error_msg"
                            />
                          ) : (
                            <span className="text-danger error_msg">
                              {error.errorsData && error.errorsData.name
                                ? error.errorsData.name
                                : ""}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="uf-single">
                        <div className="uf-label">Woreda ID </div>
                        <div className="uf-field">
                          <Field
                            type="text"
                            className="input-yazmi"
                            placeholder="Woreda ID"
                            name="idNum"
                            onChange={handleChange}
                            value={values.idNum}
                          />
                          {!error.errorsData ? (
                            <ErrorMessage
                              name="idNum"
                              component="div"
                              className="text-danger error_msg"
                            />
                          ) : (
                            <span className="text-danger error_msg">
                              {error.errorsData &&
                              error.errorsData.identification_number
                                ? error.errorsData.identification_number
                                : ""}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="uf-single uf-single">
                        <div className="uf-label">Geolocation </div>
                        <div className="uf-field uf-field-two">
                          <Field
                            type="text"
                            className="input-yazmi"
                            placeholder="Latitude"
                            name="latitude"
                          />
                          <Field
                            type="text"
                            className="input-yazmi"
                            placeholder="Longitude"
                            name="longitude"
                          />
                          <span className="text-danger error_msg">
                            {error.errorsData && error.errorsData.geolocation
                              ? error.errorsData.geolocation
                              : ""}
                          </span>
                        </div>
                      </div>
                      <div className="uf-single">
                        <div className="uf-label">Region </div>
                        <div className="uf-field">
                          <select className="search-yazmi" onChange={handleChange} name="userregion" value={values.userregion}>
                            <option selected value="">Select Region</option>
                            {
                                results && results.map((data,key) => 
                                  <option value={data.id} >{data.name} </option>   
                                )
                              }
                          </select>
                    
                          {(!error.errorsData)
                              ?
                                <ErrorMessage
                                  name="userregion"
                                  component="div"
                                  className="text-danger error_msg"
                                />
                              :
                                <span className="text-danger error_msg">
                                  {error.errorsData &&
                                  error.errorsData.region
                                    ? error.errorsData.region
                                    : ""}
                                </span>
                              }
                        </div>
                      </div>
                      <div className="uf-single">
                        <div className="uf-label">Zone </div>
                        <div className="uf-field">
                          <Field
                            type="text"
                            className="input-yazmi"
                            placeholder="Zone"
                            name="zone"
                            maxlength='50'
                          />
                          <span className="text-danger error_msg">
                            {error.errorsData &&
                            error.errorsData.zone
                              ? error.errorsData.zone
                              : ""}
                          </span>
                        </div>
                      </div>
                      <div className="modal-form-cta">
                        <button type="submit" className="btn-primary-yazmi">Save</button>
                        <button type="button" className="btn-secondary-yazmi" onClick={() => {props.closeModal();dispatch(removeErrorData())}}>
                        Cancel
                        </button>
                    </div>
                    </Form>
                  );
                }}
              </Formik>
              
            </Tab>
            <Tab eventKey="locationinfo" title="Location Information" disabled={disable}>
              <Formik
                initialValues={{
                    regionalcapital: singleWoredaData.distance_from_regional_capital,
                    addisababa: singleWoredaData.distance_from_addis_abba,
                    cantralworeda: singleWoredaData.distance_from_central_region,
                    centralzone: singleWoredaData.distance_from_central_zone,
                    cityrural: singleWoredaData.where_it_is_located
                }}
                innerRef={form1Ref}
                onSubmit={handleSave}
                validationSchema={validationSchemaForLocationTab}
              >
                {({ values,handleChange }) => {
                  return (
                    <Form className="modal-form-wrapper">
                      <div className="uf-single">
                        <div className="uf-label">
                          Woreda Distance From The Regional Capital{" "}
                        </div>
                        <div className="uf-field">
                          <Field
                            type="text"
                            className="input-yazmi"
                            placeholder="Woreda Distance From The Regional Capital"
                            name="regionalcapital"
                          />
                          <span className="text-danger error_msg">
                            {error.errorsData &&
                            error.errorsData.distance_from_regional_capital
                              ? error.errorsData.distance_from_regional_capital
                              : ""}
                          </span>
                        </div>
                      </div>
                      <div className="uf-single">
                        <div className="uf-label">
                          Woreda Distance From Addis Ababa
                        </div>
                        <div className="uf-field">
                          <Field
                            type="text"
                            className="input-yazmi"
                            placeholder="Woreda Distance From Addis Ababa"
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
                          Woreda Distance From Central Woreda
                        </div>
                        <div className="uf-field">
                          <Field
                            type="text"
                            className="input-yazmi"
                            placeholder="Woreda Distance From Central Woreda"
                            name="cantralworeda"
                          />
                          <span className="text-danger error_msg">
                            {error.errorsData &&
                            error.errorsData.distance_from_central_region
                              ? error.errorsData.distance_from_central_region
                              : ""}
                          </span>
                        </div>
                      </div>
                      <div className="uf-single">
                        <div className="uf-label">
                          Woreda Distance From Central Zone
                        </div>
                        <div className="uf-field">
                          <Field
                            type="text"
                            className="input-yazmi"
                            placeholder="Woreda Distance From Central Zone"
                            name="centralzone"
                          />
                          <span className="text-danger error_msg">
                            {error.errorsData &&
                            error.errorsData.distance_from_central_zone
                              ? error.errorsData.distance_from_central_zone
                              : ""}
                          </span>
                        </div>
                      </div>
                      <div className="uf-single">
                        <div className="uf-label">Where it is Located </div>
                        <div className="uf-field">
                          <select
                            className="search-yazmi"
                            onChange={handleChange}
                            name="cityrural"
                            value={values.cityrural}
                          >
                            <option value="">Select</option>
                            <option value="CITY">City</option>
                            <option value="RURAL">Rural</option>
                          </select>
                          {(!error.errorsData)
                          ?
                            <ErrorMessage
                              name="cityrural"
                              component="div"
                              className="text-danger error_msg"
                            />
                          :
                            <span className="text-danger error_msg">
                              {error.errorsData && error.errorsData.cityrural
                                ? error.errorsData.cityrural
                                : ""}
                            </span>
                          }
                        </div>
                      </div>
                      <div className="modal-form-cta">
                      <button type="submit" className={loading ? "btn-primary-yazmi button_disable": "btn-primary-yazmi"} disabled={loading ? true : false}>Save</button>
                      <button type="button" className="btn-secondary-yazmi" onClick={() => {props.closeModal();dispatch(removeErrorData())}}>
                        Cancel
                      </button>
                    </div>
                    </Form>
                  );
                }}
              </Formik>
              
            </Tab>
          </Tabs>
         
        </Modal.Body>
      </Modal>
    </>
  );
};
export default EditDistrictModal;
